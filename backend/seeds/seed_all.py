import asyncio
from datetime import datetime
from sqlalchemy.future import select
from app.core.database import AsyncSessionLocal
from app.core.security import hash_password
from app.models.user import User
from app.models.institution import Institution
from app.models.service import Service
from app.models.counter import Counter
from app.models.queue import Queue
from app.models.token import Token
from app.models.staff import Staff

async def seed_data():
    async with AsyncSessionLocal() as db:
        # Check if already seeded
        result = await db.execute(select(User).limit(1))
        if result.scalars().first():
            return

        print("Seeding SmartQ database with initial sample data...")

        # 1. Users
        admin_user = User(
            id="usr-admin-1",
            email="admin@smartq.com",
            hashed_password=hash_password("admin123"),
            full_name="Admin Director",
            role="admin"
        )
        staff_user = User(
            id="usr-staff-1",
            email="staff@cityhospital.com",
            hashed_password=hash_password("staff123"),
            full_name="Dr. Sarah Connor",
            phone_number="+1 555-0192",
            role="staff"
        )
        patient_user = User(
            id="usr-user-1",
            email="patient@gmail.com",
            hashed_password=hash_password("patient123"),
            full_name="John Doe",
            phone_number="+1 555-0143",
            role="user"
        )

        db.add_all([admin_user, staff_user, patient_user])

        # 2. Institutions
        hosp = Institution(
            id="inst-city-hospital",
            name="City General Hospital",
            type="Hospital",
            address="124 Healthcare Boulevard",
            city="New York",
            phone="+1 800-555-0199",
            image_url="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
            description="Leading multi-specialty public hospital with AI queue management.",
            active_queues_count=4,
            total_waiting=18
        )
        bank = Institution(
            id="inst-metro-bank",
            name="Metro Bank Main Branch",
            type="Bank",
            address="500 Financial Way",
            city="New York",
            phone="+1 800-555-0122",
            image_url="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=600&q=80",
            description="Full-service retail banking, wealth management, and loan counters.",
            active_queues_count=2,
            total_waiting=8
        )

        db.add_all([hosp, bank])

        # 3. Services
        s1 = Service(
            id="srv-opd",
            institution_id="inst-city-hospital",
            name="General Outpatient (OPD)",
            category="Medical",
            description="General health consultation and medical evaluation.",
            avg_service_time_mins=12
        )
        s2 = Service(
            id="srv-peds",
            institution_id="inst-city-hospital",
            name="Pediatrics Consultation",
            category="Medical",
            description="Child care specialist consultations and vaccinations.",
            avg_service_time_mins=15
        )
        s3 = Service(
            id="srv-cashier",
            institution_id="inst-metro-bank",
            name="Teller & Cash Deposit",
            category="Financial",
            description="Cash withdrawals, deposits, and money transfers.",
            avg_service_time_mins=5
        )

        db.add_all([s1, s2, s3])

        # 4. Counters
        c1 = Counter(
            id="cnt-opd-1",
            institution_id="inst-city-hospital",
            service_id="srv-opd",
            counter_number=1,
            name="OPD Counter 01",
            staff_id="usr-staff-1",
            status="OPEN"
        )
        c2 = Counter(
            id="cnt-opd-2",
            institution_id="inst-city-hospital",
            service_id="srv-opd",
            counter_number=2,
            name="OPD Counter 02",
            status="OPEN"
        )

        db.add_all([c1, c2])

        # 5. Staff assignment
        st1 = Staff(
            id="stf-1",
            user_id="usr-staff-1",
            institution_id="inst-city-hospital",
            counter_id="cnt-opd-1",
            status="ACTIVE"
        )
        db.add(st1)

        # 6. Active Queue
        today_str = datetime.utcnow().strftime("%Y-%m-%d")
        q1 = Queue(
            id="q-opd-today",
            service_id="srv-opd",
            institution_id="inst-city-hospital",
            date=today_str,
            status="ACTIVE",
            total_tokens=35,
            waiting_count=18,
            served_count=14,
            cancelled_count=3
        )
        db.add(q1)

        # 7. Sample Token
        t1 = Token(
            id="tok-sample-1",
            token_number="A-035",
            queue_id="q-opd-today",
            service_id="srv-opd",
            institution_id="inst-city-hospital",
            user_id="usr-user-1",
            user_name="John Doe",
            user_phone="+1 555-0143",
            status="WAITING",
            position=3,
            estimated_wait_mins=18,
            counter_id="cnt-opd-1"
        )
        db.add(t1)

        await db.commit()
        print("SmartQ sample data successfully seeded!")

if __name__ == "__main__":
    asyncio.run(seed_data())
