import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AboutWriters() {
  const features = [
    "Professional, Experienced Writers",
    "Tailored Services Across Diverse Fields",
    "Affordable Pricing with Tiered Options",
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Why Choose Havilah Writers?
        </h2>
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-gray-600 text-lg mb-6">
              At Havilah Writers, we believe every word counts. Whether you are
              a student aiming for academic success, an entrepreneur with a bold
              business idea, or an aspiring author crafting your masterpiece,
              our team of experts is here to help.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Our services are tailored to meet your unique needs, offering
              precision, creativity, and timely delivery to ensure you stand
              out.
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center">
                <CheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-700">{feature}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/services/writers/buy-writing-service">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
