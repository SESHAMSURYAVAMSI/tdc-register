"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const hardcodedEmail = "admin@tdc.com";
    const hardcodedPassword = "tdc@123";

    await new Promise((res) => setTimeout(res, 2000));

    if (form.email === hardcodedEmail && form.password === hardcodedPassword) {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("showWelcomeToast", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins bg-[#FFFFFF]"
    >
      <h1 className="text-3xl text-header font-semibold text-[#00694A] text-center">
        Login
      </h1>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-label font-normal mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          className="text-placeholder"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-label font-normal mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          className="text-placeholder"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {/* Forgot Password */}
      <div className="text-right text-sm mt-1">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-[#00694A] hover:underline font-medium cursor-pointer"
        >
          Forgot Password?
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full text-button font-medium bg-[#00694A] hover:bg-[#008562] text-white mt-10"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Login"}
      </Button>

      {/* Route Switch */}
      <div className="text-center mt-6 text-paragraph font-medium">
        Don’t have an account?
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-[#00694A] ml-1 hover:underline font-semibold cursor-pointer"
        >
          Signup now
        </button>
      </div>
    </form>
  );
}