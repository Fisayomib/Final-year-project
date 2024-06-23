"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password has to be atleast 8 characters long" })
    .max(16, { message: "Password can't be longer than 16 characters" }),
});

export const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      setLoading(false);
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");

        toast.success("Code has been sent to your Email Address");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        return console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: unknown) {
      setLoading(false);
      const formattedError = err as {
        clerkError: boolean;
        errors: Array<{ message: string }>;
      };
      if (formattedError.clerkError) {
        console.error(JSON.stringify(err, null, 2));
        return toast.error(formattedError.errors[0]?.message);
      }
      console.error(JSON.stringify(err, null, 2));
      toast.error("Something Went Wrong");
    }
  }

  return (
    <>
      <p className="text-center text-xs text-secondary-foreground">
        OR CONTINUE WITH
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            <FormInput
              control={form.control}
              name="email"
              type="email"
              placeholder="johndoe@acme.com"
              description="Enter your Email Address"
              label="Email"
            />
            <FormInput
              label="Password"
              description="Enter your Password"
              control={form.control}
              name="password"
              type="password"
              placeholder="********"
            />
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              type="submit"
              className="flex w-full items-center gap-2"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              <p className="text-primary-foreground">Create Account</p>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
