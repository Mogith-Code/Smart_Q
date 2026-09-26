import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/queue_history_model.dart';

enum HistoryFilter { all, active, completed, cancelled }

class HistoryNotifier extends StateNotifier<HistoryFilter> {
  HistoryNotifier() : super(HistoryFilter.all);

  void setFilter(HistoryFilter filter) {
    state = filter;
  }
}

final historyFilterProvider =
    StateNotifierProvider<HistoryNotifier, HistoryFilter>((ref) {
  return HistoryNotifier();
});

final filteredHistoryProvider = Provider<List<QueueHistoryItem>>((ref) {
  final filter = ref.watch(historyFilterProvider);
  final allItems = QueueHistoryItem.mockList();

  switch (filter) {
    case HistoryFilter.active:
      return allItems.where((item) => item.status == HistoryStatus.waiting).toList();
    case HistoryFilter.completed:
      return allItems.where((item) => item.status == HistoryStatus.served).toList();
    case HistoryFilter.cancelled:
      return allItems.where((item) => item.status == HistoryStatus.cancelled).toList();
    case HistoryFilter.all:
    default:
      return allItems;
  }
});
