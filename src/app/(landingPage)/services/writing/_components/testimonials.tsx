import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Havilah Writers helped me ace my final-year project. I couldn't be more thankful!",
      author: "Adewale A.O, BSc. Student",
    },
    {
      quote: "My business plan exceeded all expectations. Truly professional!",
      author: "Grace M., Entrepreneur",
    },
    {
      quote:
        "Their book writing service turned my dream into reality. Highly recommended!",
      author: "Samuel T., Author",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          What Our Clients Say
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Join the hundreds of satisfied clients who trust Havilah Writers for
          their writing needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition duration-300"
            >
              <CardContent className="p-6">
                <Quote className="text-blue-500 mb-4 h-8 w-8" />
                <p className="text-gray-600 mb-4 italic">{testimonial.quote}</p>
                <p className="text-gray-800 font-semibold">
                  {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
