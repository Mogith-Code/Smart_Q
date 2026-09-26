import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/colors.dart';
import '../../../data/models/queue_model.dart';
import '../../providers/queue_provider.dart';

class LiveTrackingScreen extends ConsumerWidget {
  const LiveTrackingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final queueState = ref.watch(liveQueueProvider);
    final queueNotifier = ref.read(liveQueueProvider.notifier);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          // 1. Header (Dark Navy)
          _buildHeader(context, queueState),

          // 2. Scrollable Body Content
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
              physics: const BouncingScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Top Token Status Hero Card
                  _buildTokenStatusCard(queueState),
                  const SizedBox(height: 16),

                  // Smart Prediction Card
                  _buildSmartPredictionCard(queueState),
                  const SizedBox(height: 16),

                  // Queue Progression Grid Card
                  _buildQueueProgressionCard(queueState),
                  const SizedBox(height: 16),

                  // Notifications Enabled Banner
                  _buildNotificationBanner(queueState),
                  const SizedBox(height: 16),

                  // Arrival Window Card
                  _buildArrivalWindowCard(queueState),
                  const SizedBox(height: 20),

                  // Simulate Action Button
                  _buildSimulateButton(context, queueNotifier),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),

          // 3. Bottom Navigation Bar
          _buildBottomNavBar(),
        ],
      ),
    );
  }

  // --- 1. HEADER WIDGET ---
  Widget _buildHeader(BuildContext context, LiveQueueState queueState) {
    return Container(
      color: AppColors.headerBackground,
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Back Button Row
              GestureDetector(
                onTap: () {
                  if (Navigator.canPop(context)) {
                    Navigator.pop(context);
                  }
                },
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(LucideIcons.arrowLeft, color: Colors.white, size: 20),
                    SizedBox(width: 8),
                    Text(
                      "Back",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Title and Live Badge Row
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Live Queue",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          "${queueState.institutionName} · ${queueState.departmentName}",
                          style: const TextStyle(
                            color: Color(0xFF94A3B8),
                            fontSize: 14,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ],
                    ),
                  ),

                  // "● Live" Badge
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: AppColors.liveBadgeBg,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(
                          Icons.circle,
                          color: AppColors.liveBadgeText,
                          size: 8,
                        ),
                        SizedBox(width: 6),
                        Text(
                          "Live",
                          style: TextStyle(
                            color: AppColors.liveBadgeText,
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  // --- 2. TOKEN STATUS HERO CARD ---
  Widget _buildTokenStatusCard(LiveQueueState queueState) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderGray, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          // Top Split Cards
          Row(
            children: [
              // Now Serving (Light Blue)
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    color: AppColors.lightBlueCard,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        "Now Serving",
                        style: TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        "#${queueState.nowServingNumber}",
                        style: const TextStyle(
                          color: AppColors.cardNavy,
                          fontSize: 30,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),

              // Your Token (Dark Navy)
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    color: AppColors.cardNavy,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        "Your Token",
                        style: TextStyle(
                          color: Color(0xFF94A3B8),
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        queueState.userToken,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 30,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Divider
          Container(height: 1, color: const Color(0xFFF1F5F9)),
          const SizedBox(height: 14),

          // Metrics Row (3 Columns)
          Row(
            children: [
              // Column 1: Ahead
              Expanded(
                child: Column(
                  children: [
                    Text(
                      "${queueState.peopleAhead}",
                      style: const TextStyle(
                        color: AppColors.textDark,
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      "Ahead",
                      style: TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              Container(width: 1, height: 32, color: const Color(0xFFE2E8F0)),

              // Column 2: Est. Wait
              Expanded(
                child: Column(
                  children: [
                    Text(
                      "${queueState.estimatedWaitMinutes} min",
                      style: const TextStyle(
                        color: AppColors.textDark,
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      "Est. Wait",
                      style: TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              Container(width: 1, height: 32, color: const Color(0xFFE2E8F0)),

              // Column 3: By Time
              Expanded(
                child: Column(
                  children: [
                    Text(
                      queueState.estimatedTimeBy,
                      style: const TextStyle(
                        color: AppColors.textDark,
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      "By",
                      style: TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // --- 3. SMART PREDICTION CARD ---
  Widget _buildSmartPredictionCard(LiveQueueState queueState) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.predictionCardBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFD0E8F5), width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Row
          Row(
            children: [
              const Icon(LucideIcons.brain, color: AppColors.primaryTeal, size: 20),
              const SizedBox(width: 8),
              const Text(
                "Smart Prediction",
                style: TextStyle(
                  color: AppColors.cardNavy,
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.highConfidenceBg,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  queueState.confidenceLevel,
                  style: const TextStyle(
                    color: AppColors.highConfidenceText,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),

          // Two Stats Columns
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Estimated Wait",
                      style: TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      "${queueState.estimatedWaitMinutes} minutes",
                      style: const TextStyle(
                        color: AppColors.textDark,
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Expected Service",
                      style: TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      queueState.estimatedTimeBy,
                      style: const TextStyle(
                        color: AppColors.textDark,
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Explanation Text
          Text(
            queueState.predictionExplanation,
            style: const TextStyle(
              color: Color(0xFF475569),
              fontSize: 12,
              height: 1.35,
            ),
          ),
        ],
      ),
    );
  }

  // --- 4. QUEUE PROGRESSION CARD ---
  Widget _buildQueueProgressionCard(LiveQueueState queueState) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderGray, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "QUEUE PROGRESSION",
            style: TextStyle(
              color: AppColors.textMuted,
              fontSize: 12,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 14),

          // 5-Column Grid Layout
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: queueState.progressionTokens.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 5,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
              childAspectRatio: 1.45,
            ),
            itemBuilder: (context, index) {
              final item = queueState.progressionTokens[index];
              return _buildGridTokenItem(item);
            },
          ),
          const SizedBox(height: 12),

          // Bottom Timestamp
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              "Updated ${queueState.lastUpdatedTime}",
              style: const TextStyle(
                color: AppColors.textLightGray,
                fontSize: 12,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGridTokenItem(ProgressionToken item) {
    Color bg;
    Color textColor;
    Border? border;

    switch (item.status) {
      case TokenStatus.served:
        bg = AppColors.servedGreenBg;
        textColor = AppColors.servedGreenText;
        border = null;
        break;
      case TokenStatus.serving:
        bg = AppColors.cardNavy;
        textColor = Colors.white;
        border = null;
        break;
      case TokenStatus.user:
        bg = AppColors.primaryTeal;
        textColor = Colors.white;
        border = null;
        break;
      case TokenStatus.waiting:
      default:
        bg = Colors.white;
        textColor = const Color(0xFF475569);
        border = Border.all(color: AppColors.borderGray, width: 1);
        break;
    }

    return Container(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
        border: border,
      ),
      alignment: Alignment.center,
      child: Text(
        item.label,
        style: TextStyle(
          color: textColor,
          fontSize: item.status == TokenStatus.user ? 12 : 13,
          fontWeight: item.status == TokenStatus.user || item.status == TokenStatus.serving
              ? FontWeight.w800
              : FontWeight.w600,
        ),
      ),
    );
  }

  // --- 5. NOTIFICATION BANNER ---
  Widget _buildNotificationBanner(LiveQueueState queueState) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.warningBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.warningBorder, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 2),
            child: Icon(LucideIcons.bell, color: AppColors.warningIcon, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  "Notifications Enabled",
                  style: TextStyle(
                    color: AppColors.warningTextDark,
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  "You'll receive an alert when you're 5 positions away and when your arrival window starts.",
                  style: TextStyle(
                    color: AppColors.warningTextMuted,
                    fontSize: 12,
                    height: 1.35,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // --- 6. ARRIVAL WINDOW CARD ---
  Widget _buildArrivalWindowCard(LiveQueueState queueState) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderGray, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Arrival Window Left Side
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Arrival Window",
                style: TextStyle(
                  color: AppColors.textMuted,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                queueState.arrivalWindow,
                style: const TextStyle(
                  color: AppColors.textDark,
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),

          // Status Badge Right Side
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              const Text(
                "Status",
                style: TextStyle(
                  color: AppColors.textMuted,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.statusWaitingBg,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  queueState.statusLabel,
                  style: const TextStyle(
                    color: AppColors.statusWaitingText,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // --- 7. SIMULATE ACTION BUTTON ---
  Widget _buildSimulateButton(BuildContext context, LiveQueueNotifier notifier) {
    return SizedBox(
      height: 52,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primaryTeal,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
        onPressed: () {
          notifier.simulateArrivalWindow();
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text("Simulated token queue progression!"),
              duration: Duration(seconds: 2),
            ),
          );
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Text(
              "Simulate Arrival Window",
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(width: 8),
            Icon(LucideIcons.arrowRight, color: Colors.white, size: 18),
          ],
        ),
      ),
    );
  }

  // --- 8. BOTTOM NAVIGATION BAR ---
  Widget _buildBottomNavBar() {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: AppColors.borderGray, width: 1)),
      ),
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: SafeArea(
        top: false,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildNavItem(LucideIcons.home, "Home", false),
            _buildNavItem(LucideIcons.clock, "My Queue", true),
            _buildNavItem(LucideIcons.history, "History", false),
            _buildNavItem(LucideIcons.user, "Profile", false),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String label, bool isActive) {
    final activeColor = AppColors.cardNavy;
    final inactiveColor = AppColors.textLightGray;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          icon,
          color: isActive ? activeColor : inactiveColor,
          size: 22,
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(
            color: isActive ? activeColor : inactiveColor,
            fontSize: 11,
            fontWeight: isActive ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
        const SizedBox(height: 2),
        if (isActive)
          Container(
            width: 4,
            height: 4,
            decoration: BoxDecoration(
              color: activeColor,
              shape: BoxShape.circle,
            ),
          )
        else
          const SizedBox(height: 4),
      ],
    );
  }
}
