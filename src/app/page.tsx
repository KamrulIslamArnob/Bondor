"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoCloudSection } from "@/components/sections/LogoCloudSection";
import { WorkflowsSection } from "@/components/sections/WorkflowsSection";
import { DarkFeatureGridSection } from "@/components/sections/DarkFeatureGridSection";
import { GitForManufacturingSection } from "@/components/sections/GitForManufacturingSection";
import { SpotlightCaseStudySection } from "@/components/sections/SpotlightCaseStudySection";
import { TeamRoleFeatureSection } from "@/components/sections/TeamRoleFeatureSection";
import { IntegrationPillSection } from "@/components/sections/IntegrationPillSection";
import { StepByStepFlowSection } from "@/components/sections/StepByStepFlowSection";
import { SupportTeamSection } from "@/components/sections/SupportTeamSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
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
    <div className="w-full bg-white space-y-4">
      {/* 1. Hero Section with 5 Category Bento Cards & Reviews */}
      <HeroSection />

      {/* 2. Brand & Maker Logo Cloud */}
      <LogoCloudSection />

      {/* 3. Alternating Workflow Bento Cards */}
      <WorkflowsSection />

      {/* 4. High-Tech Dark Supply Network Bento */}
      <DarkFeatureGridSection />

      {/* 5. The "Git" for Physical Manufacturing Section */}
      <GitForManufacturingSection />

      {/* 6. Maker Spotlight Case Study */}
      <SpotlightCaseStudySection />

      {/* 7. Workshop Team Role Tabs & Feature Previews */}
      <TeamRoleFeatureSection />

      {/* 8. Integrations & Sync Pill Bar */}
      <IntegrationPillSection />

      {/* 9. 5-Step Manufacturing Workflow */}
      <StepByStepFlowSection />

      {/* 10. Support Team & 9.8 Satisfaction Rating */}
      <SupportTeamSection />

      {/* 11. Final Call to Action Banner */}
      <FinalCtaSection />
    </div>
  );
}
