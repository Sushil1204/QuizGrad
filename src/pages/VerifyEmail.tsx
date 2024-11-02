import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import HandsGraduate from "@/assets/HandsGraduate.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be exactly 6 characters" }),
});

const VerifyEmail = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="container relative min-h-screen flex-col  grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-5">
        <div className="mx-auto flex flex-col justify-center w-full space-y-6 p-10 md:p-20 ">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex items-center justify-center mb-6">
              <img
                src={logo}
                alt="QuizGrad Logo"
                width={400}
                height={40}
                className="dark:invert"
              />
            </div>
            <h1 className="font-roboto text-xl font-normal text-muted-foreground tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              Please login/Signup to your account.
            </p>
          </div>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem
                      className={`px-4 py-2 border ${
                        field.value
                          ? "border-l-4 border-l-yellow-500"
                          : "border-gray-300"
                      }  transition-all duration-200`}
                    >
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          {...field}
                          className="focus:outline-none"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-10 w-full">
                  Verify OTP
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex-col hidden h-full p-10 items-center justify-center bg-secondary  lg:flex dark:border-r">
        <img src={HandsGraduate} alt="HandsGraduate" width={500} height={100} />
      </div>
    </div>
  );
};

export default VerifyEmail;
