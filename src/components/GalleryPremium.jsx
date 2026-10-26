"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight } from "lucide-react";

const srcOf = (s) => (s.startsWith("http") || s.startsWith("/") ? s : `/${s}`);

const TAG_ORDER = ["मंच", "कार्यक्रम", "सम्मान", "चित्र", "मीडिया", "व्यक्तिगत"];

export default function GalleryPremium({ items, variant = "full", id = "gallery" }) {
  const isPreview = variant === "preview";
  const PAGE_SIZE = 16;
  const [index, setIndex] = useState(null);
  const [tag, setTag] = useState("all");
  const [visible, setVisible] = useState(isPreview ? items.length : PAGE_SIZE);

  const tags = useMemo(() => {
    const set = new Set(items.map((i) => i.tag).filter(Boolean));
    const ordered = TAG_ORDER.filter((t) => set.has(t));
    const rest = [...set].filter((t) => !TAG_ORDER.includes(t));
    return ["all", ...ordered, ...rest];
  }, [items]);

  const filtered = useMemo(
    () => (tag === "all" ? items : items.filter((i) => i.tag === tag)),
    [items, tag]
  );

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + filtered.length) % filtered.length),
    [filtered.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % filtered.length),
    [filtered.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  const active = index !== null ? filtered[index] : null;
  const shown = filtered.slice(0, visible);

  return (
    <section className={`section${isPreview ? " section-soft" : ""}`} id={id}>
      <div className="wrap">
        <div className={`section-head${isPreview ? " center" : ""}`}>
          <span className="eyebrow">
            <ImageIcon size={14} /> {isPreview ? "गैलरी" : "फ़ोटो संग्रह"}
          </span>
          <h2 className="title">
            {isPreview ? (
              <>
                मंच और <span className="grad">पल</span>
              </>
            ) : (
              <>
                तस्वीरों की <span className="grad">यात्रा</span>
              </>
            )}
          </h2>
          <p className="lede">काव्य-प्रस्तुति, समारोह और सम्मान के वे पल।</p>
        </div>

        {!isPreview && tags.length > 2 && (
          <div className="filters" role="group" aria-label="गैलरी फ़िल्टर">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className={`filter-btn ${tag === t ? "active" : ""}`}
                onClick={() => {
                  setTag(t);
                  setIndex(null);
                  setVisible(PAGE_SIZE);
                }}
                aria-pressed={tag === t}
              >
                {t === "all" ? "सभी" : t}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="empty-state">
            <ImageIcon size={26} />
            <b>इस श्रेणी में कोई तस्वीर नहीं है</b>
            <button type="button" className="btn btn-ghost" onClick={() => setTag("all")}>
              सभी तस्वीरें
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {shown.map((im, i) => (
              <figure
                key={`${im.src}-${i}`}
                className={`gal-item ${im.span || ""}`}
              >
                <button
                  type="button"
                  className="card-hit"
                  aria-label={`${im.cap} — बड़ा देखें`}
                  onClick={() => setIndex(i)}
                ></button>
                <img src={srcOf(im.src)} alt={im.cap} loading="lazy" decoding="async" />
                <span className="veil" aria-hidden="true"></span>
                <figcaption className="cap">
                  <small>{im.tag}</small>
                  <b>{im.cap}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {!isPreview && visible < filtered.length && (
          <div className="load-more-wrap">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              और तस्वीरें देखें
              <span style={{ opacity: 0.6 }}>({filtered.length - visible})</span>
            </button>
          </div>
        )}

        {isPreview && (
          <div className="center-cta">
            <a href="/gallery/" className="btn btn-ghost">
              पूरी गैलरी देखें <ArrowRight size={17} />
            </a>
          </div>
        )}
      </div>

      {active && (
        <div
          className="lightbox open"
          role="dialog"
          aria-modal="true"
          aria-label={active.cap}
          onClick={close}
        >
          <button type="button" className="lb-close" onClick={close} aria-label="गैलरी बंद करें">
            <X size={18} />
          </button>
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                className="lb-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="पिछली तस्वीर"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="lb-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="अगली तस्वीर"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            <img src={srcOf(active.src)} alt={active.cap} />
            <div className="lb-cap">
              <small>{active.tag}</small>
              <b>{active.cap}</b>
              <span className="lb-count">
                {index + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
