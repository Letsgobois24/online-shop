const AuthButton = ({
  isLoading,
  type,
}: {
  isLoading: boolean;
  type: "Sign Up" | "Sign In";
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`${
        isLoading
          ? "bg-slate-300"
          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
      } w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {isLoading ? "Loading..." : type}
    </button>
  );
};

export default AuthButton;
