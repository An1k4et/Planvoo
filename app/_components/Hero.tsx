"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  Calendar,
  CreditCard,
  Globe,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { AuthModal } from './AuthModal';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';

function Hero() {

  const { user, loading } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 text-slate-900 dark:text-slate-50">
              AI-Powered Travel Planning
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-50 dark:to-slate-400">
              Travel Smarter. Live More.
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
              Planvoo creates personalized itineraries, suggests hidden gems,
              and manages your entire trip with the power of AI.
            </p>
            <div className="space-x-4">

              {!loading && !user && (
                <AuthModal>
                  <Button size="lg" className="h-12 px-8 text-lg">
                    Start Planning Free
                  </Button>
                </AuthModal>
              )}

              {!loading && user && (
                <Button
                  size="lg" className="h-12 px-8 text-lg"
                  onClick={() => router.push("/create-new-trip")}
                >
                  Start Planning Free
                </Button>
              )}
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-lg"
                >
                  How it Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/50 blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-950"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features that wow
            </h2>
            <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Everything you need to plan the perfect trip, powered by advanced
              AI algorithms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-purple-500" />}
              title="AI Itinerary Generator"
              description="Get a day-by-day plan tailored to your budget, mood, and interests in seconds."
            />
            <FeatureCard
              icon={<MapPin className="h-10 w-10 text-blue-500" />}
              title="Smart Recommendations"
              description="Discover hidden gems, best restaurants, and local experiences you won't find on generic guides."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-green-500" />}
              title="Real-time Updates"
              description="Stay ahead with weather alerts, safety notifications, and dynamic schedule adjustments."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-orange-500" />}
              title="Mood-Based Travel"
              description="Feeling adventurous or chill? Planvoo adapts suggestions to match your current vibe."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-red-500" />}
              title="Safety First"
              description="Get safety scores and emergency contacts for every destination you visit."
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10 text-teal-500" />}
              title="Budget Tracking"
              description="Keep track of expenses and get cost estimates before you even book."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100 dark:bg-slate-900"
        id="MostVisitedCity">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to explore the world?
            </h2>
            <p className="mx-auto max-w-[600px] text-slate-500 md:text-xl/relaxed dark:text-slate-400">
              Join thousands of travelers who are planning smarter, better trips
              with Planvoo.
            </p>
            <Link href="#">
              {/* <Button
                size="lg"
                className="h-12 px-8 text-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Start Your Journey
              </Button> */}
              <HeroVideoDialog
                className="block dark:hidden w-225 h-140"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/watch?v=19Fwq4vXENs"
                thumbnailSrc="https://img.youtube.com/vi/19Fwq4vXENs/maxresdefault.jpg"
                thumbnailAlt="Trip Planner Demo Video"
              />
            </Link>
          </div>
        </div>
      </section>
      {/* How it work */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto justify-center space-y-4 text-center">
          <h2 className="flex">
            Not sure where to start ? 
            <strong>
               Check How it works
              <ArrowDown />
            </strong>
          </h2>
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/watch?v=19Fwq4vXENs"
            thumbnailSrc="https://img.youtube.com/vi/19Fwq4vXENs/maxresdefault.jpg"
            thumbnailAlt="Trip Planner Demo Video"
          />
        </div>
      </section> */}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-900/50">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-500 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}

export default Hero
