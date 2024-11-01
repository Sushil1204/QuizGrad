import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer } from "lucide-react";

interface Option {
  id: string;
  label: string;
  text: string;
}

const options: Option[] = [
  { id: "A", label: "A", text: "FIGMA" },
  { id: "B", label: "B", text: "ADOBE XD" },
  { id: "C", label: "C", text: "INVISION" },
  { id: "D", label: "D", text: "SKETCH" },
];

const QuizPage = () => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [timeLeft, setTimeLeft] = React.useState(60);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="md:hidden flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
        <Timer className="w-4 h-4 text-yellow-500" />
        <span className="text-yellow-500 font-medium">{timeLeft}</span>
      </div>

      {/* Progress Steps */}
      <div className="mx-auto max-w-3xl mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((step) => (
            <React.Fragment key={step}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step === 1
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-600"
                )}
              >
                {step}
              </div>
              {step < 5 && <div className="flex-1 h-[2px] bg-gray-200 mx-2" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-yellow-400 p-8 mb-8 rounded-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-black max-w-3xl mx-auto text-center">
          An interface design application that runs in the browser with
          team-based collaborative design projects
        </h1>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
        {options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className={cn(
              "h-24 text-lg font-bold",
              selectedOption === option.id
                ? "bg-yellow-400 border-yellow-400 text-black"
                : "bg-gray-100 hover:bg-gray-200"
            )}
            onClick={() => setSelectedOption(option.id)}
          >
            <span className="mr-4">{option.label}.</span>
            {option.text}
          </Button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <Button
          variant="outline"
          className="bg-gray-200 transition duration-200 hover:bg-gray-300"
        >
          ← Previous
        </Button>

        <div className="hidden md:flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
          <Timer className="w-4 h-4 text-yellow-500" />
          <span className="text-yellow-500 font-medium">{timeLeft}</span>
        </div>

        <div className="space-x-2">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 transition duration-300">
            Next →
          </Button>
          <Button
            variant="ghost"
            className="text-yellow-600 hover:text-yellow-700 transition duration-300"
          >
            Skip →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
