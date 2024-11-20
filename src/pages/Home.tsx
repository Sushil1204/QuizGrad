import { Button } from "@/components/ui/button";
import heroImage from "@/assets/heroImage.png";
import { useState } from "react";
import CategoryModal from "@/components/shared/CategoryModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="h-min bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="animate-pulse inline-block w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">
                  Interactive Learning Platform
                </span>
              </div>

              <h1 className="font-roboto text-6xl lg:text-8xl font-bold leading-tight">
                Learn
                <span className="text-yellow-500"> Smarter</span>
                <br />
                Quiz
                <span className="text-yellow-500"> Better</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-2xl">
              Transform your learning journey through engaging quizzes and
              interactive content. Join thousands of learners worldwide in their
              quest for knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                variant="default"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="group bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Learning
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
                  →
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-8 py-6 text-lg rounded-2xl"
              >
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10">
              {[
                { number: "1000+", label: "Quiz Questions" },
                { number: "50+", label: "Categories" },
                { number: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-1 relative">
            <div className="absolute -inset-4 bg-yellow-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <img
              src={heroImage}
              alt="Quiz illustration"
              className="relative w-full h-auto max-w-2xl mx-auto drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      <CategoryModal open={isModalOpen} setOpen={setIsModalOpen} />
    </main>
  );
};

const floatAnimation = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;

export default Home;
