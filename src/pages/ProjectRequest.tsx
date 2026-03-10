import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FileText, MessageSquare, Rocket, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const budgetRanges = ["Under $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+"];
const timelines = ["Less than 1 month", "1-3 months", "3-6 months", "6+ months"];
const serviceTypes = ["Web Application", "Mobile App", "Custom Software", "Cloud Solutions", "UI/UX Design", "System Integration", "Other"];

const steps = [
  { icon: <FileText size={24} />, title: "Submit Your Brief", description: "Fill out the form with your project details. The more information you share, the better we can help." },
  { icon: <MessageSquare size={24} />, title: "Discovery Call", description: "Our team will reach out within 24 hours to schedule a free consultation and discuss your requirements." },
  { icon: <Rocket size={24} />, title: "Receive a Proposal", description: "We'll deliver a detailed proposal with scope, timeline, cost estimate, and team composition." },
  { icon: <CheckCircle size={24} />, title: "Kick Off", description: "Once approved, we begin development with a dedicated team, weekly demos, and transparent communication." },
];

const ProjectRequest = () => {
  const [form, setForm] = useState({
    name: "", email: "", company: "", description: "", budget: "", timeline: "", serviceType: "", phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Project request submitted! We'll reach out within 24 hours.");
    setForm({ name: "", email: "", company: "", description: "", budget: "", timeline: "", serviceType: "", phone: "" });
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
            Start a Project
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Request a Project</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Tell us about your project and we'll provide a tailored proposal. Free consultation, no obligations.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <SectionHeading
            tag="Simple Process"
            title="How It Works"
            description="From inquiry to kick-off in four straightforward steps."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl bg-card shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-secondary mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-muted-foreground mb-2">STEP {i + 1}</div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container-narrow max-w-2xl">
          <SectionHeading
            tag="Project Details"
            title="Tell Us About Your Project"
            description="Complete the form below and we'll get back to you with a custom proposal."
          />
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl shadow-card p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Service Type</label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              >
                <option value="">Select a service</option>
                {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Project Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                placeholder="Describe your project goals, features, target audience, and any technical requirements..."
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

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to a free consultation. No commitment required.
            </p>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default ProjectRequest;
