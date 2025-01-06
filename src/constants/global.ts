import { Service, ServiceType } from "@prisma/client";
export type FilterType = "all" | "writing" | "tutoring";

export interface ServicesResponse {
  status: number;
  message: string;
  data: Service[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface PaystackInitialize {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  receipt_number: string | null;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: any;
  log: {
    start_time: number;
    time_spent: number;
    attempts: number;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: any[];
    history: {
      type: string;
      message: string;
      time: number;
    }[];
  };
  fees: number;
  fees_split: any | null;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string | null;
  };
  customer: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: string | null;
    risk_action: string;
    international_format_phone: string | null;
  };
  plan: any | null;
  split: any;
  order_id: string | null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: any | null;
  source: any | null;
  fees_breakdown: any | null;
  connect: any | null;
  transaction_date: string;
  plan_object: any;
  subaccount: any;
}

export interface PaystackVerify {
  status: boolean;
  message: string;
  data: PaystackVerifyData;
}

export const filterToServiceTypes: Record<FilterType, ServiceType[]> = {
  all: Object.values(ServiceType),
  writing: [
    ServiceType.RESEARCH_WRITING,
    ServiceType.BOOK_WRITING,
    ServiceType.BUSINESS_PLAN,
    ServiceType.SOP_WRITING,
  ],
  tutoring: [ServiceType.PERSONALIZED_TUTORING],
};

export function getServiceTitle(serviceType: ServiceType): string {
  if (filterToServiceTypes.writing.includes(serviceType)) {
    return "writing";
  } else if (filterToServiceTypes.tutoring.includes(serviceType)) {
    return "tutoring";
  } else {
    return "unknown";
  }
}

export function formatServiceType(serviceType: string): string {
  // Replace underscores with spaces and capitalize words
  return serviceType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export interface TestWithAttempts {
  completedAt: Date | null;
  id: string;
  score: number | null;
  testId: string;
  test: Quiz;
  userId: string;
  status: string;
  startedAt: Date;
}
export interface Quiz {
  createdAt: Date;
  description: string | null;
  difficultyLevel: string | null;
  grade: string | null;
  id: string;
  isPublished: boolean;
  metadata: any;
  passingScore: number | null;
  questions: Question[];
  schoolLevel: string;
  subjectArea: string;
  timeLimit: number | null;
  title: string;
  topic: string | null;
  updatedAt: Date;
}

export interface Question {
  id: string;
  testId: string;
  questionText: string;
  type: string;
  points: number;
}
