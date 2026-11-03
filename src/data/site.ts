import mtemsLogo from "@/assets/mtems-logo.png.asset.json";
import foundationLogo from "@/assets/dhanlaxmi-foundation-logo.png.asset.json";
import heroSchool from "@/assets/hero-school.jpg";
import classroom from "@/assets/classroom.jpg";
import campusActivities from "@/assets/campus-activities.jpg";
import schoolLibrary from "@/assets/school-library.jpg";

export const images = {
  mtemsLogo,
  foundationLogo,
  heroSchool,
  classroom,
  campusActivities,
  schoolLibrary,
};

export const school = {
  name: "Mother Teresa English Medium School",
  shortName: "MTEMS",
  managedBy: "Shree Dhanlaxmi Foundation, Karad",
  location: "Malwadi (Masur), Tal. Karad, Dist. Satara, Maharashtra",
  shortLocation: "Malwadi (Masur), Karad, Satara",
  udiseCode: "27310211807",
  instituteCode: "273102SC075",
  levels: "Nursery to Standard 12",
  schoolType: "Self-Financed English Medium School",
  phone: "+91 XXXXX XXXXX",
  email: "info@school.in",
};

export type Stage = {
  id: string;
  label: string;
  standards: string;
  heading: string;
  description: string;
  highlights: string[];
  image: string;
};

export const stages: Stage[] = [
  {
    id: "pre-primary",
    label: "Pre-Primary",
    standards: "Nursery · Junior KG · Senior KG",
    heading: "First Steps, Full of Wonder",
    description:
      "Our early years programme builds school-readiness through play, stories, rhythm and hands-on discovery — a warm, caring first experience of learning away from home.",
    highlights: [
      "Play-based, activity-led learning",
      "Language, rhythm and early numeracy",
      "Gentle routines that build confidence",
      "Caring, attentive early-years teachers",
    ],
    image: classroom,
  },
  {
    id: "primary",
    label: "Primary",
    standards: "Standards 1 – 5",
    heading: "Strong Foundations, Joyful Days",
    description:
      "In the primary years, children build core skills in English, Marathi, Mathematics and Environmental Studies, supported by regular reading, activity and exploration.",
    highlights: [
      "Foundational literacy and numeracy",
      "Daily reading and speaking practice",
      "Activity-based concept learning",
      "Encouraging classroom participation",
    ],
    image: schoolLibrary,
  },
  {
    id: "middle",
    label: "Middle School",
    standards: "Standards 6 – 8",
    heading: "Curiosity Turns Into Capability",
    description:
      "Middle school students take on deeper academic work while exploring projects, experiments and clubs that help them discover what they love doing.",
    highlights: [
      "Subject-wise academic depth",
      "Project and experiment-based learning",
      "Digital learning exposure",
      "Teamwork through activities and clubs",
    ],
    image: campusActivities,
  },
  {
    id: "secondary",
    label: "Secondary",
    standards: "Standards 9 – 10",
    heading: "Focus, Discipline and Direction",
    description:
      "These years prepare students for board examinations with structured study, regular assessment and personal guidance from committed teachers.",
    highlights: [
      "Structured board-exam preparation",
      "Regular tests and progress reviews",
      "Personal academic guidance",
      "Study skills and exam confidence",
    ],
    image: heroSchool,
  },
  {
    id: "higher-secondary",
    label: "Higher Secondary",
    standards: "Standards 11 – 12",
    heading: "Ready for the World Ahead",
    description:
      "Higher secondary education guides young adults toward their next step after school. Stream details will be published here once confirmed by the school.",
    highlights: [
      "Guided academic mentoring",
      "Career and further-study direction",
      "Independent learning habits",
      "Stream details to be announced",
    ],
    image: classroom,
  },
];

