"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Radio, Sparkles } from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

export const HarborRetroPlayer: React.FC<{ className?: string }> = ({ className = "" }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeDockIndex, setActiveDockIndex] = useState<number>(0);

  const activeDock = BUSINESS_CATEGORIES[activeDockIndex] || BUSINESS_CATEGORIES[0];

  const handleDockSelect = (idx: number) => {
    setActiveDockIndex(idx);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={`bg-white border-2 border-zinc-950 rounded-2xl overflow-hidden shadow-xs ${className}`}>
      {/* Header Bar */}
      <div className="px-4 py-3 bg-[#FAF8F5] border-b-2 border-zinc-950 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-zinc-950" />
          <span className="text-xs font-bold text-zinc-950">
            Harbor Operations Preview
          </span>
        </div>

        {/* Dock Channel Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {BUSINESS_CATEGORIES.map((dock, idx) => (
            <button
              key={dock.id}
              onClick={() => handleDockSelect(idx)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                activeDockIndex === idx
                  ? "bg-[#62B6FC] text-zinc-950 border-2 border-zinc-950 font-extrabold shadow-xs"
                  : "bg-white text-zinc-700 hover:text-zinc-950 border-2 border-zinc-300 hover:border-zinc-950 font-semibold"
              }`}
            >
              {dock.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Video Viewport */}
      <div className="relative bg-zinc-950 aspect-video w-full overflow-hidden group">
        <video
          ref={videoRef}
          src="/port-8bit.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Controls Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md px-3 py-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-1 rounded hover:bg-white/20 transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1 rounded hover:bg-white/20 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-200 font-semibold">
            <span>{activeDock.title}</span>
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded hover:bg-white/20 transition-colors"
              title="Fullscreen"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry Bento Grid */}
      <div className="p-4 bg-[#FAF8F5] border-t-2 border-zinc-950 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="bg-white p-3.5 rounded-xl border-2 border-zinc-950 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Selected Category
          </span>
          <h4 className="font-bold text-zinc-950 text-sm">{activeDock.title}</h4>
          <p className="text-xs text-zinc-600 font-medium">
            {activeDock.coursesCount} Courses • {activeDock.materialsCount} Starter Packs
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border-2 border-zinc-950 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Growth Rate
            </span>
            <span className="text-[11px] font-bold text-zinc-950 bg-[#E8F4FE] px-1.5 py-0.2 rounded-full border border-zinc-950">
              {activeDock.growth}
            </span>
          </div>
          <h4 className="font-bold text-zinc-950 text-sm">{activeDock.throughput}</h4>
          <p className="text-xs text-zinc-600 font-medium">
            {activeDock.activeShips} Verified supplier lines
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border-2 border-zinc-950 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Fulfillment
          </span>
          <h4 className="font-bold text-zinc-950 text-sm">Direct Dispatch</h4>
          <p className="text-xs text-zinc-600 font-medium">
            Integrated Stripe payments &amp; automated enrollment
          </p>
        </div>
      </div>
    </div>
  );
};
