"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Scanning Suspicious Links",
    desc: "Analyze URLs in real time to detect phishing, malware, and scam infrastructure before you click.",
  },
  {
    title: "Deepfake Detection",
    desc: "Identify AI-generated images, videos, and impersonation attempts using forensic analysis.",
  },
  {
    title: "Learn From Latest Scams",
    desc: "Stay updated with real-world scam patterns, techniques, and emerging digital threats.",
  },
  {
    title: "Real Scam Simulation",
    desc: "Experience controlled scam scenarios to understand how attacks work and how to respond safely.",
  },
  {
    title: "Community Experience Hub",
    desc: "Share experiences, report incidents, and learn from others in a trusted, moderated community.",
  },
];

export function FeatureSlidingCards() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const [paused, setPaused] = useState(false);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const speed = 0.5; // smooth & visible

    const animate = () => {
      if (!paused) {
        slider.scrollLeft += speed;

        // seamless loop
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-hidden pb-8 scrollbar-hide"
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="min-w-[340px]
                       glass rounded-2xl
                       border border-white/10
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:-translate-y-2
                       hover:border-blue-400/50
                       hover:shadow-[0_30px_80px_rgba(59,130,246,0.35)]"
          >
            <div className="p-6 space-y-4">
              {/* Accent */}
              <div className="h-1 w-10 rounded-full
                              bg-gradient-to-r from-blue-500 to-cyan-400" />

              <h3 className="text-lg font-semibold tracking-tight text-white">
                {f.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-400">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
