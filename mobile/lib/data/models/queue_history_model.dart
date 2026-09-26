enum HistoryStatus { waiting, served, cancelled }

class QueueHistoryItem {
  final String id;
  final String institutionName;
  final String departmentName;
  final String tokenNumber;
  final String date;
  final String time;
  final HistoryStatus status;

  QueueHistoryItem({
    required this.id,
    required this.institutionName,
    required this.departmentName,
    required this.tokenNumber,
    required this.date,
    required this.time,
    required this.status,
  });

  static List<QueueHistoryItem> mockList() {
    return [
      QueueHistoryItem(
        id: "1",
        institutionName: "City General Hospital",
        departmentName: "OPD",
        tokenNumber: "Q-047",
        date: "25 Sep 2026",
        time: "3:05 PM",
        status: HistoryStatus.waiting,
      ),
      QueueHistoryItem(
        id: "2",
        institutionName: "City General Hospital",
        departmentName: "Laboratory",
        tokenNumber: "Q-021",
        date: "18 Sep 2026",
        time: "10:30 AM",
        status: HistoryStatus.served,
      ),
      QueueHistoryItem(
        id: "3",
        institutionName: "ABC Bank",
        departmentName: "General Banking",
        tokenNumber: "Q-008",
        date: "12 Sep 2026",
        time: "11:15 AM",
        status: HistoryStatus.served,
      ),
      QueueHistoryItem(
        id: "4",
        institutionName: "Divisional Secretariat",
        departmentName: "Birth Certificates",
        tokenNumber: "Q-034",
        date: "05 Sep 2026",
        time: "9:00 AM",
        status: HistoryStatus.cancelled,
      ),
      QueueHistoryItem(
        id: "5",
        institutionName: "City General Hospital",
        departmentName: "Cardiology",
        tokenNumber: "Q-015",
        date: "28 Aug 2026",
        time: "2:00 PM",
        status: HistoryStatus.served,
      ),
    ];
  }
}
