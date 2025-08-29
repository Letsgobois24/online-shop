"use client";

import Link from "next/link";
import InputField from "@/components/Fragments/InputField";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Alert from "@/components/Fragments/Alert";
import Button from "@/components/Fragments/Button";

export default function SignUpPages() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: {
      status: boolean;
      statusCode: number;
      message: string;
    } = await res.json();

    if (result.status) {
      form.reset();
      push("/signin");
    } else {
      setError(`Error ${result.statusCode}: ${result.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="mb-4 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create New Account
      </h1>
      {error && <Alert>{error}</Alert>}
      <form className="space-y-3" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          label="Fullname"
          name="fullname"
          placeholder="Your fullname"
          type="text"
          required={true}
        />
        <InputField
          label="Email"
          name="email"
          placeholder="name@company.com"
          type="email"
          required={true}
        />
        <InputField
          label="Phone Number"
          name="phone"
          placeholder="Your phone number"
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          placeholder="••••••••"
          required={true}
        />
        <InputField
          type="password"
          label="Confirm Password"
          name="confirm-password"
          placeholder="••••••••"
          required={true}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign Up
        </Button>
        <p className="text-center text-sm font-light text-gray-500">
          Have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
