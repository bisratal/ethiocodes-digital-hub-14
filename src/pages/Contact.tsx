import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

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
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>
      </section>

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
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-card rounded-xl shadow-card p-8 space-y-5"
          >
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
    </main>
  );
};

export default Contact;
