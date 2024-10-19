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

export const filterToServiceTypes: Record<FilterType, ServiceType[]> = {
  all: Object.values(ServiceType),
  writing: [
    ServiceType.RESEARCH_WRITING,
    ServiceType.BOOK_WRITING,
    ServiceType.BUSINESS_PLAN,
    ServiceType.SOP_WRITING,
  ],
  tutoring: [ServiceType.PERSONALIZED_TUTORING, ServiceType.EXAM_PREPARATION],
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
