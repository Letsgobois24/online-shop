import React from "react";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-200 flex items-center justify-center min-h-[100vh]">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="px-6 py-4 space-y-4 md:space-y-6 sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
