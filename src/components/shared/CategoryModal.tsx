import React, { useEffect } from "react";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useGenerateQuizGame } from "@/lib/react-query";
import { Input } from "@/components/ui/input";

const defaultTopics = [
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
  const [topics, setTopics] = React.useState<string[]>(defaultTopics);
  const [newCategory, setNewCategory] = React.useState<string>("");
  const [showAddInput, setShowAddInput] = React.useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const { mutateAsync: generateQuiz, data: quizQuestions } =
    useGenerateQuizGame();
  const handleStartQuiz = async () => {
    if (selectedTopics.length >= 5) {
      await generateQuiz(selectedTopics);
    }
  };

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedTopics([]);
    }
  };

  const handleAddCustomCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !topics.includes(newCategory.trim())) {
      setTopics((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
      setShowAddInput(false);
    }
  };

  useEffect(() => {
    console.log("quizQuestions", quizQuestions);
    if (quizQuestions) {
      navigate("/quiz", { state: { questions: quizQuestions } });
    }
  }, [quizQuestions]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[95%] md:max-w-[700px] p-6 sm:p-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl sm:text-3xl text-center font-bold">
            Quiz Topics
          </DialogTitle>
          <div className="space-y-2">
            <p className="text-center text-base sm:text-lg text-muted-foreground">
              Select your preferred topics to customize your quiz experience
            </p>
            <p className="text-center text-sm text-yellow-600 font-medium">
              {selectedTopics.length}/5 topics selected (minimum 5 required)
            </p>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 py-6">
          {topics.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <div key={topic} className="flex items-center">
                <Badge
                  variant={isSelected ? "default" : "secondary"}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm sm:text-base
                    ${
                      isSelected
                        ? "bg-yellow-400 hover:bg-yellow-500 text-black scale-105"
                        : "hover:bg-yellow-100 hover:text-black"
                    } 
                    cursor-pointer transition-all duration-200 ease-in-out`}
                  onClick={() => toggleTopic(topic)}
                >
                  <span className="text-center">{topic}</span>
                  {isSelected && (
                    <X
                      size={16}
                      className="ml-2 hover:scale-125 transition-transform"
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

          <div className="flex items-center">
            {showAddInput ? (
              <form onSubmit={handleAddCustomCategory} className="w-full">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category..."
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="outline"
                    className="px-2"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </form>
            ) : (
              <Badge
                variant="secondary"
                className="w-full flex items-center justify-center px-4 py-3 text-sm sm:text-base
                  cursor-pointer hover:bg-yellow-100 hover:text-black
                  transition-all duration-200 ease-in-out"
                onClick={() => setShowAddInput(true)}
              >
                <Plus size={16} className="mr-2" />
                <span>Add Custom</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleStartQuiz}
            disabled={selectedTopics.length < 5}
            className={`
              px-8 py-3 text-lg font-medium rounded-full
              ${
                selectedTopics.length >= 5
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black transform hover:scale-105 transition-all"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {selectedTopics.length >= 5
              ? "Start Quiz"
              : "Select 5 Topics to Start"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
