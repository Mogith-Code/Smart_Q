import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/notification_model.dart';

class NotificationsNotifier extends StateNotifier<List<NotificationItem>> {
  NotificationsNotifier() : super(NotificationItem.mockList());

  void markAllAsRead() {
    state = state.map((item) {
      return NotificationItem(
        id: item.id,
        title: item.title,
        message: item.message,
        time: item.time,
        tokenNumber: item.tokenNumber,
        isRead: true,
        type: item.type,
      );
    }).toList();
  }

  void markAsRead(String id) {
    state = state.map((item) {
      if (item.id == id) {
        return NotificationItem(
          id: item.id,
          title: item.title,
          message: item.message,
          time: item.time,
          tokenNumber: item.tokenNumber,
          isRead: true,
          type: item.type,
        );
      }
      return item;
    }).toList();
  }
}

final notificationsProvider =
    StateNotifierProvider<NotificationsNotifier, List<NotificationItem>>((ref) {
  return NotificationsNotifier();
});

final unreadCountProvider = Provider<int>((ref) {
  final items = ref.watch(notificationsProvider);
  return items.where((item) => !item.isRead).length;
});
