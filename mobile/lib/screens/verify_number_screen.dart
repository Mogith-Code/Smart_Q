import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class VerifyNumberScreen extends StatefulWidget {
  const VerifyNumberScreen({super.key});

  @override
  State<VerifyNumberScreen> createState() => _VerifyNumberScreenState();
}

class _VerifyNumberScreenState extends State<VerifyNumberScreen> {
  final _digits = List.generate(6, (_) => TextEditingController());

  @override
  void dispose() {
    for (final digit in _digits) {
      digit.dispose();
    }
    super.dispose();
  }

  void _verify() {
    if (_digits.every((controller) => controller.text.trim().isNotEmpty)) {
      context.go('/home');
      return;
    }
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(const SnackBar(content: Text('Enter the 6-digit code.')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => context.pop(),
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        title: const Text('Verify Your Number', style: TextStyle(fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(22),
        children: [
          const SizedBox(height: 16),
          const Text(
            'Enter the 6-digit code sent to +94 71 234 5678',
            style: TextStyle(color: AppColors.muted),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              for (var i = 0; i < _digits.length; i++) ...[
                if (i != 0) const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: _digits[i],
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.number,
                    maxLength: 1,
                    onChanged: (value) {
                      if (value.isNotEmpty && i < _digits.length - 1) {
                        FocusScope.of(context).nextFocus();
                      }
                    },
                    decoration: const InputDecoration(
                      counterText: '',
                      contentPadding: EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 18),
          Row(
            children: [
              const Text(
                "Didn't receive a code? ",
                style: TextStyle(color: AppColors.muted, fontSize: 13),
              ),
              TextButton(
                onPressed: () => ScaffoldMessenger.of(context)
                  ..hideCurrentSnackBar()
                  ..showSnackBar(
                    const SnackBar(content: Text('A new code has been requested.')),
                  ),
                child: const Text('Resend'),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SmartQButton(label: 'Verify & Continue', onPressed: _verify),
        ],
      ),
    );
  }
}
