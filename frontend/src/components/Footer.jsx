import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 mb-24">
          {/* Brand & Manifesto Section */}
          <div className="md:col-span-5 space-y-8">
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              DRIVE<span className="text-blue-600 font-light">NEST</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm font-light">
              A sanctuary for automotive enthusiasts. We curate a specialized
              fleet for those who view driving not just as transit, but as a
              journey home to excellence.
            </p>

            <Link
              to="/contact"
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900"
            >
              <span className="border-b border-slate-900 pb-1 group-hover:text-blue-600 group-hover:border-blue-600 transition-colors">
                Contact Concierge
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          {/* Directory */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/cars"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  The Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Fleet Management
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Service Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Location */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              The Hub
            </h4>
            <div className="space-y-4">
              <div className="group cursor-pointer">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                  Email
                </p>
                <p className="text-sm text-slate-900 font-bold border-b border-transparent group-hover:border-blue-600 w-fit transition-all">
                  inquiry@drivenest.com
                </p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                  Location
                </p>
                <p className="text-sm text-slate-600 font-medium">
                  Colombo // Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
              © 2026 Drivenest Mobility Labs
            </p>
            <div className="flex gap-8">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-900 cursor-pointer transition-colors">
                Legal
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-900 cursor-pointer transition-colors">
                Privacy
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              Inventory Sync Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
