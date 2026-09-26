enum InstitutionKind { healthcare, banking, government }

class Institution {
  const Institution({
    required this.id,
    required this.name,
    required this.category,
    required this.address,
    required this.distance,
    required this.icon,
    required this.kind,
  });

  final String id;
  final String name;
  final String category;
  final String address;
  final String distance;
  final int icon;
  final InstitutionKind kind;
}

class QueueService {
  const QueueService({
    required this.id,
    required this.name,
    required this.waiting,
    required this.estimate,
    required this.remaining,
    required this.capacity,
    required this.icon,
    this.progress = .72,
  });

  final String id;
  final String name;
  final int waiting;
  final int estimate;
  final int remaining;
  final int capacity;
  final int icon;
  final double progress;
}

const institutions = [
  Institution(
    id: 'city-hospital',
    name: 'City General Hospital',
    category: 'Healthcare',
    address: '12 Lake Road, Colombo 03',
    distance: '1.2 km',
    icon: 0xe3b0,
    kind: InstitutionKind.healthcare,
  ),
  Institution(
    id: 'abc-bank',
    name: 'ABC Bank',
    category: 'Banking',
    address: '42 Financial Street, Colombo 03',
    distance: '2.4 km',
    icon: 0xe84f,
    kind: InstitutionKind.banking,
  ),
  Institution(
    id: 'divisional-secretariat',
    name: 'Divisional Secretariat',
    category: 'Government',
    address: '1 Civic Centre Plaza, Colombo 01',
    distance: '3.1 km',
    icon: 0xe8b5,
    kind: InstitutionKind.government,
  ),
];

const servicesByInstitution = <String, List<QueueService>>{
  'city-hospital': [
    QueueService(
      id: 'opd',
      name: 'OPD',
      waiting: 18,
      estimate: 126,
      remaining: 18,
      capacity: 100,
      icon: 0xe3b0,
    ),
    QueueService(
      id: 'cardiology',
      name: 'Cardiology',
      waiting: 9,
      estimate: 64,
      remaining: 6,
      capacity: 80,
      icon: 0xe8f4,
      progress: .62,
    ),
    QueueService(
      id: 'dental',
      name: 'Dental',
      waiting: 3,
      estimate: 35,
      remaining: 8,
      capacity: 75,
      icon: 0xe91d,
      progress: .42,
    ),
    QueueService(
      id: 'laboratory',
      name: 'Laboratory',
      waiting: 12,
      estimate: 58,
      remaining: 14,
      capacity: 90,
      icon: 0xe6e1,
      progress: .54,
    ),
    QueueService(
      id: 'pharmacy',
      name: 'Pharmacy',
      waiting: 4,
      estimate: 22,
      remaining: 20,
      capacity: 100,
      icon: 0xe8f6,
      progress: .36,
    ),
  ],
  'abc-bank': [
    QueueService(
      id: 'general-banking',
      name: 'General Banking',
      waiting: 9,
      estimate: 72,
      remaining: 18,
      capacity: 60,
      icon: 0xe84f,
    ),
    QueueService(
      id: 'loans',
      name: 'Loans',
      waiting: 4,
      estimate: 80,
      remaining: 7,
      capacity: 25,
      icon: 0xe8a1,
    ),
    QueueService(
      id: 'account-opening',
      name: 'Account Opening',
      waiting: 3,
      estimate: 75,
      remaining: 6,
      capacity: 20,
      icon: 0xe8d2,
    ),
  ],
  'divisional-secretariat': [
    QueueService(
      id: 'birth-certificates',
      name: 'Birth Certificates',
      waiting: 22,
      estimate: 220,
      remaining: 4,
      capacity: 50,
      icon: 0xe873,
      progress: .92,
    ),
    QueueService(
      id: 'citizen-services',
      name: 'Citizen Services',
      waiting: 15,
      estimate: 120,
      remaining: 5,
      capacity: 60,
      icon: 0xe7ef,
      progress: .92,
    ),
    QueueService(
      id: 'document-services',
      name: 'Document Services',
      waiting: 8,
      estimate: 90,
      remaining: 10,
      capacity: 40,
      icon: 0xe873,
      progress: .75,
    ),
  ],
};

Institution institutionFor(String id) =>
    institutions.firstWhere((item) => item.id == id);

QueueService serviceFor(String id) => servicesByInstitution.values
    .expand((services) => services)
    .firstWhere((service) => service.id == id);

String institutionIdForService(String serviceId) => servicesByInstitution.entries
    .firstWhere(
      (entry) => entry.value.any((service) => service.id == serviceId),
    )
    .key;

class QueueToken {
  const QueueToken({
    required this.number,
    required this.bookingId,
    required this.institutionId,
    required this.serviceId,
    required this.fullName,
    required this.phone,
    required this.peopleCount,
    required this.peopleAhead,
    required this.waitMinutes,
  });

  final String number;
  final String bookingId;
  final String institutionId;
  final String serviceId;
  final String fullName;
  final String phone;
  final int peopleCount;
  final int peopleAhead;
  final int waitMinutes;

  Institution get institution => institutionFor(institutionId);
  QueueService get service => serviceFor(serviceId);
}
