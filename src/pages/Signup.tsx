
import React from "react";
import { SignupForm } from "@/components/auth/signup-form";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">RAKwireless</h1>
          <p className="text-muted-foreground">Knowledge Hub</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
