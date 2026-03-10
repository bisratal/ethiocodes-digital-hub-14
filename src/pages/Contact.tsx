import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  { q: "How long does a typical project take?", a: "Timelines vary by scope. A standard web app takes 8–16 weeks, while an MVP can be ready in 4–6 weeks. We'll provide a detailed timeline during the proposal phase." },
  { q: "What is your pricing model?", a: "We offer both fixed-price and time-and-materials models. For well-defined projects, fixed-price works best. For evolving requirements, T&M gives you flexibility." },
  { q: "Do you provide post-launch support?", a: "Yes! We offer ongoing maintenance and support packages including bug fixes, performance monitoring, feature updates, and 24/7 critical issue response." },
  { q: "Can you work with our existing team?", a: "Absolutely. We frequently augment existing teams with dedicated developers who integrate seamlessly into your workflow and tools." },
  { q: "What industries do you serve?", a: "We have deep experience in fintech, healthcare, logistics, agriculture, education, and e-commerce — but we're industry-agnostic and love new challenges." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent successfully! We'll get back to you soon.");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
            Let's Connect
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Have a question, want to start a project, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding">
        <div className="container-narrow grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: <Mail size={20} />, label: "Email", value: "info@ethiocodes.com" },
                  { icon: <Phone size={20} />, label: "Phone", value: "+251 911 123 456" },
                  { icon: <MapPin size={20} />, label: "Address", value: "Bole, Addis Ababa, Ethiopia" },
                  { icon: <Clock size={20} />, label: "Office Hours", value: "Mon–Fri, 9:00 AM – 6:00 PM (EAT)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Promise */}
            <div className="p-5 rounded-xl bg-accent/50 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={18} className="text-secondary" />
                <p className="text-sm font-semibold text-foreground">Quick Response Promise</p>
              </div>
              <p className="text-sm text-muted-foreground">
                We respond to every inquiry within 24 hours during business days. For urgent matters, call us directly.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-card rounded-xl shadow-card p-8 space-y-5"
          >
            <h3 className="text-lg font-bold text-foreground mb-2">Send Us a Message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Tell us about your project or question..."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="container-narrow max-w-3xl">
          <SectionHeading
            tag="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about working with us."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl bg-card shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>
                  <ArrowRight
                    size={16}
                    className={`text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
