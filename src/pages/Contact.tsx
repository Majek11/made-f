import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", organisation: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      organisation: form.organisation || null,
      message: form.message,
    });

    if (error) {
      toast({ title: "Failed to send message", description: "Please try again later.", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", organisation: "", message: "" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto text-center">
          <span className="section-tag mb-6 inline-block">Get In Touch</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            Contact <em className="text-italic-accent">MADE-F</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Whether you're a researcher, journalist, communicator or community advocate — let's connect.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <span className="section-tag mb-6 inline-block">Reach Us</span>
              <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-8 leading-tight">
                Let's build <em className="text-italic-accent">informed communities</em> together
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-10">
                MADE-F has a place for you. Whether you want to partner, volunteer, collaborate on
                research, or simply learn more about our work — we'd love to hear from you.
              </p>

              <div className="flex flex-col gap-6">
                <a href="mailto:info@made-foundation.org" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gold-light flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Email</p>
                    <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">info@made-foundation.org</p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Phone</p>
                    <p className="font-display font-semibold text-foreground">+234 (0) 000 0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Location</p>
                    <p className="font-display font-semibold text-foreground">Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-3xl p-10 border border-border shadow-card">
              <h3 className="font-display text-2xl font-bold text-foreground mb-8">Send a message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2 block">Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2 block">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2 block">Organisation</label>
                  <input type="text" name="organisation" value={form.organisation} onChange={handleChange} placeholder="Your organisation (optional)" className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2 block">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how you'd like to get involved..." className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="btn-gold w-full justify-center mt-2 disabled:opacity-50">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Contact;
