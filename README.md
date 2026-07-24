import { EventItem, FacultyMember, Club, TimetableSlot, Testimonial, NotificationItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-poster-1',
    title: "Freshers' Welcome Party: Uncover The Plexus",
    date: '2026-10-12',
    time: '05:00 PM onwards',
    venue: 'THE HUB, Saranathan Campus',
    category: 'Cultural',
    description: "The grand official Freshers' Welcome Party - Uncover The Plexus! Powered by Google Gemini AI. Experience campus DJ night, AI interactive showcases, music, dance performances, and freshers awards spotlight.",
    image: '/saraconnect_poster.jpg',
    organizer: 'SaraConnect Student Council & Fine Arts Club',
    capacity: 1000,
    registeredCount: 780,
    featured: true,
  },
  {
    id: 'evt-1',
    title: 'AARAMBH 2026 - Freshers Welcome Orientation',
    date: '2026-08-05',
    time: '09:30 AM - 01:00 PM',
    venue: 'JS BLOCK Main Auditorium, Saranathan College',
    category: 'Cultural',
    description: 'The official mega welcome ceremony for the incoming Batch of 2026-2030 freshers! Keynote address by Principal Dr. D. Valavan, club performances, campus video showcase, and freshers talents spotlight.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
    organizer: 'Freshers Welfare Committee & Fine Arts Club',
    capacity: 600,
    registeredCount: 412,
    featured: true,
  },
  {
    id: 'evt-2',
    title: 'SaraHack \'26 - 24hr Freshers Hackathon',
    date: '2026-08-14',
    time: '10:00 AM onwards',
    venue: 'Advanced AI & IoT Centre, Mechanical Block 2nd Floor',
    category: 'Technical',
    description: 'Beginner-friendly hackathon designed specifically for 1st-year students. Build solutions in AI, Smart Web Apps, and IoT with mentorship from senior student developers!',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    organizer: 'SaraCode & IEEE Student Branch',
    capacity: 150,
    registeredCount: 98,
    featured: true,
  },
  {
    id: 'evt-3',
    title: 'RoboQuest \'26 - Hands-on Robotics Workshop',
    date: '2026-08-20',
    time: '01:30 PM - 04:30 PM',
    venue: 'ICE Department Mechatronics Lab',
    category: 'Workshop',
    description: 'Learn the fundamentals of Arduino programming, sensor interfacing, and building autonomous line-follower robots. Kit provided for team participation.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    organizer: 'Robotics & Automation Society (ICE & ECE)',
    capacity: 80,
    registeredCount: 65,
    featured: false,
  },
  {
    id: 'evt-4',
    title: 'Inter-Departmental Freshers Sports Fiesta',
    date: '2026-08-28',
    time: '07:30 AM - 05:00 PM',
    venue: 'Saranathan Central Sports Complex',
    category: 'Sports',
    description: 'Cricket, Football, Basketball, Volleyball, Chess, and Badminton matches for 1st year department teams. Trophies and certificates for winners!',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    organizer: 'Physical Education Dept & Sports Club',
    capacity: 400,
    registeredCount: 285,
    featured: true,
  },
  {
    id: 'evt-5',
    title: 'Rotaract Club Freshers Onboarding Drive',
    date: '2026-09-02',
    time: '03:15 PM - 05:00 PM',
    venue: 'Seminar Hall 2, IT Block',
    category: 'Club',
    description: 'Join Saranathan Rotaract Club to develop leadership skills, community service projects, blood donation drives, and international youth exchange programs.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    organizer: 'Rotaract Club of Saranathan College',
    capacity: 200,
    registeredCount: 140,
    featured: false,
  },
  {
    id: 'evt-6',
    title: 'Web Dev 101 - Zero to Hero in React & Tailwind',
    date: '2026-09-10',
    time: '02:00 PM - 04:30 PM',
    venue: 'CSE Computer Centre Lab 4',
    category: 'Workshop',
    description: 'Step-by-step practical masterclass on modern frontend web design. Learn HTML5, CSS3, JavaScript, and React basics to build your first portfolio website.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    organizer: 'Department of CSE & IT',
    capacity: 120,
    registeredCount: 110,
    featured: false,
  }
];

