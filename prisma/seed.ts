import { PrismaClient, ServiceType } from "@prisma/client"; // Import ServiceType

const prisma = new PrismaClient();

const services = [
  {
    type: ServiceType.PERSONALIZED_TUTORING, // Use the enum value directly
    subject: "Mathematics",
    level: "High School",
    description:
      "Personalized tutoring sessions for high school math students.",
    price: 5000,
  },
  {
    type: ServiceType.EXAM_PREPARATION,
    subject: "Physics",
    level: "Undergraduate",
    description: "Physics exam preparation for university students.",
    price: 5000,
  },
  {
    type: ServiceType.PERSONALIZED_TUTORING,
    subject: "Biology",
    level: "High School",
    description: "One-on-one tutoring for high school biology students.",
    price: 5000,
  },
  {
    type: ServiceType.RESEARCH_WRITING,
    subject: "Physics",
    level: "Graduate",
    description:
      "Assistance with writing research papers for physics students.",
    price: 5000,
  },
  {
    type: ServiceType.BOOK_WRITING,
    subject: "Science Fiction",
    level: null,
    description: "Help with writing and editing science fiction novels.",
    price: 5000,
  },
  {
    type: ServiceType.BUSINESS_PLAN,
    subject: "Startups",
    level: null,
    description: "Business plan writing services for startup companies.",
    price: 5000,
  },
  {
    type: ServiceType.SOP_WRITING,
    subject: "Graduate School",
    level: null,
    description:
      "Writing statement of purpose (SOP) for graduate school applications.",
    price: 5000,
  },
  {
    type: ServiceType.EXAM_PREPARATION,
    subject: "Chemistry",
    level: "High School",
    description:
      "Exam preparation sessions for high school chemistry students.",
    price: 75000,
  },
  {
    type: ServiceType.PERSONALIZED_TUTORING,
    subject: "History",
    level: "Middle School",
    description: "One-on-one history tutoring for middle school students.",
    price: 5000,
  },
  {
    type: ServiceType.RESEARCH_WRITING,
    subject: "Economics",
    level: "Undergraduate",
    description: "Research writing support for economics undergraduates.",
    price: 50000,
  },
  {
    type: ServiceType.BOOK_WRITING,
    subject: "Memoirs",
    level: null,
    description: "Assistance with writing personal memoirs.",
    price: 6000,
  },
  {
    type: ServiceType.BUSINESS_PLAN,
    subject: "Small Businesses",
    level: null,
    description: "Comprehensive business plans for small businesses.",
    price: 5000,
  },
  {
    type: ServiceType.SOP_WRITING,
    subject: "MBA Programs",
    level: null,
    description: "SOP writing services tailored for MBA program applications.",
    price: 30000,
  },
  {
    type: ServiceType.EXAM_PREPARATION,
    subject: "Mathematics",
    level: "Undergraduate",
    description: "Exam preparation for university-level mathematics.",
    price: 5000,
  },
  {
    type: ServiceType.PERSONALIZED_TUTORING,
    subject: "English Literature",
    level: "High School",
    description:
      "Personalized tutoring for high school English literature students.",
    price: 15000,
  },
];

async function main() {
  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
  console.log("Seed data has been inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
