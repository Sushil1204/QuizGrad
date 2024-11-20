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
import { Link, useNavigate } from "react-router-dom";
import { useCreateAccount, useLogin } from "@/lib/react-query";
import { INewUser } from "@/interfaces";
import { useEffect } from "react";

// Zod schema with added validations
const formSchema = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(7, { message: "Password must be at least 7 characters" }),
    confirmPassword: z
      .string()
      .min(7, { message: "Confirm password must match password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: createNewAccount } = useCreateAccount();
  const { mutateAsync: loginAccount, isSuccess: isLoginSuccess } = useLogin();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNewAccount({
      email: values?.email,
      password: values?.password,
      name: values?.fullname,
    });

    loginAccount({ email: values?.email, password: values?.password });
  }

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/");
    }
  }, [isLoginSuccess]);

  return (
    <div className="container relative flex-col grid lg:max-w-none lg:grid-cols-2">
      <>
        <div className="mx-auto flex flex-col justify-center w-full space-y-6 p-10">
          <div className="flex flex-col space-y-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <img
                src={logo}
                alt="QuizGrad Logo"
                width={400}
                height={40}
                className="dark:invert"
              />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Join Our Learning Community
            </h1>
            <p className="text-base text-muted-foreground">
              Start your personalized learning journey today
            </p>
          </div>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem
                      className={`px-4 py-2 border ${
                        field.value
                          ? "border-l-4 border-l-yellow-500"
                          : "border-gray-300"
                      } transition-all duration-200`}
                    >
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your Full Name"
                          {...field}
                          className="focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                      className={`px-4 py-2 border ${
                        field.value
                          ? "border-l-4 border-l-yellow-500"
                          : "border-gray-300"
                      } transition-all duration-200`}
                    >
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@domain.com"
                          {...field}
                          className="focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem
                      className={`px-4 py-2 border ${
                        field.value
                          ? "border-l-4 border-l-yellow-500"
                          : "border-gray-300"
                      } transition-all duration-200`}
                    >
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          {...field}
                          className="focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem
                      className={`px-4 py-2 border ${
                        field.value
                          ? "border-l-4 border-l-yellow-500"
                          : "border-gray-300"
                      } transition-all duration-200`}
                    >
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter Password"
                          {...field}
                          className="focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Link
                    to="/reset-password"
                    className="font-medium text-sm text-primary hover:underline mt-2"
                  >
                    Reset Password
                  </Link>
                  <Link
                    to="/login"
                    className="font-medium text-sm text-primary hover:underline mt-2"
                  >
                    Already registered? Sign in
                  </Link>
                </div>
                <Button type="submit" className="mt-10 w-full">
                  Create Your Account
                </Button>
              </form>
            </Form>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>Join thousands of knowledge seekers having fun while learning</p>
            <p className="mt-2">
              🎮 Learn Through Play • 🏆 Earn Achievements • 🌟 Track Progress
            </p>
          </div>
        </div>
      </>
      <div className="flex-col hidden h-full p-10 items-center justify-center bg-secondary lg:flex dark:border-r">
        <img
          src={HandsGraduate}
          alt="Students graduating"
          width={500}
          height={100}
        />
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Learn, Play, and Grow Together
          </h2>
          <p className="text-muted-foreground">
            Challenge yourself with fun quizzes and learn something new every
            day
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
