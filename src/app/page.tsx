"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Hero } from "@/components/landing/Hero";
import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { InteractiveAccordionSection } from "@/components/landing/InteractiveAccordionSection";
import { MakerStories } from "@/components/landing/MakerStories";
import { TheNumbers } from "@/components/landing/TheNumbers";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (userProfile?.role === "seller") {
        router.push("/seller-dashboard");
      } else {
        router.push("/builder-dashboard");
      }
    }
  }, [user, userProfile, loading, router]);

  if (loading) {
    return <LoadingSpinner message="Entering the harbor..." />;
  }

  return (
    <div className="w-full space-y-4">
      {/* 1. Scenic Hero Section with Prompt Box */}
      <Hero initialMode="login" />

      {/* 2. Logo Cloud & Social Proof Bar */}
      <SocialProofBar />

      {/* 3. Three-Card Feature Section */}
      <FeatureCards />

      {/* 4. Split Interactive Accordion + Live Assistant Preview */}
      <InteractiveAccordionSection />

      {/* 5. Maker Portrait Stories */}
      <MakerStories />

      {/* 6. The Numbers Editorial Metrics */}
      <TheNumbers />

      {/* 7. Testimonials & Verified Reviews */}
      <TestimonialsSection />
    </div>
  );
}
