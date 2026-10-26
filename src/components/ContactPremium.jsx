"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const icons = { phone: Phone, mail: Mail, pin: MapPin };

function SocialIcon({ name }) {
  const base = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": "true" };
  if (name === "ig") {
    return (
      <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "yt") {
    return (
      <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "wa") {
    return (
      <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
    );
  }
  return (
    <svg {...base} fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export default function ContactPremium({ rows, socials, endpoint }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot

    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="sampark">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-info" data-reveal="left">
            <div className="section-head">
              <span className="eyebrow">सीधा संपर्क</span>
              <h2 className="title">
                बात करें <span className="grad">कवि साहेब</span> से
              </h2>
              <p className="lede">
                काव्य प्रस्तुति, साहित्यिक कार्यक्रम, प्रकाशन या सहयोग — आपका
                संदेश सुस्वागत है।
              </p>
            </div>

            {rows.map((r) => {
              const Icon = icons[r.icon] || Phone;
              return (
                <div key={r.label} className="contact-row">
                  <span className="ic" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div>
                    <small>{r.label}</small>
                    {r.href ? (
                      <b>
                        <a href={r.href}>{r.value}</a>
                      </b>
                    ) : (
                      <b>{r.value}</b>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="social-row">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <form
            className="form-card"
            onSubmit={handleSubmit}
            action={endpoint}
            method="post"
            data-reveal="right"
          >
            <div className="form-grid">
              <div className="field">
                <label htmlFor="c-name">आपका नाम</label>
                <input
                  id="c-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="पूरा नाम"
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">फ़ोन</label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 ..."
                />
              </div>
              <div className="field full">
                <label htmlFor="c-email">ईमेल</label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="field full">
                <label htmlFor="c-subject">विषय</label>
                <input
                  id="c-subject"
                  name="subject"
                  placeholder="काव्य कार्यक्रम / प्रकाशन / सहयोग"
                />
              </div>
              <div className="field full">
                <label htmlFor="c-message">संदेश</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows="5"
                  required
                  placeholder="अपना संदेश लिखें..."
                />
              </div>
              <input
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                style={{ display: "none" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-gold form-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={17} className="spin" /> भेजा जा रहा है...
                </>
              ) : (
                <>
                  <Send size={16} /> संदेश भेजें
                </>
              )}
            </button>

            <div className="form-status" aria-live="polite">
              {status === "success" && (
                <div className="note ok">
                  <CheckCircle size={18} />
                  <span>धन्यवाद! आपका संदेश भेज दिया गया है। शीघ्र संपर्क किया जाएगा।</span>
                </div>
              )}
              {status === "error" && (
                <div className="note bad">
                  <AlertCircle size={18} />
                  <span>
                    संदेश नहीं भेजा जा सका। कृपया सीधे कॉल करें या{" "}
                    <a href="mailto:info@kamalbhatt.com">ईमेल</a> भेजें, या{" "}
                    <a
                      href="https://wa.me/917047895223"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>{" "}
                    पर संपर्क करें।
                  </span>
                </div>
              )}
            </div>

            <p className="form-note">आपकी जानकारी केवल संपर्क के लिए उपयोग की जाएगी।</p>
          </form>
        </div>
      </div>
    </section>
  );
}
