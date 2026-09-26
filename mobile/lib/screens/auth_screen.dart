import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_theme.dart';
import '../widgets/smartq_widgets.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>();
  bool _register = false;
  bool _passwordVisible = false;

  void _continue() {
    if (_formKey.currentState!.validate()) {
      if (_register) {
        context.go('/verify');
      } else {
        context.go('/home');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Container(
              color: AppColors.primary,
              padding: const EdgeInsets.fromLTRB(20, 15, 20, 16),
              child: Column(
                children: [
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: SmartQBrand(light: true, compact: true),
                  ),
                  const SizedBox(height: 18),
                  Container(
                    height: 42,
                    padding: const EdgeInsets.all(3),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0C2F52),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        _AuthTab(
                          label: 'Login',
                          selected: !_register,
                          onTap: () => setState(() => _register = false),
                        ),
                        _AuthTab(
                          label: 'Register',
                          selected: _register,
                          onTap: () => setState(() => _register = true),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Form(
                key: _formKey,
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(22, 24, 22, 26),
                  children: [
                    if (_register) ...[
                      const _FieldLabel('FULL NAME'),
                      const SizedBox(height: 7),
                      TextFormField(
                        decoration: const InputDecoration(
                          hintText: 'Your full name',
                          prefixIcon: Icon(Icons.person_outline_rounded),
                        ),
                        validator: (value) => value == null || value.trim().isEmpty
                            ? 'Enter your full name'
                            : null,
                      ),
                      const SizedBox(height: 16),
                    ],
                    const _FieldLabel('MOBILE NUMBER'),
                    const SizedBox(height: 7),
                    Row(
                      children: [
                        SizedBox(
                          width: 72,
                          child: TextFormField(
                            initialValue: '+94',
                            textAlign: TextAlign.center,
                            keyboardType: TextInputType.phone,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: TextFormField(
                            keyboardType: TextInputType.phone,
                            decoration: const InputDecoration(
                              hintText: '71 234 5678',
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
                        ),
                      ],
                    ),
                    if (_register) ...[
                      const SizedBox(height: 16),
                      const _FieldLabel('EMAIL'),
                      const SizedBox(height: 7),
                      TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          hintText: 'kasun@email.com',
                          prefixIcon: Icon(Icons.mail_outline_rounded),
                        ),
                        validator: (value) => value == null ||
                                !RegExp(r'^[^@]+@[^@]+\.[^@]+$')
                                    .hasMatch(value.trim())
                            ? 'Enter a valid email address'
                            : null,
                      ),
                    ],
                    const SizedBox(height: 16),
                    const _FieldLabel('PASSWORD'),
                    const SizedBox(height: 7),
                    TextFormField(
                      obscureText: !_passwordVisible,
                      decoration: InputDecoration(
                        hintText: 'Enter your password',
                        prefixIcon: const Icon(Icons.lock_outline_rounded),
                        suffixIcon: IconButton(
                          tooltip: _passwordVisible ? 'Hide password' : 'Show password',
                          onPressed: () => setState(
                            () => _passwordVisible = !_passwordVisible,
                          ),
                          icon: Icon(
                            _passwordVisible
                                ? Icons.visibility_off_outlined
                                : Icons.visibility_outlined,
                          ),
                        ),
                      ),
                      validator: (value) => value == null || value.length < 6
                          ? 'Use at least 6 characters'
                          : null,
                    ),
                    if (!_register)
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () => ScaffoldMessenger.of(context)
                            ..hideCurrentSnackBar()
                            ..showSnackBar(
                              const SnackBar(
                                content: Text('Password recovery is coming soon.'),
                              ),
                            ),
                          child: const Text('Forgot Password?'),
                        ),
                      )
                    else
                      const SizedBox(height: 20),
                    SmartQButton(
                      label: _register ? 'Send OTP' : 'Sign In',
                      onPressed: _continue,
                    ),
                    const SizedBox(height: 18),
                    const _OrDivider(),
                    const SizedBox(height: 16),
                    SmartQButton(
                      label: 'Continue with Google',
                      outlined: true,
                      onPressed: () => ScaffoldMessenger.of(context)
                        ..hideCurrentSnackBar()
                        ..showSnackBar(
                          const SnackBar(
                            content: Text('Google sign-in will be available soon.'),
                          ),
                        ),
                    ),
                    if (!_register) ...[
                      const SizedBox(height: 14),
                      TextButton(
                        onPressed: () => setState(() => _register = true),
                        child: const Text('New to SmartQ? Create an account'),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AuthTab extends StatelessWidget {
  const _AuthTab({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 160),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: selected ? Colors.white : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: selected ? AppColors.primary : Colors.white70,
              fontWeight: FontWeight.w600,
              fontSize: 13,
            ),
          ),
        ),
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  const _FieldLabel(this.value);

  final String value;

  @override
  Widget build(BuildContext context) => Text(
        value,
        style: const TextStyle(
          color: AppColors.text,
          fontSize: 10,
          fontWeight: FontWeight.w700,
          letterSpacing: .6,
        ),
      );
}

class _OrDivider extends StatelessWidget {
  const _OrDivider();

  @override
  Widget build(BuildContext context) => const Row(
        children: [
          Expanded(child: Divider(color: AppColors.border)),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 12),
            child: Text(
              'or continue with',
              style: TextStyle(color: AppColors.muted, fontSize: 12),
            ),
          ),
          Expanded(child: Divider(color: AppColors.border)),
        ],
      );
}
