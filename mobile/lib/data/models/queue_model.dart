enum TokenStatus { served, serving, waiting, user }

class ProgressionToken {
  final int number;
  final String label;
  final TokenStatus status;

  ProgressionToken({
    required this.number,
    required this.label,
    required this.status,
  });
}

class LiveQueueState {
  final String institutionName;
  final String departmentName;
  final bool isLive;
  final int nowServingNumber;
  final String userToken;
  final int userTokenNumber;
  final int peopleAhead;
  final int estimatedWaitMinutes;
  final String estimatedTimeBy;
  final String confidenceLevel;
  final String predictionExplanation;
  final List<ProgressionToken> progressionTokens;
  final String lastUpdatedTime;
  final bool notificationsEnabled;
  final String arrivalWindow;
  final String statusLabel;

  LiveQueueState({
    required this.institutionName,
    required this.departmentName,
    required this.isLive,
    required this.nowServingNumber,
    required this.userToken,
    required this.userTokenNumber,
    required this.peopleAhead,
    required this.estimatedWaitMinutes,
    required this.estimatedTimeBy,
    required this.confidenceLevel,
    required this.predictionExplanation,
    required this.progressionTokens,
    required this.lastUpdatedTime,
    required this.notificationsEnabled,
    required this.arrivalWindow,
    required this.statusLabel,
  });

  factory LiveQueueState.mock() {
    final List<ProgressionToken> tokens = [];
    for (int i = 29; i <= 48; i++) {
      TokenStatus status;
      if (i < 32) {
        status = TokenStatus.served;
      } else if (i == 32) {
        status = TokenStatus.serving;
      } else if (i == 47) {
        status = TokenStatus.user;
      } else {
        status = TokenStatus.waiting;
      }

      tokens.add(
        ProgressionToken(
          number: i,
          label: i == 47 ? "YOU" : i.toString(),
          status: status,
        ),
      );
    }

    return LiveQueueState(
      institutionName: "City General Hospital",
      departmentName: "OPD",
      isLive: true,
      nowServingNumber: 32,
      userToken: "Q-047",
      userTokenNumber: 47,
      peopleAhead: 15,
      estimatedWaitMinutes: 42,
      estimatedTimeBy: "3:05 PM",
      confidenceLevel: "High Confidence",
      predictionExplanation:
          "Based on current queue movement, historical patterns, and 3 active counters.",
      progressionTokens: tokens,
      lastUpdatedTime: "2:18 PM",
      notificationsEnabled: true,
      arrivalWindow: "3:00 PM – 3:10 PM",
      statusLabel: "Waiting",
    );
  }
}
