// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import CaseStudyDetail from "@/components/sections/CaseStudyDetail";
// import type { Metadata } from "next";
// import { supabase } from "@/lib/supabase";

// interface Props {
//   params: { slug: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { data } = await supabase
//     .from("case_studies")
//     .select("title, excerpt, meta_title, meta_description")
//     .eq("slug", params.slug)
//     .single();

//   return {
//     title: data?.meta_title || `${data?.title} | Refactrd`,
//     description: data?.meta_description || data?.excerpt || "",
//   };
// }

// export default function CaseStudyPage({ params }: Props) {
//   return (
//     <main className="min-h-screen">
//       <Header />
//       <CaseStudyDetail slug={params.slug} />
//       <Footer />
//     </main>
//   );
// }


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudyDetail from "@/components/sections/CaseStudyDetail";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

// Dedicated server-side CMS client for metadata generation
const cmsServer = createClient(
  process.env.NEXT_PUBLIC_CMS_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_CMS_SUPABASE_ANON_KEY!
);

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await cmsServer
      .from("case_studies")
      .select("title, excerpt, meta_title, meta_description, client_name, industry")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();

    if (!data) {
      return {
        title: "Case Study | Refactrd",
        description: "AI engineering case studies from Refactrd.",
      };
    }

    const title = data.meta_title || `${data.title} | Refactrd`;
    const description = data.meta_description || data.excerpt || `How Refactrd helped ${data.client_name} with AI engineering.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        siteName: "Refactrd",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Case Study | Refactrd",
      description: "AI engineering case studies from Refactrd.",
    };
  }
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