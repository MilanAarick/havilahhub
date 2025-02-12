import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { render } from "@react-email/render";
import { WritingFormData } from "@/constants/forms";

interface TutorFormProps {
  email: string;
  parentName: string;
  phoneNumber: string;
  homeAddress: string;
  preferredContact: string;
  referralSource: string;
  services: {
    physicalClasses?: string;
    onlineClasses?: string;
    artsMusic?: string;
    languages?: string;
  };
  numberOfChildren: number;
  namesOfChildren: string;
  agesOfChildren: string;
  currentSchools: string;
  grades: string[];
  subjects: string[];
  additionalInformation?: string;
  challenges?: string;
  details?: string;
  goals?: string;
  beginDate: string;
  hours: number;
}

const TutorFormEmail = ({
  email,
  parentName,
  phoneNumber,
  homeAddress,
  preferredContact,
  referralSource,
  services,
  numberOfChildren,
  namesOfChildren,
  agesOfChildren,
  currentSchools,
  grades,
  subjects,
  additionalInformation,
  challenges,
  details,
  goals,
  beginDate,
  hours,
}: TutorFormProps) => {
  const previewText = `New form submission from ${parentName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Form Submission</Heading>
          <Text style={text}>
            A new form has been submitted with the following details:
          </Text>

          <Section style={section}>
            <Text style={sectionTitle}>Personal Information</Text>
            <Text style={sectionContent}>Email: {email}</Text>
            <Text style={sectionContent}>
              Parent/Guardian Name: {parentName}
            </Text>
            <Text style={sectionContent}>Phone Number: {phoneNumber}</Text>
            <Text style={sectionContent}>Home Address: {homeAddress}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={sectionTitle}>Preferences</Text>
            <Text style={sectionContent}>
              Preferred Contact Method: {preferredContact}
            </Text>
            <Text style={sectionContent}>
              Referral Source: {referralSource}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={sectionTitle}>Selected Services</Text>
            {services.physicalClasses && (
              <Text style={sectionContent}>
                Physical Classes: ₦{services.physicalClasses ?? "N/A"}
              </Text>
            )}
            {services.onlineClasses && (
              <Text style={sectionContent}>
                Online Classes: ₦{services.onlineClasses}
              </Text>
            )}
            {services.artsMusic && (
              <Text style={sectionContent}>
                Arts & Music: ₦{services.artsMusic}
              </Text>
            )}
            {services.languages && (
              <Text style={sectionContent}>
                Languages: ₦{services.languages}
              </Text>
            )}
          </Section>

          <Section style={section}>
            <Text style={sectionTitle}>Children Information</Text>
            <Text style={sectionContent}>
              Number of Children: {numberOfChildren}
            </Text>
            <Text style={sectionContent}>
              Names of Children: {namesOfChildren}
            </Text>
            <Text style={sectionContent}>
              Ages of Children: {agesOfChildren}
            </Text>
            <Text style={sectionContent}>
              Current Schools: {currentSchools}
            </Text>
            <Text style={sectionContent}>Grades: {grades.join(", ")}</Text>
            <Text style={sectionContent}>Subjects: {subjects.join(", ")}</Text>
            <Text style={sectionContent}>
              Details about your child&apos;s learning style, interests, or
              preferences?: {additionalInformation}
            </Text>
            <Text style={sectionContent}>
              Does your child have any specific academic challenges or areas
              they need extra support in? : {challenges}
            </Text>
            <Text style={sectionContent}>
              Kindly provide details: {details}
            </Text>
            <Text style={sectionContent}>
              Are there any particular academic goals you have for your child?:{" "}
              {goals}
            </Text>
            <Text style={sectionContent}>
              When would you like to begin the tutoring sessions? : {beginDate}
            </Text>
            <Text style={sectionContent}>Number of Hours: {hours}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated email sent from Havilah&apos;s Educational
            Services.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Writing Email Template

const WritingFormEmail = ({
  fullName,
  email,
  phoneNumber,
  preferredContactMethod,
  type,
  total,
  serviceDetails,
}: WritingFormData) => {
  const previewText = `New writing service request from ${fullName}`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Writing Service Request</Heading>
          <Section style={section}>
            <Text style={sectionTitle}>Personal Information</Text>
            <Text style={sectionContent}>Full Name: {fullName}</Text>
            <Text style={sectionContent}>Email: {email}</Text>
            <Text style={sectionContent}>Phone Number: {phoneNumber}</Text>
            <Text style={sectionContent}>
              Preferred Contact Method: {preferredContactMethod}
            </Text>
          </Section>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={sectionTitle}>Service Details</Text>
            <Text style={sectionContent}>Type: {type}</Text>
            <Text style={sectionContent}>
              Subject: {serviceDetails.subject}
            </Text>
            <Text style={sectionContent}>
              Description: {serviceDetails.description}
            </Text>
            <Text style={sectionContent}>
              Plan: {serviceDetails.plan || "N/A"}
            </Text>
            <Text style={sectionContent}>
              Tier: {serviceDetails.tier || "N/A"}
            </Text>
            <Text style={sectionContent}>
              Revisions: {serviceDetails.revisions || "N/A"}
            </Text>
            <Text style={sectionContent}>
              Rush Order: {serviceDetails.rushOrder ? "Yes" : "No"}
            </Text>
            <Text style={sectionContent}>
              Add-Ons: {serviceDetails.addOns?.join(", ") || "None"}
            </Text>
            <Text style={sectionContent}>
              Custom Notes: {serviceDetails.customNotes || "None"}
            </Text>
          </Section>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={sectionTitle}>Order Summary</Text>
            <Text style={sectionContent}>
              Total Amount: ₦{total?.toLocaleString()}
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated email sent from Havilah&apos;s Educational
            Services.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const renderFormSubmissionEmail = (
  type: "tutoring" | "writing",
  data: TutorFormProps | WritingFormData
) => {
  if (type === "tutoring") {
    return render(<TutorFormEmail {...(data as TutorFormProps)} />);
  } else if (type === "writing") {
    return render(<WritingFormEmail {...(data as WritingFormData)} />);
  }
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#8B2B02",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  padding: "0 48px",
  margin: "0",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 48px",
};

const section = {
  padding: "0 48px",
};

const sectionTitle = {
  color: "#8B2B02",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "26px",
  margin: "16px 0 8px",
};

const sectionContent = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 4px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 48px",
  textAlign: "center" as const,
};
