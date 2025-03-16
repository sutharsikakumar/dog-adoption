"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndAdminData = async () => {
      try {
        // Get the current user
        const { data, error } = await supabase.auth.getUser();
        
        if (error || !data?.user) {
          throw new Error("Not authenticated");
        }
        
        const uid = data.user.id;
        setUser(data.user);
        
        // Fetch the admin data for this user
        const { data: admin, error: adminError } = await supabase
          .from("admin")
          .select("*")
          .eq("id", uid)  // Compare uid with the id column
          .single();
          
        if (adminError) {
          console.error("Error fetching admin data:", adminError);
          throw new Error("Not an admin");
        } else {
          setAdminData(admin);
        }
        
      } catch (err) {
        console.error("Error fetching user or admin data:", err);
        router.push("/auth/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAdminData();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/sign-in");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
        {user && (
          <>
            <p className="mb-2"><strong>User ID:</strong> {user.id}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          </>
        )}
        <p>You are logged in as an administrator.</p>
      </div>
      
      {adminData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Admin Account Details</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(adminData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}