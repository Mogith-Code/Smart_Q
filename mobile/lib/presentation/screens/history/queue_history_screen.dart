import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/colors.dart';
import '../../../data/models/queue_history_model.dart';
import '../../providers/history_provider.dart';

class QueueHistoryScreen extends ConsumerWidget {
  const QueueHistoryScreen({Key? key}) : super(Key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activeFilter = ref.watch(historyFilterProvider);
    final historyItems = ref.watch(filteredHistoryProvider);
    final historyNotifier = ref.read(historyFilterProvider.notifier);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          // 1. Header (Dark Navy)
          _buildHeader(context),

          // 2. Filter Pills Bar (All, Active, Completed, Cancelled)
          _buildFilterBar(activeFilter, historyNotifier),

          // 3. Dynamic List of Cards for Selected Filter
          Expanded(
            child: historyItems.isEmpty
                ? _buildEmptyState(activeFilter)
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
                    physics: const BouncingScrollPhysics(),
                    itemCount: historyItems.length,
                    separatorBuilder: (context, index) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final item = historyItems[index];
                      return _buildHistoryCard(context, item);
                    },
                  ),
          ),

          // 4. Bottom Navigation Bar
          _buildBottomNavBar(context),
        ],
      ),
    );
  }

  // --- 1. HEADER WIDGET ---
  Widget _buildHeader(BuildContext context) {
    return Container(
      color: AppColors.headerBackground,
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
              const Text(
                "Queue History",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  letterSpacing: -0.5,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // --- 2. FILTER PILLS BAR ---
  Widget _buildFilterBar(HistoryFilter activeFilter, HistoryNotifier notifier) {
    return Container(
      color: AppColors.background,
      padding: const EdgeInsets.symmetric(vertical: 14.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Row(
          children: [
            _buildFilterPill(
              label: "All",
              isSelected: activeFilter == HistoryFilter.all,
              onTap: () => notifier.setFilter(HistoryFilter.all),
            ),
            const SizedBox(width: 10),
            _buildFilterPill(
              label: "Active",
              isSelected: activeFilter == HistoryFilter.active,
              onTap: () => notifier.setFilter(HistoryFilter.active),
            ),
            const SizedBox(width: 10),
            _buildFilterPill(
              label: "Completed",
              isSelected: activeFilter == HistoryFilter.completed,
              onTap: () => notifier.setFilter(HistoryFilter.completed),
            ),
            const SizedBox(width: 10),
            _buildFilterPill(
              label: "Cancelled",
              isSelected: activeFilter == HistoryFilter.cancelled,
              onTap: () => notifier.setFilter(HistoryFilter.cancelled),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterPill({
    required String label,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.cardNavy : Colors.white,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(
            color: isSelected ? AppColors.cardNavy : AppColors.borderGray,
            width: 1,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: AppColors.cardNavy.withOpacity(0.15),
                    blurRadius: 6,
                    offset: const Offset(0, 2),
                  ),
                ]
              : [],
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected ? Colors.white : AppColors.textMuted,
            fontSize: 14,
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
      ),
    );
  }

  // --- 3. HISTORY CARD ITEM ---
  Widget _buildHistoryCard(BuildContext context, QueueHistoryItem item) {
    return GestureDetector(
      onTap: () {
        if (item.status == HistoryStatus.waiting) {
          Navigator.pushNamed(context, '/token-arrival');
        } else {
          Navigator.pushNamed(context, '/live-queue');
        }
      },
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.surfaceWhite,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.borderGray, width: 1),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 8,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header Row: Institution Name & Status Badge
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.institutionName,
                        style: const TextStyle(
                          color: AppColors.textDark,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.departmentName,
                        style: const TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 13,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),
                ),

                // Status Badge Pill
                _buildStatusBadge(item.status),
              ],
            ),
            const SizedBox(height: 16),

            // 3 Columns: Token | Date | Time
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Token",
                        style: TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.tokenNumber,
                        style: const TextStyle(
                          color: AppColors.cardNavy,
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
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
                        "Date",
                        style: TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.date,
                        style: const TextStyle(
                          color: AppColors.cardNavy,
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
                        "Time",
                        style: TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.time,
                        style: const TextStyle(
                          color: AppColors.cardNavy,
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
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
    );
  }

  Widget _buildStatusBadge(HistoryStatus status) {
    Color bg;
    Color textCol;
    String label;

    switch (status) {
      case HistoryStatus.waiting:
        bg = const Color(0xFFFEF3C7); // Soft Yellow/Amber
        textCol = const Color(0xFFD97706);
        label = "Waiting";
        break;
      case HistoryStatus.served:
        bg = const Color(0xFFE6F4EA); // Soft Green
        textCol = const Color(0xFF1E7E34);
        label = "Served";
        break;
      case HistoryStatus.cancelled:
        bg = const Color(0xFFFEE2E2); // Soft Red
        textCol = const Color(0xFFDC2626);
        label = "Cancelled";
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: textCol,
          fontSize: 12,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }

  Widget _buildEmptyState(HistoryFilter filter) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(LucideIcons.history, size: 48, color: AppColors.textLightGray),
          const SizedBox(height: 12),
          Text(
            "No ${filter.name.toUpperCase()} queues found",
            style: const TextStyle(
              color: AppColors.textMuted,
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  // --- 4. BOTTOM NAVIGATION BAR ---
  Widget _buildBottomNavBar(BuildContext context) {
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
            _buildNavItem(context, LucideIcons.home, "Home", false, '/live-queue'),
            _buildNavItem(context, LucideIcons.clock, "My Queue", false, '/token-arrival'),
            _buildNavItem(context, LucideIcons.history, "History", true, '/history'),
            _buildNavItem(context, LucideIcons.user, "Profile", false, '#'),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, IconData icon, String label, bool isActive, String route) {
    final activeColor = AppColors.cardNavy;
    final inactiveColor = AppColors.textLightGray;

    return GestureDetector(
      onTap: () {
        if (!isActive && route != '#') {
          Navigator.pushReplacementNamed(context, route);
        }
      },
      child: Column(
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
      ),
    );
  }
}
