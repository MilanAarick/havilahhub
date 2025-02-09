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
    schoolLevel: SchoolLevel.PRE_K,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What sound does the letter 'A' make?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "ah", isCorrect: true },
              { optionText: "buh", isCorrect: false },
              { optionText: "kuh", isCorrect: false },
              { optionText: "duh", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which word starts with the 'B' sound?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Apple", isCorrect: false },
              { optionText: "Banana", isCorrect: true },
              { optionText: "Cat", isCorrect: false },
              { optionText: "Duck", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What animal is this?",
          hasPicture: true,
          questionImage:
            "https://asset.cloudinary.com/dorzfbko4/57f40fa7dbbd75cce9b8cf84e41d9727",
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Cat", isCorrect: true },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Cow", isCorrect: false },
              { optionText: "Bird", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What letter comes before 'H'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "B", isCorrect: false },
              { optionText: "D", isCorrect: false },
              { optionText: "F", isCorrect: false },
              { optionText: "G", isCorrect: true },
            ],
          },
        },
        {
          questionText: "Which sentence is correct?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "I am dog.", isCorrect: false },
              { optionText: "I is a cat.", isCorrect: false },
              { optionText: "It is a fish.", isCorrect: true },
              { optionText: "You is happy.", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Complete the sentence: 'I see a ___.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "run", isCorrect: false },
              { optionText: "dog", isCorrect: true },
              { optionText: "happy", isCorrect: false },
              { optionText: "jump", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which letter comes after 'F'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "H", isCorrect: false },
              { optionText: "B", isCorrect: false },
              { optionText: "G", isCorrect: true },
              { optionText: "P", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is missing? 'A_ _ le'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Bee", isCorrect: false },
              { optionText: "Cat", isCorrect: false },
              { optionText: "pp", isCorrect: true },
              { optionText: "ff", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What color is this fruit?",
          hasPicture: true,
          questionImage:
            "https://asset.cloudinary.com/dorzfbko4/e8c0ff589fa3064fc2cbd4af6c605230",
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Red", isCorrect: false },
              { optionText: "Blue", isCorrect: false },
              { optionText: "Yellow", isCorrect: true },
              { optionText: "Orange", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What do you say if someone says, 'Hello'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Bye", isCorrect: false },
              { optionText: "Run", isCorrect: false },
              { optionText: "Hello", isCorrect: true },
              { optionText: "Food", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What does this picture represent?",
          hasPicture: true,
          questionImage:
            "https://asset.cloudinary.com/dorzfbko4/91e8d22ed3da4b7804c438bd422f38d0",
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Fruit", isCorrect: false },
              { optionText: "Animal", isCorrect: false },
              { optionText: "Chair", isCorrect: false },
              { optionText: "Table", isCorrect: true },
            ],
          },
        },
        {
          questionText: "Which sound rhymes with 'Cat'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Dog", isCorrect: false },
              { optionText: "Hat", isCorrect: true },
              { optionText: "Tree", isCorrect: false },
              { optionText: "Bird", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What animal says 'Moo'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Dog", isCorrect: false },
              { optionText: "Cow", isCorrect: true },
              { optionText: "Duck", isCorrect: false },
              { optionText: "Lion", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is missing in 'Twinkle, twinkle, little ___'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Bat", isCorrect: false },
              { optionText: "Star", isCorrect: true },
              { optionText: "Tree", isCorrect: false },
              { optionText: "Dog", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What happens to Humpty Dumpty?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Falls down", isCorrect: true },
              { optionText: "Climbs up", isCorrect: false },
              { optionText: "Jumps", isCorrect: false },
              { optionText: "Runs away", isCorrect: false },
            ],
          },
        },
        {
          questionText: "In 'Old MacDonald,' which animal goes 'Baa'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Dog", isCorrect: false },
              { optionText: "Cow", isCorrect: false },
              { optionText: "Cat", isCorrect: false },
              { optionText: "Sheep", isCorrect: true },
            ],
          },
        },
        {
          questionText: "How many legs does this spider have?",
          hasPicture: true,
          questionImage:
            "https://asset.cloudinary.com/dorzfbko4/3b45bf4b6323c088bccb158965d23f70",
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "6", isCorrect: false },
              { optionText: "8", isCorrect: true },
              { optionText: "4", isCorrect: false },
              { optionText: "10", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is this?",
          hasPicture: true,
          questionImage:
            "https://asset.cloudinary.com/dorzfbko4/baf2c93eb1b7d13519834b705cdb95cc",
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Moon", isCorrect: false },
              { optionText: "Star", isCorrect: false },
              { optionText: "Sun", isCorrect: true },
              { optionText: "Cloud", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What letter comes after 'A'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "B", isCorrect: true },
              { optionText: "D", isCorrect: false },
              { optionText: "F", isCorrect: false },
              { optionText: "G", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the opposite of 'big'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Small", isCorrect: true },
              { optionText: "Tall", isCorrect: false },
              { optionText: "Round", isCorrect: false },
              { optionText: "Heavy", isCorrect: false },
            ],
          },
        },
      ],
    },
  },

  {
    schoolLevel: SchoolLevel.KINDERGARTEN,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What is the first letter in 'dog'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "a", isCorrect: false },
              { optionText: "o", isCorrect: false },
              { optionText: "d", isCorrect: true },
              { optionText: "f", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which word rhymes with 'far'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Bat", isCorrect: false },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Car", isCorrect: true },
              { optionText: "Fish", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which word has three letters?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Zebra", isCorrect: false },
              { optionText: "Monkey", isCorrect: false },
              { optionText: "Elephant", isCorrect: false },
              { optionText: "Cat", isCorrect: true },
            ],
          },
        },
        {
          questionText: "What does 'I see a cat' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "You are reading", isCorrect: false },
              { optionText: "You see a cat", isCorrect: true },
              { optionText: "You are singing", isCorrect: false },
              { optionText: "You are sleeping", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What comes after '4'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "5", isCorrect: true },
              { optionText: "6", isCorrect: false },
              { optionText: "3", isCorrect: false },
              { optionText: "7", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which of these is an opposite of 'tall'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Small", isCorrect: false },
              { optionText: "Large", isCorrect: false },
              { optionText: "Short", isCorrect: true },
              { optionText: "Tiny", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What animal is shown in the picture?",
          hasPicture: true,
          questionImage:
            "https://asset.cloudinary.com/dorzfbko4/fc6f46e9fb8fb8a82e3b0aec578bfee7",
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Rabbit", isCorrect: false },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Cat", isCorrect: false },
              { optionText: "Bird", isCorrect: true },
            ],
          },
        },
        {
          questionText: "What is the second letter in 'sun'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "s", isCorrect: false },
              { optionText: "t", isCorrect: false },
              { optionText: "u", isCorrect: true },
              { optionText: "f", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Find the correct article: '__ apple.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "A", isCorrect: true },
              { optionText: "An", isCorrect: false },
              { optionText: "The", isCorrect: false },
              { optionText: "No", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What word completes this sentence: 'I __ happy'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Am", isCorrect: true },
              { optionText: "Is", isCorrect: false },
              { optionText: "Are", isCorrect: false },
              { optionText: "Be", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which sentence uses 'and' correctly?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "I like apples and oranges.", isCorrect: true },
              { optionText: "I apples like and oranges.", isCorrect: false },
              { optionText: "I like and apples oranges.", isCorrect: false },
              { optionText: "Apples I like oranges and.", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the opposite of 'hot'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Cold", isCorrect: true },
              { optionText: "Warm", isCorrect: false },
              { optionText: "Soft", isCorrect: false },
              { optionText: "Cool", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Fill in the gap: 'I ___ books.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Read", isCorrect: true },
              { optionText: "Reading", isCorrect: false },
              { optionText: "Reads", isCorrect: false },
              { optionText: "To read", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What letter is at the end of 'bat'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "b", isCorrect: false },
              { optionText: "a", isCorrect: false },
              { optionText: "t", isCorrect: true },
              { optionText: "k", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Find the vowel in 'hat':",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "H", isCorrect: false },
              { optionText: "A", isCorrect: true },
              { optionText: "T", isCorrect: false },
              { optionText: "None", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which is not an animal?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Car", isCorrect: true },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Rabbit", isCorrect: false },
              { optionText: "Elephant", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the last sound in 'cat'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "/c/", isCorrect: false },
              { optionText: "/t/", isCorrect: true },
              { optionText: "/a/", isCorrect: false },
              { optionText: "/g/", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which one is not a fruit?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Banana", isCorrect: false },
              { optionText: "Orange", isCorrect: false },
              { optionText: "Carrot", isCorrect: true },
              { optionText: "Apple", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What number comes before 10?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "9", isCorrect: true },
              { optionText: "8", isCorrect: false },
              { optionText: "11", isCorrect: false },
              { optionText: "12", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the plural of 'dog'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Dogs", isCorrect: true },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Doges", isCorrect: false },
              { optionText: "Dogz", isCorrect: false },
            ],
          },
        },
      ],
    },
  },

  {
    schoolLevel: SchoolLevel.GRADE_1,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "Which word starts with 'ch'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Chair", isCorrect: true },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Sun", isCorrect: false },
              { optionText: "Bear", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What are the vowels in the word 'face'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "A, E", isCorrect: true },
              { optionText: "F, A", isCorrect: false },
              { optionText: "F, C", isCorrect: false },
              { optionText: "None", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Complete the sentence: 'The cat is ____ the table.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "On", isCorrect: true },
              { optionText: "At", isCorrect: false },
              { optionText: "In", isCorrect: false },
              { optionText: "For", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which book talks about a caterpillar?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "The Very Hungry Caterpillar", isCorrect: true },
              {
                optionText: "Brown Bear, Brown Bear, What Do You See?",
                isCorrect: false,
              },
              { optionText: "Chicka Chicka Boom Boom", isCorrect: false },
              { optionText: "The Magic Fish", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the opposite of 'fast'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Slow", isCorrect: true },
              { optionText: "Quick", isCorrect: false },
              { optionText: "Light", isCorrect: false },
              { optionText: "Heavy", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which is an adjective?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Happy", isCorrect: true },
              { optionText: "Run", isCorrect: false },
              { optionText: "Dog", isCorrect: false },
              { optionText: "Swim", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is an opposite of 'happy'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Glad", isCorrect: false },
              { optionText: "Sad", isCorrect: true },
              { optionText: "Tired", isCorrect: false },
              { optionText: "Cold", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the missing word: 'I like to ____ a book.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Run", isCorrect: false },
              { optionText: "Write", isCorrect: false },
              { optionText: "Jump", isCorrect: false },
              { optionText: "Read", isCorrect: true },
            ],
          },
        },
        {
          questionText: "What is the plural of 'fox'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Foxes", isCorrect: true },
              { optionText: "Fox", isCorrect: false },
              { optionText: "Foxs", isCorrect: false },
              { optionText: "Foxz", isCorrect: false },
            ],
          },
        },
        {
          questionText:
            "Which word completes this sentence: 'I am ____ my homework'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Doing", isCorrect: true },
              { optionText: "Done", isCorrect: false },
              { optionText: "Did", isCorrect: false },
              { optionText: "Do", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the first sound in 'grape'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "/g/", isCorrect: true },
              { optionText: "/r/", isCorrect: false },
              { optionText: "/p/", isCorrect: false },
              { optionText: "/e/", isCorrect: false },
            ],
          },
        },
        {
          questionText:
            "Choose the correct conjunction: 'I like tea ____ coffee.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "And", isCorrect: true },
              { optionText: "But", isCorrect: false },
              { optionText: "Or", isCorrect: false },
              { optionText: "For", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the last sound in 'cat'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "/c/", isCorrect: false },
              { optionText: "/t/", isCorrect: true },
              { optionText: "/a/", isCorrect: false },
              { optionText: "/g/", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What is the verb in the sentence 'She runs fast'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "She", isCorrect: false },
              { optionText: "Runs", isCorrect: true },
              { optionText: "Fast", isCorrect: false },
              { optionText: "None", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Find the correct article: '__ apple.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "A", isCorrect: true },
              { optionText: "An", isCorrect: false },
              { optionText: "The", isCorrect: false },
              { optionText: "No", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which is a CVC word?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Bat", isCorrect: true },
              { optionText: "Chair", isCorrect: false },
              { optionText: "Blue", isCorrect: false },
              { optionText: "Apple", isCorrect: false },
            ],
          },
        },
        {
          questionText: "What does 'because' help us do?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Explain", isCorrect: true },
              { optionText: "Compare", isCorrect: false },
              { optionText: "Ask", isCorrect: false },
              { optionText: "List", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which word has five letters?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "Cat", isCorrect: false },
              { optionText: "Monkey", isCorrect: false },
              { optionText: "Elephant", isCorrect: false },
              { optionText: "Zebra", isCorrect: true },
            ],
          },
        },
        {
          questionText: "What is the last sound in 'lamp'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "/m/", isCorrect: false },
              { optionText: "/l/", isCorrect: false },
              { optionText: "/p/", isCorrect: true },
              { optionText: "/a/", isCorrect: false },
            ],
          },
        },
        {
          questionText: "Which sentence is correct?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.MULTIPLE_CHOICE,
          options: {
            create: [
              { optionText: "She is playing.", isCorrect: true },
              { optionText: "She playing is.", isCorrect: false },
              { optionText: "Playing she is.", isCorrect: false },
              { optionText: "She are playing.", isCorrect: false },
            ],
          },
        },
      ],
    },
  },

  {
    schoolLevel: SchoolLevel.GRADE_2,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What is a prefix?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'happy' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What sound does the word 'dog' start with?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What are the five vowels?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the opposite of 'big'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What word rhymes with 'start'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Name an animal that lives in water.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What do we use a question mark (?) for?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does the word 'hot' describe?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the plural form of 'shoe'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'reading' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What are the parts of speech?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a sentence?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is one thing we use full stops for?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'listen' mean?",
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

  {
    schoolLevel: SchoolLevel.GRADE_3,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What does 'beginning' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a noun?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "How many vowels are in 'apple'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the opposite of 'cold'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What word rhymes with 'fish'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a 'paragraph'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does the word 'run' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence with the word 'happy'.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Read aloud these sentences and highlight the differences in how they sound:\nA: 'Can YOU help?' \nB: 'Can you HELP?'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What do we call the people in a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the plural of 'child'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a noun?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is an exclamation mark?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What word starts with the same sound as 'tree'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'listen' mean?",
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

  {
    schoolLevel: SchoolLevel.GRADE_4,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What is a story's 'setting'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'character' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write one sentence with the word 'and'.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the opposite of 'fast'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the past tense of 'jump'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is one thing we use commas for?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the plural of 'mouse'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does the word 'small' describe?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a 'title'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What word rhymes with 'star'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is one thing you do when you wake up?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What do you call a person who writes books?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the sound of the first letter in 'zebra'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'draw' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the opposite of 'above'?",
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

  {
    schoolLevel: SchoolLevel.GRADE_5,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What is a 'theme' in a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Name one part of a book.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the plural of 'leaf'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence with the word 'but'.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'author' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the opposite of 'happy'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What word rhymes with 'choke'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a question mark used for?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Name three types of weather.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What word starts with the same sound as 'shocking'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a 'sentence'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'polysyllabic words' and provide examples.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Explain how punctuation affects the clarity of writing.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the difference between direct and indirect speech with examples?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'phrase' and give an example.",
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

  {
    schoolLevel: SchoolLevel.GRADE_6,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText: "What is a diphthong? Provide one example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Name one literary device used in poems.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a prefix? Give an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Why is the setting important in a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using the conjunction 'because'.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What does 'theme' mean in literature? Identify a common theme in children’s stories.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the plural of 'leaf'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'clause' and provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Identify one main idea from this sentence: 'The boy ran quickly to catch the bus, but it drove away.'",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using both a noun and an adjective.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the purpose of commas in a sentence? Provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'summarize' mean?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "How does dialogue help in storytelling?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'personification' and provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a short paragraph about your favorite book using descriptive language.",
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

  {
    schoolLevel: SchoolLevel.GRADE_7,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText:
            "What is intonation, and why is it important in reading aloud?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'metaphor' and provide an example from a poem or story.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using a compound subject.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the difference between a theme and the main idea?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How can an author show character development in a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using 'but' as a conjunction.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'symbolism' and give an example from literature.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a paragraph describing the plot of your favorite book or movie.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How do rhetorical questions make writing more persuasive?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Why is tone important in a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'homophone' and provide three examples.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Explain the use of dialogue in creating conflict in a story.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is a compound-complex sentence? Write an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "How can illustrations help in understanding a text?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is an idiom? Provide one example and explain its meaning.",
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

  {
    schoolLevel: SchoolLevel.GRADE_8,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText:
            "What is the difference between a diphthong and a triphthong?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How does stress in syllables affect sentence meaning? Provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the role of imagery in poetry?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence with a simile.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Explain the difference between dependent and independent clauses.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write three synonyms for the word 'happy'.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the meaning of the idiom, 'break the ice'?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'alliteration' and provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a paragraph summarizing the main events in a story you’ve read.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Define 'tone' and 'mood.' How are they different?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is the significance of punctuation in writing?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What does 'connotation' mean? Give an example using the word 'home'.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using a semicolon correctly.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Explain how authors use dialogue to reveal character traits.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a descriptive paragraph about your favorite place.",
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

  {
    schoolLevel: SchoolLevel.GRADE_9,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText:
            "Define 'allegory' and provide an example from literature.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence that uses personification.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How does the narrator’s perspective influence a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What does 'juxtaposition' mean? Provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Why is active listening important in discussions?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a paragraph explaining the significance of a character’s decision in a book.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the difference between 'showing' and 'telling' in writing?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'irony' and provide an example from a book or movie.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a compound-complex sentence about your day.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a persuasive paragraph arguing for or against school uniforms.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "How does a title reflect the theme of a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Explain the importance of a conclusion in an essay.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a sentence using direct speech and one using indirect speech.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'symbolism' and explain its use in a poem or short story.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Analyze how illustrations contribute to a picture book's narrative.",
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

  {
    schoolLevel: SchoolLevel.GRADE_10,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText:
            "Define 'allegory' and provide an example from a text or movie you know.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How does an author use tone to influence the mood of a story?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is a thesis statement? Write one for an essay about the importance of reading.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'rhetorical devices' and explain how they make persuasive writing effective.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the difference between 'showing' and 'telling' in narrative writing? Provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using a colon to introduce a list.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'symbolism' and explain its use in a specific literary work.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a short persuasive paragraph arguing for or against school uniforms.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the purpose of comparing themes across two different texts?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write an example of personification in a sentence.",
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

  {
    schoolLevel: SchoolLevel.GRADE_11,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText:
            "What is 'free verse' in poetry, and how does it differ from traditional forms?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a thesis statement for an essay about the role of technology in education.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How does an author use setting to develop the theme in a text?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "Write a sentence using a semicolon correctly.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "How does diction (word choice) shape the tone of a story or poem?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the difference between theme and motif in literature? Provide examples of each.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a short argumentative paragraph about the impact of social media on society.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Why is understanding cultural context important when analyzing a text?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a brief analysis of a poem you’ve studied, focusing on imagery and tone.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a descriptive paragraph about a memorable experience, using at least two literary devices.",
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

  {
    schoolLevel: SchoolLevel.GRADE_12,
    subjectArea: SubjectArea.ENGLISH,
    questions: {
      create: [
        {
          questionText:
            "Write a thesis statement for an essay discussing the role of climate change.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the difference between active and passive voice? Provide an example of each.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a short argumentative paragraph about the importance of mental health awareness in schools.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText: "What is a tragic hero?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Define 'parallelism' in writing and provide an example.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is the significance of a soliloquy in literature?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "What is intertextuality? Provide an example from literature.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write a short paragraph comparing two similar characters from different books you’ve read.",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Why is evaluating sources for credibility important in research writing?",
          hasPicture: false,
          questionImage: null,
          type: QuestionType.THEORY,
          options: {
            create: [],
          },
        },
        {
          questionText:
            "Write an essay (150 words) about your growth as a person over the past year.",
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
