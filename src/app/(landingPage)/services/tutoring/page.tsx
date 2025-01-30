"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleForm from "../_components/google-form";
import { childrenLibrary, childTeacher, childTeacher2 } from "@/assets/images";
import Link from "next/link";

const subjects = [
  {
    title: "Mathematics and Numeracy",
    description:
      "Builds foundational skills in arithmetic, geometry, and algebra, developing problem-solving abilities and critical thinking for practical and advanced applications.",
  },
  {
    title: "English and Literacy",
    description:
      "Focuses on reading comprehension, writing, and communication, enhancing vocabulary, grammar, and critical analysis skills across various genres and forms.",
  },
  {
    title: "Basic Science",
    description:
      "Introduces students to fundamental concepts in biology, chemistry, and physics, fostering curiosity about the natural world and scientific inquiry skills.",
  },
  {
    title: "Basic Technology",
    description:
      "Covers the basics of design, materials, and practical skills, promoting an understanding of technology's role in daily life and encouraging innovation.",
  },
  {
    title: "Physics",
    description:
      "Explores the principles governing matter, energy, and forces, helping students understand the physical laws that shape our universe.",
  },
  {
    title: "Chemistry",
    description:
      "Focuses on the study of substances, chemical reactions, and matter's composition, providing insight into materials and processes used in everyday life.",
  },
  {
    title: "Biology",
    description:
      "Examines living organisms and ecosystems, fostering an understanding of life processes, biodiversity, and human anatomy.",
  },
  {
    title: "Commerce",
    description:
      "Introduces economic principles, business operations, and financial literacy, helping students understand market dynamics and entrepreneurship.",
  },
  {
    title: "Economics",
    description:
      "Analyzes resource allocation, supply and demand, and economic theories, offering insights into global economic issues and decision-making.",
  },
  {
    title: "Government",
    description:
      "Studies political systems, civic responsibilities, and governance structures, equipping students with knowledge of citizenship and public policy.",
  },
  {
    title: "Literature",
    description:
      "Encompasses analysis of poetry, fiction, and drama, enhancing critical thinking, cultural awareness, and appreciation of diverse literary voices.",
  },
  {
    title: "Languages",
    description:
      "Develops communication skills and cultural understanding through the study of additional languages, broadening global perspectives and linguistic abilities.",
  },
  {
    title: "Computer Science and Coding",
    description:
      "Teaches foundational programming, problem-solving, and algorithmic thinking, equipping students with essential digital skills for the future.",
  },
  {
    title: "Robotics",
    description:
      "Combines engineering and programming to create and control robots, fostering innovation, teamwork, and hands-on application of STEM skills.",
  },
  {
    title: "Geography",
    description:
      "Explore the physical and human landscapes of our planet, including climate, ecosystems, and cultures. Learn about global issues like sustainability and urbanization through interactive maps and case studies.",
  },
  {
    title: "Further Mathematics",
    description:
      "Dive into advanced topics like calculus, matrices, and differential equations. This course prepares you for STEM careers with a focus on problem-solving and real-world applications.",
  },
  {
    title: "Fine Arts (Drawing)",
    description:
      "Master drawing techniques like shading, perspective, and composition using various mediums. Develop your artistic style while exploring art history and contemporary practices.",
  },
  {
    title: "Music",
    description:
      "Learn musical theory, performance, and composition across diverse genres. Gain practical skills in digital music production and understand music's cultural significance.",
  },
];

const chooseUs = [
  {
    id: 1,
    title: "Personalised Learning Plans",
  },
  {
    id: 2,
    title: "Certified Tutors",
  },
  {
    id: 3,
    title: "Flexible Scheduling",
  },
  {
    id: 4,
    title: "Fun & Interactive Lessons",
  },
];

export default function CourseSubjects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
        Havilah Tutors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {subjects.map((subject, index) => (
          <Accordion
            type="single"
            key={index}
            collapsible
            className="bg-white rounded-lg shadow"
            onValueChange={() => handleToggle(index)}
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <span className="text-left font-medium">{subject.title}</span>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                {subject.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="text-center space-y-6 relative">
        <h2 className="text-lg lg:text-2xl font-bold text-secondary">
          Start A Lesson Plan Today
        </h2>
        <div className="relative">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="#plan">
              <Button
                size="lg"
                variant={"secondary"}
                className="bg-primary text-white hover:bg-secondary rounded-full"
              >
                Choose a Plan
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-full"
            >
              Book a Consultation
            </Button>
          </div>
          <div className="absolute -right-4 bottom-0 hidden md:block"></div>
        </div>
      </div>

      <section className="mt-20 lg:mt-40">
        <h1 className="text-xl lg:text-4xl text-primary font-bold text-center">
          Why Choose Us
        </h1>

        <aside>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {chooseUs.map((item) => (
              <div key={item.id} className="border-2 border-secondary p-2">
                <p className="text-sm text-center text-black border border-primary py-5 font-medium ">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="my-8 mt-20 relative" id="plan">
        <Image
          src={childTeacher2}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover absolute inset-0"
        />
        <article className="space-y-3 text-center py-9 relative z-20">
          <h1 className="text-xl lg:text-4xl text-primary font-bold text-center">
            Start A Lesson Plan Today
          </h1>

          <p>Let us give you an edge</p>
          <GoogleForm />
        </article>
      </section>
    </main>
  );
}
