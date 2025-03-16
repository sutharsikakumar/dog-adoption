"use client";

import { resetPasswordAction } from "../../actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword(props: {
  searchParams: Promise<{ type: string; text: string }>;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [searchParams, setSearchParams] = useState<{ type: string; text: string } | null>(null);
  const router = useRouter();

  // Fetching searchParams asynchronously
  useEffect(() => {
    const fetchSearchParams = async () => {
      const params = await props.searchParams;
      setSearchParams(params);
    };
    fetchSearchParams();
  }, [props.searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    const response = await resetPasswordAction(password);
    setMessage(response);

    if (response.type === "success") {
      router.push("/login");
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <label htmlFor="password" className="mt-2">
        New password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="New password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 border rounded"
      />
      <label htmlFor="confirmPassword" className="mt-2">
        Confirm password
      </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
      >
        Reset password
      </button>

      {message && (
        <div
          className={`mt-4 text-sm ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Optional: If searchParams is available */}
      {searchParams && (
        <div
          className={`mt-4 text-sm ${
            searchParams.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {searchParams.text}
        </div>
      )}
    </form>
  );
}
