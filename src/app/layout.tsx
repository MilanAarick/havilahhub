import { ReactQueryProvider } from "@/hooks/react-query/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Havilah Learning Hub",
  description: "Tutoring and Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={jakarta.className}>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          > */}
          <ReactQueryProvider>{children}</ReactQueryProvider>

          <Toaster richColors />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
