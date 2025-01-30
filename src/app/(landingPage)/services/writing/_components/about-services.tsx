import React from "react";
import ServiceCard from "../../_components/service-card";
import {
  assignment,
  banner_five,
  banner_four,
  book,
  book_writing,
  business_plan,
  proofReading,
  publishing,
  research_writing,
  sop_writing,
} from "@/assets/images";

type Props = {};

const AboutServices = (props: Props) => {
  const services = [
    // {
    //   id: "personalized-tutoring",
    //   title: "Personalized Tutoring",
    //   type: "tutoring",
    //   description:
    //     "One-on-one tailored lessons adapting to individual learning styles and challenges.",
    //   image: banner_five,
    //   details:
    //     "Our personalized tutoring service is designed to meet the unique academic needs of each student. From kindergarten to grade 12, we offer one-on-one tailored lessons that adapt to individual learning styles and challenges. With experienced tutors and a focus on academic success, we empower students to excel in school and beyond.",
    // },
    // {
    //   id: "exam-preparation",
    //   title: "Exam Preparation",
    //   type: "tutoring",
    //   description:
    //     "Equipping students with knowledge, strategies, and confidence to succeed in exams.",
    //   image: banner_four,
    //   details:
    //     "Preparing for exams can be stressful, but at Havilah Learning Hub, we make it manageable and effective. Our exam preparation services are tailored to equip students with the knowledge, strategies, and confidence they need to succeed. From understanding core concepts to honing time management skills, we ensure students are well-prepared to tackle any exam with ease.",
    // },
    {
      id: "research-writing",
      title: "Research Writing",
      type: "writing",
      description:
        "Supporting university-level students in producing high-quality academic papers.",
      image: research_writing,
      details: `Our research writing service is designed to support university-level students in producing high-quality academic papers. Whether you're working on a BSc, MSc, or PhD project, our team of expert writers ensures your work is thoroughly researched, well-structured, and meets academic standards. Let Havilah Learning Hub help you achieve academic success with professionally crafted research writing services.`,
    },
    {
      id: "assignment-help",
      title: "Assignment Help",
      type: "writing",
      description:
        "Expert assistance with a wide range of assignments and coursework.",
      image: assignment,
      details:
        "Get assistance with academic assignments at any level. Whether your task is simple or requires advanced problem-solving skills, our experts are here to help. We also offer expedited services for urgent assignments, ensuring you meet your deadlines without stress.",
    },
    {
      id: "book-writing",
      title: "Book Writing",
      type: "writing",
      description:
        "Expert services for both fiction and nonfiction book writing projects.",
      image: book,
      details: `Whether you're crafting the next great novel or sharing your life story through nonfiction, Havilah Learning Hub offers expert book writing services to bring your vision to life. Our team of skilled writers collaborates closely with you to ensure your voice shines through every page. From concept to completion, we help create captivating content that resonates with your audience.`,
    },
    {
      id: "business-plan-sop",
      title: "Business Plan and SOPs",
      type: "writing",
      description: "Professional writing services for business plans and SOPs.",
      image: business_plan,
      details: `At Havilah Learning Hub, we offer professional business plan and SOP writing services that are tailored to your specific needs. Whether you're launching a startup or applying for a new position, our expertly written documents are clear, concise, and impactful. We ensure that your business plans and SOPs stand out, helping you achieve your professional goals.`,
    },
    {
      id: "statement-of-purpose",
      title: "Statement of Purpose Writing",
      type: "writing",
      description:
        "Crafting compelling SOPs for university and professional program applications.",
      image: sop_writing,
      details: `A strong Statement of Purpose (SOP) can make all the difference when applying to universities or professional programs. Our SOP writing service helps you articulate your goals, achievements, and aspirations in a compelling and organized manner. At Havilah Learning Hub, we provide personalized guidance to craft an SOP that highlights your strengths and sets you apart from the competition.`,
    },
    {
      id: "proof-reading",
      title: "Proof Reading",
      type: "writing",
      description:
        "Professional proofreading services for academic and professional documents.",
      image: proofReading,
      details:
        "Our proofreading service ensures that your documents are free of errors, from grammar and spelling to punctuation. Whether it’s an essay, dissertation, or business document, we will help you polish your work to perfection, ensuring it’s clear, concise, and professional.",
    },
    {
      id: "publishing",
      title: "Publishing Assistance",
      type: "writing",
      description:
        "Guidance and support for authors looking to publish their work.",
      image: publishing,
      details:
        "We offer comprehensive publishing services, from manuscript review to self-publishing and traditional submission support. Whether you're looking to publish independently or submit to a traditional publisher, we guide you through every step of the process, ensuring your book reaches the right audience.",
    },
  ];

  return (
    <div>
      <section
        id="our-services"
        className="py-24 px-4 sm:px-6 lg:px-8  bg-white"
      >
        <aside className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Our Services
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default AboutServices;
