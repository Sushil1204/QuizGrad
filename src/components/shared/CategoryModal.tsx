import * as React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const topics = [
  "Mathematics",
  "Science",
  "History",
  "Geography",
  "Literature",
  "Arts",
  "Music",
  "Technology",
  "Sports",
  "Cinema",
  "Politics",
  "Philosophy",
];

interface CategoryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleStartQuiz = () => {
    if (selectedTopics.length >= 5) {
      navigate("/quiz");
      console.log("Starting quiz with topics:", selectedTopics);
      setOpen(false);
    }
  };

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedTopics([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[90%] md:max-w-[500px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center">
            Choose your favorite topic
          </DialogTitle>
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            Select more than 5 topics to start quiz
          </p>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 sm:gap-3 py-4 justify-center">
          {topics.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <div key={topic} className="flex items-center">
                <Badge
                  variant={isSelected ? "default" : "secondary"}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm ${
                    isSelected
                      ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                      : ""
                  } cursor-pointer transition-colors`}
                  onClick={() => toggleTopic(topic)}
                >
                  {topic}
                  {isSelected && (
                    <X
                      size={14}
                      className="ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTopic(topic);
                      }}
                    />
                  )}
                </Badge>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleStartQuiz}
            disabled={selectedTopics.length < 5}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 sm:px-6 sm:py-3"
          >
            Start Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
