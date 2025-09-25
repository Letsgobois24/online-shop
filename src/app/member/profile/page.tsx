"use client";

import Button from "@/components/Elements/Button";
import InputField from "@/components/Elements/Input/InputField";
import Title from "@/components/Elements/Title";
import userServices from "@/services/user/service";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import { useToaster } from "@/context/ToasterContext";
import { User } from "next-auth";
import { ChangePasswordType } from "@/services/user/service.type";
import InputFile from "@/components/Elements/Input/InputFile";

type ImageInfo = File | null;

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [changeImage, setChangeImage] = useState<ImageInfo>(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const { showToaster } = useToaster();

  const handleUploadProfile = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("upload-image") as File;

    if (!file || !(file.size > 0)) {
      setIsLoading(false);
      showToaster("warning", "File has not uploaded");
      return;
    }
    if (file.size > 1048576) {
      setIsLoading(false);
      showToaster("warning", "File bigger than 1 MB");
      return;
    }
    const res = await userServices.uploadProfile(formData);
    if (res.status === 200) {
      const image = res.data.image;
      setProfile({ ...profile, image });
      setChangeImage(null);
      await session.update({ image });
    }
    showToaster(res.data.success ? "success" : "danger", res.data.message);
    setIsLoading(false);
  };

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value as string,
      phone: form.phone.value as string,
    };

    const res = await userServices.updateProfile(data);
    if (res.status == 200) {
      setProfile({
        ...profile,
        ...res.data.data,
      });
    }
    showToaster(res.data.success ? "success" : "danger", res.data.message);
    setIsLoading(false);
  };

  const handlaChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data: ChangePasswordType = {
      newPassword: (form["new-password"].value as string) || "",
    };

    if (profile?.password) {
      data.encryptedPassword = profile?.password || "";
      data.oldPassword = (form["old-password"].value as string) || "";
    }

    const res = await userServices.changePassword(data);
    const newPassword = res.data.password;
    if (res.status == 200) {
      setProfile({
        ...profile,
        password: newPassword,
      });
      await session.update({ password: newPassword });
    }
    form.reset();
    showToaster(res.data.success ? "success" : "danger", res.data.message);
    setIsLoading(false);
  };
  useEffect(() => {
    if (session.status == "authenticated") {
      const getProfile = async () => {
        const res = await userServices.getProfile();
        setProfile(res.data.data);
      };
      getProfile();
    }
  }, [session]);

  return (
    <>
      <Title>Profile Page</Title>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center border rounded-xl border-slate-400 shadow-lg p-6">
          <Title size="medium" className="flex-1">
            Avatar
          </Title>
          <form
            onSubmit={handleUploadProfile}
            className="flex flex-col space-y-5 w-full"
          >
            <div className="mx-auto border border-slate-300 shadow-md w-50 h-50 rounded-full overflow-hidden">
              <Image
                priority
                className="w-full h-full"
                src={profile?.image || "/logo/person-logo.png"}
                alt="Profile Image"
                width={50}
                height={50}
              />
            </div>

            <InputFile
              name="upload-image"
              changeFile={changeImage}
              setChangeFile={setChangeImage}
            />

            <Button
              type="submit"
              isLoading={session.status == "loading" || isLoading}
              className="mx-auto"
              size="medium"
            >
              Change Profile
            </Button>
          </form>
        </div>
        <div className="flex flex-col border rounded-xl border-slate-400 shadow-lg p-6">
          <Title size="medium" className="flex-1">
            Change Profile
          </Title>
          <form onSubmit={(e) => handleChangeProfile(e)} className="space-y-5">
            <InputField
              label="Fullname"
              name="fullname"
              type="text"
              required={true}
              defaultValue={profile?.fullname || ""}
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="number"
              placeholder="Your phone number"
              defaultValue={profile?.phone || ""}
              className="no-spinner"
            />
            <InputField
              label="Email"
              name="email"
              placeholder="name@company.com"
              type="email"
              required={true}
              defaultValue={profile?.email || ""}
              disabled
            />
            <InputField
              label="Role"
              name="role"
              defaultValue={profile?.role || ""}
              disabled
            />
            <Button
              type="submit"
              isLoading={session.status == "loading" || isLoading}
              size="medium"
            >
              Update Profile
            </Button>
          </form>
        </div>
        <div className="border rounded-xl border-slate-400 shadow-lg p-6">
          <Title size="medium" className="flex-1">
            Change Password
          </Title>
          <form className="space-y-5" onSubmit={(e) => handlaChangePassword(e)}>
            {profile?.password && (
              <InputField
                label="Old Password"
                name="old-password"
                placeholder="Your last password"
                type="password"
                required
              />
            )}

            <InputField
              label="New Password"
              name="new-password"
              placeholder="Your new password"
              type="password"
              required
            />
            <Button
              type="submit"
              isLoading={session.status == "loading" || isLoading}
              size="large"
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
