"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { payWithPaystack } from "@/actions/payment";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { WritingFormData } from "@/constants/forms";
import { sendEmail } from "@/actions/send-email";
// import { Service } from "@prisma/client";

// Define the ServiceType enum
enum ServiceType {
  RESEARCH_WRITING = "RESEARCH_WRITING",
  ASSIGNMENT_HELP = "ASSIGNMENT_HELP",
  BOOK_WRITING = "BOOK_WRITING",
  BUSINESS_PLAN = "BUSINESS_PLAN",
  SOP_WRITING = "SOP_WRITING",
  PROOFREADING = "PROOFREADING",
  PUBLISHING = "PUBLISHING",
}

// Define the structure of a service based on the Prisma schema
interface Service {
  id: string;
  type: ServiceType;
  subject: string | null;
  description: string;
  ResearchAndAssignmentPlans: any | null;
  bookWritingPlans: any | null;
  businessPlans: any | null;
  sopPlans: any | null;
  publishingPlans: any | null;
  addOn: string | null;
  addOnPrice: number | null;
  revisions: number | null;
}

// // Sample services data (replace this with your actual data fetching logic)
// const services = [
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

interface Props {
  services: Service[];
}

export default function ServiceSelectionFlow({ services }: Props) {
  const clerk = useUser();
  const [formData, setFormData] = useState<Partial<WritingFormData>>({
    serviceDetails: {},
  });
  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [addOn, setAddOn] = useState(false);
  const [step, setStep] = useState(1);
  const [sopPlan, setSopPlan] = useState({
    revisions: 0,
    custom: false,
    rushedOrders: false,
    addOn: 0,
  });
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredContactMethod: "",
  });
  const [total, setTotal] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(total);

  const calculateTotal = (
    basePrice: number,
    additionalCalculation?: number
  ) => {
    let calculatedTotal = basePrice * (additionalCalculation || 1);

    // Add add-on price if applicable
    if (selectedService?.addOn && addOn && selectedService.addOnPrice) {
      calculatedTotal += selectedService.addOnPrice;
    }

    setTotal(calculatedTotal);
    setFormData((prev) => ({
      ...prev,
      total: calculatedTotal,
    }));
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setFormData((prev) => ({
      ...prev,
      type: service.type,
      serviceDetails: {
        subject: service.subject,
        description: service.description,
      },
    }));
    setSelectedPlan(null);
    setSelectedTier(null);
    setAddOn(false);
    setStep(2);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setFormData((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        plan,
      },
    }));
    setStep(3);
  };

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    setFormData((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        tier,
      },
    }));
    setStep(4);
  };

  const handleAddOnToggle = () => {
    setAddOn(!addOn);
  };

  const renderServiceSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Select a Service</CardTitle>
        <CardDescription>Choose the service you need</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value) => {
            handleServiceSelect(
              services.find((s) => s.type === value) as Service
            );
            calculateTotal(0);
          }}
        >
          {services?.map((service) => (
            <div key={service.type} className="flex items-center space-x-2">
              <RadioGroupItem
                value={service.type}
                id={`service-${service.type}`}
              />
              <Label htmlFor={`service-${service.type}`}>
                {service.subject}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const renderPlanSelection = () => {
    if (!selectedService) return null;

    let planContent;
    let extraContent;
    if (selectedService.type === ServiceType.RESEARCH_WRITING) {
      extraContent = (
        <div className="text-black p-5 border-2 border-gray-500 border-dashed rounded-xl w-fit mb-6">
          <p>
            Special Offer: Final-year BSc. research projects at a flat rate of
            ₦100,000 (a 52.25% discount from the regular rate).
          </p>
          <p>
            Note: at least two weeks must be given for the premium research
            writing plan, even with the expedited delivery.
          </p>
        </div>
      );
    }
    if (selectedService.ResearchAndAssignmentPlans) {
      planContent = (
        <RadioGroup
          onValueChange={(plan) => {
            handlePlanSelect(plan);
            const selectedPlanDetails =
              selectedService.ResearchAndAssignmentPlans[plan];

            calculateTotal(selectedPlanDetails.price, 1);
          }}
        >
          {Object.entries(selectedService.ResearchAndAssignmentPlans).map(
            ([plan, details]: [string, any]) => (
              <div key={plan} className="flex items-center space-x-2">
                <RadioGroupItem value={plan} id={`plan-${plan}`} />
                <Label htmlFor={`plan-${plan}`}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)} - ₦
                  {details.price} per word
                </Label>
              </div>
            )
          )}
        </RadioGroup>
      );
    } else if (selectedService.bookWritingPlans) {
      planContent = (
        <Accordion type="single" collapsible>
          {Object.entries(selectedService.bookWritingPlans).map(
            ([plan, details]: [string, any]) => (
              <AccordionItem key={plan} value={plan}>
                <AccordionTrigger>{details.length}</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    onValueChange={(tier) => {
                      handlePlanSelect(`${plan}-${tier}`);
                      const [, selectedTier] = tier.split("-");
                      calculateTotal(details[selectedTier].price);
                    }}
                  >
                    {["basic", "standard", "premium"].map((tier) => (
                      <div key={tier} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={`${plan}-${tier}`}
                          id={`plan-${plan}-${tier}`}
                        />
                        <Label htmlFor={`plan-${plan}-${tier}`}>
                          {details[tier].description}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      );
      extraContent = (
        <div className="text-black p-5 border-2 border-gray-500 border-dashed rounded-xl w-fit mb-6">
          <p>Add-On: Ghostwriting services (confidentiality surcharge): +25%</p>
          <p>
            Note: at least three weeks must be given for 10,000 – 100,000-word
            book writing plan; for 100,000 + words book writing at least one
            month must be given despite the expedited delivery.
          </p>

          <div className="pt-4">
            <p className="font-medium py-3">
              What&apos;s Included in Each Book Writing Tier?
            </p>
            <ul>
              <li className="font-medium py-3">Basic Package:</li>
              <div className="ml-2">
                <li>
                  Professionally written manuscript based on your
                  specifications.
                </li>
                <li>No revisions included.</li>
                <li>
                  Ideal for clients who want a foundational draft to refine
                  further.
                </li>
              </div>

              <li className="font-medium py-3">Standard Package:</li>
              <div className="ml-2">
                <li> Professionally written manuscript.</li>
                <li>
                  Three rounds of revisions to refine the content and structure.
                </li>
                <li>
                  Best for authors seeking a polished, ready-to-publish
                  manuscript.
                </li>
              </div>

              <li className="font-medium py-3">Premium Package:</li>
              <div className="ml-2">
                <li>
                  Comprehensive service including the manuscript, revisions, and
                  expedited delivery for urgent projects.
                </li>
                <li>
                  Tailored for clients with complex or time-sensitive
                  requirements.
                </li>
              </div>
            </ul>
          </div>
        </div>
      );
    } else if (selectedService.businessPlans) {
      planContent = (
        <RadioGroup onValueChange={handlePlanSelect}>
          {Object.entries(selectedService.businessPlans).map(
            ([plan, tiers]: [string, any]) => (
              <div key={plan} className="flex items-center space-x-2">
                <RadioGroupItem value={plan} id={`plan-${plan}`} />
                <Label htmlFor={`plan-${plan}`}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Label>
              </div>
            )
          )}
        </RadioGroup>
      );
      extraContent = (
        <div className="text-black p-5 border-2 border-gray-500 border-dashed rounded-xl w-fit mb-6">
          <p>
            Add-On: SOP Writing - Flat rate ₦60,000 (only available for standard
            and premium packages).
          </p>

          <div className="pt-4">
            <p className="font-medium py-3">Package Details</p>
            <ul>
              <li className="font-medium py-3">Basic Package:</li>
              <div className="ml-2">
                <li>
                  This package provides a basic structure for your business,
                  including a brief executive summary, company description, and
                  market overview. Ideal for small businesses or startups
                  looking to outline their business plan.
                </li>
              </div>

              <li className="font-medium py-3">Standard Package:</li>
              <div className="ml-2">
                <li>
                  Includes Basic services, plus detailed financial projections,
                  marketing strategies, and a breakdown of products or services.
                  This plan is perfect for businesses looking to approach
                  investors or secure funding.{" "}
                </li>
              </div>

              <li className="font-medium py-3">Premium Package:</li>
              <div className="ml-2">
                <li>
                  Full-service business plans tailored for larger companies or
                  those seeking significant investment. This package includes
                  everything in the Standard plan, with an in-depth analysis of
                  market and industry trends, competition, detailed financials,
                  and long-term growth strategies. This plan allows extensive
                  changes, also covers expedited delivery for urgent plans and
                  it is tailored for clients with complex or sensitive
                  requirements. Note: at least two weeks must be given despite
                  the expedited delivery.
                </li>
              </div>
            </ul>
          </div>
        </div>
      );
    } else if (selectedService.sopPlans) {
      planContent = (
        <div>
          <RadioGroup
            onValueChange={() => {
              calculateTotal(55000);
            }}
          >
            <div className="flex item-center gap-2">
              <RadioGroupItem value="flat" id="plan-flat" />
              <Label>
                <p>Flat Rate: ₦{selectedService.sopPlans.flatRate}</p>
              </Label>
            </div>
          </RadioGroup>

          <Select
            onValueChange={(revision: string) => {
              if (revision === "one") {
                calculateTotal(55000 + 5500);
                setSopPlan({ ...sopPlan, revisions: 1 });
              }
              if (revision === "two") {
                calculateTotal(55000 + 11000);
                setSopPlan({ ...sopPlan, revisions: 2 });
              }
              if (revision === "custom") {
                // calculateTotal(55000);
                setSopPlan({ ...sopPlan, custom: true });
              }
            }}
          >
            <SelectTrigger className="w-[180px] mt-5">
              <SelectValue placeholder="Select revisions" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>revisions</SelectLabel>
                <SelectItem value="one">+1 Revision</SelectItem>
                <SelectItem value="two">+2 Revisions</SelectItem>
                <SelectItem value="custom">custom Revisions</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {sopPlan.custom && (
            <div className="mt-5">
              <Label>How many revisions will you need?</Label>

              <Input
                type="number"
                placeholder="Enter number of revisions"
                value={sopPlan.revisions}
                onChange={(e) => {
                  setSopPlan({
                    ...sopPlan,
                    revisions: parseInt(e.target.value),
                  });
                  calculateTotal(55000 + parseFloat(e.target.value) * 5500);
                }}
              />
            </div>
          )}

          <div className="mt-5 flex items-center gap-2">
            <Input
              type="checkbox"
              id="addon"
              checked={sopPlan.rushedOrders}
              onChange={() => {
                setSopPlan({ ...sopPlan, rushedOrders: !sopPlan.rushedOrders });
              }}
              className="w-fit"
            />

            <Label>Rush Orders: +20% for 24-48 hour delivery</Label>
          </div>

          {/* <p>{selectedService.sopPlans.revisions}</p>
          <p>{selectedService.sopPlans.rushOrders}</p> */}
          <Button
            onClick={() => {
              if (sopPlan.revisions === 0) {
                if (!sopPlan.rushedOrders) {
                  calculateTotal(55000);
                }
              }
              handlePlanSelect("sop");
            }}
            className="mt-6"
          >
            Confirm Selection
          </Button>
        </div>
      );
    } else if (selectedService.type === ServiceType.PROOFREADING) {
      planContent = (
        <div>
          <p className="pb-3">
            Custom quotes available upon request (quotes are available within 15
            minutes of request).
          </p>
          <Input type="text" placeholder="Enter document details for a quote" />
          <Button
            onClick={() => handlePlanSelect("proofreading")}
            className="mt-5"
          >
            Request Quote
          </Button>
        </div>
      );
    } else if (selectedService.publishingPlans) {
      planContent = (
        <RadioGroup onValueChange={handlePlanSelect}>
          {Object.entries(selectedService.publishingPlans).map(
            ([level, details]: [string, any]) => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem value={level} id={`plan-${level}`} />
                <Label htmlFor={`plan-${level}`}>{details.description}</Label>
              </div>
            )
          )}
        </RadioGroup>
      );
      extraContent = (
        <div className="text-black p-5 border-2 border-gray-500 border-dashed rounded-xl w-fit mb-6">
          <p>Add-On: Ghostwriting services (confidentiality surcharge): +25%</p>
          <p>
            Note: at least three weeks must be given for 10,000 – 100,000-word
            book writing plan; for 100,000 + words book writing at least one
            month must be given despite the expedited delivery.
          </p>

          <div className="pt-4">
            <p className="font-medium py-3">
              What&apos;s Included in Each Book Writing Tier?
            </p>
            <ul>
              <li className="font-medium py-3">
                Basic: Manuscript Review Only
              </li>
              <div className="ml-2">
                <li>
                  A thorough review of your manuscript by experienced editors.
                  This includes detailed feedback on structure, pacing,
                  language, further enhancement and overall readability to make
                  your submission-ready.
                </li>
              </div>

              <li className="font-medium py-3">
                Standard: Self-Publishing Support
              </li>
              <div className="ml-2">
                <li>
                  Comprehensive guidance through the self-publishing process.
                  This includes:
                </li>
                <li>Manuscript review and editing.</li>
                <li>Interior layout design for print and eBook formats.</li>
                <li>Professional cover design.</li>
                <li>ISBN acquisition and copyright registration.</li>
                <li>
                  Assistance with uploading to platforms like Amazon Kindle
                  Direct Publishing (KDP) or IngramSpark.
                </li>
              </div>

              <li className="font-medium py-3">
                Premium: Self-Publishing with Advanced Services
              </li>
              <div className="ml-2">
                <li>All Standard services plus:</li>
                <li>
                  Marketing support, including book blurbs, press releases, and
                  author bios.
                </li>
                <li>Distribution setup for global availability.</li>
                <li>
                  Advanced formatting for illustrated or complex books (e.g.,
                  cookbooks or children&apos;s books).
                </li>
                <li>Priority delivery within 3 weeks </li>
                <li>Ongoing consultation for sales tracking and updates.</li>
              </div>

              <li className="font-medium py-3">
                Standard: Traditional Submission Packages
              </li>
              <div className="ml-2">
                <li>
                  For authors pursuing traditional publishing, this package
                  includes:
                </li>
                <li>
                  Manuscript review and editing to meet industry standards.
                </li>
                <li>
                  Assistance in writing compelling query letters and book
                  proposals.
                </li>
                <li>
                  Guidance in identifying and submitting to suitable literary
                  agents or publishers.
                </li>
                <li>
                  Strategic support in navigating responses and contract
                  reviews.
                </li>
              </div>

              <li className="font-medium py-3">
                Standard: Traditional Submission Packages
              </li>
              <div className="ml-2">
                <li>All Standard services plus:</li>
                <li>Priority delivery within 3 weeks</li>
              </div>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Select a Plan</CardTitle>
          <CardDescription>{selectedService.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>{extraContent}</div>
            {planContent}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderTierSelection = () => {
    if (!selectedService || !selectedPlan) return null;

    let tierContent;
    if (selectedService.ResearchAndAssignmentPlans) {
      const plan = selectedService.ResearchAndAssignmentPlans[selectedPlan];
      tierContent = (
        <div>
          <h3 className="text-lg font-semibold">
            {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
          </h3>
          <p>{plan.description}</p>
          <p>Price: ₦{plan.price} per word</p>
          <div className="mt-2">
            <p>Enter number of pages</p>
            <Input
              type="number"
              placeholder="Number of words"
              onChange={(e) =>
                setTotal(parseFloat(e.target.value) * plan.price)
              }
            />
          </div>
        </div>
      );
    } else if (selectedService.bookWritingPlans) {
      const [plan, tier] = selectedPlan.split("-");
      const details = selectedService.bookWritingPlans[plan][tier];
      tierContent = (
        <div>
          <h3 className="text-lg font-semibold">
            {selectedService.bookWritingPlans[plan].length}
          </h3>
          <p>{details?.description}</p>
        </div>
      );
    } else if (selectedService.businessPlans) {
      tierContent = (
        <RadioGroup
          onValueChange={(plan: string) => {
            handleTierSelect(plan);
            calculateTotal(selectedService.businessPlans[selectedPlan][plan]);
          }}
        >
          {Object.entries(selectedService.businessPlans[selectedPlan]).map(
            ([tier, price]: [string, any]) => (
              <div key={tier} className="flex items-center space-x-2">
                <RadioGroupItem value={tier} id={`tier-${tier}`} />
                <Label htmlFor={`tier-${tier}`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} - ₦{price}
                </Label>
              </div>
            )
          )}
        </RadioGroup>
      );
    } else if (selectedService.publishingPlans) {
      tierContent = (
        <RadioGroup
          onValueChange={(plan: string) => {
            handleTierSelect(plan);

            if (selectedService.publishingPlans[selectedPlan][plan] > 0) {
              calculateTotal(
                selectedService.publishingPlans[selectedPlan][plan]
              );
            } else {
              calculateTotal(0);
            }
          }}
        >
          {["basic", "standard", "premium"].map((tier) => {
            const price = selectedService.publishingPlans![selectedPlan][tier];
            if (price > 0) {
              return (
                <div key={tier} className="flex items-center space-x-2">
                  <RadioGroupItem value={tier} id={`tier-${tier}`} />
                  <Label htmlFor={`tier-${tier}`}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)} - ₦{price}
                  </Label>
                </div>
              );
            }
            return null;
          })}
        </RadioGroup>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirm Your Selection</CardTitle>
        </CardHeader>
        <CardContent>{tierContent}</CardContent>
      </Card>
    );
  };

  const renderSummary = () => {
    if (!selectedService || !selectedPlan) return null;

    let summaryContent;

    if (selectedService.ResearchAndAssignmentPlans) {
      summaryContent = (
        <div>
          <p>Service: {selectedService.subject}</p>
          <p>Plan: {selectedPlan}</p>
          <p>Price: ₦{total.toLocaleString()} per word</p>
        </div>
      );
    } else if (selectedService.bookWritingPlans) {
      const [plan, tier] = selectedPlan.split("-");

      summaryContent = (
        <div>
          <p>Service: {selectedService.subject}</p>
          <p>
            Plan:{" "}
            {
              (
                selectedService.bookWritingPlans[
                  plan as keyof typeof selectedService.bookWritingPlans
                ] as { length: string }
              ).length
            }
          </p>
          <p>Tier: {tier}</p>
          <p>Price: ₦{total.toLocaleString()}</p>
        </div>
      );
    } else if (selectedService.businessPlans && selectedTier) {
      //   total = selectedService.businessPlans[selectedPlan][selectedTier];
      summaryContent = (
        <div>
          <p>Service: {selectedService.subject}</p>
          <p>Plan: {selectedPlan}</p>
          <p>Tier: {selectedTier}</p>
          <p>Price: ₦{total.toLocaleString()}</p>
        </div>
      );
    } else if (selectedService.sopPlans) {
      //   total = selectedService.sopPlans.flatRate;
      summaryContent = (
        <div>
          <p>Service: {selectedService.subject}</p>
          <p>Flat Rate: ₦{total.toLocaleString()}</p>
          <p>Revisions: {sopPlan.revisions}</p>
          <p>rush order: {sopPlan.rushedOrders === true ? "Yes" : "No"}</p>
        </div>
      );
    } else if (selectedService.type === ServiceType.PROOFREADING) {
      summaryContent = (
        <div>
          <p>Service: {selectedService.subject}</p>
          <p>Custom quote requested</p>
        </div>
      );
    } else if (selectedService.publishingPlans && selectedTier) {
      //   total = selectedService.publishingPlans[selectedPlan][selectedTier];
      summaryContent = (
        <div>
          <p>Service: {selectedService.subject}</p>
          <p>
            Plan:{" "}
            {
              (
                selectedService.publishingPlans[
                  selectedPlan as keyof typeof selectedService.publishingPlans
                ] as { description: string }
              ).description
            }
          </p>
          <p>Tier: {selectedTier}</p>
          <p>Price: ₦{total.toLocaleString()}</p>
        </div>
      );
    }

    if (selectedService.addOn) {
      summaryContent = (
        <>
          {summaryContent}
          <div className="mt-4">
            <Label htmlFor="addon" className="flex items-center gap-4">
              <Input
                type="checkbox"
                id="addon"
                checked={addOn}
                onChange={() => {
                  if (selectedService?.addOnPrice) {
                    if (!addOn) {
                      setOriginalPrice(total);
                      if (
                        selectedService.businessPlans &&
                        selectedTier !== "basic"
                      ) {
                        setTotal(60000);
                      }
                      if (selectedService.ResearchAndAssignmentPlans) {
                        setTotal(100000);
                      }
                    } else {
                      setTotal(originalPrice);
                    }
                    setSopPlan({ ...sopPlan, addOn: total });
                    handleAddOnToggle();
                  }
                  if (selectedService.bookWritingPlans) {
                    if (!addOn) {
                      setOriginalPrice(total);
                      const surcharge = total * 0.25;
                      setTotal(total + surcharge);
                    } else {
                      setTotal(originalPrice);
                    }
                    handleAddOnToggle();
                  }
                }}
                className="w-fit"
              />
              <span>{selectedService.addOn}</span>
            </Label>
          </div>
        </>
      );
      if (addOn && selectedService.addOnPrice) {
        // total += selectedService.addOnPrice;
      }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>{summaryContent}</CardContent>
        <CardFooter>
          <p className="text-xl font-bold">Total: ₦{total.toLocaleString()}</p>
        </CardFooter>
      </Card>
    );
  };

  const renderPersonalInformation = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Please provide your contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={personalInfo.fullName}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    fullName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={personalInfo.phoneNumber}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    phoneNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label>Preferred Contact Method</Label>
              <RadioGroup
                defaultValue={personalInfo.preferredContactMethod}
                onValueChange={(value) =>
                  setPersonalInfo({
                    ...personalInfo,
                    preferredContactMethod: value,
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contactEmail" />
                  <Label htmlFor="contactEmail">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contactPhone" />
                  <Label htmlFor="contactPhone">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="contactWhatsApp" />
                  <Label htmlFor="contactWhatsApp">WhatsApp</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    if (sopPlan.rushedOrders) {
      calculateTotal(total + (20 / 100) * total);
      setSopPlan({ ...sopPlan, addOn: (20 / 100) * total });
    } else if (total > 0) {
      calculateTotal(total - sopPlan.addOn);
    }
  }, [sopPlan.rushedOrders]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["initialize-paystack"],
    mutationFn: ({
      amount,
      type,
      email,
      phone,
    }: {
      amount: number;
      type: ServiceType;
      email: string | undefined;
      phone: string | undefined;
    }) => payWithPaystack(amount, type, email, phone),
  });

  const handleBuy = async () => {
    await mutateAsync(
      {
        amount: Number(total) * 100,
        type: selectedService?.type as ServiceType,
        email: clerk?.user?.emailAddresses[0]?.emailAddress,
        phone: personalInfo.phoneNumber,
      },
      {
        async onSuccess(data, variables, context) {
          //@ts-expect-error: sendEmail function does not have proper TypeScript definitions
          const result = await sendEmail({ type: "writing", data: formData });
          if (result.success) {
            toast.success(data.message);
            window.location.href = data.data.authorization_url;
          } else {
            toast.error(result.message);
          }
        },
        onError(error, variables, context) {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <main className="">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">
            Havilah Writers Service Request Form
          </h1>
          <p className="lg:text-xl text-gray-600 mb-8">
            Welcome to Havilah Writers! Use this form to select services and
            customize your order. Your estimated price will be displayed in
            real-time as you build your request. Once submitted, we will contact
            you within 24 hours to finalize details.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <p className="flex justify-end">&#8358;{total.toLocaleString()}</p>
        {step === 1 && renderServiceSelection()}
        {step === 2 && renderPersonalInformation()}
        {step === 3 && renderPlanSelection()}
        {step === 4 && renderTierSelection()}
        {step === 5 && renderSummary()}

        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} className="mr-2">
            Back
          </Button>
        )}

        {step < 5 && (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={
              (step === 2 &&
                (!personalInfo.fullName ||
                  !personalInfo.email ||
                  !personalInfo.phoneNumber ||
                  !personalInfo.preferredContactMethod)) ||
              (step === 1 && !selectedService) ||
              (step === 3 && !selectedPlan)
            }
          >
            Next
          </Button>
        )}

        {step === 5 && (
          <Button onClick={handleBuy}>
            Proceed to Payment{" "}
            {isPending && <Loader2 className="animate-in animate-spin" />}
          </Button>
        )}
      </div>
    </main>
  );
}
