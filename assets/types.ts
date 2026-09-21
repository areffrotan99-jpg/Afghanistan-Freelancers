export type Currency = 'USD' | 'EUR' | 'GBP' | 'AFN';

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  link?: string;
  tags: string[];
}

export interface Review {
  id: string;
  projectTitle: string;
  clientName: string;
  clientCountry: string;
  clientFlag: string;
  rating: number;
  review: string;
  date: string;
  amount: number;
  duration: string;
}

export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  province: string;
  verified: boolean;
  englishLevel: 'Conversational' | 'Fluent' | 'Native or Bilingual';
  rating: number;
  reviewCount: number;
  hourlyRate: number; // in USD
  totalEarned: number; // in USD
  jobSuccess: number; // percentage, e.g. 99
  badges: string[];
  category: string;
  skills: string[];
  bio: string;
  languages: { language: string; level: string }[];
  availability: 'Available now' | 'Part-time' | 'Full-time' | 'In a few weeks';
  completedProjectsCount: number;
  hoursWorked: number;
  portfolio: PortfolioItem[];
  reviews: Review[];
  education: { degree: string; institution: string; year: string }[];
  certifications: string[];
}

export interface Job {
  id: string;
  title: string;
  clientName: string;
  clientCountry: string;
  clientFlag: string;
  paymentVerified: boolean;
  spentAmount: number;
  postedTime: string;
  category: string;
  budgetType: 'Fixed' | 'Hourly';
  budgetMin: number; // in USD
  budgetMax: number; // in USD
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  skills: string[];
  description: string;
  proposalsCount: number;
  duration: string;
  deadline?: string;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerName: string;
  bidAmount: number;
  coverLetter: string;
  deliveryDays: number;
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  count: number;
  avgHourlyRate: number;
  description: string;
  popularSkills: string[];
}
