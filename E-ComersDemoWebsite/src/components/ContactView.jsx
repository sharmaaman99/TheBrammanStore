import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Check, Send, Sparkles, Clock, MessageSquare } from 'lucide-react';

/**
 * ContactView (Screen 11 from UX Showcase)
 * Features:
 * - 2-Column Layout:
 *   - Left: Urban streetwear photo + contact details:
 *     - support@thebrahmmanstore.com
 *     - +91 98765 43210
 *     - Bharat / India
 *   - Right: 'Get In Touch' form:
 *     - Name input *
 *     - Email input *
 *     - Message textarea *
 *     - Solid black button: 'Send Message →'
 *     - Interactive submit toast confirmation & form reset
 */
export default function ContactView({ onNavigate = () => {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setSubmitting(true);
    // Simulate high-reliability API dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 700);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <section className="bg-white border-b border-neutral-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <button
              onClick={() => onNavigate('Home')}
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-black font-semibold">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Screen 11 2-Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: Urban Photo + Direct Contact Details (Screen 11)  */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 space-y-8">
            {/* Urban Streetwear Editorial Photo */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.08)] group">
              <img
                src="/lookbook/creator_kabir.jpg"
                alt="The Brahmman Store Studio"
                className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.src = '/model_indra_boy_8k.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  Headquarters &amp; Dispatch Hub
                </span>
                <p className="font-heading font-black text-xl">
                  The Brahmman Atelier
                </p>
                <p className="text-xs text-neutral-300 font-sans">
                  Crafting authentic garments for modern minds.
                </p>
              </div>
            </div>

            {/* Direct Contact Details Block */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="font-heading font-black text-lg text-neutral-900 border-b border-neutral-100 pb-3">
                Direct Channels
              </h3>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-neutral-700 group-hover:text-white" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Email
                    </span>
                    <a
                      href="mailto:support@thebrahmmanstore.com"
                      className="font-heading font-bold text-sm text-neutral-900 hover:text-black hover:underline transition-colors block break-all"
                    >
                      support@thebrahmmanstore.com
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('support@thebrahmmanstore.com', 'email')}
                      className="text-[11px] text-neutral-400 hover:text-black font-mono mt-0.5 inline-block"
                    >
                      {copiedField === 'email' ? '✓ Copied to clipboard' : 'Click to copy'}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-neutral-700 group-hover:text-white" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Call / WhatsApp
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="font-heading font-bold text-sm text-neutral-900 hover:text-black hover:underline transition-colors block"
                    >
                      +91 98765 43210
                    </a>
                    <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">
                      Mon—Sat: 10:00 AM - 7:00 PM IST
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <MapPin className="w-4 h-4 text-neutral-700 group-hover:text-white" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Location
                    </span>
                    <span className="font-heading font-bold text-sm text-neutral-900 block">
                      Bharat / India
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">
                      Worldwide Express Shipping
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: "Get In Touch" Form (Screen 11)                   */}
          {/* ============================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-mono uppercase tracking-widest mb-3 border border-neutral-200">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Always Connected</span>
                </div>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-neutral-900 tracking-tight">
                  Get In Touch
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 font-sans mt-2">
                  Have a question? We'd love to hear from you.
                </p>
              </div>

              {/* Success Toast / Notification */}
              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-emerald-900">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 font-sans mt-0.5">
                      Thank you for reaching out to The Brahmman Store. Our concierge team will review your message and reply within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold"
                  >
                    Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shiva Sharma"
                    className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-sm font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-neutral-50/50 hover:bg-white"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold"
                  >
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. shiva@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-sm font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-neutral-50/50 hover:bg-white"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about sizing questions, custom order inquiries, collaborations, or order tracking..."
                    className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-sm font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-neutral-50/50 hover:bg-white resize-none"
                  />
                </div>

                {/* Solid Black Button: 'Send Message →' (Screen 11) */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-600 transition-all font-heading font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Response time: &lt; 24h
                  </span>
                  <span>SSL Encrypted Transmission</span>
                </div>
              </form>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
