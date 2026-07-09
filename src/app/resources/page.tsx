import ResourcesPage from "@/components/sections/resources/ResourcesPage";
import type { Metadata } from "next";

// No metadata title that advertises the page in search results
export const metadata: Metadata = {
  title: "Resources | Refactrd",
  description: "Free playbooks, templates, and frameworks from Refactrd's AI engineering practice.",
  robots: "noindex", // Hidden from search — direct link only
};

export default function Page() {
  return <ResourcesPage />;
}