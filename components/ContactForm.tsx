"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate mail transmission / API delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[600px]">
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-wider text-neutral-500 font-mono font-bold mb-1.5">
          Sender Name / Identification
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          className="w-full p-3 border border-neutral-800 bg-[var(--input-bg)] text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-wider text-neutral-500 font-mono font-bold mb-1.5">
          Return Email Protocol
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. name@domain.com"
          className="w-full p-3 border border-neutral-800 bg-[var(--input-bg)] text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-neutral-500 font-mono font-bold mb-1.5">
          Subject / Node Reference
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Pipeline Collaboration Inquiry"
          className="w-full p-3 border border-neutral-800 bg-[var(--input-bg)] text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-wider text-neutral-500 font-mono font-bold mb-1.5">
          Transmission Payload (Message)
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Input message text here..."
          className="w-full p-3 border border-neutral-800 bg-[var(--input-bg)] text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800 resize-y"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-neutral-800 text-background border border-neutral-800 py-3 px-6 font-mono font-bold text-sm cursor-pointer transition-all duration-200 shadow-[2px_2px_0px_var(--border-color)] hover:bg-background hover:text-neutral-800 hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {status === "sending" ? "TRANSMITTING..." : "EXECUTE_SUBMISSION()"}
        </button>
      </div>

      {status === "success" && (
        <div className="p-4 border border-dashed border-accent-green bg-neutral-50 text-accent-green font-mono text-xs mt-2">
          SUCCESS: Transmission dispatched successfully to hello@polimelo.com.
        </div>
      )}
    </form>
  );
}
