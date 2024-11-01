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
import { Link } from "react-router-dom";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container relative min-h-screen flex-col grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-y-scroll no-scrollbar">
      <div className="lg:p-5">
        <div className="mx-auto flex flex-col justify-center w-full space-y-6 p-10 md:p-20">
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
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="px-4 py-2 border border-gray-300 transition-all duration-200 focus-within:border-l-4 focus-within:border-l-yellow-500">
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
                    <FormItem className="px-4 py-2 border border-gray-300 transition-all duration-200 focus-within:border-l-4 focus-within:border-l-yellow-500">
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
                    <FormItem className="px-4 py-2 border border-gray-300 transition-all duration-200 focus-within:border-l-4 focus-within:border-l-yellow-500">
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
                    <FormItem className="px-4 py-2 border border-gray-300 transition-all duration-200 focus-within:border-l-4 focus-within:border-l-yellow-500">
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
                  <p className="font-roboto text-sm text-muted-foreground mt-2 hover:text-primary cursor-pointer">
                    Forget password
                  </p>
                  <Link
                    to="/login"
                    className="font-roboto text-sm text-muted-foreground mt-2 hover:text-primary cursor-pointer"
                  >
                    Already registered? Click here to login
                  </Link>
                </div>
                <Button type="submit" className="mt-10">
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex-col hidden h-full p-10 items-center justify-center bg-secondary lg:flex dark:border-r">
        <img src={HandsGraduate} alt="HandsGraduate" width={500} height={100} />
      </div>
    </div>
  );
};

export default Register;
