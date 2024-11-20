import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ScoreModalProps {
  score?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

const ScoreModal = ({
  score = 4,
  isOpen = true,
  onClose = () => {},
}: ScoreModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden p-4">
          {/* Decorative elements */}
          <div className="absolute left-12 top-8">
            <div className="h-8 w-16 rounded-full bg-pink-400/80" />
          </div>
          <div className="absolute right-12 top-16">
            <div className="h-6 w-12 rounded-full bg-sky-200/80" />
          </div>
          <div className="absolute bottom-24 left-16">
            <div className="h-6 w-12 rounded-full bg-pink-400/80" />
          </div>
          <div className="absolute -right-4 bottom-32">
            <div className="h-8 w-16 rounded-full bg-sky-200/80" />
          </div>

          {/* Main score circle */}
          <div className="relative flex h-64 w-64 flex-col items-center justify-center rounded-full bg-yellow-400">
            <div className="absolute -right-2 top-4">
              <div className="h-4 w-4 rounded-full bg-pink-400" />
            </div>
            <div className="absolute -left-1 top-12">
              <div className="h-3 w-3 rounded-full bg-white" />
            </div>
            <div className="absolute right-12 top-0">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
            <span className="text-lg font-medium text-white">Your score</span>
            <span className="text-8xl font-bold text-white">{score}</span>
          </div>

          {/* Complete button */}
          <Button
            onClick={handleClose}
            className="mt-8 bg-yellow-400 px-8 font-medium text-white hover:bg-yellow-500"
          >
            View Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreModal;
