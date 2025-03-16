"use server";

import { supabase } from "@/lib/supabase-client";
import { redirect } from "next/navigation";

// Sign In Action
export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { type: "error", text: error.message };
  }

  redirect("/dashboard");
}

// Sign Up Action
export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { type: "error", text: error.message };
  }

  redirect("/dashboard");
}

// Forgot Password Action (sends reset email)
export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { type: "error", text: error.message };
  }

  return { type: "success", text: "Password reset email sent successfully!" };
}

export async function resetPasswordAction(formData: FormData) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
  
    if (password !== confirmPassword) {
      return { type: "error", text: "Passwords do not match!" };
    }
    const { error } = await supabase.auth.updateUser({
      password,
    });
  
    if (error) {
      return { type: "error", text: error.message };
    }
  
    return { type: "success", text: "Password successfully updated!" };
  }