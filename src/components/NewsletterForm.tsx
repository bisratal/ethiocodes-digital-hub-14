import { useState } from "react";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="gradient-accent section-padding">
      <div className="container-narrow text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-3">Stay Updated</h2>
        <p className="text-secondary-foreground/80 mb-6">Subscribe to our newsletter for the latest tech insights.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-sm bg-background text-foreground border-none outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
