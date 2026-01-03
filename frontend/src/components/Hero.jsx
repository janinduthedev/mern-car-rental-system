import React from "react";
import { ChevronRight, Play, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6"></div>
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-8">
            REDEFINE <br />
            <span className="text-blue-600">THE ROAD.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-md leading-relaxed">
            Premium car rentals for those who value time, comfort, and the
            thrill of the drive.
          </p>
        </div>

        {/* Hero Image / Card */}
        <div className="relative group -mt-18">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500" />
          <img
            src="https://images.unsplash.com/photo-1553260188-75a8d6205b6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury Car"
            className="relative z-10 w-full h-[500px] object-cover rounded-[3rem] shadow-2xl transition-transform group-hover:-translate-y-2 duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
