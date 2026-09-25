import os
import json
import joblib
import numpy as np
from typing import Dict, Any

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "wait_time_model.pkl")
METADATA_PATH = os.path.join(os.path.dirname(__file__), "models", "metadata.json")

class WaitTimePredictor:
    def __init__(self):
        self.model = None
        self.metadata = {}
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            self.model = joblib.load(MODEL_PATH)
        if os.path.exists(METADATA_PATH):
            with open(METADATA_PATH, "r") as f:
                self.metadata = json.load(f)

    def predict(self, people_ahead: int, active_counters: int, avg_service_time_min: float, time_of_day_hour: int) -> Dict[str, Any]:
        """
        Estimates queue waiting time based on active counters, historical throughput, and position.
        Fallback heuristic formula used if ML model pkl is not yet trained.
        """
        if self.model:
            features = np.array([[people_ahead, active_counters, avg_service_time_min, time_of_day_hour]])
            predicted_wait = float(self.model.predict(features)[0])
        else:
            # Heuristic calculation: (people_ahead / max(active_counters, 1)) * avg_service_time
            effective_counters = max(active_counters, 1)
            predicted_wait = round((people_ahead / effective_counters) * avg_service_time_min, 1)

        confidence = "High" if active_counters >= 2 else "Medium"

        return {
            "estimated_wait_minutes": predicted_wait,
            "people_ahead": people_ahead,
            "active_counters": active_counters,
            "confidence": confidence,
            "prediction_factors": [
                "Current queue position",
                "Active counter count",
                "Historical service duration",
                "Time of day traffic pattern"
            ]
        }

predictor = WaitTimePredictor()
