import {
  PrismaClient,
  QuestionType,
  SchoolLevel,
  ServiceType,
  SubjectArea,
} from "@prisma/client"; // Import ServiceType

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

// Add these to the tests array in the previous script
const additionalTests = [
  {
    title: "Calculus Midterm",
    description: "Comprehensive test covering differential calculus",
    schoolLevel: SchoolLevel.UNDERGRADUATE,
    subjectArea: SubjectArea.MATHEMATICS,
    topic: "Differential Calculus",
    grade: "First Year",
    timeLimit: 120,
    passingScore: 70,
    difficultyLevel: "Intermediate",
    isPublished: true,
    questions: {
      create: [
        {
          questionText: "What is the derivative of x²?",
          type: QuestionType.MULTIPLE_CHOICE,
          points: 2,
          order: 1,
          options: {
            create: [
              { optionText: "2x", isCorrect: true, order: 1 },
              { optionText: "x²", isCorrect: false, order: 2 },
              { optionText: "2", isCorrect: false, order: 3 },
              { optionText: "x", isCorrect: false, order: 4 },
            ],
          },
        },
        {
          questionText: "Is the derivative of a constant always zero?",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: true, order: 1 },
              { optionText: "False", isCorrect: false, order: 2 },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Physics Midterm",
    description: "Test covering fundamental concepts in mechanics",
    schoolLevel: SchoolLevel.UNDERGRADUATE,
    subjectArea: SubjectArea.SCIENCES,
    topic: "Mechanics",
    grade: "First Year",
    timeLimit: 90,
    passingScore: 60,
    difficultyLevel: "Intermediate",
    isPublished: true,
    questions: {
      create: [
        {
          questionText: "What is Newton's First Law of Motion?",
          type: QuestionType.MULTIPLE_CHOICE,
          points: 2,
          order: 1,
          options: {
            create: [
              { optionText: "Law of Inertia", isCorrect: true, order: 1 },
              { optionText: "Law of Acceleration", isCorrect: false, order: 2 },
              { optionText: "Law of Momentum", isCorrect: false, order: 3 },
              { optionText: "Law of Gravity", isCorrect: false, order: 4 },
            ],
          },
        },
        {
          questionText: "Acceleration due to gravity is a constant.",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: true, order: 1 },
              { optionText: "False", isCorrect: false, order: 2 },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Intro to Business Quiz",
    description: "Basics of business concepts for high school students",
    schoolLevel: SchoolLevel.HIGH_SCHOOL,
    subjectArea: SubjectArea.BUSINESS,
    topic: "Introduction to Business",
    grade: "10th Grade",
    timeLimit: 60,
    passingScore: 50,
    difficultyLevel: "Beginner",
    isPublished: true,
    questions: {
      create: [
        {
          questionText:
            "Which of the following is a type of business organization?",
          type: QuestionType.MULTIPLE_CHOICE,
          points: 1,
          order: 1,
          options: {
            create: [
              { optionText: "Sole Proprietorship", isCorrect: true, order: 1 },
              { optionText: "Corporation", isCorrect: true, order: 2 },
              { optionText: "Association", isCorrect: false, order: 3 },
              { optionText: "All of the above", isCorrect: true, order: 4 },
            ],
          },
        },
        {
          questionText:
            "True or False: The primary goal of a business is to generate profit.",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: true, order: 1 },
              { optionText: "False", isCorrect: false, order: 2 },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Basic Algebra Test",
    description: "Assessment on fundamental algebra concepts",
    schoolLevel: SchoolLevel.SECONDARY,
    subjectArea: SubjectArea.MATHEMATICS,
    topic: "Algebra",
    grade: "7th Grade",
    timeLimit: 45,
    passingScore: 55,
    difficultyLevel: "Beginner",
    isPublished: false,
    questions: {
      create: [
        {
          questionText: "What is the solution to the equation 2x + 3 = 7?",
          type: QuestionType.MULTIPLE_CHOICE,
          points: 1,
          order: 1,
          options: {
            create: [
              { optionText: "x = 2", isCorrect: true, order: 1 },
              { optionText: "x = 3", isCorrect: false, order: 2 },
              { optionText: "x = 4", isCorrect: false, order: 3 },
              { optionText: "x = 5", isCorrect: false, order: 4 },
            ],
          },
        },
        {
          questionText: "Is x² always positive for any real number x?",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: true, order: 1 },
              { optionText: "False", isCorrect: false, order: 2 },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Physics Midterm",
    description: "Test covering fundamental concepts in mechanics",
    schoolLevel: SchoolLevel.UNDERGRADUATE,
    subjectArea: SubjectArea.SCIENCES,
    topic: "Mechanics",
    grade: "First Year",
    timeLimit: 90,
    passingScore: 60,
    difficultyLevel: "Intermediate",
    isPublished: true,
    questions: {
      create: [
        {
          questionText: "What is Newton's First Law of Motion?",
          type: QuestionType.MULTIPLE_CHOICE,
          points: 2,
          order: 1,
          options: {
            create: [
              { optionText: "Law of Inertia", isCorrect: true, order: 1 },
              { optionText: "Law of Acceleration", isCorrect: false, order: 2 },
              { optionText: "Law of Momentum", isCorrect: false, order: 3 },
              { optionText: "Law of Gravity", isCorrect: false, order: 4 },
            ],
          },
        },
        {
          questionText: "Acceleration due to gravity is a constant.",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: true, order: 1 },
              { optionText: "False", isCorrect: false, order: 2 },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Intro to Business Quiz",
    description: "Basics of business concepts for high school students",
    schoolLevel: SchoolLevel.HIGH_SCHOOL,
    subjectArea: SubjectArea.BUSINESS,
    topic: "Introduction to Business",
    grade: "10th Grade",
    timeLimit: 60,
    passingScore: 50,
    difficultyLevel: "Beginner",
    isPublished: true,
    questions: {
      create: [
        {
          questionText:
            "Which of the following is a type of business organization?",
          type: QuestionType.MULTIPLE_SELECT,
          points: 1,
          order: 1,
          options: {
            create: [
              { optionText: "Sole Proprietorship", isCorrect: true, order: 1 },
              { optionText: "Corporation", isCorrect: true, order: 2 },
              { optionText: "Association", isCorrect: false, order: 3 },
              { optionText: "All of the above", isCorrect: true, order: 4 },
            ],
          },
        },
        {
          questionText:
            "True or False: The primary goal of a business is to generate profit.",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: true, order: 1 },
              { optionText: "False", isCorrect: false, order: 2 },
            ],
          },
        },
      ],
    },
  },
  {
    title: "Basic Chemistry Quiz",
    description: "Introduction to fundamental concepts in chemistry",
    schoolLevel: SchoolLevel.SECONDARY,
    subjectArea: SubjectArea.SCIENCES,
    topic: "Chemistry Basics",
    grade: "8th Grade",
    timeLimit: 45,
    passingScore: 60,
    difficultyLevel: "Beginner",
    isPublished: true,
    questions: {
      create: [
        {
          questionText: "What is the chemical formula for water?",
          type: QuestionType.MULTIPLE_CHOICE,
          points: 1,
          order: 1,
          options: {
            create: [
              { optionText: "H2O", isCorrect: true, order: 1 },
              { optionText: "O2", isCorrect: false, order: 2 },
              { optionText: "CO2", isCorrect: false, order: 3 },
              { optionText: "H2SO4", isCorrect: false, order: 4 },
            ],
          },
        },
        {
          questionText: "Is water an element?",
          type: QuestionType.TRUE_FALSE,
          points: 1,
          order: 2,
          options: {
            create: [
              { optionText: "True", isCorrect: false, order: 1 },
              { optionText: "False", isCorrect: true, order: 2 },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  for (const service of additionalTests) {
    await prisma.test.create({
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
