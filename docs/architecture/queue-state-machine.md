# Queue State Machine Specifications

SmartQ manages the life cycle of every customer token through a formal, deterministic state machine.

## Token States

1. `BOOKED`: Customer joined the queue remotely via mobile app or web portal.
2. `WAITING`: Customer is actively waiting in queue; token position decreases as queue progresses.
3. `APPROACHING`: Customer is notified that their turn is approaching (e.g. 5–10 people ahead).
4. `ARRIVAL_WINDOW`: Turn is imminent or called; grace period countdown (e.g. 5 mins) starts for on-site arrival verification.
5. `ARRIVED`: Customer arrived at the location and verified via QR / Mobile OTP / Staff verification.
6. `SERVING`: Customer is currently being served at a designated counter.
7. `SERVED`: Service completed successfully.
8. `EXPIRED`: Customer failed to verify arrival within the configurable grace period.
9. `CANCELLED`: Customer manually cancelled their token before being called.

---

## State Transition Diagram

```text
       ┌──────────┐
       │  BOOKED  │
       └────┬─────┘
            │
            ▼
       ┌──────────┐         Cancel
       │ WAITING  ├──────────────────────────┐
       └────┬─────┘                          │
            │                                ▼
            ▼                           ┌───────────┐
       ┌─────────────┐                  │ CANCELLED │
       │ APPROACHING │                  └───────────┘
       └────┬────────┘                       ▲
            │                                │
            ▼                                │ Cancel
       ┌────────────────┐                    │
       │ ARRIVAL_WINDOW ├────────────────────┘
       └────┬───────┬───┘
            │       │ Grace Period Expired
            │       └───────────────────────┐
            ▼                               ▼
       ┌──────────┐                    ┌───────────┐
       │ ARRIVED  │                    │  EXPIRED  │
       └────┬─────┘                    └───────────┘
            │
            ▼
       ┌──────────┐
       │ SERVING  │
       └────┬─────┘
            │
            ▼
       ┌──────────┐
       │  SERVED  │
       └──────────┘
```

---

## Operational Rules & Grace Period

- **Grace Period**: Each institution can set custom grace period limits (e.g., 5 min for clinics, 10 min for government office document processing).
- **Auto Expiry**: Celery workers run periodically every 30 seconds (`expiry_worker.py`) to transition overdue `ARRIVAL_WINDOW` tokens to `EXPIRED`.
- **Position Recalculation**: Whenever a token transitions to `CANCELLED`, `EXPIRED`, or `SERVED`, positions of all downstream tokens in `WAITING` state are dynamically updated and pushed via WebSocket.
