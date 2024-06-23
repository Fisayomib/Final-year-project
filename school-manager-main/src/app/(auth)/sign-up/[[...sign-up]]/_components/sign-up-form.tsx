"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/lib/handle-error";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password has to be atleast 8 characters long" })
    .max(16, { message: "Password can't be longer than 16 characters" }),
});

const verifyFormSchema = z.object({
  code: z.string(),
});

export const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const verifyForm = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
      toast.success("Code has been sent to your Email Address");
    } catch (err: unknown) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyFormSubmit(values: z.infer<typeof verifyFormSchema>) {
    if (!isLoaded) return;

    setLoading(true);
    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }

      toast.success("You account has been created successfully");
    } catch (err: unknown) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  }

  if (verifying) {
    return (
      <>
        <h1>Verify your email</h1>
        <Form {...verifyForm}>
          <form
            onSubmit={verifyForm.handleSubmit(onVerifyFormSubmit)}
            className="space-y-8"
          >
            <div className="flex gap-2">
              <FormInput
                control={verifyForm.control}
                name="code"
                type="text"
                placeholder="Verification Code"
                description="Enter your code"
                label="Verification Code"
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
  }

  return (
    <>
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
