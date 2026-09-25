from enum import Enum
from typing import Dict, Set

class TokenState(str, Enum):
    BOOKED = "BOOKED"
    WAITING = "WAITING"
    APPROACHING = "APPROACHING"
    ARRIVAL_WINDOW = "ARRIVAL_WINDOW"
    ARRIVED = "ARRIVED"
    SERVING = "SERVING"
    SERVED = "SERVED"
    EXPIRED = "EXPIRED"
    CANCELLED = "CANCELLED"

# Valid state transition mapping
ALLOWED_TRANSITIONS: Dict[TokenState, Set[TokenState]] = {
    TokenState.BOOKED: {TokenState.WAITING, TokenState.CANCELLED},
    TokenState.WAITING: {TokenState.APPROACHING, TokenState.CANCELLED},
    TokenState.APPROACHING: {TokenState.ARRIVAL_WINDOW, TokenState.CANCELLED},
    TokenState.ARRIVAL_WINDOW: {TokenState.ARRIVED, TokenState.EXPIRED, TokenState.CANCELLED},
    TokenState.ARRIVED: {TokenState.SERVING, TokenState.CANCELLED},
    TokenState.SERVING: {TokenState.SERVED, TokenState.CANCELLED},
    TokenState.SERVED: set(),
    TokenState.EXPIRED: set(),
    TokenState.CANCELLED: set(),
}

class TokenStateMachine:
    @staticmethod
    def can_transition(current_state: TokenState, target_state: TokenState) -> bool:
        return target_state in ALLOWED_TRANSITIONS.get(current_state, set())

    @staticmethod
    def transition(current_state: TokenState, target_state: TokenState) -> TokenState:
        if not TokenStateMachine.can_transition(current_state, target_state):
            raise ValueError(f"Invalid state transition from {current_state} to {target_state}")
        return target_state
