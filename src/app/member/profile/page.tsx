"use client";

import Button from "@/components/Elements/Button";
import InputField from "@/components/Elements/Input/InputField";
import Title from "@/components/Elements/Title";
import userServices from "@/services/user/service";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useToaster } from "@/context/ToasterContext";

type ImageInfo = {
  name?: string | undefined;
};

export default function ProfilePage() {
  const [profile, setProfile]: any = useState({});
  const [changeImage, setChangeImage] = useState<ImageInfo>({});
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const { showToaster } = useToaster();

  const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    setChangeImage({ name: file?.name });
  };

  const handleUploadProfile = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file: any = formData.get("upload-image") as File;

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
    const res = await userServices.uploadProfile(
      formData,
      session.data?.accessToken || ""
    );
    if (res.status === 200) {
      const image = res.data.image;
      setProfile({ ...profile, image });
      setChangeImage({});
      await session.update({ image });
      console.log({ profile });
    }
    showToaster(res.data.success ? "success" : "danger", res.data.message);
    setIsLoading(false);
  };

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const res = await userServices.updateProfile(
      data,
      session.data?.accessToken || ""
    );
    if (res.status == 200) {
      setProfile({
        ...profile,
        ...res.data.data,
      });
    }
    setIsLoading(false);
    showToaster(res.data.success ? "success" : "danger", res.data.message);
  };

  const handlaChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      oldPassword: form["old-password"].value,
      newPassword: form["new-password"].value,
      encryptedPassword: profile.password,
    };

    const res = await userServices.changePassword(
      data,
      session.data?.accessToken || ""
    );
    if (res.status == 200) {
      setProfile({
        ...profile,
        password: res.data.password,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      const getProfile = async () => {
        const res = await userServices.getProfile(
          session.data?.accessToken || ""
        );
        setProfile(res.data.data);
      };
      getProfile();
    }
  }, [session]);

  return (
    <>
      <Title>Profile Page</Title>
      <div className="flex md:flex-row space-y-5 md:space-y-0 flex-col space-x-5 items-stretch">
        <div className="w-full md:w-1/4 flex flex-col items-center justify-center border rounded-xl border-slate-400 shadow-lg p-6">
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
                src={profile.image || "/logo/person-logo.png"}
                alt="Profile Image"
                width={100}
                height={100}
              />
            </div>
            <div className="border border-slate-500 bg-slate-200 hover:bg-slate-300 rounded-lg shadow-md flex flex-col">
              <label
                htmlFor="upload-image"
                className="text-sm text-center cursor-pointer min-h-24 flex flex-col justify-center"
              >
                {!(Object.keys(changeImage).length > 0) ? (
                  <div className="p-2">
                    <p className="text-gray-600">
                      Maximum upload size is <b>1 MB</b>
                    </p>
                    <p className="">
                      Upload a new avatar, larger image will be resized
                      automatically
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 p-2">{changeImage.name}</p>
                )}

                <input
                  className="hidden w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  name="upload-image"
                  id="upload-image"
                  type="file"
                  onChange={(e) => handleChangeProfileImg(e)}
                ></input>
              </label>
            </div>
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
        <div className="w-full flex flex-col md:w-1/2 border rounded-xl border-slate-400 shadow-lg p-6">
          <Title size="medium" className="flex-1">
            Change Profile
          </Title>
          <form onSubmit={(e) => handleChangeProfile(e)} className="space-y-5">
            <InputField
              label="Fullname"
              name="fullname"
              placeholder="Your fullname"
              type="text"
              required={true}
              defaultValue={profile.fullname}
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="number"
              placeholder="Your phone number"
              defaultValue={profile.phone}
              className="no-spinner"
            />
            <InputField
              label="Email"
              name="email"
              placeholder="name@company.com"
              type="email"
              required={true}
              defaultValue={profile.email}
              disabled
            />
            <InputField
              label="Role"
              name="role"
              defaultValue={profile.role}
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
        <div className="w-full md:w-1/4 border rounded-xl border-slate-400 shadow-lg p-6">
          <Title size="medium" className="flex-1">
            Change Password
          </Title>
          <form className="space-y-5" onSubmit={(e) => handlaChangePassword(e)}>
            <InputField
              label="Old Password"
              name="old-password"
              placeholder="••••••••"
              type="password"
              required
            />
            <InputField
              label="New Password"
              name="new-password"
              placeholder="••••••••"
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
