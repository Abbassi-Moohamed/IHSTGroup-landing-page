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
    <section data-id="clubs" className="-mt-[90vh] bg-slate-950/90 px-6 py-16 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-rosewood/80">
              {CLUBS_HEADER_TAG}
            </p>
            <h2 className="text-4xl font-semibold text-white sm:text-5xl">
              {CLUBS_HEADER_TITLE}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              {CLUBS_HEADER_DESCRIPTION}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-navy/80 p-6 shadow-soft backdrop-blur transition duration-500 hover:-translate-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-rosewood/80">
              {CLUBS_FEATURED.tag}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              {CLUBS_FEATURED.title}
            </h3>
            <p className="mt-3 text-slate-300">
              {CLUBS_FEATURED.description}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CLUBS.map((item, index) => (
            <Card key={item.title} variant="feature" className="group">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-3xl"
                  style={{ backgroundColor: `${item.accent}20` }}
                >
                  <span className="text-lg font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-900">
                <div className="h-full rounded-full bg-gradient-to-r from-rosewood to-slate-50/60 transition-transform duration-1000 group-hover:translate-x-3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
