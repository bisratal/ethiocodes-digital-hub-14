import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-narrow flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold text-primary tracking-tight">
          Ethio<span className="text-secondary">Codes</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-primary hover:bg-accent"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/request"
            className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold gradient-accent text-secondary-foreground transition-transform hover:scale-105"
          >
            Request a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 pb-4 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === l.to
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/request"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold gradient-accent text-secondary-foreground text-center"
              >
                Request a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
