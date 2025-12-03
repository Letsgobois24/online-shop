"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Alert from "@/components/Elements/Alert";
import Button from "@/components/Elements/Button";
import formValidate from "./utils/FormValidation";
import InputField from "@/components/Elements/Input/InputField";
import AuthTitle from "../components/AuthTitle";
import AuthLink from "../components/AuthLink";

export type ErrorType = {
  email?: string;
  password?: string;
};

type PropsType = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default function SignInView({ searchParams }: PropsType) {
  const params = React.use(searchParams);
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [validate, setValidate] = useState<ErrorType>({});
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = params.callbackUrl || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value as string,
      password: form.password.value as string,
    };

    const validation = formValidate(data);
    if (validation) {
      setValidate(validation);
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl,
      });
      if (!res?.error) {
        push(callbackUrl);
      } else {
        setError("Email or password is incorrect");
        form.password.value = "";
      }
    } catch {
      setError("Login failed! Please try again later");
    }
    setIsLoading(false);
    setValidate({});
  };

  return (
    <>
      <AuthTitle>Sign in to your account</AuthTitle>
      {error && <Alert>{error}</Alert>}
      <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          label="Email"
          name="email"
          placeholder="name@company.com"
          type="text"
          error={validate.email}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          placeholder="••••••••"
          error={validate.password}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign In
        </Button>
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className="w-full"
        >
          Login with Google
        </Button>
      </form>
      <AuthLink isLoginPage={true} />
    </>
  );
}
