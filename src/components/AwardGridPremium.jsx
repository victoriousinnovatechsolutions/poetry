"use client";

import { Trophy, Globe, Star, ArrowRight, Medal } from "lucide-react";

function AwardIcon({ level }) {
  if (level === "intl") return <Globe size={22} />;
  if (level === "nat") return <Star size={22} />;
  return <Trophy size={22} />;
}

export default function AwardGridPremium({ awards, variant = "full" }) {
  const isPreview = variant === "preview";

  return (
    <section className="section" id="samman">
      <div className="wrap">
        <div className={`section-head${isPreview ? " center" : ""}`}>
          <span className="eyebrow">
            <Medal size={14} /> {isPreview ? "सम्मान एवं पुरस्कार" : "उपलब्धि संग्रह"}
          </span>
          <h2 className="title">
            {isPreview ? (
              <>
                कलम की <span className="grad">पहचान</span>
              </>
            ) : (
              <>
                सम्मान जो <span className="grad">प्रेरणा</span> हैं
              </>
            )}
          </h2>
          <p className="lede">
            अल्पायु में ही 7 प्रमुख अवार्ड — 5 राष्ट्रीय और 2 अंतरराष्ट्रीय।
          </p>
        </div>

        <div className="award-grid">
          {awards.map((a, i) => (
            <article
              key={a.name}
              className="award-card"
              data-reveal
              data-delay={i * 60}
            >
              <span className="award-medal" aria-hidden="true">
                <AwardIcon level={a.lvl} />
              </span>
              <div>
                <h4>{a.name}</h4>
                <span className="org">{a.org}</span>
                <p>{a.note}</p>
                <span className={`lv ${a.lvl}`}>
                  {a.lvl === "nat" ? "राष्ट्रीय सम्मान" : "अंतरराष्ट्रीय सम्मान"}
                </span>
              </div>
            </article>
          ))}
        </div>

        {isPreview && (
          <div className="center-cta">
            <a href="/awards/" className="btn btn-ghost">
              सभी सम्मान देखें <ArrowRight size={17} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
