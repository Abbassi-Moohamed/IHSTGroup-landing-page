import type { FloatCard, NavItem, Section } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Cambridge", target: "cambridge" },
  { label: "Clubs", target: "clubs" },
  { label: "Career", target: "career" },
  { label: "IB", target: "ib" },
  { label: "Language", target: "languages" },
  { label: "Systems", target: "systems" },
  { label: "Contact", target: "contact" },
];

export const HERO_COPY =
  "IHSTGroup blends premium Cambridge tutoring, future ready clubs, career mentorship, IB excellence, language mastery, and systems thinking into one elevated student journey.";

export const HERO_STATS = [
  { value: "98%", label: "Learner retention" },
  { value: "+200", label: "Elite students coached" },
  { value: "4.9/5", label: "Satisfaction rating" },
];

export const HERO_CARD_STATS = [
  { stat: "7x", label: "faster results" },
  { stat: "24/7", label: "support access" },
];

export const CTA_TEXT = {
  primaryTour: "Request a personalised tour",
  secondaryPathways: "Explore flagship pathways",
  contactButton: "Request a visit",
  submitForm: "Send enquiry",
};

export const HERO_TAGLINE = "New standard in bespoke education";

export const HERO_TITLE =
  "Transforming talent into confidence, curiosity, and global impact.";

export const HERO_CARD_TITLE = "A modern academy for high-achieving learners.";

export const HERO_CARD_DESCRIPTION =
  "Multi-dimensional tuition, visionary labs, and bespoke mentorship crafted to elevate every step of the student journey.";

export const HERO_CARD_TAG = "Premium learning hub";

export const HERO_FLOAT_CARDS: FloatCard[] = [
  {
    id: "one",
    tag: "Key benefit",
    title: "Bespoke pathways for every learner.",
    baseRotate: -3,
    positionClass: "left-3 top-3 w-36 sm:left-6 sm:top-5 sm:w-40 lg:left-10 lg:top-8 lg:w-44",
    idleOffset: {
      x: [0, 8, -8, 0],
      y: [0, -6, 6, 0],
      rotateZ: [-3, -1, -4, -3],
    },
  },
  {
    id: "two",
    tag: "Live immersion",
    title: "Labs, clubs, and coaching in one elevated experience.",
    baseRotate: 2,
    positionClass: "right-2 top-20 w-32 sm:right-2 sm:top-28 sm:w-34 lg:right-2 lg:top-36 lg:w-36",
    idleOffset: {
      x: [0, -10, 10, 0],
      y: [0, 7, -7, 0],
      rotateZ: [2, 4, 1, 2],
    },
  },
  {
    id: "three",
    tag: "Trusted excellence",
    title: "Proven outcomes for ambitious learners.",
    baseRotate: 3,
    positionClass: "right-3 bottom-6 w-36 sm:right-4 sm:bottom-8 sm:w-40 lg:right-6 lg:bottom-10 lg:w-48",
    idleOffset: {
      x: [0, 9, -9, 0],
      y: [0, -8, 8, 0],
      rotateZ: [3, 1, 4, 3],
    },
  },
];

export const HERO_IDLE_OFFSET = {
  x: [0, 6, -6, 0],
  y: [0, -5, 5, 0],
  rotateZ: [0.3, 0.6, -0.4, 0.3],
};

export const SECTIONS: Section[] = [
  {
    id: "cambridge",
    title: "Cambridge Tutoring Excellence",
    description:
      "Precision-focused coaching for Cambridge pathways, combining expert curriculum mastery with premium learning rituals and bespoke progress tracking.",
    highlights: [
      "A-Level & IGCSE mastery",
      "Individual learning roadmaps",
      "Real-time progress diagnostics",
    ],
  },
  {
    id: "clubs",
    title: "Clubs & Innovation Labs",
    description:
      "Curated clubs for bold young minds: Chess, STEM Robotics, and the AI Club Lab—each designed to ignite curiosity, strategy, and future-ready capabilities.",
    highlights: [
      "Strategic chess league",
      "Modern robotics prototyping",
      "AI lab projects & experimentation",
    ],
  },
  {
    id: "career",
    title: "IHS Career Institute",
    description:
      "A refined pathway into professional success with career coaching, portfolio mentoring, and applied skills for the next generation of global achievers.",
    highlights: [
      "Career mapping",
      "Industry-ready soft skills",
      "Executive presentation coaching",
    ],
  },
  {
    id: "ib",
    title: "IB Education Subsection",
    description:
      "A premium IB experience that balances academic rigor with wellbeing, ensuring every learner excels through structured planning and mentor-led guidance.",
    highlights: ["IA support", "TOK mastery", "Extended essay insights"],
  },
  {
    id: "languages",
    title: "Multilingual Language Studio",
    description:
      "Language journeys in English, Tamil, French, and Chinese—designed for confidence, fluency, and the cultural nuance essential in a global world.",
    highlights: [
      "Conversational fluency",
      "Exam-focused coaching",
      "Cultural immersion experiences",
    ],
  },
  {
    id: "systems",
    title: "TN_FR_CND Systems",
    description:
      "A modern systems curriculum with structured learning in Tamil, French, and Chinese systems, blending deep concept clarity with creative expression.",
    highlights: [
      "System-specific guidance",
      "Exam-ready preparation",
      "Cross-lingual competence",
    ],
  },
];

export const CLUBS_HEADER_TAG = "Club showcase";

export const CLUBS_HEADER_TITLE =
  "Experience the intelligence, strategy, and creativity of our clubs.";

export const CLUBS_HEADER_DESCRIPTION =
  "Chess, STEM Robotics, and AI Club Lab are designed for students who want to build deep thinking, technical fluency, and leadership through real-world projects.";

export const CLUBS_FEATURED = {
  tag: "Featured program",
  title: "AI Lab Immersion",
  description:
    "Build intelligent systems, explore creative AI use cases, and work with mentors on portfolio-worthy projects.",
};

export const CLUBS = [
  {
    title: "Chess League",
    description:
      "Develop strategic intuition, competitive resilience, and structured thinking through weekly matches.",
    accent: "#8B2720",
  },
  {
    title: "STEM Robotics",
    description:
      "Build robot prototypes, engineer solutions, and learn coding + hardware integration in a premium maker studio.",
    accent: "#1D4E89",
  },
  {
    title: "AI Club Lab",
    description:
      "Explore creativity with machine learning, data stories, and intelligent creative systems.",
    accent: "#B4473F",
  },
];

export const CONTACT_DESCRIPTION =
  "Contact our admissions team for guidance, pathway planning, and campus tours for Cambridge, IB, language, and career programs.";

export const CONTACT_INFO = {
  email: {
    label: "Email",
    value: "admissions@ihstgroup.com",
  },
  phone: {
    label: "Phone",
    value: "+1 234 567 890",
  },
};

export const PROGRAM_OPTIONS = [
  "Cambridge Tutoring",
  "IB Education",
  "Language Studio",
  "Career Institute",
  "Clubs & Labs",
];

export const FOOTER_COPYRIGHT = "© 2026 IHSTGroup. All rights reserved.";

export const FOOTER_LINKS = [
  { label: "Cambridge", href: "#cambridge" },
  { label: "Clubs", href: "#clubs" },
  { label: "Contact", href: "#contact" },
];

export const BRANDING = {
  name: "IHSTGroup",
  tagline: "Curated education for modern leaders",
  logo: "/ihs-logo.png",
};
