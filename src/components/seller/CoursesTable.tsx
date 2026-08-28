"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/types";
import { formatPrice } from "@/lib/price-utils";
import { getBusinessLabel } from "@/lib/constants";
import { Plus, Play, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CoursesTableProps {
  courses: Course[];
  onDelete?: (id: string) => Promise<void>;
  loading?: boolean;
}

export const CoursesTable: React.FC<CoursesTableProps> = ({
  courses,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-zinc-500 text-xs">
        Loading modules...
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400">
          <BookOpen size={22} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">No Video Courses Published</h4>
          <p className="text-xs text-zinc-500 max-w-sm mt-0.5">
            Publish your first creator lesson series and share step-by-step production expertise.
          </p>
        </div>
        <Link href="/seller/courses/new">
          <Button variant="default" size="sm" leftIcon={<Plus size={13} />}>
            Publish Video Course
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto text-xs">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/70 text-zinc-700 font-semibold text-[11px] uppercase tracking-wider">
            <th className="py-3 px-4">Course Title &amp; Curriculum</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Modules</th>
            <th className="py-3 px-4">Enrollment Fee</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 border-b border-zinc-200">
          {courses.map((c) => {
            const modulesCount = Array.isArray(c.links) ? c.links.length : 0;
            const firstLink = c.links && c.links.length > 0 ? c.links[0] : null;

            return (
              <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-zinc-950 truncate max-w-[240px]">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate max-w-[260px]">
                    {c.description || "Video lessons attached"}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                    {getBusinessLabel(c.business)}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-medium text-zinc-800">
                  {modulesCount} {modulesCount === 1 ? "Lesson" : "Lessons"}
                </td>
                <td className="py-3.5 px-4 font-semibold text-zinc-950">
                  {formatPrice(c.price || 0)}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    {firstLink && (
                      <a href={firstLink} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-zinc-700"
                          title="Watch preview"
                        >
                          <Play size={13} />
                        </Button>
                      </a>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(c.id)}
                        className="h-7 w-7 text-zinc-500 hover:text-rose-600"
                        title="Delete course"
                      >
                        <Trash2 size={13} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
