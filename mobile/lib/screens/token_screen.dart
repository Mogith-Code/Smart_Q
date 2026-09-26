import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../models/smartq_data.dart';
import '../state/queue_state.dart';
import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class TokenScreen extends ConsumerWidget {
  const TokenScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final token = ref.watch(queueTokenProvider);
    if (token == null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('My Queue'),
          leading: IconButton(
            onPressed: () => context.go('/home'),
            icon: const Icon(Icons.arrow_back_rounded),
          ),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(28),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 92,
                  height: 92,
                  decoration: const BoxDecoration(
                    color: AppColors.accent,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.confirmation_number_outlined,
                    color: AppColors.primary,
                    size: 42,
                  ),
                ),
                const SizedBox(height: 18),
                const Text(
                  'No active queue',
                  style: TextStyle(
                    color: AppColors.text,
                    fontWeight: FontWeight.w700,
                    fontSize: 19,
                  ),
                ),
                const SizedBox(height: 7),
                const Text(
                  'Choose an institution and service to join a queue.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: AppColors.muted),
                ),
                const SizedBox(height: 18),
                SizedBox(
                  width: 220,
                  child: SmartQButton(
                    label: 'Explore Services',
                    onPressed: () => context.go('/home'),
                  ),
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: const SmartQBottomNav(selected: 1),
      );
    }

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
                    onTap: () => context.go('/home'),
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
                    token.service.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    token.institution.name,
                    style: const TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(17, 16, 17, 22),
                children: [
                  _TokenNumberCard(
                    tokenNumber: token.number,
                    bookingId: token.bookingId,
                  ),
                  const SizedBox(height: 10),
                  _BookingDetails(token: token),
                  const SizedBox(height: 10),
                  _QrCodeCard(),
                  const SizedBox(height: 10),
                  const _ArrivalReminder(),
                  const SizedBox(height: 12),
                  SmartQButton(
                    label: 'Track Live Queue',
                    icon: Icons.people_alt_outlined,
                    onPressed: () => context.push('/service/${token.serviceId}'),
                  ),
                  const SizedBox(height: 9),
                  OutlinedButton.icon(
                    onPressed: () => _confirmCancel(context, ref),
                    icon: const Icon(Icons.close_rounded, size: 17),
                    label: const Text('Cancel Queue'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.red,
                      minimumSize: const Size.fromHeight(46),
                      side: const BorderSide(color: AppColors.red),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(13),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const SmartQBottomNav(selected: 1),
    );
  }

  Future<void> _confirmCancel(BuildContext context, WidgetRef ref) async {
    final shouldCancel = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel this queue?'),
        content: const Text('Your queue token will no longer be active.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Keep queue'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            style: FilledButton.styleFrom(backgroundColor: AppColors.red),
            child: const Text('Cancel queue'),
          ),
        ],
      ),
    );
    if (shouldCancel == true) {
      ref.read(queueTokenProvider.notifier).state = null;
      if (context.mounted) context.go('/home');
    }
  }
}

class _TokenNumberCard extends StatelessWidget {
  const _TokenNumberCard({
    required this.tokenNumber,
    required this.bookingId,
  });

  final String tokenNumber;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Column(
          children: [
            const Text(
              'YOUR TOKEN',
              style: TextStyle(
                color: AppColors.muted,
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: .7,
              ),
            ),
            const SizedBox(height: 3),
            Text(
              tokenNumber,
              style: const TextStyle(
                color: AppColors.primary,
                fontSize: 38,
                fontWeight: FontWeight.w800,
                letterSpacing: 1.2,
              ),
            ),
            Text(
              'Booking ID: $bookingId',
              style: const TextStyle(color: AppColors.muted, fontSize: 10),
            ),
          ],
        ),
      ),
    );
  }

  final String bookingId;
}

class _BookingDetails extends StatelessWidget {
  const _BookingDetails({required this.token});

  final QueueToken token;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(13),
        child: Column(
          children: [
            Row(
              children: [
                _DetailCell(label: 'Institution', value: token.institution.name),
                _DetailCell(label: 'Service', value: token.service.name),
              ],
            ),
            const Divider(height: 18, color: AppColors.border),
            Row(
              children: [
                _DetailCell(
                  label: 'People in booking',
                  value: '${token.peopleCount}',
                ),
                const _DetailCell(label: 'Expected Service', value: '3:05 PM'),
              ],
            ),
            const Divider(height: 18, color: AppColors.border),
            Row(
              children: [
                _DetailCell(
                  label: 'Estimated Wait',
                  value: '${token.waitMinutes} minutes',
                ),
                const _DetailCell(label: 'Arrival Window', value: '3:00 – 3:10 PM'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _DetailCell extends StatelessWidget {
  const _DetailCell({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) => Expanded(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label,
                  style: const TextStyle(fontSize: 9, color: AppColors.muted)),
              const SizedBox(height: 3),
              Text(
                value,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: AppColors.text,
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      );
}

class _QrCodeCard extends StatelessWidget {
  const _QrCodeCard();

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColors.accent,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 13),
        child: Column(
          children: [
            const Text(
              'QR CODE',
              style: TextStyle(
                color: AppColors.text,
                fontWeight: FontWeight.w700,
                fontSize: 10,
                letterSpacing: .5,
              ),
            ),
            const SizedBox(height: 7),
            Container(
              width: 104,
              height: 104,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: AppColors.border),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(
                Icons.qr_code_2_rounded,
                color: AppColors.primary,
                size: 82,
              ),
            ),
            const SizedBox(height: 5),
            const Text(
              'Show this at the counter',
              style: TextStyle(color: AppColors.muted, fontSize: 9),
            ),
          ],
        ),
      ),
    );
  }
}

class _ArrivalReminder extends StatelessWidget {
  const _ArrivalReminder();

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColors.accent,
      child: const Padding(
        padding: EdgeInsets.all(12),
        child: Row(
          children: [
            Icon(Icons.notifications_active_outlined,
                color: AppColors.teal, size: 18),
            SizedBox(width: 8),
            Expanded(
              child: Text(
                'Arrival Reminder\nPlease arrive between 3:00 PM – 3:10 PM. You’ll receive a notification when it is almost your turn.',
                style: TextStyle(
                  color: AppColors.text,
                  fontSize: 10,
                  height: 1.45,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
