import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import {
  CONTACT_DESCRIPTION,
  CONTACT_INFO,
  CTA_TEXT,
  PROGRAM_OPTIONS,
} from "@/constants/content";

const EarthModel = dynamic(
  () => import("./contact/mailModel").then((m) => m.EarthModel),
  { ssr: false },
);

const inputClassName =
  "mt-3 w-full rounded-3xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white outline-none transition focus:border-rosewood focus:ring-2 focus:ring-rosewood/20";

export function ContactSection() {
  return (
    <section
      className="bg-gradient-section px-4 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur-lg sm:p-8 lg:p-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
            {Object.values(CONTACT_INFO).map((item) => (
              <div
                key={item.label}
                className="rounded-3xl bg-navy/90 p-4 text-slate-200 shadow-soft sm:p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-rosewood/80 sm:text-sm">
                  {item.label}
                </p>
                <p className="mt-2 text-sm sm:mt-3 sm:text-base">{item.value}</p>
              </div>
            ))}
          </div>

          <EarthModel />

          <div className="text-center">
            <motion.h2
              className="text-2xl font-semibold text-white sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              IHSTGroup Contact
            </motion.h2>
          </div>
        </div>

        <form className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur-lg sm:p-8 lg:p-10">
          <div className="text-start">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              {CONTACT_DESCRIPTION}
            </p>
          </div>
          <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="program"
                className="text-sm font-medium text-slate-200"
              >
                Program interest
              </label>
              <select id="program" name="program" defaultValue="" className="mt-3 w-full rounded-3xl border border-white/10 bg-burgundy/80 px-5 py-3 text-sm text-white outline-none transition focus:border-rosewood focus:ring-2 focus:ring-rosewood/20">
                <option value="" disabled className="text-slate-500">
                  Select a program
                </option>
                {PROGRAM_OPTIONS.map((program) => (
                  <option key={program} className="text-white">{program}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-200"
              >
                Tell us more
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Type your goals or questions here"
                className={inputClassName}
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full">
              {CTA_TEXT.submitForm}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
