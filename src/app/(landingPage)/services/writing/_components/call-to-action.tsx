import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Let&apos;s Get Started!</h2>
        <p className="text-xl mb-8">
          Whether you&apos;re looking for academic support, creative
          collaboration, or professional writing services, Havilah Writers is
          here to help. Let&apos;s bring your ideas to life.
        </p>
        <div className="space-x-4">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Request a Quote
          </Button>
          <Link href="/services/writers/buy-writing-service">
            <Button
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
