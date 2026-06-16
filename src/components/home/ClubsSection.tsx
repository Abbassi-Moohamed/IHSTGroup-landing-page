import { Card } from "@/components/ui";
import {
  CLUBS,
  CLUBS_FEATURED,
  CLUBS_HEADER_DESCRIPTION,
  CLUBS_HEADER_TAG,
  CLUBS_HEADER_TITLE,
} from "@/constants/content";

export function ClubsSection() {
  return (
    <section data-id="clubs" className="-mt-[50vh] bg-slate-950/90 px-4 py-12 sm:-mt-[70vh] sm:px-10 sm:py-16 lg:-mt-[90vh] lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:gap-10 lg:items-end">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-rosewood/80 sm:text-sm">
              {CLUBS_HEADER_TAG}
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl sm:leading-tight lg:text-5xl">
              {CLUBS_HEADER_TITLE}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              {CLUBS_HEADER_DESCRIPTION}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-navy/80 p-5 shadow-soft backdrop-blur transition duration-500 hover:-translate-y-1 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.35em] text-rosewood/80 sm:text-xs">
              {CLUBS_FEATURED.tag}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white sm:mt-4 sm:text-2xl">
              {CLUBS_FEATURED.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 sm:mt-3">
              {CLUBS_FEATURED.description}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {CLUBS.map((item, index) => (
            <Card key={item.title} variant="feature" className="group">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12 sm:rounded-3xl"
                  style={{ backgroundColor: `${item.accent}20` }}
                >
                  <span className="text-base font-bold text-white sm:text-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:mt-4 sm:leading-7">
                {item.description}
              </p>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-900 sm:mt-6">
                <div className="h-full rounded-full bg-gradient-to-r from-rosewood to-slate-50/60 transition-transform duration-1000 group-hover:translate-x-3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
