"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useState } from "react";

interface AuthModalProps {
  children: React.ReactNode;
}

type Mode = "signup" | "signin";

export function AuthModal({ children }: AuthModalProps) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const supabase = getSupabaseBrowserClient();

  async function handleAuthentication(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "signin") {
        if (!email || !password) {
          setError("Please fill all fields");
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          setError("Invalid email or password");
          return;
        }

        setSuccess("Signed in successfully");

        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      }

      if (mode === "signup") {
        if (!name || !email || !password) {
          setError("Please fill all fields");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });

        if (error) {
          setError(error.message);
          return;
        }

        setSuccess(
          "Account created successfully! Please check your email to verify your account before signing in."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Welcome to Planvoo</DialogTitle>
            <DialogDescription className="text-slate-300">
              Your AI-powered travel companion.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-6 bg-white dark:bg-slate-950">
          <Tabs defaultValue="signin"
            value={mode}
            onValueChange={(value) => {
              setMode(value as Mode);
              setError(null);
              setSuccess(null);
            }} className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" >Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleAuthentication} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" required type="email" placeholder="m@example.com" className="h-11" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 font-normal text-xs h-auto" disabled={loading}>
                      Forgot password?
                    </Button>
                  </div>
                  <Input id="password" placeholder="*********" required type="password" className="h-11" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button className="w-full h-11 text-base font-semibold" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="h-11 flex items-center justify-center gap-2" onClick={handleGoogleLogin}>
                    <FcGoogle className="h-5 w-5" />
                    Google
                  </Button>
                </div>
              </form>
              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-green-600 text-center">
                  {success}
                </p>
              )}
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleAuthentication} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" required placeholder="John Doe" className="h-11" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" required type="email" placeholder="m@example.com" className="h-11" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" placeholder="*********" required type="password" className="h-11" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button className="w-full h-11 text-base font-semibold">
                  Create Account
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button  variant="outline"
                    className="h-11 flex items-center justify-center gap-2"
                    onClick={handleGoogleLogin}>
                    <FcGoogle className="h-5 w-5" />
                    Google
                  </Button>
                </div>
              </form>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              {success && <p className="text-sm text-green-600 text-center">{success}</p>}
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-xs text-slate-500">
            By clicking continue, you agree to our{" "}
            <Button variant="link" className="p-0 h-auto text-xs font-normal underline">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="p-0 h-auto text-xs font-normal underline">
              Privacy Policy
            </Button>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
