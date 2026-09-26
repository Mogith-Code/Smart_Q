import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../models/smartq_data.dart';
import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class QueueScreen extends StatelessWidget {
  const QueueScreen({super.key, required this.serviceId});

  final String serviceId;

  @override
  Widget build(BuildContext context) {
    final service = serviceFor(serviceId);
    final institution = institutionFor(institutionIdForService(service.id));
    final expectedToken = service.waiting + 33;
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
                  Text(
                    service.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 19,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    institution.name,
                    style: const TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(16, 14, 16, 20),
                children: [
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 9,
                        vertical: 15,
                      ),
                      child: Row(
                        children: [
                          _QueueStat(
                            title: 'Now Serving',
                            value: '#${expectedToken - 1}',
                            caption: 'Counter 02',
                          ),
                          _QueueStat(
                            title: 'Your Expected Token',
                            value: '#$expectedToken',
                            caption: 'Based on live queue',
                          ),
                          _QueueStat(
                            title: 'People Ahead',
                            value: '${service.waiting}',
                            caption: 'In this service',
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Card(
                    color: AppColors.accent,
                    child: Padding(
                      padding: const EdgeInsets.all(13),
                      child: Row(
                        children: [
                          const Icon(Icons.auto_awesome_rounded,
                              color: AppColors.teal, size: 20),
                          const SizedBox(width: 9),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Smart Prediction',
                                  style: TextStyle(
                                    color: AppColors.text,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                                const SizedBox(height: 3),
                                Text(
                                  'Estimated wait: ${service.estimate} minutes',
                                  style: const TextStyle(
                                    color: AppColors.muted,
                                    fontSize: 10,
                                  ),
                                ),
                                const Text(
                                  'High confidence',
                                  style: TextStyle(
                                    color: AppColors.green,
                                    fontSize: 10,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  _QueueProgress(
                    waiting: service.waiting,
                    expected: expectedToken,
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      _CapacityCard(
                        label: 'Capacity',
                        value: '${service.waiting}/${service.capacity}',
                      ),
                      const SizedBox(width: 10),
                      _CapacityCard(
                        label: 'Remaining',
                        value: '${service.remaining}',
                        valueColor: AppColors.green,
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  SmartQButton(
                    label: 'Join Queue',
                    icon: Icons.people_alt_outlined,
                    onPressed: () => context.push('/join/${service.id}'),
                  ),
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

class _QueueStat extends StatelessWidget {
  const _QueueStat({
    required this.title,
    required this.value,
    required this.caption,
  });

  final String title;
  final String value;
  final String caption;

  @override
  Widget build(BuildContext context) => Expanded(
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 12),
          decoration: BoxDecoration(
            color: AppColors.accent,
            borderRadius: BorderRadius.circular(11),
          ),
          child: Column(
            children: [
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 9, color: AppColors.muted),
              ),
              const SizedBox(height: 7),
              Text(
                value,
                style: const TextStyle(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w700,
                  fontSize: 19,
                ),
              ),
              const SizedBox(height: 3),
              Text(
                caption,
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 8, color: AppColors.muted),
              ),
            ],
          ),
        ),
      );
}

class _QueueProgress extends StatelessWidget {
  const _QueueProgress({required this.waiting, required this.expected});

  final int waiting;
  final int expected;

  @override
  Widget build(BuildContext context) {
    final start = (expected - waiting + 1).clamp(1, expected).toInt();
    final end = (expected + 6).clamp(1, expected + 6).toInt();
    final tokens = List.generate(end - start + 1, (index) => start + index);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(13),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'QUEUE PROGRESS',
              style: TextStyle(
                color: AppColors.muted,
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: .5,
              ),
            ),
            const SizedBox(height: 11),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: [
                for (final token in tokens)
                  Container(
                    width: 35,
                    height: 30,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: token == expected
                          ? AppColors.primary
                          : token < expected
                              ? AppColors.green
                              : AppColors.accent,
                      borderRadius: BorderRadius.circular(7),
                    ),
                    child: Text(
                      '$token',
                      style: TextStyle(
                        color: token <= expected ? Colors.white : AppColors.text,
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            const Align(
              alignment: Alignment.centerRight,
              child: Text(
                'Last updated just now',
                style: TextStyle(color: AppColors.muted, fontSize: 9),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CapacityCard extends StatelessWidget {
  const _CapacityCard({
    required this.label,
    required this.value,
    this.valueColor = AppColors.text,
  });

  final String label;
  final String value;
  final Color valueColor;

  @override
  Widget build(BuildContext context) => Expanded(
        child: Card(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 12),
            child: Column(
              children: [
                Text(label,
                    style: const TextStyle(fontSize: 10, color: AppColors.muted)),
                const SizedBox(height: 3),
                Text(
                  value,
                  style: TextStyle(
                    color: valueColor,
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
}
