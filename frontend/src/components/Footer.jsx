import React from "react";

const Footer = () => {
  return (
    // Reduced py-24 to py-12
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Brand & Contact Row - Combined to save vertical space */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-tighter text-slate-900 uppercase mb-3">
              Drivenest
            </h2>
            <p className="max-w-xs text-xs text-slate-500 leading-relaxed">
              Performance assets shaped by motion and restraint.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                Contact
              </p>
              <p className="text-xs text-slate-900 font-medium">
                inquiry@drivenest.com
              </p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                Location
              </p>
              <p className="text-xs text-slate-500">Colombo, SL</p>
            </div>
          </div>
        </div>

        {/* Bottom - Reduced pt-10 to pt-6 */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[9px] uppercase tracking-widest text-slate-400">
            © 2026 Drivenest
          </p>

          <div className="flex gap-6 text-[9px] uppercase tracking-widest text-slate-400">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">
              Legal
            </span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">
              Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
