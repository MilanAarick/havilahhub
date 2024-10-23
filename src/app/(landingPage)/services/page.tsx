import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ServiceCard from "./_components/service-card";
import {
  banner_five,
  banner_four,
  banner_three,
  book_writing,
  business_plan,
  research_writing,
  sop_writing,
} from "@/assets/images";

const services = [
  {
    id: "personalized-tutoring",
    title: "Personalized Tutoring",
    description:
      "One-on-one tailored lessons adapting to individual learning styles and challenges.",
    image: banner_five,
    details:
      "Our personalized tutoring service is designed to meet the unique academic needs of each student. From kindergarten to grade 12, we offer one-on-one tailored lessons that adapt to individual learning styles and challenges. With experienced tutors and a focus on academic success, we empower students to excel in school and beyond.",
  },
  {
    id: "exam-preparation",
    title: "Exam Preparation",
    description:
      "Equipping students with knowledge, strategies, and confidence to succeed in exams.",
    image: banner_four,
    details:
      "Preparing for exams can be stressful, but at Havilah Learning Hub, we make it manageable and effective. Our exam preparation services are tailored to equip students with the knowledge, strategies, and confidence they need to succeed. From understanding core concepts to honing time management skills, we ensure students are well-prepared to tackle any exam with ease.",
  },
  {
    id: "research-writing",
    title: "Research Writing",
    description:
      "Supporting university-level students in producing high-quality academic papers.",
    image: research_writing,
    details: `Our research writing service is designed to support university-level students in producing high-quality academic papers. Whether you're working on a BSc, MSc, or PhD project, our team of expert writers ensures your work is thoroughly researched, well-structured, and meets academic standards. Let Havilah Learning Hub help you achieve academic success with professionally crafted research writing services.`,
  },
  {
    id: "book-writing",
    title: "Book Writing",
    description:
      "Expert services for both fiction and nonfiction book writing projects.",
    image: book_writing,
    details: `Whether you're crafting the next great novel or sharing your life story through nonfiction, Havilah Learning Hub offers expert book writing services to bring your vision to life. Our team of skilled writers collaborates closely with you to ensure your voice shines through every page. From concept to completion, we help create captivating content that resonates with your audience.`,
  },
  {
    id: "business-plan-sop",
    title: "Business Plan and SOPs",
    description: "Professional writing services for business plans and SOPs.",
    image: business_plan,
    details: `At Havilah Learning Hub, we offer professional business plan and SOP writing services that are tailored to your specific needs. Whether you're launching a startup or applying for a new position, our expertly written documents are clear, concise, and impactful. We ensure that your business plans and SOPs stand out, helping you achieve your professional goals.`,
  },
  {
    id: "statement-of-purpose",
    title: "Statement of Purpose Writing",
    description:
      "Crafting compelling SOPs for university and professional program applications.",
    image: sop_writing,
    details: `A strong Statement of Purpose (SOP) can make all the difference when applying to universities or professional programs. Our SOP writing service helps you articulate your goals, achievements, and aspirations in a compelling and organized manner. At Havilah Learning Hub, we provide personalized guidance to craft an SOP that highlights your strengths and sets you apart from the competition.`,
  },
];

const EnhancedServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main>
        {/* Hero Section */}
        <section className="relative bg-primary text-white overflow-hidden ">
          <div className="absolute inset-0">
            <Image
              src={banner_three}
              alt="Students studying"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <h1 className="text-5xl font-extrabold mb-6">
              Empowering Your Academic Journey
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Discover our comprehensive range of educational services designed
              to help you excel in your academic and professional pursuits.
            </p>
            <Button size="lg" variant="secondary">
              Explore Our Services
            </Button>
          </div>
          <svg
            className="absolute bottom-0 w-full text-white"
            viewBox="0 0 1440 100"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C240,100 480,100 720,0 C960,100 1200,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </section>

        {/* Services Section */}
        <section
          id="our-services"
          className="py-24 px-4 sm:px-6 lg:px-8  bg-white"
        >
          <aside className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-16">
              Our Services
            </h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard service={service} key={service.id} />
              ))}
            </div>
          </aside>
        </section>

        {/* Testimonial Section */}
        <section className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M0,0 L100,100 M100,0 L0,100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Students Say
            </h2>
            <blockquote className="text-xl italic text-center">
              &quot;Havilah Learning Hub transformed my academic journey. Their
              personalized approach and expert guidance significantly improved
              my performance and confidence.&quot;
              <footer className="mt-4 text-gray-600">
                <strong>Sarah Johnson</strong>, University Student
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/placeholder.svg?height=600&width=1600"
              alt="Abstract background"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Excel?</h2>
            <p className="text-xl mb-8">
              Get in touch with Havilah Learning Hub today and take the first
              step towards academic success!
            </p>
            <Button variant="secondary" size="lg">
              Contact Us Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                About
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Services
              </h3>
              <ul className="mt-4 space-y-4">
                {services.slice(0, 3).map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className="text-base text-gray-300 hover:text-white transition-colors"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                More Services
              </h3>
              <ul className="mt-4 space-y-4">
                {services.slice(3).map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className="text-base text-gray-300 hover:text-white transition-colors"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2023 Havilah Learning Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400  hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedServicesPage;
