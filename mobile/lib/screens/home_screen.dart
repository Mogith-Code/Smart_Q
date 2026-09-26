import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../models/smartq_data.dart';
import '../state/queue_state.dart';
import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  InstitutionKind? _category;
  String _query = '';

  List<Institution> get _visibleInstitutions => institutions.where((item) {
        final categoryMatches = _category == null || item.kind == _category;
        final queryMatches = item.name.toLowerCase().contains(_query.toLowerCase()) ||
            item.category.toLowerCase().contains(_query.toLowerCase());
        return categoryMatches && queryMatches;
      }).toList();

  @override
  Widget build(BuildContext context) {
    final activeToken = ref.watch(queueTokenProvider);
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Container(
                color: AppColors.primary,
                padding: const EdgeInsets.fromLTRB(18, 15, 18, 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const SmartQBrand(light: true, compact: true),
                        const Spacer(),
                        _HeaderAction(
                          icon: Icons.notifications_none_rounded,
                          onTap: () => ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('You are all caught up.'),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        _HeaderAction(
                          icon: Icons.person_outline_rounded,
                          onTap: () => ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Profile settings are coming soon.'),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    const Text(
                      'Good morning,',
                      style: TextStyle(color: Colors.white70, fontSize: 12),
                    ),
                    const Text(
                      'Kasun Perera',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 19,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 3),
                    const Text(
                      'Find a service and skip the physical queue.',
                      style: TextStyle(color: Colors.white70, fontSize: 11),
                    ),
                    const SizedBox(height: 15),
                    TextField(
                      onChanged: (value) => setState(() => _query = value),
                      decoration: InputDecoration(
                        hintText: 'Search hospitals, banks, offices...',
                        prefixIcon: const Icon(Icons.search_rounded),
                        isDense: true,
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(vertical: 11),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(16, 15, 16, 8),
              sliver: SliverToBoxAdapter(
                child: Row(
                  children: [
                    _CategoryTile(
                      label: 'Healthcare',
                      icon: Icons.local_hospital_outlined,
                      color: AppColors.primary,
                      selected: _category == InstitutionKind.healthcare,
                      onTap: () => _setCategory(InstitutionKind.healthcare),
                    ),
                    const SizedBox(width: 9),
                    _CategoryTile(
                      label: 'Banking',
                      icon: Icons.account_balance_outlined,
                      color: AppColors.teal,
                      selected: _category == InstitutionKind.banking,
                      onTap: () => _setCategory(InstitutionKind.banking),
                    ),
                    const SizedBox(width: 9),
                    _CategoryTile(
                      label: 'Government',
                      icon: Icons.account_balance_rounded,
                      color: AppColors.amber,
                      selected: _category == InstitutionKind.government,
                      onTap: () => _setCategory(InstitutionKind.government),
                    ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(16, 6, 16, 0),
              sliver: SliverToBoxAdapter(
                child: activeToken == null
                    ? _ExploreQueueCard(
                        onTap: () => context.push('/institution/city-hospital'),
                      )
                    : _ActiveQueueCard(
                        token: activeToken,
                        onTap: () => context.push('/token'),
                      ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              sliver: SliverToBoxAdapter(
                child: SectionTitle(
                  'Nearby Institutions',
                  action: _category == null ? 'See All' : 'Clear',
                  onAction: () => setState(() => _category = null),
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 18),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) => Padding(
                    padding: const EdgeInsets.only(bottom: 9),
                    child: InstitutionCard(
                      institution: _visibleInstitutions[index],
                    ),
                  ),
                  childCount: _visibleInstitutions.length,
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const SmartQBottomNav(),
    );
  }

  void _setCategory(InstitutionKind kind) {
    setState(() => _category = _category == kind ? null : kind);
  }
}

class _HeaderAction extends StatelessWidget {
  const _HeaderAction({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white.withAlpha(24),
      borderRadius: BorderRadius.circular(10),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: SizedBox(
          width: 36,
          height: 36,
          child: Icon(icon, size: 19, color: Colors.white),
        ),
      ),
    );
  }
}

class _CategoryTile extends StatelessWidget {
  const _CategoryTile({
    required this.label,
    required this.icon,
    required this.color,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final Color color;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Material(
        color: selected ? AppColors.accent : Colors.white,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Container(
            height: 62,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: selected ? AppColors.teal : AppColors.border,
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, color: color, size: 21),
                const SizedBox(height: 4),
                Text(
                  label,
                  maxLines: 1,
                  style: const TextStyle(fontSize: 10, color: AppColors.text),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ActiveQueueCard extends StatelessWidget {
  const _ActiveQueueCard({required this.token, required this.onTap});

  final QueueToken token;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFFEDF7FA),
      child: Padding(
        padding: const EdgeInsets.all(13),
        child: Column(
          children: [
            Row(
              children: [
                const Icon(Icons.circle, size: 8, color: AppColors.green),
                const SizedBox(width: 5),
                const Expanded(
                  child: Text(
                    'Active Queue',
                    style: TextStyle(
                      color: AppColors.text,
                      fontWeight: FontWeight.w700,
                      fontSize: 12,
                    ),
                  ),
                ),
                const Text(
                  'Your Token',
                  style: TextStyle(color: AppColors.muted, fontSize: 10),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        token.institution.name,
                        style: const TextStyle(
                          color: AppColors.text,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        '${token.service.name}  •  ${token.peopleAhead} people ahead',
                        style: const TextStyle(
                          fontSize: 10,
                          color: AppColors.muted,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 5),
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    token.number,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                _QueueMetric(label: 'Ahead', value: '${token.peopleAhead}'),
                _QueueMetric(
                  label: 'Est. wait',
                  value: '${token.waitMinutes} min',
                ),
                const _QueueMetric(label: 'Status', value: 'Active'),
              ],
            ),
            const SizedBox(height: 9),
            SizedBox(
              height: 34,
              width: double.infinity,
              child: FilledButton.tonal(
                onPressed: onTap,
                style: FilledButton.styleFrom(
                  backgroundColor: AppColors.teal,
                  foregroundColor: Colors.white,
                  visualDensity: VisualDensity.compact,
                ),
                child: const Text('Track Live Queue', style: TextStyle(fontSize: 11)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ExploreQueueCard extends StatelessWidget {
  const _ExploreQueueCard({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColors.accent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: const Padding(
          padding: EdgeInsets.all(14),
          child: Row(
            children: [
            Icon(
              Icons.confirmation_number_outlined,
              color: AppColors.primary,
              size: 24,
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Your next queue, on your time',
                    style: TextStyle(
                      color: AppColors.text,
                      fontWeight: FontWeight.w700,
                      fontSize: 12,
                    ),
                  ),
                  SizedBox(height: 3),
                  Text(
                    'Choose a nearby institution to get started.',
                    style: TextStyle(color: AppColors.muted, fontSize: 10),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios_rounded,
              size: 14,
              color: AppColors.primary,
            ),
            ],
          ),
        ),
      ),
    );
  }
}

class _QueueMetric extends StatelessWidget {
  const _QueueMetric({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 9, color: AppColors.muted)),
          Text(value, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }
}
