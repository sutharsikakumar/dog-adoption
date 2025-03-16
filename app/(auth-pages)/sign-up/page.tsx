import { signUpAction } from "../../actions";
import Link from "next/link";
import { useState } from "react";

export default async function Signup(props: {
  searchParams: Promise<{ type: string; text: string }>;
}) {
  const searchParams = await props.searchParams;
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const formDataInstance = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formDataInstance.append(key, value as string);
    });

    const result = await signUpAction(formDataInstance);
    setFormStatus(result.text || "An error occurred during sign-up.");
  };

  return (
    <>
      {searchParams?.text && (
        <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
          <div className="text-sm text-red-500">{searchParams.text}</div>
        </div>
      )}

      <form className="flex flex-col min-w-64 max-w-64 mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>

        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="email" className="font-medium text-lg">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="px-3 py-2 border rounded-md"
          />

          <label htmlFor="password" className="font-medium text-lg">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            minLength={6}
            required
            className="px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 mt-4 rounded-md"
          >
            Sign up
          </button>
          {formStatus && (
            <div className="text-sm text-red-500 mt-2">
              {formStatus}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
