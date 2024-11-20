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

    if (isLastQuestion) {
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

  const handleTryAgain = () => {
    // Reset all quiz state
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setTimeLeft(TIMER_SECONDS);
    setAnswers([]);
    setScore(0);
    setShowScoreModal(false); // Close the modal after resetting
  };

  const handleCloseModal = () => {
    setShowScoreModal(false);
  };

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
    <div className="h-auto bg-gradient-to-b from-yellow-50 to-white p-6">
      {/* Header Section with Timer and Progress */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
          </h2>
          <div className="flex items-center gap-2 bg-white shadow-md px-6 py-3 rounded-full">
            <Timer className="w-5 h-5 text-yellow-600" />
            <span className="text-lg font-bold text-yellow-600">
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Progress Bar instead of steps */}
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {currentQuestion.question}
          </h1>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map(
              (option: { id: string; text: string }, index: number) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className={cn(
                    "w-full p-6 text-left flex items-center gap-4 transition-all duration-200",
                    "hover:transform hover:scale-[1.01]",
                    selectedOption === option?.id
                      ? "bg-yellow-400 border-yellow-400 text-black shadow-md"
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                  onClick={() => setSelectedOption(option?.id)}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg">{option?.text}</span>
                </Button>
              )
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center sticky bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            ← Previous
          </Button>

          <div className="space-x-3">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
              onClick={handleSkip}
              disabled={isLastQuestion}
            >
              Skip
            </Button>
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-8"
              onClick={handleNext}
              disabled={!selectedOption}
            >
              {isLastQuestion ? "Finish" : "Next"} →
            </Button>
          </div>
        </div>
      </div>

      <ScoreModal
        isOpen={showScoreModal}
        onClose={handleCloseModal}
        score={score}
        onTryAgain={handleTryAgain}
      />
    </div>
  );
};

export default QuizPage;
