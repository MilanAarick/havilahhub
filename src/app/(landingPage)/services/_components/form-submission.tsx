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

interface FormSubmissionEmailProps {
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
}

export const FormSubmissionEmail = ({
  email,
  parentName,
  phoneNumber,
  homeAddress,
  preferredContact,
  referralSource,
  services,
}: FormSubmissionEmailProps) => {
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
                Physical Classes: ₦{services.physicalClasses}
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

export const renderFormSubmissionEmail = (props: FormSubmissionEmailProps) => {
  return render(<FormSubmissionEmail {...props} />);
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
