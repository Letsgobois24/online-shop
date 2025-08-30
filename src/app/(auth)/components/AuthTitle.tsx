export default function AuthTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-4 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
      {children}
    </h1>
  );
}
