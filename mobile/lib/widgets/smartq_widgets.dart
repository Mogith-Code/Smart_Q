import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../models/smartq_data.dart';
import '../theme/app_theme.dart';

class SmartQBrand extends StatelessWidget {
  const SmartQBrand({super.key, this.light = false, this.compact = false});

  final bool light;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: compact ? 35 : 42,
          height: compact ? 35 : 42,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(11),
          ),
          child: const Icon(
            Icons.qr_code_2_rounded,
            color: AppColors.primary,
            size: 29,
          ),
        ),
        const SizedBox(width: 9),
        Text(
          'SmartQ',
          style: TextStyle(
            color: light ? Colors.white : AppColors.text,
            fontWeight: FontWeight.w700,
            fontSize: compact ? 18 : 22,
            letterSpacing: -.4,
          ),
        ),
      ],
    );
  }
}

class SmartQButton extends StatelessWidget {
  const SmartQButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.outlined = false,
  });

  final String label;
  final VoidCallback onPressed;
  final IconData? icon;
  final bool outlined;

  @override
  Widget build(BuildContext context) {
    final shape = RoundedRectangleBorder(borderRadius: BorderRadius.circular(13));
    final style = FilledButton.styleFrom(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
      shape: shape,
      textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
    );
    final outlinedStyle = OutlinedButton.styleFrom(
      foregroundColor: AppColors.text,
      backgroundColor: Colors.white,
      side: const BorderSide(color: AppColors.border),
      shape: shape,
    );
    return SizedBox(
      height: 50,
      width: double.infinity,
      child: outlined
          ? OutlinedButton.icon(
              onPressed: onPressed,
              icon: Icon(icon ?? Icons.g_mobiledata_rounded, size: 21),
              label: Text(label),
              style: outlinedStyle,
            )
          : icon == null
              ? FilledButton(
                  onPressed: onPressed,
                  style: style,
                  child: Text(label),
                )
              : FilledButton.icon(
                  onPressed: onPressed,
                  icon: Icon(icon),
                  label: Text(label),
                  style: style,
                ),
    );
  }
}

class PageTopBar extends StatelessWidget {
  const PageTopBar({super.key, required this.title, this.subtitle});

  final String title;
  final String? subtitle;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: AppColors.primary,
      padding: const EdgeInsets.fromLTRB(16, 6, 20, 18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          InkWell(
            onTap: () => context.pop(),
            borderRadius: BorderRadius.circular(20),
            child: const Padding(
              padding: EdgeInsets.symmetric(vertical: 8),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.arrow_back_rounded, size: 18, color: Colors.white70),
                  SizedBox(width: 6),
                  Text('Back', style: TextStyle(color: Colors.white70)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 5),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 19,
              fontWeight: FontWeight.w700,
            ),
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 4),
            Text(
              subtitle!,
              style: const TextStyle(color: Colors.white70, fontSize: 13),
            ),
          ],
        ],
      ),
    );
  }
}

class InstitutionCard extends StatelessWidget {
  const InstitutionCard({super.key, required this.institution});

  final Institution institution;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () => context.push('/institution/${institution.id}'),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(13),
          child: Row(
            children: [
              InstitutionIcon(institution: institution, size: 44),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      institution.name,
                      style: const TextStyle(
                        color: AppColors.text,
                        fontWeight: FontWeight.w700,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${institution.category}  •  ${institution.distance}',
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              const Column(
                children: [
                  Icon(Icons.circle, color: AppColors.green, size: 9),
                  SizedBox(height: 3),
                  Text('Open', style: TextStyle(color: AppColors.green, fontSize: 10)),
                ],
              ),
              const SizedBox(width: 2),
              const Icon(Icons.chevron_right_rounded, color: AppColors.muted),
            ],
          ),
        ),
      ),
    );
  }
}

class InstitutionIcon extends StatelessWidget {
  const InstitutionIcon({super.key, required this.institution, this.size = 42});

  final Institution institution;
  final double size;

  @override
  Widget build(BuildContext context) {
    final color = switch (institution.kind) {
      InstitutionKind.healthcare => AppColors.primary,
      InstitutionKind.banking => AppColors.teal,
      InstitutionKind.government => AppColors.amber,
    };
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: AppColors.accent,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Icon(IconData(institution.icon, fontFamily: 'MaterialIcons'),
          color: color, size: size * .53),
    );
  }
}

class SectionTitle extends StatelessWidget {
  const SectionTitle(this.title, {super.key, this.action, this.onAction});

  final String title;
  final String? action;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Text(
            title,
            style: const TextStyle(
              color: AppColors.text,
              fontSize: 16,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        if (action != null)
          TextButton(
            onPressed: onAction,
            style: TextButton.styleFrom(visualDensity: VisualDensity.compact),
            child: Text(action!, style: const TextStyle(fontSize: 12)),
          ),
      ],
    );
  }
}

class SmartQBottomNav extends StatelessWidget {
  const SmartQBottomNav({super.key, this.selected = 0});

  final int selected;

  @override
  Widget build(BuildContext context) {
    const items = [
      (Icons.home_outlined, 'Home'),
      (Icons.access_time_rounded, 'My Queue'),
      (Icons.history_rounded, 'History'),
      (Icons.person_outline_rounded, 'Profile'),
    ];
    return NavigationBar(
      height: 66,
      selectedIndex: selected,
      backgroundColor: Colors.white,
      indicatorColor: AppColors.accent,
      labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
      onDestinationSelected: (index) {
        if (index == 0) context.go('/home');
        if (index == 1) context.go('/token');
        if (index > 1) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('${items[index].$2} is coming soon.')),
          );
        }
      },
      destinations: [
        for (final item in items)
          NavigationDestination(icon: Icon(item.$1), label: item.$2),
      ],
    );
  }
}