export const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. D. Valavan',
    designation: 'Principal & Professor',
    department: 'MECH',
    email: 'principal@saranathan.ac.in',
    phone: '+91 431 2473684',
    office: 'Principal Secretariat, Admin Block',
    qualification: 'M.E., Ph.D. (Thermal Engineering)',
    experience: '28+ Years in Academia & Research',
    avatar: '',
    researchInterests: ['Thermal Power', 'Renewable Energy', 'Engineering Pedagogy']
  },
  {
    id: 'fac-2',
    name: 'Dr. S.A. Sahaaya Arul Mary',
    designation: 'Professor & Head of Department',
    department: 'CSE',
    email: 'hodcse@saranathan.ac.in',
    office: 'Room 201, CSE Block 2nd Floor',
    qualification: 'M.E., Ph.D. (Computer Science)',
    experience: '22+ Years Teaching & Research',
    avatar: '',
    researchInterests: ['Artificial Intelligence', 'Data Mining', 'Cloud Computing']
  },
  {
    id: 'fac-3',
    name: 'Dr. M. Santhi',
    designation: 'Professor & Head of Department',
    department: 'ECE',
    email: 'hodece@saranathan.ac.in',
    office: 'Room 104, ECE Block Ground Floor',
    qualification: 'M.E., Ph.D. (VLSI Design)',
    experience: '24+ Years Experience',
    avatar: '',
    researchInterests: ['VLSI Signal Processing', 'Embedded Systems', 'Wireless Sensors']
  },
  {
    id: 'fac-4',
    name: 'Dr. C. Krishnakumar',
    designation: 'Professor & Head of Department',
    department: 'EEE',
    email: 'hodeee@saranathan.ac.in',
    office: 'Room 112, EEE Block 1st Floor',
    qualification: 'M.E., Ph.D. (Power Systems)',
    experience: '20+ Years Experience',
    avatar: '',
    researchInterests: ['Smart Grid Technology', 'High Voltage Engineering', 'Solar Energy']
  },
  {
    id: 'fac-5',
    name: 'Dr. R. Sumathi',
    designation: 'Professor & Head of Department',
    department: 'IT',
    email: 'hodit@saranathan.ac.in',
    office: 'Room 302, IT Block 3rd Floor',
    qualification: 'M.Tech., Ph.D. (Information Security)',
    experience: '19+ Years Experience',
    avatar: '',
    researchInterests: ['Cyber Security', 'Machine Learning', 'Blockchain']
  },
  {
    id: 'fac-6',
    name: 'Dr. A. Revathi',
    designation: 'Professor & Head of Department',
    department: 'CSBS',
    email: 'hodcsbs@saranathan.ac.in',
    office: 'Room 204, CSBS Block 2nd Floor',
    qualification: 'M.E., Ph.D. (Computer Science & Business Systems)',
    experience: '25+ Years Experience',
    avatar: '',
    researchInterests: ['Enterprise Systems', 'Business Analytics', 'Data Structures']
  },
  {
    id: 'fac-7',
    name: 'Dr. S.M. Girirajkumar',
    designation: 'Professor & Head of Department',
    department: 'ICE',
    email: 'hodice@saranathan.ac.in',
    office: 'Room 108, Instrumentation Block',
    qualification: 'M.E., Ph.D. (Process Control)',
    experience: '21+ Years Experience',
    avatar: '',
    researchInterests: ['Process Automation', 'Soft Computing', 'PLC & SCADA']
  },
  {
    id: 'fac-8',
    name: 'Dr. G. Mahesh',
    designation: 'Professor & Head of Department',
    department: 'MECH',
    email: 'hodmech@saranathan.ac.in',
    office: 'Room 205, Mechanical Block',
    qualification: 'M.E., Ph.D. (Manufacturing Systems)',
    experience: '23+ Years Experience',
    avatar: '',
    researchInterests: ['CAD/CAM', 'Additive Manufacturing', 'Industrial Robotics']
  }
];

