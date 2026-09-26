import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: Stack(
        children: [
          const Positioned(top: 90, left: -48, child: _Bubble(size: 150)),
          const Positioned(top: 330, right: -27, child: _Bubble(size: 72)),
          const Positioned(bottom: 100, right: -48, child: _Bubble(size: 190)),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(28, 26, 28, 30),
              child: Column(
                children: [
                  const Spacer(flex: 3),
                  const SmartQBrand(light: true),
                  const SizedBox(height: 12),
                  const Text(
                    'AI-Powered Virtual Queue Management',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  const Spacer(flex: 4),
                  const Text(
                    'Your Time. Your Queue. Smarter.',
                    style: TextStyle(color: Colors.white54, fontSize: 11),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton(
                      onPressed: () => context.go('/onboarding'),
                      style: FilledButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: AppColors.primary,
                        minimumSize: const Size.fromHeight(50),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(13),
                        ),
                      ),
                      child: const Text('Get started'),
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.go('/login'),
                    child: const Text(
                      'I already have an account',
                      style: TextStyle(color: Colors.white70),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Bubble extends StatelessWidget {
  const _Bubble({required this.size});

  final double size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: AppColors.teal.withAlpha(28),
      ),
    );
  }
}
