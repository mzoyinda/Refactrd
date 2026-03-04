import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getJobBySlug, getAllJobSlugs } from "@/data/jobs";
import Header from "@/components/layout/Header";
import JobDescription from "@/components/sections/careers/JobDescription";
import Footer from "@/components/layout/Footer";

// Generate static params for all jobs
export async function generateStaticParams() {
  const slugs = getAllJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = getJobBySlug(params.slug);

  if (!job) {
    return {
      title: "Job Not Found | Refactrd Careers",
    };
  }

  return {
    title: `${job.title} | Careers at Refactrd`,
    description: job.shortDescription,
    keywords: [
      job.title.toLowerCase(),
      job.department.toLowerCase(),
      "careers",
      "jobs",
      "refactrd",
    ],
    openGraph: {
      title: `${job.title} at Refactrd`,
      description: job.shortDescription,
      type: "website",
    },
  };
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />
      <JobDescription job={job} />
      <Footer />
    </main>
  );
}