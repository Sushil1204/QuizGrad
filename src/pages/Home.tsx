import { Button } from "@/components/ui/button";
import heroImage from "@/assets/heroImage.png";
import { useState } from "react";
import CategoryModal from "@/components/ui/shared/CategoryModal";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-center gap-5 mx-24 md:my-16">
      <div className="space-y-10 text-center lg:text-left lg:w-1/2">
        <h1 className="font-roboto tracking-wide text-4xl font-medium text-TextPrimaray  sm:text-5xl lg:text-6xl">
          Learn
          <br />
          new concepts
          <br />
          for each question
        </h1>
        <p className="font-roboto font-normal tracking-normal text-muted-foreground text-xl border-l-2 border-l-black pl-2 py-2">
          We help you prepare for exams and quizzes
        </p>
        <div className="flex justify-center lg:justify-start items-center space-x-4">
          <Button
            variant={"default"}
            size={"lg"}
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400"
          >
            Start solving
          </Button>
          <Button
            variant="link"
            className="text-yellow-600 hover:text-yellow-700"
          >
            Know more
          </Button>
        </div>
      </div>

      <div className="max-h-full lg:w-1/2 md:flex items-center justify-center">
        <img
          src={heroImage}
          alt="Quiz illustration"
          className="object-cover w-auto h-[500px]"
        />
      </div>
      <CategoryModal open={isModalOpen} setOpen={setIsModalOpen} />
    </main>
  );
};

export default Home;
