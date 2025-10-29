import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      welcome: 'Welcome',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      
      // Student
      checkIn: 'Check In',
      myClasses: 'My Classes',
      attendance: 'Attendance',
      viewDetails: 'View Details',
      present: 'Present',
      absent: 'Absent',
      
      // Lecturer
      startSession: 'Start Session',
      stopSession: 'Stop Session',
      generateQR: 'Generate QR Code',
      reports: 'Reports',
      analytics: 'Analytics',
      
      // Admin
      campusManagement: 'Campus Management',
      userManagement: 'User Management',
      systemSettings: 'System Settings',
      
      // Check-in Flow
      faceVerification: 'Face Verification',
      scanQRCode: 'Scan QR Code',
      locationCheck: 'Location Check',
      deviceCheck: 'Device Check',
      success: 'Success',
      
      // Messages
      checkInSuccess: 'Check-in successful!',
      checkInFailed: 'Check-in failed. Please try again.',
      locationDenied: 'Location permission denied',
      cameraError: 'Camera access denied',
    },
  },
  km: {
    translation: {
      // Common
      welcome: 'សូមស្វាគមន៍',
      login: 'ចូលប្រើប្រាស់',
      logout: 'ចាកចេញ',
      register: 'ចុះឈ្មោះ',
      email: 'អ៊ីមែល',
      password: 'ពាក្យសម្ងាត់',
      forgotPassword: 'ភ្លេចពាក្យសម្ងាត់?',
      dashboard: 'ផ្ទាំងគ្រប់គ្រង',
      profile: 'ប្រវត្តិរូប',
      settings: 'ការកំណត់',
      
      // Student
      checkIn: 'ចូលរៀន',
      myClasses: 'ថ្នាក់របស់ខ្ញុំ',
      attendance: 'វត្តមាន',
      viewDetails: 'មើលព័ត៌មានលម្អិត',
      present: 'មាន',
      absent: 'អវត្តមាន',
      
      // Lecturer
      startSession: 'ចាប់ផ្តើមវគ្គសិក្សា',
      stopSession: 'បញ្ឈប់វគ្គសិក្សា',
      generateQR: 'បង្កើត QR កូដ',
      reports: 'របាយការណ៍',
      analytics: 'វិភាគ',
      
      // Admin
      campusManagement: 'គ្រប់គ្រងស្ថាប័ន',
      userManagement: 'គ្រប់គ្រងអ្នកប្រើប្រាស់',
      systemSettings: 'ការកំណត់ប្រព័ន្ធ',
      
      // Check-in Flow
      faceVerification: 'ផ្ទៀងផ្ទាត់មុខ',
      scanQRCode: 'ស្កេន QR កូដ',
      locationCheck: 'ពិនិត្យទីតាំង',
      deviceCheck: 'ពិនិត្យឧបករណ៍',
      success: 'ជោគជ័យ',
      
      // Messages
      checkInSuccess: 'ចូលរៀនបានជោគជ័យ!',
      checkInFailed: 'ចូលរៀនបរាជ័យ។ សូមព្យាយាមម្តងទៀត។',
      locationDenied: 'ការអនុញ្ញាតទីតាំងត្រូវបានបដិសេធ',
      cameraError: 'ការចូលប្រើកាមេរ៉ាត្រូវបានបដិសេធ',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
