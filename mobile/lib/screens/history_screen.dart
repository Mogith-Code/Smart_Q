import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  int _selectedTab = 0; // 0: All, 1: Completed, 2: Cancelled

  final List<Map<String, dynamic>> _allHistory = [
    {
      'token': 'A-032',
      'institution': 'City General Hospital',
      'service': 'General OPD Consultation',
      'date': '26 Jan 2026 at 10:30 AM',
      'status': 'Completed',
      'waitTime': '14 mins',
      'serviceTime': '8 mins',
      'icon': Icons.local_hospital_rounded,
      'color': Colors.emerald,
    },
    {
      'token': 'B-105',
      'institution': 'Metro Bank Main Branch',
      'service': 'Teller Cash Service',
      'date': '22 Jan 2026 at 02:15 PM',
      'status': 'Completed',
      'waitTime': '6 mins',
      'serviceTime': '4 mins',
      'icon': Icons.account_balance_rounded,
      'color': Colors.emerald,
    },
    {
      'token': 'C-014',
      'institution': 'Central Health Clinic',
      'service': 'Pediatrics Consultation',
      'date': '15 Jan 2026 at 11:00 AM',
      'status': 'Cancelled',
      'waitTime': '—',
      'serviceTime': '—',
      'icon': Icons.medical_services_rounded,
      'color': Colors.rose,
    },
    {
      'token': 'A-019',
      'institution': 'City General Hospital',
      'service': 'Blood Test & Diagnostics',
      'date': '10 Jan 2026 at 09:15 AM',
      'status': 'Completed',
      'waitTime': '18 mins',
      'serviceTime': '12 mins',
      'icon': Icons.biotech_rounded,
      'color': Colors.emerald,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final filtered = _allHistory.where((item) {
      if (_selectedTab == 1) return item['status'] == 'Completed';
      if (_selectedTab == 2) return item['status'] == 'Cancelled';
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: SafeArea(
        top: false,
        child: Column(
          children: [
            // Header Banner
            Container(
              width: double.infinity,
              color: AppColors.primary,
              padding: EdgeInsets.fromLTRB(
                20,
                MediaQuery.of(context).padding.top + 16,
                20,
                20,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      const Text(
                        'Queue History',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '${_allHistory.length} Total Tokens',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Your past virtual queue activity and status logs',
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  const SizedBox(height: 16),

                  // Filter Chips
                  Row(
                    children: [
                      _FilterTab(
                        label: 'All (${_allHistory.length})',
                        selected: _selectedTab == 0,
                        onTap: () => setState(() => _selectedTab = 0),
                      ),
                      const SizedBox(width: 8),
                      _FilterTab(
                        label: 'Completed',
                        selected: _selectedTab == 1,
                        onTap: () => setState(() => _selectedTab = 1),
                      ),
                      const SizedBox(width: 8),
                      _FilterTab(
                        label: 'Cancelled',
                        selected: _selectedTab == 2,
                        onTap: () => setState(() => _selectedTab = 2),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Content List
            Expanded(
              child: filtered.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.history_toggle_off_rounded,
                            size: 48,
                            color: Colors.slate.shade300,
                          ),
                          const SizedBox(height: 12),
                          const Text(
                            'No History Records',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF475569),
                            ),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            'No queue tokens found under this filter.',
                            style: TextStyle(
                              fontSize: 12,
                              color: Color(0xFF94A3B8),
                            ),
                          ),
                        ],
                      ),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.all(20),
                      itemCount: filtered.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 12),
                      itemBuilder: (context, index) {
                        final item = filtered[index];
                        final isCompleted = item['status'] == 'Completed';

                        return Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0xFFE2E8F0)),
                          ),
                          child: Column(
                            children: [
                              Row(
                                children: [
                                  Container(
                                    width: 44,
                                    height: 44,
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFE8F4FA),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Icon(
                                      item['icon'] as IconData,
                                      color: AppColors.teal,
                                      size: 22,
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          item['institution'] as String,
                                          style: const TextStyle(
                                            color: Color(0xFF0F172A),
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(height: 2),
                                        Text(
                                          item['service'] as String,
                                          style: const TextStyle(
                                            color: Color(0xFF64748B),
                                            fontSize: 12,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 4,
                                    ),
                                    decoration: BoxDecoration(
                                      color: isCompleted
                                          ? const Color(0xFFECFDF5)
                                          : const Color(0xFFFFF1F2),
                                      borderRadius: BorderRadius.circular(20),
                                      border: Border.all(
                                        color: isCompleted
                                            ? const Color(0xFFA7F3D0)
                                            : const Color(0xFFFECDD3),
                                      ),
                                    ),
                                    child: Text(
                                      item['token'] as String,
                                      style: TextStyle(
                                        color: isCompleted
                                            ? const Color(0xFF059669)
                                            : const Color(0xFFE11D48),
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const Divider(
                                height: 20,
                                color: Color(0xFFF1F5F9),
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.between,
                                children: [
                                  Text(
                                    item['date'] as String,
                                    style: const TextStyle(
                                      color: Color(0xFF94A3B8),
                                      fontSize: 11,
                                    ),
                                  ),
                                  Row(
                                    children: [
                                      Text(
                                        item['status'] as String,
                                        style: TextStyle(
                                          color: isCompleted
                                              ? const Color(0xFF059669)
                                              : const Color(0xFFE11D48),
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      if (isCompleted) ...[
                                        const SizedBox(width: 8),
                                        Text(
                                          '• Wait: ${item['waitTime']}',
                                          style: const TextStyle(
                                            color: Color(0xFF64748B),
                                            fontSize: 11,
                                          ),
                                        ),
                                      ],
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const SmartQBottomNav(selected: 2),
    );
  }
}

class _FilterTab extends StatelessWidget {
  const _FilterTab({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: selected ? AppColors.teal : Colors.white.withOpacity(0.12),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: selected ? FontWeight.bold : FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
