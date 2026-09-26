enum NotificationType { approachingTurn, joinedQueue, positionUpdated, serviceCompleted, bookingCancelled }

class NotificationItem {
  final String id;
  final String title;
  final String message;
  final String time;
  final String tokenNumber;
  final bool isRead;
  final NotificationType type;

  NotificationItem({
    required this.id,
    required this.title,
    required this.message,
    required this.time,
    required this.tokenNumber,
    required this.isRead,
    required this.type,
  });

  static List<NotificationItem> mockList() {
    return [
      NotificationItem(
        id: "1",
        title: "You're Approaching Your Turn",
        message: "5 people ahead of you in OPD queue. Your arrival window starts at 3:00 PM.",
        time: "2:47 PM",
        tokenNumber: "Q-047",
        isRead: false,
        type: NotificationType.approachingTurn,
      ),
      NotificationItem(
        id: "2",
        title: "Queue Joined Successfully",
        message: "You have joined OPD at City General Hospital. Token Q-047 has been issued.",
        time: "2:18 PM",
        tokenNumber: "Q-047",
        isRead: false,
        type: NotificationType.joinedQueue,
      ),
      NotificationItem(
        id: "3",
        title: "Queue Position Updated",
        message: "Now serving Q-030. You are 17 people ahead. Estimated wait: 45 minutes.",
        time: "2:10 PM",
        tokenNumber: "Q-047",
        isRead: true,
        type: NotificationType.positionUpdated,
      ),
      NotificationItem(
        id: "4",
        title: "Service Completed",
        message: "Your ABC Bank – General Banking service has been completed. Thank you!",
        time: "Yesterday",
        tokenNumber: "Q-008",
        isRead: true,
        type: NotificationType.serviceCompleted,
      ),
      NotificationItem(
        id: "5",
        title: "Booking Cancelled",
        message: "Your booking at Divisional Secretariat – Birth Certificates was cancelled.",
        time: "20 Sep",
        tokenNumber: "Q-034",
        isRead: true,
        type: NotificationType.bookingCancelled,
      ),
    ];
  }
}
