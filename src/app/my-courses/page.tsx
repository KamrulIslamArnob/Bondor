"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Course } from "@/types";
import { CourseCard } from "@/components/courses/CourseCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { BookOpen, Compass, ArrowLeft } from "lucide-react";

export default function MyCoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const enrollQuery = query(
          collection(db, "enrollments"),
          where("userId", "==", user.uid)
        );
        const enrollSnap = await getDocs(enrollQuery);

        const coursePromises = enrollSnap.docs.map(async (enrollDoc) => {
          const courseId = enrollDoc.data().courseId;
          const courseRef = doc(db, "courses", courseId);
          const courseSnap = await getDoc(courseRef);
          if (courseSnap.exists()) {
            return { id: courseSnap.id, ...(courseSnap.data() as Omit<Course, "id">) };
          }
          return null;
        });

        const results = await Promise.all(coursePromises);
        setCourses(results.filter((c): c is Course => c !== null));
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchEnrolledCourses();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <LoadingSpinner message="Retrieving your enrolled masterclasses..." />;
  }

  if (!user) {
    return (
      <div className="bg-white border border-zinc-200/90 rounded-xl p-12 text-center shadow-xs max-w-lg mx-auto space-y-4">
        <BookOpen size={32} className="text-zinc-400 mx-auto" />
        <div>
          <h2 className="text-lg font-bold text-zinc-950">Authentication Required</h2>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            Please sign in to your port account to access your enrolled course curriculum.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/login">
            <Button variant="default" size="md">
              Sign In to Bondor
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link href="/builder-dashboard" className="text-xs text-sky-100 hover:text-white flex items-center gap-1 font-medium bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                <ArrowLeft size={13} />
                <span>Back to Docks</span>
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              My Enrolled Masterclasses
            </h1>
            <p className="text-sm text-sky-100 font-normal leading-relaxed max-w-2xl text-pretty">
              Track your video lesson progression and access attached creator resources.
            </p>
          </div>

          <Link href="/courses">
            <Button variant="secondary" size="sm" leftIcon={<Compass size={14} className="text-sky-600" />}>
              Explore More Courses
            </Button>
          </Link>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white border border-zinc-200/90 rounded-xl p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-3">
          <BookOpen size={28} className="text-zinc-400" />
          <div>
            <h3 className="text-base font-semibold text-zinc-900">No Enrolled Courses Yet</h3>
            <p className="text-xs text-zinc-500 max-w-sm mt-1">
              You haven't enrolled in any maker masterclasses. Explore our video courses to get started.
            </p>
          </div>
          <Link href="/courses">
            <Button variant="default" size="sm">
              Browse Masterclasses
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} isEnrolled={true} />
          ))}
        </div>
      )}
    </div>
  );
}
