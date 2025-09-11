export type UserType = {
  id: string;
  fullname: string;
  role: "member" | "admin";
  email: string;
  phone?: string;
  password: string;
  type?: "google";
  image?: string;
  created_at: Date;
  updated_at: Date;
};
