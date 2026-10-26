"use client";

import { motion } from "framer-motion";

export default function Marquee({ items, speed = 40 }) {
  const duplicated = [...items, ...items];
  return (
    <div className="marquee-wrapper" style={{ "--speed": speed }}>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: `-50%` }}
        transition={{
          repeat: Infinity,
          type: "linear",
          duration: speed,
          ease: "linear",
        }}
        className="marquee-track"
      >
        {duplicated.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
