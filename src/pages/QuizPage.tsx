import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { useLocation } from "react-router-dom";
// import { Question, Option } from "@/types/quiz";
import ScoreModal from "@/components/shared/ScoreModal";

const QuizPage = () => {
  const TIMER_SECONDS = 60;
  const TOTAL_QUESTIONS = 10;
  const { state } = useLocation();
  const QUIZ_QUESTIONS = state?.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [timeLeft, setTimeLeft] = React.useState(TIMER_SECONDS);
  const [answers, setAnswers] = React.useState<
    Array<{ id: string; userSelectedAnswer: string }>
  >([]);
  const [showScoreModal, setShowScoreModal] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

  const calculateScore = React.useCallback(() => {
    let correctAnswers = 0;
    answers.forEach((answer) => {
      const question = QUIZ_QUESTIONS.find(
        (q: { id: string }) => q.id === answer.id
      );
      console.log(question);
      if (question && answer.userSelectedAnswer === question.answer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  }, [answers, QUIZ_QUESTIONS]);

  const handleNext = React.useCallback(() => {
    if (selectedOption) {
      setAnswers((prev) => [
        ...prev,
        {
          id: currentQuestion.id.toString(),
          userSelectedAnswer: selectedOption,
        },
      ]);
    }
    console.log(selectedOption);

    if (isLastQuestion) {
      console.log(isLastQuestion);
      const finalScore = calculateScore();
      setScore(finalScore);
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  }, [selectedOption, currentQuestion.id, isLastQuestion, calculateScore]);

  const handlePrevious = React.useCallback(() => {
    setCurrentQuestionIndex((prev) => prev - 1);
    const previousAnswer = answers.find(
      (a) => a.id === currentQuestion.id.toString()
    );
    setSelectedOption(previousAnswer?.userSelectedAnswer || null);
  }, [answers, currentQuestion.id]);

  const handleSkip = React.useCallback(() => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
  }, []);

  React.useEffect(() => {
    setTimeLeft(TIMER_SECONDS);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && !isLastQuestion) {
          handleSkip();
          return TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, handleSkip, isLastQuestion]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="md:hidden flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
        <Timer className="w-4 h-4 text-yellow-500" />
        <span className="text-yellow-500 font-medium">{timeLeft}</span>
      </div>

      {/* Progress Steps */}
      <div className="mx-auto max-w-3xl mb-8">
        <div className="flex justify-between items-center">
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index === currentQuestionIndex
                    ? "bg-yellow-400 text-black"
                    : index < currentQuestionIndex
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                )}
              >
                {index + 1}
              </div>
              {index < TOTAL_QUESTIONS - 1 && (
                <div className="flex-1 h-[2px] bg-gray-200 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-yellow-400 p-8 mb-8 rounded-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-black max-w-3xl mx-auto text-center">
          {currentQuestion.question}
        </h1>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
        {currentQuestion.options.map(
          (option: { id: string; text: string }, index: number) => (
            <Button
              key={option.id}
              variant="outline"
              className={cn(
                "h-24 text-lg font-bold",
                selectedOption === option?.id
                  ? "bg-yellow-400 border-yellow-400 text-black"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
              onClick={() => setSelectedOption(option?.id)}
            >
              <span className="mr-4">{`${index + 1})`}</span>
              {option?.text}
            </Button>
          )
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <Button
          variant="outline"
          className="bg-gray-200 transition duration-200 hover:bg-gray-300"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
        >
          ← Previous
        </Button>

        <div className="hidden md:flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
          <Timer className="w-4 h-4 text-yellow-500" />
          <span className="text-yellow-500 font-medium">{timeLeft}</span>
        </div>

        <div className="space-x-2">
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-500 transition duration-300"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            Next →
          </Button>
          <Button
            variant="ghost"
            className="text-yellow-600 hover:text-yellow-700 transition duration-300"
            onClick={handleSkip}
            disabled={isLastQuestion}
          >
            Skip →
          </Button>
        </div>
      </div>

      <ScoreModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        score={score}
      />
    </div>
  );
};

export default QuizPage;
