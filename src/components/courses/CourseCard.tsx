"use client";

import React, { useState } from "react";
import { Course } from "@/types";
import { getPriceOrRandom, formatPrice } from "@/lib/price-utils";
import { getBusinessLabel } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { CoursePreviewModal } from "./CoursePreviewModal";
import { Button } from "@/components/ui/Button";
import { Check, Play, ShoppingCart, Video } from "lucide-react";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled = false }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const displayPrice = getPriceOrRandom(course.id, course.price);
  const moduleCount = Array.isArray(course.links) ? course.links.length : 0;

  const handleBuyNow = () => {
    if (isEnrolled) return;
    addToCart({
      id: course.id,
      type: "course",
      name: course.title || "Course",
      description: course.description || "",
      price: displayPrice,
      image: "",
    });
    router.push("/cart");
  };

  return (
    <>
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-[box-shadow,border-color,transform] duration-200 group shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-0.5">
        <div className="space-y-3">
          <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
            <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/80">
              {getBusinessLabel(course.business)}
            </span>
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {formatPrice(displayPrice)}
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 text-balance">
              {course.title || "Untitled Masterclass"}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed text-pretty">
              {course.description || "Hands-on video training module for micro-makers."}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60 tabular-nums">
              {moduleCount} {moduleCount === 1 ? "Module" : "Modules"}
            </span>
            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/80">
              Video Lessons
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          {isEnrolled ? (
            <Button
              variant="default"
              size="sm"
              fullWidth
              onClick={() => setIsPreviewOpen(true)}
              leftIcon={<Play size={13} />}
            >
              Watch Masterclass
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={handleBuyNow}
                leftIcon={<ShoppingCart size={13} />}
              >
                Enroll Now
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
                leftIcon={<Play size={12} className="text-sky-600" />}
              >
                Curriculum
              </Button>
            </>
          )}
        </div>
      </div>

      <CoursePreviewModal
        course={course}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
};
