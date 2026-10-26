import { Feather, Award, ArrowRight } from "lucide-react";

export default function PremiumHero({ poetName }) {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: "url(/assets/images/poet/kavi-shaheb-007.jpg)" }}
        aria-hidden="true"
      ></div>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-hi">
              <span className="pulse-dot" aria-hidden="true"></span>
              हिंदी कवि · साहित्यकार
            </div>

            <h1 className="hero-title">
              <span className="line">
                <i>शब्दों में</i>
              </span>
              <span className="line">
                <i>धड़कती है</i>
              </span>
              <span className="line">
                <i className="accent">ज़िंदगी</i>
              </span>
            </h1>

            <p className="hero-sub">
              समाज की पुकार, मातृभाषा का गौरव और जीवन के अनकहे सच —{" "}
              <strong>{poetName}</strong> की कलम से, कविता की सच्ची आवाज़ में।
            </p>

            <div className="hero-actions">
              <a href="/poetry/" className="btn btn-gold">
                काव्य संग्रह पढ़ें <ArrowRight size={17} />
              </a>
              <a href="/about/" className="btn btn-ghost">
                जीवन परिचय
              </a>
            </div>

            <div className="hero-meta">
              <div>
                <b>
                  <span data-count="5">5</span>
                </b>
                <span>प्रकाशित रचनाएँ</span>
              </div>
              <div>
                <b>
                  <span data-count="7">7</span>
                </b>
                <span>सम्मान</span>
              </div>
              <div>
                <b>
                  <span data-count="2">2</span>
                </b>
                <span>अंतरराष्ट्रीय</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-portrait">
              <span className="hp-frame" aria-hidden="true"></span>
              <img
                src="/assets/images/poet/poet-portrait-main.jpg"
                alt={`${poetName} — चित्र`}
                fetchPriority="high"
              />
              <span className="hp-shade" aria-hidden="true"></span>
              <div className="hp-caption">
                <small>कवि · रचनाकार</small>
                <b>{poetName}</b>
              </div>
            </div>

            <span className="chip-float c1">
              <Feather size={14} /> 9 कविताएँ
            </span>
            <span className="chip-float c2">
              <Award size={14} /> 7 सम्मान
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
