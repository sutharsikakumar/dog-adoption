"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is already signed in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const uid = session.user.id;
        console.log("Found existing session for user:", uid);
        
        // Check if user is an admin by comparing uid with id in admin table
        const { data: admin, error: adminError } = await supabase
          .from("admin")
          .select("*")
          .eq("id", uid)  // Compare uid with the id column
          .single();
          
        console.log("Admin check:", { 
          uid, 
          admin, 
          error: adminError?.message 
        });
          
        if (admin) {
          router.push("/admin");
        }
      }
    };
    
    checkSession();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        setError(error.message || "Invalid login credentials");
        return;
      }
      
      const uid = data.user.id;
      console.log("Signed in user uid:", uid);
      
      // For debugging - get all admin records
      const { data: allAdmins, error: listError } = await supabase
        .from("admin")
        .select("*");
      
      console.log("All admin records:", allAdmins);
      console.log("List error:", listError?.message);
      
      // Check if user is an admin by comparing uid with id in admin table
      const { data: admin, error: adminError } = await supabase
        .from("admin")
        .select("*")
        .eq("id", uid)  // Compare uid with the id column
        .single();
        
      console.log("Admin check results:", {
        uid,
        admin,
        error: adminError?.message
      });
        
      if (adminError || !admin) {
        setError("You do not have admin privileges");
        await supabase.auth.signOut();
        return;
      }
      
      console.log("Admin login successful, redirecting to admin page");
      router.push("/admin");
      
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}