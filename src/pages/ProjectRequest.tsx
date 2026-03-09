import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const budgetRanges = ["Under $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+"];
const timelines = ["Less than 1 month", "1-3 months", "3-6 months", "6+ months"];

const ProjectRequest = () => {
  const [form, setForm] = useState({
    name: "", email: "", company: "", description: "", budget: "", timeline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Project request submitted! We'll reach out within 24 hours.");
    setForm({ name: "", email: "", company: "", description: "", budget: "", timeline: "" });
  };

  return (
    <main className="pt-16">
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Request a Project</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Tell us about your project and we'll provide a tailored proposal.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl shadow-card p-8 space-y-5"
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
              <label className="block text-sm font-medium text-foreground mb-1.5">Project Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                placeholder="Describe your project goals, features, and any technical requirements..."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Estimated Budget</label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Timeline</label>
                <select
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                >
                  <option value="">Select timeline</option>
                  {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity"
            >
              Submit Project Request
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default ProjectRequest;
