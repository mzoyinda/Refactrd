import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudyDetail from "@/components/sections/CaseStudyDetail";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabase
    .from("case_studies")
    .select("title, excerpt, meta_title, meta_description")
    .eq("slug", params.slug)
    .single();

  return {
    title: data?.meta_title || `${data?.title} | Refactrd`,
    description: data?.meta_description || data?.excerpt || "",
  };
}

export default function CaseStudyPage({ params }: Props) {
  return (
    <main className="min-h-screen">
      <Header />
      <CaseStudyDetail slug={params.slug} />
      <Footer />
    </main>
  );
}