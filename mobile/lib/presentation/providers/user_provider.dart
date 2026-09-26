import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/user_model.dart';

class UserNotifier extends StateNotifier<UserProfile> {
  UserNotifier() : super(UserProfile.mock());

  void updateProfile({String? fullName, String? email, String? mobile}) {
    state = UserProfile(
      id: state.id,
      fullName: fullName ?? state.fullName,
      initials: fullName != null
          ? fullName.split(' ').map((e) => e[0]).take(2).join('').toUpperCase()
          : state.initials,
      email: email ?? state.email,
      mobile: mobile ?? state.mobile,
      memberSince: state.memberSince,
    );
  }
}

final userProvider = StateNotifierProvider<UserNotifier, UserProfile>((ref) {
  return UserNotifier();
});
