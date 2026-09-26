import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/queue_model.dart';

class LiveQueueNotifier extends StateNotifier<LiveQueueState> {
  LiveQueueNotifier() : super(LiveQueueState.mock());

  void simulateArrivalWindow() {
    state = LiveQueueState(
      institutionName: state.institutionName,
      departmentName: state.departmentName,
      isLive: state.isLive,
      nowServingNumber: state.nowServingNumber + 1,
      userToken: state.userToken,
      userTokenNumber: state.userTokenNumber,
      peopleAhead: (state.peopleAhead - 1).clamp(0, 100),
      estimatedWaitMinutes: (state.estimatedWaitMinutes - 3).clamp(0, 300),
      estimatedTimeBy: "3:02 PM",
      confidenceLevel: state.confidenceLevel,
      predictionExplanation: state.predictionExplanation,
      progressionTokens: state.progressionTokens.map((t) {
        if (t.number == state.nowServingNumber) {
          return ProgressionToken(
            number: t.number,
            label: t.label,
            status: TokenStatus.served,
          );
        } else if (t.number == state.nowServingNumber + 1) {
          return ProgressionToken(
            number: t.number,
            label: t.label,
            status: TokenStatus.serving,
          );
        }
        return t;
      }).toList(),
      lastUpdatedTime: "Just now",
      notificationsEnabled: state.notificationsEnabled,
      arrivalWindow: "2:55 PM – 3:05 PM",
      statusLabel: "Arriving Soon",
    );
  }
}

final liveQueueProvider =
    StateNotifierProvider<LiveQueueNotifier, LiveQueueState>((ref) {
  return LiveQueueNotifier();
});