export const TIMETABLE_DATA: Record<string, TimetableSlot[]> = {
  'CSE-Sem1': [
    { time: '08:45 AM - 09:35 AM', monday: 'Matrices & Calculus (MA3151)', tuesday: 'Engineering Physics (PH3151)', wednesday: 'Engineering Chemistry (CY3151)', thursday: 'Problem Solving & Python (GE3151)', friday: 'Heritage of Tamils (GE3152)' },
    { time: '09:35 AM - 10:25 AM', monday: 'Problem Solving & Python (GE3151)', tuesday: 'Matrices & Calculus (MA3151)', wednesday: 'Communicative English (HS3151)', thursday: 'Engineering Physics (PH3151)', friday: 'Matrices & Calculus (MA3151)' },
    { time: '10:40 AM - 11:30 AM', monday: 'Engineering Chemistry (CY3151)', tuesday: 'Problem Solving & Python (GE3151)', wednesday: 'Python Programming Lab', thursday: 'Communicative English (HS3151)', friday: 'Engineering Graphics (GE3153)' },
    { time: '11:30 AM - 12:20 PM', monday: 'Communicative English (HS3151)', tuesday: 'Engineering Chemistry (CY3151)', wednesday: 'Python Programming Lab', thursday: 'Matrices & Calculus (MA3151)', friday: 'Engineering Graphics (GE3153)' },
    { time: '01:15 PM - 02:05 PM', monday: 'Physics & Chemistry Lab', tuesday: 'Heritage of Tamils (GE3152)', wednesday: 'Engineering Physics (PH3151)', thursday: 'Library & Self-Study', friday: 'Problem Solving & Python (GE3151)' },
    { time: '02:05 PM - 02:55 PM', monday: 'Physics & Chemistry Lab', tuesday: 'Basic Electrical Engg (BE3151)', wednesday: 'Mentoring & Counselling Hour', thursday: 'Club Activities / Sports', friday: 'Communicative English (HS3151)' },
  ],
  'ECE-Sem1': [
    { time: '08:45 AM - 09:35 AM', monday: 'Engineering Physics (PH3151)', tuesday: 'Matrices & Calculus (MA3151)', wednesday: 'Problem Solving & Python (GE3151)', thursday: 'Engineering Chemistry (CY3151)', friday: 'Basic Electrical & Electronics' },
    { time: '09:35 AM - 10:25 AM', monday: 'Communicative English (HS3151)', tuesday: 'Engineering Physics (PH3151)', wednesday: 'Matrices & Calculus (MA3151)', thursday: 'Heritage of Tamils (GE3152)', friday: 'Problem Solving & Python (GE3151)' },
    { time: '10:40 AM - 11:30 AM', monday: 'Matrices & Calculus (MA3151)', tuesday: 'Python Programming Lab', wednesday: 'Engineering Graphics (GE3153)', thursday: 'Problem Solving & Python (GE3151)', friday: 'Engineering Physics (PH3151)' },
    { time: '11:30 AM - 12:20 PM', monday: 'Engineering Chemistry (CY3151)', tuesday: 'Python Programming Lab', wednesday: 'Engineering Graphics (GE3153)', thursday: 'Communicative English (HS3151)', friday: 'Matrices & Calculus (MA3151)' },
    { time: '01:15 PM - 02:05 PM', monday: 'Problem Solving & Python (GE3151)', tuesday: 'Communicative English (HS3151)', wednesday: 'Physics & Chemistry Lab', thursday: 'Engineering Chemistry (CY3151)', friday: 'Sports & Wellness' },
    { time: '02:05 PM - 02:55 PM', monday: 'Heritage of Tamils (GE3152)', tuesday: 'Library & Seminar', wednesday: 'Physics & Chemistry Lab', thursday: 'Mentoring Hour', friday: 'Club & Value Added Course' },
  ],
  'IT-Sem1': [
    { time: '08:45 AM - 09:35 AM', monday: 'Communicative English (HS3151)', tuesday: 'Matrices & Calculus (MA3151)', wednesday: 'Problem Solving & Python (GE3151)', thursday: 'Engineering Chemistry (CY3151)', friday: 'Engineering Physics (PH3151)' },
    { time: '09:35 AM - 10:25 AM', monday: 'Matrices & Calculus (MA3151)', tuesday: 'Engineering Physics (PH3151)', wednesday: 'Matrices & Calculus (MA3151)', thursday: 'Problem Solving & Python (GE3151)', friday: 'Heritage of Tamils (GE3152)' },
    { time: '10:40 AM - 11:30 AM', monday: 'Problem Solving & Python (GE3151)', tuesday: 'Engineering Chemistry (CY3151)', wednesday: 'Python Programming Lab', thursday: 'Communicative English (HS3151)', friday: 'Matrices & Calculus (MA3151)' },
    { time: '11:30 AM - 12:20 PM', monday: 'Engineering Physics (PH3151)', tuesday: 'Heritage of Tamils (GE3152)', wednesday: 'Python Programming Lab', thursday: 'Matrices & Calculus (MA3151)', friday: 'Engineering Chemistry (CY3151)' },
    { time: '01:15 PM - 02:05 PM', monday: 'Engineering Graphics (GE3153)', tuesday: 'Physics & Chemistry Lab', wednesday: 'Communicative English (HS3151)', thursday: 'Problem Solving & Python (GE3151)', friday: 'Library & Research' },
    { time: '02:05 PM - 02:55 PM', monday: 'Engineering Graphics (GE3153)', tuesday: 'Physics & Chemistry Lab', wednesday: 'Mentoring Hour', thursday: 'Sports & Games', friday: 'Value Added Course' },
  ],
  'AI & DS-Sem1': [
    { time: '08:45 AM - 09:35 AM', monday: 'Matrices & Linear Algebra', tuesday: 'Problem Solving & Python (GE3151)', wednesday: 'Engineering Physics (PH3151)', thursday: 'Communicative English (HS3151)', friday: 'Engineering Chemistry (CY3151)' },
    { time: '09:35 AM - 10:25 AM', monday: 'Problem Solving & Python (GE3151)', tuesday: 'Matrices & Linear Algebra', wednesday: 'Heritage of Tamils (GE3152)', thursday: 'Engineering Physics (PH3151)', friday: 'Matrices & Linear Algebra' },
    { time: '10:40 AM - 11:30 AM', monday: 'Engineering Chemistry (CY3151)', tuesday: 'Communicative English (HS3151)', wednesday: 'Data Science Fundamentals Lab', thursday: 'Problem Solving & Python (GE3151)', friday: 'Engineering Physics (PH3151)' },
    { time: '11:30 AM - 12:20 PM', monday: 'Communicative English (HS3151)', tuesday: 'Engineering Physics (PH3151)', wednesday: 'Data Science Fundamentals Lab', thursday: 'Matrices & Linear Algebra', friday: 'Engineering Chemistry (CY3151)' },
    { time: '01:15 PM - 02:05 PM', monday: 'Physics & Chemistry Lab', tuesday: 'Engineering Graphics (GE3153)', wednesday: 'Problem Solving & Python (GE3151)', thursday: 'Library & E-Journals', friday: 'AI & Data Ethics' },
    { time: '02:05 PM - 02:55 PM', monday: 'Physics & Chemistry Lab', tuesday: 'Engineering Graphics (GE3153)', wednesday: 'Mentoring Hour', thursday: 'Sports & Fitness', friday: 'Club Activity' },
  ]
};

