import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function KaalChatWidget({ onOpenTrackModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'kaal',
      text: 'Pranam. I am Kaal (काल) — the AI concierge of The Brahmman Store. Ask me about our 260–400 GSM fabrics, sizing recommendations for your height, or track an active dispatch.',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/kaal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'kaal',
          text: data.reply,
          orderData: data.orderData,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setTimeout(() => {
        let fallbackReply = "All Brahmman garments are cut in an authentic brutalist boxy oversized silhouette with drop shoulders. For < 5'7\" choose S; 5'7\"-5'10\" choose M; 5'10\"-6'1\" choose L. 100% bio-washed combed cotton, 260-400 GSM.";
        const lower = textToSend.toLowerCase();
        if (lower.includes("track") || lower.includes("brh")) {
          fallbackReply = "You can track your parcel by entering your order ID (e.g. BRH-8821) in the 'Track Order' modal in the navbar. Dispatches originate via BlueDart Air.";
        }

        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'kaal',
            text: fallbackReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { label: "Track my order →", action: () => handleSendMessage("Track my order BRH-8821") },
    { label: "Shipping & delivery →", action: () => handleSendMessage("What is your shipping and delivery timeline?") },
    { label: "Find my size →", action: () => handleSendMessage("How does the oversized sizing fit?") },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] sm:w-[400px] h-[520px] bg-white border border-[#e5e5e5] shadow-2xl flex flex-col justify-between mb-4 rounded-xs"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-[#e5e5e5] bg-[#f8f8f7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-heading font-extrabold text-sm shadow-xs">
                  क
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm tracking-wider uppercase text-black">
                      KAAL // काल
                    </h3>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-500">
                    BRAHMMAN ARCHIVE AI CONCIERGE
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-black p-1 transition-colors"
                aria-label="Close Kaal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links Menu */}
            <div className="p-2.5 bg-[#fbfbfb] border-b border-[#f0f0f0] flex flex-wrap gap-1.5 text-[11px] font-mono">
              {quickLinks.map((ql, idx) => (
                <button
                  key={idx}
                  onClick={ql.action}
                  className="px-2.5 py-1 bg-white border border-[#e5e5e5] text-neutral-700 hover:text-black hover:border-black transition-all text-left shadow-xs"
                >
                  {ql.label}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs no-scrollbar bg-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-black text-white font-medium shadow-xs'
                        : 'bg-[#f4f4f2] border border-[#e5e5e5] text-neutral-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* If tracking data returned */}
                    {msg.orderData && (
                      <div className="mt-3 pt-3 border-t border-neutral-300 text-[10px] space-y-1">
                        <div className="flex justify-between text-neutral-600">
                          <span>ORDER: {msg.orderData.id}</span>
                          <span className="text-black font-bold">{msg.orderData.status}</span>
                        </div>
                        <div className="text-neutral-600">
                          AWB: {msg.orderData.trackingNumber}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-neutral-400 mt-1 px-1">
                    {msg.sender === 'user' ? 'YOU' : 'KAAL'} • {msg.time}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs">
                  <span className="animate-spin text-sm">✦</span>
                  <span>Consulting Brahmman archive...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[#e5e5e5] bg-[#fafaf9]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Kaal (size, 260 GSM, order)..."
                  className="flex-1 bg-white border border-[#d4d4d4] px-3 py-2 text-xs font-mono text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="bg-black text-white p-2 hover:bg-neutral-800 disabled:opacity-40 transition-colors shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-black text-white shadow-xl flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-700"
        aria-label="Open AI Help"
        title="Need help? Chat with Kaal"
      >
        <span className="font-devanagari font-bold text-sm">काल</span>
      </motion.button>

    </div>
  );
}
