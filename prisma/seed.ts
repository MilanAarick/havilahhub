import {
  PrismaClient,
  QuestionType,
  SchoolLevel,
  ServiceType,
  SubjectArea,
} from "@prisma/client"; // Import ServiceType

const prisma = new PrismaClient();

// export const services = [
//   {
//     type: ServiceType.RESEARCH_WRITING,
//     subject: "Research Writing",
//     description:
//       "High-quality content writing tailored to your requirements. No revisions included.",
//     addOn:
//       "Final-year BSc. research projects at a flat rate of ₦100,000 (a 52.25% discount from the regular rate).",
//     addOnPrice: 100000,
//     ResearchAndAssignmentPlans: {
//       basic: {
//         discription:
//           "High-quality content writing tailored to your requirements. No revisions included.",
//         price: 41.89,
//       },
//       standard: {
//         discription:
//           "Includes content writing with 3 revisions and support for advanced data analysis if required.",
//         price: 52.36,
//       },
//       premium: {
//         discription:
//           "Covers technical fields requiring advanced data analysis, coding, or urgent deadlines. Includes multiple revisions.",
//         price: 62.83,
//       },
//     },
//   },
//   {
//     type: ServiceType.ASSIGNMENT_HELP,
//     subject: "Assignment Help",
//     description:
//       "Simple assignments with clear instructions. No revisions included.",
//     ResearchAndAssignmentPlans: {
//       basic: {
//         discription:
//           "Simple assignments with clear instructions. No revisions included.",
//         price: 41.89,
//       },
//       standard: {
//         discription:
//           "Advanced assignments, including case studies, with up to 2 revisions.",
//         price: 52.36,
//       },
//       premium: {
//         discription:
//           "Priority service for complex assignments or urgent deadlines (delivery < 48 hours).",
//         price: 62.83,
//       },
//     },
//   },
//   {
//     type: ServiceType.BOOK_WRITING,
//     subject: "Book Writing",
//     description: "High-quality manuscript draft only.",
//     bookWritingPlans: {
//       plan1: {
//         length: "10,000 - 19,999 words",
//         basic: {
//           price: 418900,
//           description: "₦418,900 - High-quality manuscript draft only.",
//         },
//         standard: {
//           price: 523625,
//           description: "₦523,625 - Includes manuscript + 3 revisions.",
//         },
//         premium: {
//           price: 628300,
//           description: "₦628,300 - Manuscript, revisions, expedited delivery.",
//         },
//       },
//       plan2: {
//         length: "20,000 - 49,999 words",
//         basic: {
//           price: 1256700,
//           description: "₦1,256,700 - High-quality manuscript draft only.",
//         },
//         standard: {
//           price: 1570875,
//           description: "₦1,570,875 - Includes Manuscript + 3 revisions.",
//         },
//         premium: {
//           price: 1885050,
//           description:
//             "₦1,885,050 - Manuscript, revisions, expedited delivery.",
//         },
//       },
//       plan3: {
//         length: "50,000 - 99,999 words",
//         basic: {
//           price: 2513400,
//           description: "₦2,513,400 - High-quality manuscript draft only.",
//         },
//         standard: {
//           price: 3141750,
//           description: "₦3,141,750 - Includes Manuscript + 3 revisions.",
//         },
//         premium: {
//           price: 3770100,
//           description:
//             "₦3,770,100 - Manuscript, revisions, expedited delivery.",
//         },
//       },
//       plan4: {
//         length: "100,000 + words",
//         basic: {
//           price: 5026800,
//           description: "₦5,026,800 - High-quality manuscript draft only.",
//         },
//         standard: {
//           price: 6283500,
//           description: "₦6,283,500 - Includes Manuscript + 3 revisions.",
//         },
//         premium: {
//           price: 7540200,
//           description:
//             "₦7,540,200 - Manuscript, revisions, expedited delivery.",
//         },
//       },
//     },
//     addOn: "Ghostwriting services (confidentiality surcharge): +25%",
//   },
//   {
//     type: ServiceType.BUSINESS_PLAN,
//     subject: "Business Plans & SOPs",
//     description: "Simple Business Plan",
//     businessPlans: {
//       simple: {
//         basic: 180000,
//         standard: 250000,
//         premium: 300000,
//       },
//       standard: {
//         basic: 450000,
//         standard: 650000,
//         premium: 800000,
//       },
//       comprehensive: {
//         basic: 1200000,
//         standard: 1500000,
//         premium: 2000000,
//       },
//     },
//     addOn:
//       "SOP Writing - Flat rate ₦60,000 (only available for standard and premium packages).",
//     addOnPrice: 60000,
//   },
//   {
//     type: ServiceType.SOP_WRITING,
//     subject: "Statement of Purpose Writing",
//     description:
//       "Flat Rate: ₦55,000. Revisions: Two free edits; additional edits at +₦5,500 each. Rush Orders: +20% for 24-48 hour delivery.",
//     sopPlans: {
//       flatRate: 55000,
//       revisions: "Two free edits; additional edits at +₦5,500 each.",
//       rushOrders: "+20% for 24-48 hour delivery.",
//     },
//   },
//   {
//     type: ServiceType.PROOFREADING,
//     subject: "Proofreading and Corrections",
//     description:
//       "Detailed proofreading and corrections for documents of any size or complexity.",
//     proofreadingPlans: {
//       customQuotes:
//         "Custom quotes available upon request (quotes are available within 15 minutes of request).",
//     },
//   },
//   {
//     type: ServiceType.PUBLISHING,
//     subject: "Publishing Packages",
//     description: "Manuscript Review Only",
//     publishingPlans: {
//       level1: {
//         description: "Manuscript Review Only",
//         basic: 100000,
//         standard: 0,
//         premium: 0,
//       },
//       level2: {
//         description: "Self-Publishing Support",
//         basic: 0,
//         standard: 450000,
//         premium: 650000,
//       },
//       level3: {
//         description: "Traditional Submission",
//         basic: 0,
//         standard: 350000,
//         premium: 500000,
//       },
//     },
//   },
// ];

