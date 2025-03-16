"use client";
import { forgotPasswordAction } from "../../actions";
import Link from "next/link";
import { useState } from "react";

export default async function ForgotPassword(props: {
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

    const result = await forgotPasswordAction(formDataInstance);
    setFormStatus(result.text || "An error occurred while resetting the password.");
  };

  return (
    <>
      {searchParams?.text && (
        <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
          <div className="text-sm text-red-500">{searchParams.text}</div>
        </div>
      )}

      <form
        className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          {/* Email Input */}
          <label htmlFor="email" className="font-medium text-lg">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="px-3 py-2 border rounded-md"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 mt-4 rounded-md"
          >
            Reset Password
          </button>

          {/* Status Message */}
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
