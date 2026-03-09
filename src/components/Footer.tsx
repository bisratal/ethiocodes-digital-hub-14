import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="gradient-hero text-primary-foreground">
    <div className="container-narrow section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-3">
            Ethio<span className="text-secondary">Codes</span>
          </h3>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Building world-class software solutions from the heart of Ethiopia.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Pages</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {["/services", "/portfolio", "/blog", "/team"].map((p) => (
              <li key={p}>
                <Link to={p} className="hover:text-secondary transition-colors capitalize">
                  {p.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {["Web Apps", "Mobile Apps", "Cloud Solutions", "UI/UX Design"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><Mail size={14} /> info@ethiocodes.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +251 911 123 456</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Addis Ababa, Ethiopia</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
        &copy; {new Date().getFullYear()} EthioCodes. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
