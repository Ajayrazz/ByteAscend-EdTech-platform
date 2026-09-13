import { Code2, Database, Globe, Layers, Cpu, Code, BookOpen } from "lucide-react";

export interface CourseLesson {
  id: string;
  title: string;
  type: "video" | "note" | "quiz";
  duration?: string;
  isLocked?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  durationHours: number;
  sectionsCount: number;
  originalPrice?: number;
  discountedPrice?: number;
  isSubscriptionOnly?: boolean;
  gradient: string;
  icon: any;
  about?: string;
  modules?: CourseModule[];
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Data Structures & Algorithms [ByteAscend RED]",
    description: "Master Data Structures and Algorithms in this comprehensive DSA Course...",
    durationHours: 284.5,
    sectionsCount: 41,
    originalPrice: 7000,
    discountedPrice: 4100,
    gradient: "from-red-500 to-rose-600",
    icon: Code2,
  },
  {
    id: "2",
    title: "Low Level Design BootCamp [SUPRA Batch]",
    description: "Master the art of designing scalable and efficient systems...",
    durationHours: 0.0,
    sectionsCount: 0,
    originalPrice: 4800,
    discountedPrice: 2199,
    gradient: "from-blue-500 to-indigo-600",
    icon: Layers,
  },
  {
    id: "3",
    title: "Web Development BootCamp [MERN STACK]",
    description: "Kickstart your journey to becoming a full-stack web developer...",
    durationHours: 0.0,
    sectionsCount: 0,
    originalPrice: 6000,
    discountedPrice: 3500,
    gradient: "from-emerald-400 to-teal-500",
    icon: Globe,
  },
  {
    id: "4",
    title: "Basics of C++ Programming",
    description: "Build a strong programming foundation with this beginner-friendly C++...",
    durationHours: 39.0,
    sectionsCount: 5,
    originalPrice: 3000,
    discountedPrice: 1,
    gradient: "from-blue-400 to-cyan-500",
    icon: Code,
  },
  {
    id: "5",
    title: "Basics of Java Programming",
    description: "Kickstart your programming journey with this beginner-friendly Java...",
    durationHours: 12.5,
    sectionsCount: 3,
    originalPrice: 3000,
    discountedPrice: 1,
    gradient: "from-orange-400 to-red-500",
    icon: Code,
  },
  {
    id: "6",
    title: "DBMS - Placement Sheet",
    description: "This Database Management Systems (DBMS) study sheet is designed for...",
    durationHours: 11.0,
    sectionsCount: 5,
    isSubscriptionOnly: true,
    gradient: "from-violet-600 to-purple-800",
    icon: Database,
  },
  {
    id: "7",
    title: "FREE Web dev Course",
    description: "FREE Web dev Course to get you started with HTML, CSS, and JS.",
    durationHours: 42.0,
    sectionsCount: 6,
    isSubscriptionOnly: true,
    gradient: "from-violet-600 to-purple-800",
    icon: Globe,
  },
  {
    id: "8",
    title: "OS for Interviews",
    description: "OS for Interviews: Everything you need to know about Operating Systems...",
    durationHours: 16.0,
    sectionsCount: 6,
    isSubscriptionOnly: true,
    gradient: "from-violet-600 to-purple-800",
    icon: Cpu,
  },
  {
    id: "9",
    title: "OOPS for Interviews",
    description: "OOPS for Interviews: Master Object-Oriented Programming concepts...",
    durationHours: 3.5,
    sectionsCount: 2,
    isSubscriptionOnly: true,
    gradient: "from-violet-600 to-purple-800",
    icon: BookOpen,
  },
  {
    id: "10",
    title: "GoAT DSA Course - by ByteAscend",
    description: "Master Data Structures & Algorithms from scratch. Cover everything...",
    durationHours: 193.5,
    sectionsCount: 23,
    isSubscriptionOnly: true,
    gradient: "from-violet-600 to-purple-800",
    icon: Code2,
  },
];
export const defaultSyllabus: CourseModule[] = [
  {
    id: "m1",
    title: "Module 1: Introduction & Basics",
    lessons: [
      { id: "l1", title: "Welcome to the Course", type: "video", duration: "10:00", isLocked: false },
      { id: "l2", title: "Setup and Installation", type: "video", duration: "15:30", isLocked: false },
      { id: "l3", title: "Cheat Sheet & Resources", type: "note", isLocked: false },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Core Concepts",
    lessons: [
      { id: "l4", title: "Understanding the Fundamentals", type: "video", duration: "45:00", isLocked: true },
      { id: "l5", title: "Advanced Techniques", type: "video", duration: "50:20", isLocked: true },
      { id: "l6", title: "Module Quiz", type: "quiz", isLocked: true },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Project Building",
    lessons: [
      { id: "l7", title: "Project Architecture Setup", type: "video", duration: "30:00", isLocked: true },
      { id: "l8", title: "Implementation Details", type: "video", duration: "1:20:00", isLocked: true },
      { id: "l9", title: "Final Source Code", type: "note", isLocked: true },
    ],
  }
];
