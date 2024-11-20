import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-[80vh] flex flex-col items-center justify-center px-4"
    >
      {/* 404 Number */}
      <motion.h1
        className="text-9xl font-bold text-primary"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        404
      </motion.h1>

      {/* Message */}
      <h2 className="mt-8 text-2xl md:text-3xl font-semibold text-center">
        Oops! Looks like you're lost
      </h2>
      <p className="mt-4 text-muted-foreground text-center max-w-md">
        The page you're looking for doesn't exist or has been moved to another
        location.
      </p>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate(-1)}
          className="min-w-[150px]"
        >
          Go Back
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/")}
          className="min-w-[150px]"
        >
          Home Page
        </Button>
      </div>

      {/* Optional: Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[40%] top-[20%] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[30%] bottom-[30%] h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </motion.div>
  );
}
