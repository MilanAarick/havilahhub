import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Havilah Learning Hub | Tutoring and writing service",
  description:
    "Havilah Learning Hub provides personalized tutoring and research support from kindergarten to postgraduate levels, offering tailored tutoring, assignment help, and project assistance to help students excel academically",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={` font-inter antialiased`}>
      <Header />
      <div className="pb-10 bg-gray-50">{children}</div>

      <Footer />
    </main>
  );
}
