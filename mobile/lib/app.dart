import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'screens/auth_screen.dart';
import 'screens/home_screen.dart';
import 'screens/institution_screen.dart';
import 'screens/join_queue_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/queue_screen.dart';
import 'screens/splash_screen.dart';
import 'screens/token_screen.dart';
import 'screens/verify_number_screen.dart';
import 'theme/app_theme.dart';

final _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(path: '/', builder: (context, state) => const SplashScreen()),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const AuthScreen(),
    ),
    GoRoute(
      path: '/verify',
      builder: (context, state) => const VerifyNumberScreen(),
    ),
    GoRoute(path: '/home', builder: (context, state) => const HomeScreen()),
    GoRoute(
      path: '/institution/:id',
      builder: (context, state) =>
          InstitutionScreen(institutionId: state.pathParameters['id']!),
    ),
    GoRoute(
      path: '/service/:id',
      builder: (context, state) =>
          QueueScreen(serviceId: state.pathParameters['id']!),
    ),
    GoRoute(
      path: '/join/:id',
      builder: (context, state) =>
          JoinQueueScreen(serviceId: state.pathParameters['id']!),
    ),
    GoRoute(path: '/token', builder: (context, state) => const TokenScreen()),
  ],
);

class SmartQApp extends StatelessWidget {
  const SmartQApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'SmartQ',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: _router,
    );
  }
}
