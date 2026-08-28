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
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          {course.description || "Step-by-step video training masterclass modules taught by verified makers."}
        </p>

        {/* Video Player Box */}
        <div className="border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden shadow-card">
          <div className="bg-slate-900/90 px-4 py-2.5 flex items-center justify-between text-slate-200 text-xs border-b border-slate-800">
            <span className="font-bold">
              Lesson {activeModuleIndex + 1} of {Math.max(1, links.length)}
            </span>
            <span className="text-[11px] font-semibold text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-500/30">
              Masterclass Stream
            </span>
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
            <div className="p-8 text-center space-y-3 bg-slate-950 text-white">
              <Tv size={32} className="text-slate-400 mx-auto" />
              <div>
                <h4 className="font-bold text-sm text-slate-100">External Lesson Stream</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Click below to open this full video module in a dedicated tab.
                </p>
              </div>
              <a href={currentLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button variant="default" size="sm" rightIcon={<ExternalLink size={13} />}>
                  Launch Full Lesson
                </Button>
              </a>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No video links attached to this course.
            </div>
          )}
        </div>

        {/* Curriculum Module Tabs */}
        {links.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Curriculum Lessons:</span>
              <span className="text-emerald-700 font-bold tabular-nums">
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
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? "border-sky-500 bg-sky-50 text-sky-950 shadow-xs"
                        : "border-slate-200/80 bg-white hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModuleIndex(idx)}
                      className="flex items-center gap-2 text-left flex-1 min-w-0"
                    >
                      <Play size={12} className={isActive ? "text-sky-600 fill-sky-600" : "text-slate-400"} />
                      <span className="font-bold text-xs truncate text-slate-900">
                        Lesson {idx + 1}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleComplete(idx)}
                      className={`p-1 text-xs transition-colors ${
                        isCompleted ? "text-emerald-600 font-bold" : "text-slate-300 hover:text-slate-600"
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
