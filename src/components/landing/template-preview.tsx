"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Template {
  name: string;
  description: string;
  gradient: string;
  accent: string;
}

const templateCategories: Record<string, Template[]> = {
  professional: [
    { name: "Classic", description: "Time-tested layout with clean sections", gradient: "from-slate-600 to-slate-800", accent: "bg-slate-100" },
    { name: "Executive", description: "Polished design for senior roles", gradient: "from-zinc-700 to-zinc-900", accent: "bg-zinc-100" },
    { name: "Corporate", description: "Structured and business-ready", gradient: "from-gray-600 to-gray-800", accent: "bg-gray-100" },
    { name: "Formal", description: "Traditional and elegant format", gradient: "from-stone-600 to-stone-800", accent: "bg-stone-100" },
    { name: "Traditional", description: "Proven layout hiring managers love", gradient: "from-neutral-600 to-neutral-800", accent: "bg-neutral-100" },
  ],
  modern: [
    { name: "Sleek", description: "Contemporary with clean lines", gradient: "from-blue-500 to-blue-700", accent: "bg-blue-50" },
    { name: "Gradient", description: "Dynamic and eye-catching design", gradient: "from-indigo-500 to-purple-600", accent: "bg-indigo-50" },
    { name: "Sidebar", description: "Two-column modern layout", gradient: "from-cyan-500 to-blue-600", accent: "bg-cyan-50" },
    { name: "Timeline", description: "Visual career progression", gradient: "from-teal-500 to-emerald-600", accent: "bg-teal-50" },
    { name: "Grid", description: "Organized grid-based sections", gradient: "from-sky-500 to-indigo-600", accent: "bg-sky-50" },
  ],
  creative: [
    { name: "Vibrant", description: "Bold colors and strong presence", gradient: "from-rose-500 to-pink-600", accent: "bg-rose-50" },
    { name: "Artistic", description: "Expressive design for creatives", gradient: "from-fuchsia-500 to-purple-600", accent: "bg-fuchsia-50" },
    { name: "Bold", description: "Stand out with impact", gradient: "from-orange-500 to-red-600", accent: "bg-orange-50" },
    { name: "Asymmetric", description: "Unique unbalanced layout", gradient: "from-violet-500 to-indigo-600", accent: "bg-violet-50" },
    { name: "Portfolio", description: "Showcase work and achievements", gradient: "from-pink-500 to-rose-600", accent: "bg-pink-50" },
  ],
  minimal: [
    { name: "Clean", description: "Nothing but the essentials", gradient: "from-gray-400 to-gray-600", accent: "bg-gray-50" },
    { name: "Whitespace", description: "Breathable and elegant", gradient: "from-slate-400 to-slate-600", accent: "bg-slate-50" },
    { name: "Simple", description: "Straightforward and effective", gradient: "from-zinc-400 to-zinc-600", accent: "bg-zinc-50" },
    { name: "Elegant", description: "Subtle sophistication", gradient: "from-stone-400 to-stone-600", accent: "bg-stone-50" },
    { name: "Refined", description: "Polished minimalist design", gradient: "from-neutral-400 to-neutral-600", accent: "bg-neutral-50" },
  ],
};

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-primary/5">
      {/* Preview area */}
      <div className={`relative h-48 bg-gradient-to-br ${template.gradient} p-4 sm:h-56`}>
        {/* Mini resume mockup inside the card */}
        <div className="mx-auto h-full w-full max-w-[140px] rounded-sm bg-white/95 p-3 shadow-lg transition-transform duration-300 group-hover:scale-105">
          {/* Header */}
          <div className="mb-2 space-y-1">
            <div className="h-2 w-3/4 rounded-sm bg-gray-300" />
            <div className="h-1.5 w-1/2 rounded-sm bg-gray-200" />
          </div>
          <div className="mb-2 h-px bg-gray-200" />
          {/* Content lines */}
          <div className="space-y-1.5">
            <div className="h-1.5 w-1/3 rounded-sm bg-gray-300" />
            <div className="h-1 w-full rounded-sm bg-gray-100" />
            <div className="h-1 w-5/6 rounded-sm bg-gray-100" />
            <div className="h-1 w-4/6 rounded-sm bg-gray-100" />
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-1/4 rounded-sm bg-gray-300" />
            <div className="h-1 w-full rounded-sm bg-gray-100" />
            <div className="h-1 w-3/4 rounded-sm bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold">{template.name}</h3>
        <p className="mt-1 flex-1 text-xs text-muted-foreground">{template.description}</p>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="mt-3 w-full text-xs opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <Link href="/login">Use Template</Link>
        </Button>
      </div>
    </div>
  );
}

export function TemplatePreview() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/70">
            Templates
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose From 50 Professional Templates
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every template is crafted to pass ATS systems and impress hiring managers.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="professional" className="mt-12">
          <div className="flex justify-center">
            <TabsList className="h-auto flex-wrap gap-1 bg-muted/50 p-1">
              <TabsTrigger value="professional" className="px-4 py-2 text-sm">
                Professional
              </TabsTrigger>
              <TabsTrigger value="modern" className="px-4 py-2 text-sm">
                Modern
              </TabsTrigger>
              <TabsTrigger value="creative" className="px-4 py-2 text-sm">
                Creative
              </TabsTrigger>
              <TabsTrigger value="minimal" className="px-4 py-2 text-sm">
                Minimal
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(templateCategories).map(([category, templates]) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
                {templates.map((template) => (
                  <TemplateCard key={template.name} template={template} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild className="group/btn">
            <Link href="/templates">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
