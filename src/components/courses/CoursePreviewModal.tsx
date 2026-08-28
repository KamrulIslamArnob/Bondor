"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Course } from "@/types";
import { ExternalLink, Play, CheckCircle2, Tv } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CoursePreviewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  if (!course) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const links = course.links && course.links.length > 0 ? course.links : [];
  const currentLink = links[activeModuleIndex] || links[0] || null;
  const embedUrl = currentLink ? getYouTubeEmbedUrl(currentLink) : null;
  const isEmbeddable = embedUrl && embedUrl.includes("youtube.com/embed");

  const toggleComplete = (idx: number) => {
    setCompletedModules((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={course.title} maxWidth="2xl">
      <div className="space-y-4">
        <p className="text-xs text-zinc-600 leading-relaxed">
          {course.description || "Step-by-step video training modules taught by verified creators."}
        </p>

        {/* Video Player Box */}
        <div className="border-2 border-zinc-950 rounded-2xl bg-zinc-950 overflow-hidden shadow-xs">
          <div className="bg-zinc-900 px-4 py-2.5 flex items-center justify-between text-zinc-200 text-xs border-b border-zinc-800">
            <span className="font-bold">
              Module {activeModuleIndex + 1} of {Math.max(1, links.length)}
            </span>
            <span className="text-[11px] font-bold text-zinc-950 bg-[#62B6FC] px-2 py-0.5 rounded-full border border-zinc-950">Video Lesson</span>
          </div>

          {isEmbeddable ? (
            <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black">
              <iframe
                src={embedUrl}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
          ) : currentLink ? (
            <div className="p-8 text-center space-y-3 bg-zinc-950 text-white">
              <Tv size={32} className="text-zinc-400 mx-auto" />
              <div>
                <h4 className="font-bold text-sm text-zinc-100">External Lesson Stream</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Click below to open this video module in a dedicated tab.
                </p>
              </div>
              <a href={currentLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button variant="pill-gradient" size="sm" rightIcon={<ExternalLink size={13} />}>
                  Launch Lesson
                </Button>
              </a>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500">
              No video links attached to this course.
            </div>
          )}
        </div>

        {/* Curriculum Module Tabs */}
        {links.length > 0 && (
          <div className="space-y-2 pt-2 border-t-2 border-zinc-100">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-950">
              <span>Curriculum Modules:</span>
              <span className="text-emerald-700 font-bold">
                {completedModules.size}/{links.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {links.map((link, idx) => {
                const isCompleted = completedModules.has(idx);
                const isActive = activeModuleIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all ${
                      isActive
                        ? "border-zinc-950 bg-[#E8F4FE]"
                        : "border-zinc-200 bg-white hover:border-zinc-950"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModuleIndex(idx)}
                      className="flex items-center gap-2 text-left flex-1 min-w-0"
                    >
                      <Play size={12} className={isActive ? "text-zinc-950 fill-zinc-950" : "text-zinc-400"} />
                      <span className="font-bold text-xs truncate text-zinc-950">
                        Lesson {idx + 1}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleComplete(idx)}
                      className={`p-1 text-xs transition-colors ${
                        isCompleted ? "text-emerald-700 font-bold" : "text-zinc-300 hover:text-zinc-600"
                      }`}
                      title={isCompleted ? "Completed" : "Mark as done"}
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
