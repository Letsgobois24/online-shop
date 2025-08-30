"use client";

import InputField from "@/components/Fragments/InputField";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Alert from "@/components/Fragments/Alert";
import Button from "@/components/Fragments/Button";
import authServices from "@/services/auth";

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

    const res = await authServices.registerAccount(data);
    console.log(res);

    const result = res.data;

    if (result.status) {
      form.reset();
      push("/signin");
    } else {
      setError(`Error ${result.statusCode}: ${result.message}`);
    }
    setIsLoading(false);
  };

  return (
    <>
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
      </form>
    </>
  );
}
