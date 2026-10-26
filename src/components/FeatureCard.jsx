"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const ICONS = {
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  time: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><path d="M5 12h14"/></svg>`,
  cap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/><path d="M22 10v6"/></svg>`,
};

export default function FeatureCard({ title, desc, icon, cat, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const rotateX = useTransform(y, [-.5, .5], [8, -8]);
  const rotateY = useTransform(x, [-.5, .5], [-12, 12]);
  const spring = useSpring(hovered ? 1 : 0, { stiffness: 300, damping: 30 });
  const scale = useTransform(spring, [0, 1], [1, 1.03]);

  const iconHtml = ICONS[icon] || ICONS.pin;

  return (
    <motion.div
      className="feature-card hover-lift"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
        y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX, rotateY, scale }}
      whileHover={{ y: -8 }}
    >
      {cat && (
        <span className="feature-cat">{cat}</span>
      )}
      <div className="feature-icon" dangerouslySetInnerHTML={{ __html: iconHtml }} />
      <h4 className="feature-title">{title}</h4>
      <p className="feature-desc">{desc}</p>
      {href && (
        <a href={href} className="feature-link">
         詳しく →
        </a>
      )}
    </motion.div>
  );
};