export const CLUBS_DATA: Club[] = [
  {
    id: 'club-1',
    name: 'SaraCode - Coding & Tech Club',
    category: 'Technical',
    description: 'Fostering competitive programming, web development, open-source contributions, and AI innovations among engineering students.',
    mentor: 'Dr. S.A. Sahaaya Arul Mary',
    studentLead: 'Karthik Raja (Final Year CSE)',
    logo: '💻',
    membersCount: 380,
  },
  {
    id: 'club-2',
    name: 'Rotaract Club of Saranathan',
    category: 'Social Service & Leadership',
    description: 'Empowering freshers through youth leadership development, community service, environmental drives, and soft skills training.',
    mentor: 'Prof. N. Baskar',
    studentLead: 'Ananya S (Pre-Final Year ECE)',
    logo: '🌟',
    membersCount: 520,
  },
  {
    id: 'club-3',
    name: 'Fine Arts Club',
    category: 'Cultural & Arts',
    description: 'Unleashing creative talent in music, dance, theatrical drama, mime, photography, painting, and short filmmaking.',
    mentor: 'Dr. A. Revathi',
    studentLead: 'Vignesh M (Final Year MECH)',
    logo: '🎭',
    membersCount: 410,
  },
  {
    id: 'club-4',
    name: 'IEEE Student Branch (STB10061)',
    category: 'Professional & Research',
    description: 'Organizing international paper presentations, technical symposiums, robotics hackathons, and IEEE digital library access.',
    mentor: 'Dr. M. Santhi',
    studentLead: 'Deepak V (Final Year EEE)',
    logo: '⚡',
    membersCount: 290,
  },
  {
    id: 'club-5',
    name: 'National Service Scheme (NSS)',
    category: 'Community Service',
    description: 'Instilling civic responsibility, blood donation camps, village adoption projects, and tree plantation drives around Tiruchirappalli.',
    mentor: 'Dr. C. Krishnakumar',
    studentLead: 'Suresh Kumar (Final Year IT)',
    logo: '🤝',
    membersCount: 600,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Pooja Vishwanath',
    department: 'Computer Science and Engineering',
    batch: 'Batch of 2025',
    quote: 'As a fresher coming from another city, SaraConnect made my transition so smooth! The AI Assistant helped me find classrooms, lab timings, and campus bus routes effortlessly on my very first week.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'Placed at TCS Digital (7.5 LPA)'
  },
  {
    id: 'test-2',
    name: 'Rohan Sundaram',
    department: 'Electronics & Communication',
    batch: 'Batch of 2025',
    quote: 'Joining SaraCode through the freshers portal opened doors for me. The mentorship from faculty and senior buddies gave me the confidence to win hackathons!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'IEEE Student Chair & Developer'
  },
  {
    id: 'test-3',
    name: 'Kavitha R',
    department: 'Artificial Intelligence & Data Science',
    batch: 'Batch of 2026',
    quote: 'The campus facilities, Central Library e-resources, and state-of-the-art AI labs at Saranathan College are top tier. Registration for events takes less than 10 seconds!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    role: '1st Rank Holder in Sem 1'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Freshers Orientation Ceremony (AARAMBH 2026)',
    message: 'Mandatory reporting time for 1st year students on Aug 5th is 09:00 AM at JS Block Main Auditorium.',
    date: 'Today',
    type: 'urgent',
  },
  {
    id: 'notif-2',
    title: 'College Bus Pass & Identity Card Distribution',
    message: 'Collect your official Saranathan ID card and transport pass from Admin Block Counter 3.',
    date: 'Yesterday',
    type: 'general',
  },
  {
    id: 'notif-3',
    title: 'Central Library E-Resource Access Credentials',
    message: 'IEEE, ScienceDirect, and Digital Library credentials sent to your official @saranathan.ac.in email.',
    date: '2 days ago',
    type: 'academic',
  },
  {
    id: 'notif-4',
    title: 'SaraHack \'26 Registration Open',
    message: '24-hour beginner friendly hackathon for 1st years. Cash prizes up to ₹25,000!',
    date: '3 days ago',
    type: 'event',
  }
];

