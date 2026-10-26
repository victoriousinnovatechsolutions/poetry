"use client";

import { useState, useMemo, useEffect } from "react";
import { BookOpen, ArrowRight, X, SlidersHorizontal } from "lucide-react";

export default function PoetryGridPremium({
  poems,
  categories,
  variant = "full",
}) {
  const isPreview = variant === "preview";
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "all") return poems;
    return poems.filter((p) => p.cat === filter);
  }, [filter, poems]);

  useEffect(() => {
    if (isPreview) return;
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && categories.some((c) => c.value === cat)) setFilter(cat);
  }, [categories, isPreview]);

  const chooseFilter = (value) => {
    setFilter(value);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", value);
    window.history.replaceState({}, "", url);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section className={`section${isPreview ? " section-soft" : ""}`} id="kavya">
      <div className="wrap">
        <div className={`section-head${isPreview ? " center" : ""}`}>
          <span className="eyebrow">
            <SlidersHorizontal size={14} /> {isPreview ? "काव्य संग्रह" : "श्रेणी अनुसार पढ़ें"}
          </span>
          <h2 className="title">
            {isPreview ? (
              <>
                चुनिंदा <span className="grad">कविताएँ</span>
              </>
            ) : (
              <>
                काव्य <span className="grad">संग्रह</span>
              </>
            )}
          </h2>
          <p className="lede">
            समाज, मातृभाषा, जीवन दर्शन, प्रेम और भक्ति — हर भावना का संग्रह।
          </p>
        </div>

        {!isPreview && (
          <div className="filters" role="group" aria-label="कविता श्रेणी फ़िल्टर">
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`filter-btn ${filter === c.value ? "active" : ""}`}
                onClick={() => chooseFilter(c.value)}
                aria-pressed={filter === c.value}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={26} />
            <b>इस श्रेणी में अभी कोई कविता नहीं है</b>
            <p>कृपया कोई दूसरी श्रेणी चुनें या सभी कविताएँ देखें।</p>
            <button type="button" className="btn btn-ghost" onClick={() => chooseFilter("all")}>
              सभी कविताएँ
            </button>
          </div>
        ) : (
          <div className="poem-grid">
            {filtered.map((p) => (
              <article key={p.id} className="poem-card">
                <button
                  type="button"
                  className="card-hit"
                  aria-label={`${p.title} — पूरी कविता पढ़ें`}
                  onClick={() => setSelected(p)}
                ></button>
                <span className="quote-mark" aria-hidden="true">
                  ”
                </span>
                <span className="cat">{p.catLabel}</span>
                <h4>{p.title}</h4>
                <p className="excerpt">{p.lines.slice(0, 2).join(" ")}…</p>
                <div className="foot">
                  <small>
                    {p.stage} · {p.read}
                  </small>
                  <span className="read">
                    पढ़ें <BookOpen size={15} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {isPreview && (
          <div className="center-cta">
            <a href="/poetry/" className="btn btn-gold">
              सभी कविताएँ देखें <ArrowRight size={17} />
            </a>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="reader open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-title"
          onClick={() => setSelected(null)}
        >
          <div className="reader-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="reader-close"
              onClick={() => setSelected(null)}
              aria-label="कविता बंद करें"
            >
              <X size={18} />
            </button>
            <span className="r-cat">{selected.catLabel}</span>
            <h3 id="reader-title">{selected.title}</h3>
            <div className="r-body">
              {selected.lines.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
            <div className="r-sign">— कवि कमल भट्ट &lsquo;साहेब&rsquo;</div>
            <div className="r-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>
                बंद करें
              </button>
              <a href="/poetry/" className="btn btn-gold">
                सभी कविताएँ <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
