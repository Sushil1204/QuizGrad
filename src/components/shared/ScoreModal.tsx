import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ScoreModalProps {
  score?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onTryAgain?: () => void;
}

const ScoreModal = ({
  score = 4,
  isOpen = true,
  onClose = () => {},
  onTryAgain = () => {},
}: ScoreModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-0 p-0 bg-gradient-to-b from-yellow-50 to-white">
        <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center p-8">
          {/* Confetti effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-float absolute left-8 top-12">
              <div className="h-6 w-6 rotate-12 rounded bg-pink-400/30" />
            </div>
            <div className="animate-float-delayed absolute right-12 top-20">
              <div className="h-8 w-8 -rotate-12 rounded-lg bg-yellow-400/30" />
            </div>
            <div className="animate-float absolute left-20 bottom-24">
              <div className="h-10 w-10 rotate-45 rounded-lg bg-sky-400/30" />
            </div>
            <div className="animate-float-delayed absolute right-16 bottom-32">
              <div className="h-6 w-6 -rotate-12 rounded bg-purple-400/30" />
            </div>
          </div>

          {/* Score Display */}
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-pulse-slow rounded-full bg-yellow-200/50 blur-2xl" />
            <div className="relative flex h-48 w-48 flex-col items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg">
              <span className="text-sm font-medium text-yellow-50">
                Your Score
              </span>
              <span className="text-7xl font-bold text-white">{score}</span>
              <span className="text-sm font-medium text-yellow-50">
                out of 10
              </span>
            </div>
          </div>

          {/* Message based on score */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {score >= 8
                ? "Excellent! 🎉"
                : score >= 6
                ? "Good Job! 👏"
                : "Keep Practicing! 💪"}
            </h2>
            <p className="text-gray-600">
              {score >= 8
                ? "You're doing amazing! Keep up the great work!"
                : score >= 6
                ? "You're on the right track. A bit more practice and you'll be perfect!"
                : "Don't worry, practice makes perfect. Try again to improve your score!"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              className="bg-yellow-400 px-8 font-medium text-white hover:bg-yellow-500"
            >
              View Report
            </Button>
            <Button
              onClick={onTryAgain}
              variant="outline"
              className="px-8 font-medium text-gray-600 hover:bg-gray-50"
            >
              Try Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreModal;
