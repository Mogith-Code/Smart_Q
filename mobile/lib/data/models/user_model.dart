class UserProfile {
  final String id;
  final String fullName;
  final String initials;
  final String email;
  final String mobile;
  final String memberSince;
  final String avatarUrl;

  UserProfile({
    required this.id,
    required this.fullName,
    required this.initials,
    required this.email,
    required this.mobile,
    required this.memberSince,
    this.avatarUrl = '',
  });

  factory UserProfile.mock() {
    return UserProfile(
      id: "usr_102938",
      fullName: "Kasun Perera",
      initials: "KP",
      email: "kasun@email.com",
      mobile: "+94 71 234 5678",
      memberSince: "Jan 2026",
    );
  }
}
