export interface UserSession {
  role: 'student' | 'admin';
  name: string;
  registerNo?: string;
  department?: Department;
  email?: string;
  loginTime: string;
}

export type Department = 
  | 'CSE' 
  | 'ECE' 
  | 'EEE' 
  | 'IT' 
  | 'AI & DS' 
  | 'MECH' 
  | 'ICE' 
  | 'MBA' 
  | 'MCA' 
  | 'CSBS';

export interface EventItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD or formatted
  time: string;
  venue: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop' | 'Club';
  description: string;
  image: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  featured?: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: Department;
  email: string;
  phone?: string;
  office: string;
  qualification: string;
  experience: string;
  avatar?: string;
  researchInterests?: string[];
}

export interface StudentRegistration {
  id: string;
  name: string;
  registerNo: string;
  department: Department;
  year: string;
  email: string;
  phone: string;
  eventId: string;
  eventTitle: string;
  timestamp: string;
}

export interface TimetableSlot {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  mentor: string;
  studentLead: string;
  logo: string;
  membersCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'urgent' | 'event' | 'academic' | 'general';
}

export interface Testimonial {
  id: string;
  name: string;
  department: string;
  batch: string;
  quote: string;
  avatar: string;
  role: string;
}
