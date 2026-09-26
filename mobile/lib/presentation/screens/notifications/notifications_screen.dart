import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/colors.dart';
import '../../../data/models/notification_model.dart';
import '../../providers/notification_provider.dart';

class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notifications = ref.watch(notificationsProvider);
    final unreadCount = ref.watch(unreadCountProvider);
    final notifier = ref.read(notificationsProvider.notifier);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          // 1. Header (Dark Navy)
          _buildHeader(context, unreadCount, notifier),

          // 2. Scrollable List of Notification Cards
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16.0),
              physics: const BouncingScrollPhysics(),
              itemCount: notifications.length,
              separatorBuilder: (context, index) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final item = notifications[index];
                return _buildNotificationCard(context, item, notifier);
              },
            ),
          ),
        ],
      ),
    );
  }

  // --- 1. HEADER WIDGET ---
  Widget _buildHeader(BuildContext context, int unreadCount, NotificationsNotifier notifier) {
    return Container(
      color: AppColors.headerBackground,
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Back Button
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

              // Title Row with "Mark all read" link
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Notifications",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "$unreadCount unread",
                        style: const TextStyle(
                          color: Color(0xFF94A3B8),
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),

                  // Mark all read button
                  GestureDetector(
                    onTap: () => notifier.markAllAsRead(),
                    child: const Padding(
                      padding: EdgeInsets.only(bottom: 2),
                      child: Text(
                        "Mark all read",
                        style: TextStyle(
                          color: Color(0xFF38BDF8), // Bright sky blue / teal
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
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

  // --- 2. NOTIFICATION CARD WIDGET ---
  Widget _buildNotificationCard(
    BuildContext context,
    NotificationItem item,
    NotificationsNotifier notifier,
  ) {
    // Unread background vs Read background
    final cardBg = item.isRead ? AppColors.surfaceWhite : const Color(0xFFEBF4FA);

    return GestureDetector(
      onTap: () => notifier.markAsRead(item.id),
      child: Container(
        decoration: BoxDecoration(
          color: cardBg,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: item.isRead ? AppColors.borderGray : const Color(0xFFD0E8F5),
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 8,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Left Type Icon Box
            _buildTypeIcon(item.type),
            const SizedBox(width: 14),

            // Content Area
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title + Unread Indicator Dot
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Text(
                          item.title,
                          style: const TextStyle(
                            color: AppColors.textDark,
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            letterSpacing: -0.2,
                          ),
                        ),
                      ),
                      if (!item.isRead)
                        Container(
                          width: 8,
                          height: 8,
                          margin: const EdgeInsets.only(left: 8, top: 4),
                          decoration: const BoxDecoration(
                            color: Color(0xFF0EA5E9), // Cyan / Blue unread dot
                            shape: BoxShape.circle,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),

                  // Message Body
                  Text(
                    item.message,
                    style: const TextStyle(
                      color: Color(0xFF64748B),
                      fontSize: 13,
                      height: 1.35,
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Timestamp & Token Number Row
                  Row(
                    children: [
                      Text(
                        item.time,
                        style: const TextStyle(
                          color: AppColors.textLightGray,
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        item.tokenNumber,
                        style: const TextStyle(
                          color: AppColors.cardNavy,
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTypeIcon(NotificationType type) {
    Color bg;
    IconData icon;

    switch (type) {
      case NotificationType.approachingTurn:
        bg = AppColors.primaryTeal;
        icon = LucideIcons.zap;
        break;
      case NotificationType.joinedQueue:
        bg = const Color(0xFF10B981); // Emerald Green
        icon = LucideIcons.check;
        break;
      case NotificationType.positionUpdated:
        bg = AppColors.cardNavy;
        icon = LucideIcons.clock;
        break;
      case NotificationType.serviceCompleted:
        bg = const Color(0xFF10B981); // Emerald Green
        icon = LucideIcons.check;
        break;
      case NotificationType.bookingCancelled:
        bg = const Color(0xFFEF4444); // Red/Coral
        icon = LucideIcons.xCircle;
        break;
    }

    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
      ),
      alignment: Alignment.center,
      child: Icon(
        icon,
        color: Colors.white,
        size: 20,
      ),
    );
  }
}