export const values = [
  {
    title: "Student-Centred Learning",
    description:
      "Every child learns differently. Our teachers adapt lessons to how each student best understands, participates and grows.",
  },
  {
    title: "Strong Academic Foundation",
    description:
      "Clear concepts, regular practice and honest feedback build the academic base children carry for life.",
  },
  {
    title: "Creative Exploration",
    description:
      "Art, music, craft and open-ended projects give children room to imagine, question and create.",
  },
  {
    title: "Character & Values",
    description:
      "Discipline, kindness, respect and responsibility are practised daily — not just taught from a book.",
  },
  {
    title: "Digital Learning",
    description:
      "Age-appropriate technology helps students become confident, careful users of the digital world.",
  },
  {
    title: "Holistic Development",
    description:
      "Sports, cultural activities and community life develop the whole child — mind, body and heart.",
  },
];

export const facilities = [
  { id: "classrooms", label: "Classrooms", description: "Bright, well-ventilated learning spaces.", image: classroom, span: "large" },
  { id: "library", label: "Library", description: "Stories, reference books and quiet reading.", image: schoolLibrary, span: "tall" },
  { id: "sports", label: "Sports & Activities", description: "Games and physical education for every age.", image: campusActivities, span: "wide" },
  { id: "campus", label: "School Campus", description: "A safe, open environment to learn and play.", image: heroSchool, span: "small" },
];

export const lifeBeyond = [
  { id: "sports", label: "Sports", line: "Running, jumping, competing — and learning to win and lose with grace." },
  { id: "art", label: "Art & Craft", line: "Colour, clay and creativity — where imagination does the homework." },
  { id: "cultural", label: "Cultural Activities", line: "Song, dance and drama that build confidence on and off the stage." },
  { id: "celebrations", label: "Celebrations", line: "Festivals and special days that keep school full of joy." },
  { id: "competitions", label: "Competitions", line: "Friendly contests that spark effort, teamwork and pride." },
  { id: "events", label: "Educational Events", line: "Exhibitions, field visits and talks that open new windows." },
];

export const achievements = [
  { id: "a1", title: "Academic Progress", value: "Growing", detail: "Students across standards show steady year-on-year academic improvement.", kind: "milestone" },
  { id: "a2", title: "Competitions", value: "Active", detail: "Students regularly participate in inter-school and community competitions.", kind: "competition" },
  { id: "a3", title: "Community Initiatives", value: "Ongoing", detail: "School-led community activities connect learning with local life.", kind: "community" },
  { id: "a4", title: "School Awards", value: "To Follow", detail: "Verified school awards and milestones will be published here.", kind: "award" },
];

export type NewsItem = {
  id: string;
  title: string;
  category: "Events" | "Notices" | "Activities";
  date: string;
  excerpt: string;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Admission enquiries open for the new academic year",
    category: "Notices",
    date: "2026-11-02",
    excerpt: "Parents may register admission enquiries at the school office. Enquiry form available on the Admissions page.",
  },
  {
    id: "n2",
    title: "Annual Sports Day preparations begin",
    category: "Events",
    date: "2026-10-28",
    excerpt: "Practice for the annual sports meet has started across all standards. Schedule will be shared shortly.",
  },
  {
    id: "n3",
    title: "Science & craft exhibition planned this term",
    category: "Activities",
    date: "2026-10-20",
    excerpt: "Students are preparing working models and craft projects for the upcoming school exhibition.",
  },
  {
    id: "n4",
    title: "Parent–teacher meeting announcement",
    category: "Notices",
    date: "2026-10-12",
    excerpt: "Class-wise parent–teacher meeting dates will be announced by class teachers. Kindly attend.",
  },
  {
    id: "n5",
    title: "Cultural day celebration",
    category: "Events",
    date: "2026-10-05",
    excerpt: "Song, dance and drama performances by students across standards made the day memorable.",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Demo — Parent of a Standard 3 student",
    role: "Parent",
    quote:
      "Sample testimonial: the teachers know every child by name and the school keeps parents informed at every step.",
  },
  {
    id: "t2",
    name: "Demo — Student, Standard 9",
    role: "Student",
    quote:
      "Sample testimonial: lessons are clear, teachers are supportive, and there is always something new to try.",
  },
  {
    id: "t3",
    name: "Demo — Parent of a Pre-Primary student",
    role: "Parent",
    quote:
      "Sample testimonial: my child runs to school happily every morning — that says everything.",
  },
];

export const noticeCategories = ["All", "Events", "Notices", "Activities"] as const;
