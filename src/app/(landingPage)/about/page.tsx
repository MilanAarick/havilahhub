import { banner_three } from "@/assets/images";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Havilah Learning Hub | About Us",
  description:
    "Havilah Learning Hub provides personalized tutoring and research support from kindergarten to postgraduate levels, offering tailored tutoring, assignment help, and project assistance to help students excel academically",
};

const page = (props: Props) => {
  return (
    <main>
      <article className="mt-24 container mx-auto p-5">
        <h1 className="font-medium font-inter lg:text-2xl pb-6">About Us</h1>
        <h2 className="font-semibold font-poppins text-3xl lg:text-7xl leading-9">
          We foster critical thinking <br />
          <span className="text-gray-300">and academic excellence</span>
        </h2>
      </article>

      <div className="relative mt-20">
        <Image
          src={banner_three}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="object-cover w-full h-[500px] lg:h-[800px]"
        />

        <section className="container mx-auto left-0 absolute right-0 top-0 flex justify-end my-auto bottom-0 h-fit">
          <div className="bg-white shadow-md rounded-md max-w-[600px]">
            <div className="p-12">
              <h2 className="font-semibold font-poppins text-3xl lg:text-5xl leading-9">
                Our Mission
              </h2>
              <p className="font-medium font-inter lg:text-xl mt-4 text-gray-500">
                At Havilah Learning Hub, we are committed to providing a
                holistic academic experience that sets our students up for
                success. Whether it&apos;s personalized tutoring or expert
                academic writing, we tailor our services to meet the unique
                needs of each student. Our dedicated tutors and professional
                writers bring years of experience, ensuring every learner
                receives the highest quality support. We believe in fostering
                critical thinking, passion for learning, and academic
                excellence, making us a trusted partner in your educational
                journey.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container mx-auto flex flex-col gap-6 lg:flex-row lg:justify-between mt-32">
        <article className="font-poppins text-2xl lg:text-5xl text-primary font-semibold">
          Personalized <br />
          <span className="text-gray-400">Teaching</span>
        </article>
        <article className="space-y-4 max-w-[620px] lg:text-xl text-gray-500">
          <p>
            Our personalized tutoring service is designed to meet the unique
            academic needs of each student. From kindergarten to grade 12, we
            offer one-on-one tailored lessons that adapt to individual learning
            styles and challenges.
          </p>

          <p>
            With experienced tutors and a focus on academic success, we empower
            students to excel in school and beyond. At Havilah Learning Hub, we
            provide the individualized attention and expert support needed to
            help your child thrive.
          </p>
        </article>
      </div>

      <div className="container mx-auto flex flex-col gap-6 lg:flex-row-reverse lg:justify-between mt-32">
        <article className="font-poppins text-2xl lg:text-5xl text-primary font-semibold">
          Exam <br />
          <span className="text-gray-400">Preparation</span>
        </article>
        <article className="space-y-4 max-w-[620px] lg:text-xl text-gray-500">
          <p>
            Preparing for exams can be stressful, but at Havilah Learning Hub,
            we make it manageable and effective. Our exam preparation services
            are tailored to equip students with the knowledge, strategies, and
            confidence they need to succeed. From understanding core concepts to
            honing time management skills, we ensure students are well-prepared
            to tackle any exam with ease.
          </p>
        </article>
      </div>

      <div className="container mx-auto flex flex-col gap-6 lg:flex-row lg:justify-between mt-32">
        <article className="font-poppins text-2xl lg:text-5xl text-primary font-semibold">
          Research <br />
          <span className="text-gray-400">Writing</span>
        </article>
        <article className="space-y-4 max-w-[620px] lg:text-xl text-gray-500">
          <p>
            Our research writing service is designed to support university-level
            students in producing high-quality academic papers. Whether you’re
            working on a BSc, MSc, or PhD project, our team of expert writers
            ensures your work is thoroughly researched, well-structured, and
            meets academic standards. Let Havilah Learning Hub help you achieve
            academic success with professionally crafted research writing
            services.
          </p>
        </article>
      </div>

      <div className="container mx-auto flex flex-col gap-6 lg:flex-row-reverse lg:justify-between mt-32">
        <article className="font-poppins text-2xl lg:text-5xl text-primary font-semibold">
          Business Plan <br />
          <span className="text-gray-400">SOP Writing </span>
        </article>
        <article className="space-y-4 max-w-[620px] lg:text-xl text-gray-500">
          <p>
            At Havilah Learning Hub, we offer professional business plan and SOP
            writing services that are tailored to your specific needs. Whether
            you&apos;re launching a startup or applying for a new position, our
            expertly written documents are clear, concise, and impactful. We
            ensure that your business plans and SOPs stand out, helping you
            achieve your professional goals.
          </p>
        </article>
      </div>

      <div className="container mx-auto flex flex-col gap-6 lg:flex-row lg:justify-between mt-32">
        <article className="font-poppins text-2xl lg:text-5xl text-primary font-semibold">
          Statement of Purpose <br />
          <span className="text-gray-400">Writing Plan </span>
        </article>
        <article className="space-y-4 max-w-[620px] lg:text-xl text-gray-500">
          <p>
            A strong Statement of Purpose (SOP) can make all the difference when
            applying to universities or professional programs. Our SOP writing
            service helps you articulate your goals, achievements, and
            aspirations in a compelling and organized manner. At Havilah
            Learning Hub, we provide personalized guidance to craft an SOP that
            highlights your strengths and sets you apart from the competition.
          </p>
        </article>
      </div>
    </main>
  );
};

export default page;
