export type Language = 'en' | 'ta' | 'si';

export const translations = {
  en: {
    // Header & Sidebar
    appName: 'SmartQ',
    adminPortal: 'Admin Portal',
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    mis: 'MIS & Insights',
    services: 'Services',
    staff: 'Staff',
    branches: 'Branches',
    exitPortal: 'Exit Portal',
    hospitalSubtitle: 'City General Hospital - Administrator',
    
    // Dashboard Metrics
    totalVisitors: 'Total Visitors Today',
    completedServices: 'Completed Services',
    avgWaitTime: 'Avg Waiting Time',
    noShowRate: 'No-show Rate',
    
    // Service Performance & Queue Status
    servicePerformanceToday: 'Service Performance Today',
    liveQueueStatus: 'Live Queue Status',
    serving: 'Serving',
    counters: 'counters',
    waiting: 'waiting',
    active: 'Active',
    paused: 'Paused',
    onBreak: 'On Break',
    onShift: 'On Shift',
    
    // Buttons & Actions
    addService: 'Add Service',
    addStaff: 'Add Staff Member',
    addBranch: 'Add Branch',
    exportReport: 'Export Report',
    cancel: 'Cancel',
    save: 'Save Changes',
    delete: 'Delete',
    moduleOverview: 'Module Overview',
    staffRoster: 'Staff Roster',
    branchLocations: 'Branch Locations',

    // Insights & Forecast
    aiInsightsTitle: 'AI-Driven Management Insights',
    peakDemandWindow: 'Peak Demand Window',
    highWaitTimeAlert: 'High Wait Time: Cardiology',
    demandGrowth: 'Demand Growth',
    counterUtilization: 'Counter Utilization',
    demandForecastTitle: 'Demand Forecast — Next 3 Months',
    servicePerformanceSummary: 'Service Performance Summary & AI Actions',
    
    // Languages
    english: 'English',
    tamil: 'தமிழ் (Tamil)',
    sinhala: 'සිංහල (Sinhala)',
  },
  ta: {
    // Header & Sidebar
    appName: 'SmartQ',
    adminPortal: 'நிர்வாக போர்டல்',
    dashboard: 'டாஷ்போர்டு',
    analytics: 'பகுப்பாய்வு',
    mis: 'MIS & நுண்ணறிவு',
    services: 'சேவைகள்',
    staff: 'ஊழியர்கள்',
    branches: 'கிளைகள்',
    exitPortal: 'வெளியேறு',
    hospitalSubtitle: 'நகர பொது மருத்துவமனை - நிர்வாகி',
    
    // Dashboard Metrics
    totalVisitors: 'இன்றைய மொத்த பார்வையாளர்கள்',
    completedServices: 'நிறைவடைந்த சேவைகள்',
    avgWaitTime: 'சராசரி காத்திருப்பு நேரம்',
    noShowRate: 'வராதோர் விகிதம்',
    
    // Service Performance & Queue Status
    servicePerformanceToday: 'இன்றைய சேவை செயல் திறன்',
    liveQueueStatus: 'நேரலை வரிசை நிலை',
    serving: 'சேவையில் உள்ள எண்',
    counters: 'கவுண்டர்கள்',
    waiting: 'காத்திருக்கிறார்கள்',
    active: 'செயலில் உள்ளது',
    paused: 'நிறுத்தப்பட்டது',
    onBreak: 'இடைவேளையில்',
    onShift: 'பணியில் உள்ளார்',
    
    // Buttons & Actions
    addService: 'சேவை சேர்க்கவும்',
    addStaff: 'ஊழியர் சேர்க்கவும்',
    addBranch: 'கிளை சேர்க்கவும்',
    exportReport: 'அறிக்கை பதிவிறக்கு',
    cancel: 'ரத்து செய்',
    save: 'சேமி',
    delete: 'நீக்கு',
    moduleOverview: 'தொகுதி மேலோட்டம்',
    staffRoster: 'ஊழியர் பட்டியல்',
    branchLocations: 'கிளை இருப்பிடங்கள்',

    // Insights & Forecast
    aiInsightsTitle: 'AI-அடிப்படையிலான மேலாண்மை நுண்ணறிவுகள்',
    peakDemandWindow: 'அதிக தேவை நேரம்',
    highWaitTimeAlert: 'அதிக காத்திருப்பு நேரம்: கார்டியாலஜி',
    demandGrowth: 'தேவை வளர்ச்சி',
    counterUtilization: 'கவுண்டர் பயன்பாடு',
    demandForecastTitle: 'தேவை முன்னறிவிப்பு — அடுத்த 3 மாதங்கள்',
    servicePerformanceSummary: 'சேவை செயல்திறன் சுருக்கம் & AI நடவடிக்கைகள்',
    
    // Languages
    english: 'English',
    tamil: 'தமிழ் (Tamil)',
    sinhala: 'සිංහල (Sinhala)',
  },
  si: {
    // Header & Sidebar
    appName: 'SmartQ',
    adminPortal: 'පාලන ද්වාරය',
    dashboard: 'පුවරුව',
    analytics: 'විශ්ලේෂණ',
    mis: 'MIS සහ තොරතුරු',
    services: 'සේවාවන්',
    staff: 'කාර්ය මණ්ඩලය',
    branches: 'ශාඛා',
    exitPortal: 'පිටවීම',
    hospitalSubtitle: 'නගර මහ රෝහල - පරිපාලක',
    
    // Dashboard Metrics
    totalVisitors: 'අද මුළු පැමිණීම්',
    completedServices: 'සම්පූර්ණ කළ සේවාවන්',
    avgWaitTime: 'සාමාන්‍ය රැඳී සිටින කාලය',
    noShowRate: 'නොපැමිණීමේ අනුපාතය',
    
    // Service Performance & Queue Status
    servicePerformanceToday: 'අද දින සේවා කාර්යසාධනය',
    liveQueueStatus: 'සජීවී පෝලිම් තත්ත්වය',
    serving: 'සේවය සපයන අංකය',
    counters: 'කවුන්ටර',
    waiting: 'රැඳී සිටී',
    active: 'ක්‍රියාකාරී',
    paused: 'අත්හිටුවා ඇත',
    onBreak: 'විවේකයේ',
    onShift: 'සේවයේ නිරතයි',
    
    // Buttons & Actions
    addService: 'සේවාවක් එක් කරන්න',
    addStaff: 'කාර්ය මණ්ඩල සේවකයෙක් එක් කරන්න',
    addBranch: 'ශාඛාවක් එක් කරන්න',
    exportReport: 'වාර්තාව බාගත කරන්න',
    cancel: 'අවලංගු කරන්න',
    save: 'සුරකින්න',
    delete: 'මකා දමන්න',
    moduleOverview: 'මොඩියුල දර්ශනය',
    staffRoster: 'කාර්ය මණ්ඩල ලැයිස්තුව',
    branchLocations: 'ශාඛා පිහිටීම්',

    // Insights & Forecast
    aiInsightsTitle: 'AI මඟින් මෙහෙයවනු ලබන කළමනාකරණ තොරතුරු',
    peakDemandWindow: 'අධික ඉල්ලුම පවතින කාලය',
    highWaitTimeAlert: 'වැඩි රැඳී සිටීමේ කාලය: හෘද රෝග අංශය',
    demandGrowth: 'ඉල්ලුමේ වර්ධනය',
    counterUtilization: 'කවුන්ටර භාවිතය',
    demandForecastTitle: 'ඉල්ලුම පුරෝකථනය — ඊළඟ මාස 3',
    servicePerformanceSummary: 'සේවා කාර්යසාධන සාරාංශය සහ AI පියවර',
    
    // Languages
    english: 'English',
    tamil: 'தமிழ் (Tamil)',
    sinhala: 'සිංහල (Sinhala)',
  }
};
