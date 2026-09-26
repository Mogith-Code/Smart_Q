import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/colors.dart';

class TokenArrivalScreen extends ConsumerStatefulWidget {
  const TokenArrivalScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<TokenArrivalScreen> createState() => _TokenArrivalScreenState();
}

class _TokenArrivalScreenState extends ConsumerState<TokenArrivalScreen> {
  late Timer _timer;
  int _secondsRemaining = 237; // 3:57 in seconds

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() {
          _secondsRemaining--;
        });
      } else {
        _timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  String _formatTime(int totalSeconds) {
    final minutes = (totalSeconds ~/ 60).toString().padLeft(2, '0');
    final seconds = (totalSeconds % 60).toString().padLeft(2, '0');
    return "$minutes:$seconds";
  }

  @override
  Widget build(BuildContext context) {
    final double progress = _secondsRemaining / 600.0; // max window ~10 mins

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          // 1. Header (Dark Navy)
          _buildHeader(context),

          // 2. Scrollable Body
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              physics: const BouncingScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Countdown Ring Card
                  _buildCountdownCard(progress),
                  const SizedBox(height: 16),

                  // Institution & Service Info Card
                  _buildInstitutionCard(),
                  const SizedBox(height: 16),

                  // Show QR Code Card
                  _buildQrCard(),
                  const SizedBox(height: 24),

                  // Action Button
                  _buildArrivedButton(context),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // --- 1. HEADER WIDGET ---
  Widget _buildHeader(BuildContext context) {
    return Container(
      color: AppColors.headerBackground,
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          child: Column(
            children: [
              // Back Button Row
              Align(
                alignment: Alignment.centerLeft,
                child: GestureDetector(
                  onTap: () {
                    if (Navigator.canPop(context)) {
                      Navigator.pop(context);
                    }
                  },
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Icon(LucideIcons.arrowLeft, color: Colors.white, size: 20),
                      SizedBox(width: 8),
                      Text(
                        "Back",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Bell icon Subtitle
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Icon(
                    LucideIcons.bell,
                    color: Color(0xFFF59E0B), // Amber color
                    size: 16,
                  ),
                  SizedBox(width: 8),
                  Text(
                    "YOUR ARRIVAL WINDOW HAS STARTED",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.5,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // Title Token
              const Text(
                "Token Q-047",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.extrabold,
                  letterSpacing: -0.5,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // --- 2. COUNTDOWN CARD ---
  Widget _buildCountdownCard(double progress) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderGray, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      child: Column(
        children: [
          const Text(
            "Please arrive within",
            style: TextStyle(
              color: AppColors.textMuted,
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 20),

          // Circular Progress Timer
          SizedBox(
            width: 140,
            height: 140,
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Outer Track Ring
                SizedBox(
                  width: 140,
                  height: 140,
                  child: CircularProgressIndicator(
                    value: progress.clamp(0.0, 1.0),
                    strokeWidth: 8,
                    backgroundColor: const Color(0xFFE2E8F0),
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primaryTeal),
                    strokeCap: StrokeCap.round,
                  ),
                ),

                // Center Text
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _formatTime(_secondsRemaining),
                      style: const TextStyle(
                        color: AppColors.textDark,
                        fontSize: 32,
                        fontWeight: FontWeight.w800,
                        letterSpacing: -1.0,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      "remaining",
                      style: TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Footer Window Time
          RichText(
            text: const TextSpan(
              style: TextStyle(fontSize: 13, color: AppColors.textMuted),
              children: [
                TextSpan(text: "Arrival window: "),
                TextSpan(
                  text: "3:00 PM – 3:10 PM",
                  style: TextStyle(
                    color: AppColors.cardNavy,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // --- 3. INSTITUTION & SERVICE CARD ---
  Widget _buildInstitutionCard() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderGray, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          // Institution & Service Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Left Column
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    "Institution",
                    style: TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    "City General Hospital",
                    style: TextStyle(
                      color: AppColors.textDark,
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),

              // Right Column
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: const [
                  Text(
                    "Service",
                    style: TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    "OPD",
                    style: TextStyle(
                      color: AppColors.textDark,
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 14),

          // Address pill container
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: AppColors.lightBlueCard,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: const [
                Icon(
                  LucideIcons.mapPin,
                  color: AppColors.cardNavy,
                  size: 16,
                ),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    "45 Medical Centre Road, Colombo 07",
                    style: TextStyle(
                      color: Color(0xFF475569),
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // --- 4. SHOW QR CODE CARD ---
  Widget _buildQrCard() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.predictionCardBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFD0E8F5), width: 1),
      ),
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
      child: Column(
        children: [
          const Text(
            "SHOW QR AT RECEPTION",
            style: TextStyle(
              color: AppColors.cardNavy,
              fontSize: 12,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 16),

          // QR Box Container
          Container(
            width: 140,
            height: 140,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            padding: const EdgeInsets.all(16),
            child: CustomPaint(
              painter: QrPatternPainter(),
            ),
          ),
          const SizedBox(height: 16),

          // Booking ID Footer
          const Text(
            "Booking ID: SQ-2026-09247",
            style: TextStyle(
              color: AppColors.textMuted,
              fontSize: 13,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  // --- 5. I HAVE ARRIVED BUTTON ---
  Widget _buildArrivedButton(BuildContext context) {
    return SizedBox(
      height: 52,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primaryTeal,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
        onPressed: () {
          showDialog(
            context: context,
            builder: (ctx) => AlertDialog(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              title: const Text("Arrival Confirmed!"),
              content: const Text("You have successfully checked in at reception. Please take a seat near Counter 3."),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text("OK", style: TextStyle(color: AppColors.primaryTeal, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          );
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(LucideIcons.mapPin, color: Colors.white, size: 20),
            SizedBox(width: 8),
            Text(
              "I Have Arrived",
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Custom Painter for clean QR Code Visual
class QrPatternPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.cardNavy
      ..style = PaintingStyle.fill;

    final double u = size.width / 7;

    // Outer corners
    void drawPositionSquare(double x, double y) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(Rect.fromLTWH(x, y, u * 2, u * 2), const Radius.circular(4)),
        paint,
      );
      final whitePaint = Paint()..color = Colors.white;
      canvas.drawRect(Rect.fromLTWH(x + u * 0.4, y + u * 0.4, u * 1.2, u * 1.2), whitePaint);
      canvas.drawRect(Rect.fromLTWH(x + u * 0.7, y + u * 0.7, u * 0.6, u * 0.6), paint);
    }

    drawPositionSquare(0, 0);
    drawPositionSquare(size.width - u * 2, 0);
    drawPositionSquare(0, size.height - u * 2);

    // Random QR data blocks
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(u * 2.5, u * 0.5, u * 2, u * 1.2), const Radius.circular(3)), paint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(u * 2.8, u * 2.5, u * 1.4, u * 1.4), const Radius.circular(3)), paint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(u * 4.8, u * 2.8, u * 1.6, u * 1.2), const Radius.circular(3)), paint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(u * 2.5, u * 4.8, u * 2.0, u * 1.4), const Radius.circular(3)), paint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(u * 5.0, u * 4.8, u * 1.5, u * 1.5), const Radius.circular(3)), paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
