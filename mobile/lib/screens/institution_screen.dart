import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../models/smartq_data.dart';
import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class InstitutionScreen extends StatelessWidget {
  const InstitutionScreen({super.key, required this.institutionId});

  final String institutionId;

  @override
  Widget build(BuildContext context) {
    final institution = institutionFor(institutionId);
    final services = servicesByInstitution[institution.id] ?? const <QueueService>[];
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            Container(
              color: AppColors.primary,
              padding: const EdgeInsets.fromLTRB(16, 6, 20, 18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  InkWell(
                    onTap: () => context.pop(),
                    child: const Padding(
                      padding: EdgeInsets.symmetric(vertical: 8),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.arrow_back_rounded,
                              size: 18, color: Colors.white70),
                          SizedBox(width: 6),
                          Text('Back', style: TextStyle(color: Colors.white70)),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      InstitutionIcon(institution: institution, size: 44),
                      const SizedBox(width: 11),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              institution.name,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 17,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            Text(
                              institution.category,
                              style: const TextStyle(
                                color: Colors.white70,
                                fontSize: 12,
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
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(16, 15, 16, 22),
                children: [
                  _InstitutionInfo(institution: institution),
                  const SizedBox(height: 14),
                  const SectionTitle('Available Services'),
                  const SizedBox(height: 5),
                  for (final service in services) ...[
                    _ServiceCard(
                      service: service,
                      onTap: () => context.push('/service/${service.id}'),
                    ),
                    const SizedBox(height: 9),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const SmartQBottomNav(),
    );
  }
}

class _InstitutionInfo extends StatelessWidget {
  const _InstitutionInfo({required this.institution});

  final Institution institution;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(13),
        child: Column(
          children: [
            Row(
              children: [
                const Icon(Icons.location_on_outlined,
                    size: 16, color: AppColors.teal),
                const SizedBox(width: 5),
                Expanded(
                  child: Text(
                    institution.address,
                    style: const TextStyle(fontSize: 11, color: AppColors.text),
                  ),
                ),
                const Icon(Icons.circle, size: 8, color: AppColors.green),
                const SizedBox(width: 4),
                const Text('Open',
                    style: TextStyle(fontSize: 10, color: AppColors.green)),
              ],
            ),
            const SizedBox(height: 12),
            const Row(
              children: [
                _InfoMetric(icon: Icons.access_time, value: '8:00 AM – 5:00 PM'),
                SizedBox(width: 12),
                _InfoMetric(icon: Icons.star_outline, value: '4.6 Rating'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _InfoMetric extends StatelessWidget {
  const _InfoMetric({required this.icon, required this.value});

  final IconData icon;
  final String value;

  @override
  Widget build(BuildContext context) => Expanded(
        child: Row(
          children: [
            Icon(icon, size: 14, color: AppColors.teal),
            const SizedBox(width: 5),
            Flexible(
              child: Text(
                value,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 10, color: AppColors.muted),
              ),
            ),
          ],
        ),
      );
}

class _ServiceCard extends StatelessWidget {
  const _ServiceCard({required this.service, required this.onTap});

  final QueueService service;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final statusColor =
        service.progress > .85 ? AppColors.red : AppColors.amber;
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(15),
        child: Padding(
          padding: const EdgeInsets.all(13),
          child: Column(
            children: [
              Row(
                children: [
                  Icon(
                    IconData(service.icon, fontFamily: 'MaterialIcons'),
                    size: 17,
                    color: AppColors.teal,
                  ),
                  const SizedBox(width: 7),
                  Expanded(
                    child: Text(
                      service.name,
                      style: const TextStyle(
                        color: AppColors.text,
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  Text(
                    '${service.remaining} left',
                    style: const TextStyle(
                      color: AppColors.green,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 5),
              Row(
                children: [
                  const Icon(Icons.people_outline, size: 13, color: AppColors.muted),
                  const SizedBox(width: 4),
                  Text(
                    '${service.waiting} waiting',
                    style: const TextStyle(fontSize: 10, color: AppColors.muted),
                  ),
                  const SizedBox(width: 11),
                  const Icon(Icons.schedule_rounded,
                      size: 13, color: AppColors.muted),
                  const SizedBox(width: 4),
                  Text(
                    '~${service.estimate} min',
                    style: const TextStyle(fontSize: 10, color: AppColors.muted),
                  ),
                  const Spacer(),
                  const Text(
                    'View',
                    style: TextStyle(
                      color: AppColors.primary,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Icon(Icons.chevron_right, size: 17, color: AppColors.primary),
                ],
              ),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: LinearProgressIndicator(
                  value: service.progress,
                  minHeight: 5,
                  color: statusColor,
                  backgroundColor: AppColors.accent,
                ),
              ),
              const SizedBox(height: 5),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  '${(service.progress * 100).round()}% capacity (${service.waiting}/${service.capacity})',
                  style: const TextStyle(fontSize: 9, color: AppColors.muted),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
