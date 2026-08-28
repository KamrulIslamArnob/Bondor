"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Course } from "@/types";
import { BUSINESS_CATEGORIES, getBusinessLabel } from "@/lib/constants";
import { CourseCard } from "@/components/courses/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookOpen, Package, Search, ArrowLeft } from "lucide-react";

function CoursesContent() {
  const searchParams = useSearchParams();
  const businessParam = searchParams.get("business");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDock, setSelectedDock] = useState<string>(businessParam || "all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (businessParam) {
      setSelectedDock(businessParam);
    }
  }, [businessParam]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "enrollments"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const ids: string[] = [];
        snap.forEach((d) => ids.push(d.data().courseId));
        setEnrolledCourseIds(ids);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };
    fetchEnrollments();
  }, [user]);

  const DEFAULT_COURSES: Course[] = [
    {
      id: "course_tshirt_01",
      title: "Commercial Screenprinting Masterclass for Bangladeshi Makers",
      description: "Complete studio guide covering emulsion coating, darkroom exposure, plastisol ink mixing, and curing 180 GSM combed cotton tees.",
      business: "tshirt",
      price: 2500,
      sellerId: "seller_dhaka_01",
      links: [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ],
      createdAt: Date.now(),
    },
    {
      id: "course_candle_01",
      title: "Artisan Soy Wax & Aroma Blending Workshop",
      description: "Master temperature control, cotton and wooden wick calibration, essential oil flashpoints, and crystal-clear candle setting.",
      business: "candle",
      price: 1800,
      sellerId: "seller_sylhet_01",
      links: [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ],
      createdAt: Date.now(),
    },
    {
      id: "course_soap_01",
      title: "Cold-Process Organic Soap Formulation & Chemistry",
      description: "Learn lye safety, saponification value calculations, botanical infusions, swirling techniques, and cure rack management.",
      business: "soap",
      price: 2200,
      sellerId: "seller_ctg_01",
      links: [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ],
      createdAt: Date.now(),
    },
    {
      id: "course_mug_01",
      title: "Sublimation Heat-Press & Merchandise Production",
      description: "Learn color profile calibration, sublimation paper pressing on ceramic mugs, aluminum bottles, and micro-brand packaging.",
      business: "mug",
      price: 1500,
      sellerId: "seller_dhaka_02",
      links: [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ],
      createdAt: Date.now(),
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "courses"));
        const list: Course[] = [];
        snap.forEach((doc) => {
          list.push({ id: doc.id, ...(doc.data() as Omit<Course, "id">) });
        });
        setCourses(list.length > 0 ? list : DEFAULT_COURSES);
      } catch (err) {
        console.error("Error fetching courses, using defaults:", err);
        setCourses(DEFAULT_COURSES);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesDock = selectedDock === "all" || c.business === selectedDock;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDock && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link href="/builder-dashboard" className="text-xs text-sky-100 hover:text-white flex items-center gap-1 font-medium bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                <ArrowLeft size={13} />
                <span>Back to Docks</span>
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Video Masterclasses
            </h1>
            <p className="text-sm text-sky-100 leading-relaxed font-normal max-w-2xl text-pretty">
              Step-by-step production guides to launch and scale your hands-on business.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/materials${selectedDock !== "all" ? `?business=${selectedDock}` : ""}`}>
              <Button variant="secondary" size="sm" leftIcon={<Package size={14} className="text-sky-600" />}>
                Order Starter Kits
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Chips & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedDock("all")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedDock === "all"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "bg-white/15 text-sky-100 hover:bg-white/25 border border-white/20"
              }`}
            >
              All Docks ({courses.length})
            </button>
            {BUSINESS_CATEGORIES.map((dock) => (
              <button
                key={dock.id}
                onClick={() => setSelectedDock(dock.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedDock === dock.id
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "bg-white/15 text-sky-100 hover:bg-white/25 border border-white/20"
                }`}
              >
                {dock.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-200" />
            <input
              type="text"
              placeholder="Search masterclasses..."
              className="w-full pl-9 pr-3.5 py-2 bg-white/15 border border-white/20 text-white rounded-full text-base sm:text-xs font-medium placeholder:text-sky-200 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <LoadingSpinner message="Loading course curriculum..." />
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white border border-zinc-200/90 rounded-xl p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-3">
          <BookOpen size={28} className="text-zinc-400" />
          <div>
            <h3 className="text-base font-semibold text-zinc-900">No Courses Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mt-1">
              No published video masterclasses match your filter criteria.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => { setSelectedDock("all"); setSearchQuery(""); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              isEnrolled={enrolledCourseIds.includes(c.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading course catalog..." />}>
      <CoursesContent />
    </Suspense>
  );
}