export const SARANATHAN_KNOWLEDGE_BASE = `
Saranathan College of Engineering (SCE) Information:
- Established: 1998 by Saranathan Academy of Higher Education.
- Location: Venkateswara Nagar, Trichy-Madurai Main Road, NH 45B, Panjappur, Tiruchirappalli, Tamil Nadu 620012.
- Affiliation: Affiliated to Anna University, Chennai; Approved by AICTE, New Delhi; Accredited by NAAC with A+ grade; NBA Accredited departments.
- Founder / Management: Founded in honor of the legendary educationist Sri Saranathan.
- Principal: Dr. D. Valavan (M.E., Ph.D.)
- Campus Phone: +91 431 2473684 / +91 8489915201
- Email: principal@saranathan.ac.in, admissions@saranathan.ac.in
- Official Website: https://saranathan.ac.in

Courses & Departments Offered:
1. B.E. Computer Science and Engineering (CSE) - HoD: Dr. S.A. Sahaaya Arul Mary
2. B.E. Electronics and Communication Engineering (ECE) - HoD: Dr. M. Santhi
3. B.E. Electrical and Electronics Engineering (EEE) - HoD: Dr. C. Krishnakumar
4. B.Tech. Information Technology (IT) - HoD: Dr. R. Sumathi
5. B.Tech. Artificial Intelligence and Data Science (AI & DS) - HoD: Dr. S.A. Sahaaya Arul Mary (In-charge)
6. B.E. Mechanical Engineering (MECH) - HoD: Dr. G. Mahesh
7. B.E. Instrumentation and Control Engineering (ICE) - HoD: Dr. S.M. Girirajkumar
8. M.B.A. Master of Business Administration - HoD: Dr. K. Rajkumar
9. M.C.A. Master of Computer Applications - HoD: Prof. N. Baskar
10. B.Tech. Computer Science and Business Systems (CSBS) - HoD: Dr. A. Revathi

Campus Facilities & Highlights:
- Central Library: Over 55,000 books, 150+ printed journals, IEEE ASPP e-journal subscriptions, 100+ high-speed digital computers for research.
- Transportation: 45+ GPS-tracked college buses covering every nook and corner of Trichy, Thanjavur, Pudukkottai, Lalgudi, and Manapparai.
- Food Court & Canteen: Hygienic vegetarian and non-vegetarian food, fresh juices, snacks, and spacious dining area.
- Hostel: Separate well-secured hostels for Boys and Girls with 24/7 warden security, RO purified drinking water, hot water, and Wi-Fi.
- Sports & Gym: Multi-sport outdoor grounds for Cricket, Football, Volleyball, Basketball, Track & Field, plus indoor stadium for Badminton, Table Tennis, and Gymnasium.
- Placement Record: Exceptional 90%+ placement rate with recruiters like TCS, Infosys, Cognizant, Wipro, Zoho, Accenture, L&T, Kaar Tech, Bosch, HCL.
- Clubs: SaraCode, Rotaract, Fine Arts, IEEE, NSS, YRC, EDC, Robotics Club, Sports Association.

Freshers Orientation & First Year Information:
- Regular College Timing: 08:45 AM to 04:30 PM (Lunch break: 12:20 PM to 01:15 PM).
- Attendance: Minimum 75% attendance mandatory as per Anna University norms.
- Dress Code: Formal wear with formal footwear/shoes. Formal shirt and trousers for boys; Salwar kameez / Churidar with dupatta for girls. Lab coats during practical sessions.
`;
[

![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)

](https://render.com/deploy?repo=https://github.com/YOUR_USERNAME/YOUR_REPO)