// const tutoring = [
//   {
//     type: ServiceType.PERSONALIZED_TUTORING,
//     subject: "General Subjects (Physical)",
//     twoDaysPrice: 80000,
//     threeDaysPrice: 100000,
//     fiveDaysPrice: 120000,
//   },
//   {
//     type: ServiceType.PERSONALIZED_TUTORING,
//     subject: "General Subjects (Online)",
//     twoDaysPrice: 50000,
//     threeDaysPrice: 65000,
//     fiveDaysPrice: 80000,
//   },

//   {
//     type: ServiceType.PERSONALIZED_TUTORING,
//     subject: "Arts & Music",
//     twoDaysPrice: 100000,
//     threeDaysPrice: 130500,
//     fiveDaysPrice: 165500,
//   },
//   {
//     type: ServiceType.PERSONALIZED_TUTORING,
//     subject: "International Languages",
//     twoDaysPrice: 95000,
//     threeDaysPrice: 125000,
//     fiveDaysPrice: 155000,
//   },
//   {
//     type: ServiceType.PERSONALIZED_TUTORING,
//     subject: "Computer & Coding",
//     twoDaysPrice: 105000,
//     threeDaysPrice: 145500,
//     fiveDaysPrice: 195500,
//   },
// ];

const tests = [
  {
    schoolLevel: SchoolLevel.PRIMARY,
    subjectArea: SubjectArea.MATHEMATICS,
    questions: {
      create: [
        {
          questionText:
            "Write the place value of the digit 3 in the number 365,092.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Round 128,645 to the nearest 100,000.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Multiply: 7,321 × 34 = ___.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Divide: 9,840 ÷ 12 = ___.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Solve: A factory produces 425 items daily. How many items are produced in 5 days?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Solve: 312 + 17 - 514 =",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Solve: 5615 + 14 - 738 =",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Convert 38 + 28 + 14 to a decimal.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Compare: Which is greater: 0.65 or 312 + 17 - 514?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Find the surface area of a rectangular prism: Length = 6 cm, Width = 4 cm, Height = 3 cm.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Calculate the volume of a rectangular prism: Length = 10 cm, Width = 8 cm, Height = 4 cm.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Convert 1.25 liters to milliliters.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "In the 17 times multiplication table, what is the product of 6, 9 and 12.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Solve: If a car consumes 8 liters of fuel for every 100 km, how much fuel is needed for 400 km?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Calculate the circumference of a circle with radius = 15 cm (If π = 22/7).",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Find the area of a parallelogram with a base of 10 cm and a height of 8 cm.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Find the area of a rhombus whose side is 6 cm and whose altitude is 4 cm.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "If one of its diagonals is 8 cm long, find the length of the other diagonal.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Solve for x: 3x + 5 = 14.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Solve: A container holds 1,200 ml of water. How many liters is this?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
      ],
    },
  },
];

async function main() {
  for (const test of tests) {
    await prisma.test.create({
      data: test,
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
