// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Check if user is authenticated
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.log("No authenticated user found");
          router.push("/auth/sign-in");
          return;
        }

        console.log("Authenticated user:", user.email);

        // Check if user is in admin table
        const { data: admin, error: adminError } = await supabase
          .from("admin")
          .select("email")
          .eq("email", user.email)
          .single();

        if (adminError || !admin) {
          console.log("User not found in admin table:", adminError);
          router.push("/auth/sign-in");
        } else {
          console.log("Admin verified:", admin);
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        router.push("/auth/sign-in");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return null; // Don't render anything if not admin

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      {/* CRUD operations for dog adoption list will be added here */}
    </div>
  );
}