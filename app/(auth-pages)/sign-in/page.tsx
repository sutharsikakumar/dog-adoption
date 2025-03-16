import { signInAction } from "../../actions";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<string> }) {
  const searchParams = await props.searchParams;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const formDataInstance = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formDataInstance.append(key, value as string);
    });
    const result = await signInAction(formDataInstance);


    console.log(result);
  };

  return (
    <form className="flex-1 flex flex-col min-w-64" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
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
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="font-medium text-lg">Password</label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          required
          className="px-3 py-2 border rounded-md"
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 mt-4 rounded-md"
        >
          Sign in
        </button>
        
        {searchParams && (
          <div className="text-sm text-red-500 mt-2">
            {searchParams}
          </div>
        )}
      </div>
    </form>
  );
}
