import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsightDetail from "@/components/sections/InsightDetail";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const cmsServer = createClient(
  process.env.NEXT_PUBLIC_CMS_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_CMS_SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await cmsServer
      .from("blogs")
      .select("title, excerpt, meta_title, meta_description")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!data) return { title: "Insight | Refactrd", description: "AI engineering insights from Refactrd." };

    const title = data.meta_title || `${data.title} | Refactrd`;
    const description = data.meta_description || data.excerpt || "";

    return {
      title,
      description,
      openGraph: { title, description, type: "article", siteName: "Refactrd" },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return { title: "Insight | Refactrd", description: "AI engineering insights from Refactrd." };
  }
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="min-h-screen">
      <Header />
      <InsightDetail slug={slug} />
      <Footer />
    </main>
  );
}