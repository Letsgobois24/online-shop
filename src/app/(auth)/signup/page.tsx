"use client";

import InputField from "@/components/Elements/Input/InputField";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Alert from "@/components/Elements/Alert";
import Button from "@/components/Elements/Button";
import authServices from "@/services/auth/auth";
import formValidate from "./utils/FormValidation";

export type ErrorType = {
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
  "confirm-password"?: string;
};

export default function SignUpPages() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [validate, setValidate] = useState<ErrorType>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value as string,
      email: form.email.value as string,
      phone: form.phone.value as string,
      password: form.password.value as string,
      "confirm-password": form["confirm-password"].value as string,
    };

    const validation = formValidate(data);

    if (validation) {
      setValidate(validation);
      setIsLoading(false);
      return;
    }

    // Fetch Data
    try {
      const res = await authServices.registerAccount(data);

      if (res.success) {
        form.reset();
        push("/signin");
      } else {
        setError(`Error ${res.status}: ${res.message}`);
      }
    } catch {
      setError("Register failed! Please try again later");
    }
    setValidate({});
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
          error={validate.fullname}
        />
        <InputField
          label="Email"
          name="email"
          placeholder="name@company.com"
          type="text"
          error={validate.email}
        />
        <InputField
          label="Phone Number"
          name="phone"
          placeholder="Your phone number"
          error={validate.phone}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          placeholder="••••••••"
          error={validate.password}
        />
        <InputField
          type="password"
          label="Confirm Password"
          name="confirm-password"
          placeholder="••••••••"
          error={validate["confirm-password"]}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign Up
        </Button>
      </form>
    </>
  );
}
