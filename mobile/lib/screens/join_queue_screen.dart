import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../models/smartq_data.dart';
import '../state/queue_state.dart';
import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class JoinQueueScreen extends ConsumerStatefulWidget {
  const JoinQueueScreen({super.key, required this.serviceId});

  final String serviceId;

  @override
  ConsumerState<JoinQueueScreen> createState() => _JoinQueueScreenState();
}

class _JoinQueueScreenState extends ConsumerState<JoinQueueScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController(text: 'Kasun Perera');
  final _phoneController = TextEditingController(text: '71 234 5678');
  final _ageController = TextEditingController(text: '34');
  final _peopleController = TextEditingController(text: '1');

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _ageController.dispose();
    _peopleController.dispose();
    super.dispose();
  }

  void _confirmQueue(QueueService service) {
    if (!_formKey.currentState!.validate()) return;
    final institutionId = institutionIdForService(service.id);
    final people = int.tryParse(_peopleController.text) ?? 1;
    final token = QueueToken(
      number: 'Q-${(service.waiting + 29).toString().padLeft(3, '0')}',
      bookingId: 'SQ-2026-09247',
      institutionId: institutionId,
      serviceId: service.id,
      fullName: _nameController.text.trim(),
      phone: _phoneController.text.trim(),
      peopleCount: people,
      peopleAhead: service.waiting,
      waitMinutes: service.estimate,
    );
    ref.read(queueTokenProvider.notifier).state = token;
    context.go('/token');
  }

  @override
  Widget build(BuildContext context) {
    final service = serviceFor(widget.serviceId);
    final institution = institutionFor(institutionIdForService(service.id));
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            PageTopBar(
              title: 'Join Queue',
              subtitle: '${institution.name} · ${service.name}',
            ),
            Expanded(
              child: Form(
                key: _formKey,
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(18, 18, 18, 20),
                  children: [
                    const _FormLabel('FULL NAME'),
                    const SizedBox(height: 7),
                    TextFormField(
                      controller: _nameController,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.person_outline_rounded),
                      ),
                      validator: (value) => value == null || value.trim().isEmpty
                          ? 'Enter your full name'
                          : null,
                    ),
                    const SizedBox(height: 15),
                    const _FormLabel('MOBILE NUMBER'),
                    const SizedBox(height: 7),
                    TextFormField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.phone_iphone_rounded),
                      ),
                      validator: (value) {
                        final digits =
                            value?.replaceAll(RegExp(r'\D'), '') ?? '';
                        return digits.length < 7
                            ? 'Enter a valid mobile number'
                            : null;
                      },
                    ),
                    const SizedBox(height: 15),
                    const _FormLabel('AGE'),
                    const SizedBox(height: 7),
                    TextFormField(
                      controller: _ageController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.cake_outlined),
                      ),
                      validator: (value) {
                        final age = int.tryParse(value ?? '');
                        return age == null || age < 1 || age > 120
                            ? 'Enter a valid age'
                            : null;
                      },
                    ),
                    const SizedBox(height: 15),
                    const _FormLabel('NUMBER OF PERSONS'),
                    const SizedBox(height: 7),
                    TextFormField(
                      controller: _peopleController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.groups_outlined),
                      ),
                      validator: (value) {
                        final count = int.tryParse(value ?? '');
                        return count == null || count < 1 || count > 10
                            ? 'Enter a number from 1 to 10'
                            : null;
                      },
                    ),
                    const SizedBox(height: 15),
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
                                      color: AppColors.text,
                                      fontSize: 11,
                                    ),
                                  ),
                                  const Text(
                                    'Expected arrival window: 3:00 PM – 3:10 PM',
                                    style: TextStyle(
                                      color: AppColors.muted,
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
                    const Text(
                      "By joining, you agree to arrive within the institution's grace period when notified.",
                      style: TextStyle(
                        color: AppColors.muted,
                        fontSize: 10,
                        height: 1.45,
                      ),
                    ),
                    const SizedBox(height: 12),
                    SmartQButton(
                      label: 'Confirm Queue',
                      onPressed: () => _confirmQueue(service),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const SmartQBottomNav(),
    );
  }
}

class _FormLabel extends StatelessWidget {
  const _FormLabel(this.text);

  final String text;

  @override
  Widget build(BuildContext context) => Text(
        text,
        style: const TextStyle(
          color: AppColors.text,
          fontSize: 10,
          fontWeight: FontWeight.w700,
          letterSpacing: .5,
        ),
      );
}
