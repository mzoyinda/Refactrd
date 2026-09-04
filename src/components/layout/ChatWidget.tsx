"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const SHARE_ID =
  "d7b62b/c5a293c4-beab-40b7-9f64-1863e7639125/f9dc31e5-8df1-429b-9db6-70c2d29603b5";

/**
 * Widget appearance, as a query string. Keep it on one line — Relevance parses
 * it verbatim, and repeated `starting_message_prompts` keys are intentional
 * (each one becomes a suggested prompt).
 */
const SHARE_STYLES = [
  "starting_message_prompts=Where+can+AI+create+the+most+impact+in+our+business%3F",
  "starting_message_prompts=We+have+a+workflow+that+is+slow+and+manual.+Can+you+help%3F",
  "starting_message_prompts=We+want+to+use+AI+but+don%27t+know+where+to+start.",
  "hide_tool_steps=true",
  "hide_file_uploads=true",
  "hide_conversation_list=false",
  "bubble_style=icon",
  "primary_color=%23a2d2ff",
  "bubble_icon=sparkles",
  "input_placeholder_text=Tell+us+about+your+challenge...",
  "hide_logo=true",
  "hide_description=false",
].join("&");

/**
 * Routes whose own UI already occupies the bottom-right on small screens.
 * The bubble stays visible there, it just sits higher up.
 */
const LIFTED_ROUTES = ["/assessment"];

/** Clears the assessment's fixed mobile action bar (~76px tall) plus a gap. */
const LIFTED_OFFSET_PX = 88;

export default function ChatWidget() {
  const pathname = usePathname();

  const needsLift = LIFTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <>
      {/*
        The widget mounts itself on document.body at bottom:20px with a
        near-max z-index, so it sits on top of the assessment's sticky Back /
        Next bar on mobile. Nothing can out-stack it, so move it instead.
        The rule unmounts on navigation away, restoring the default position.
      */}
      {needsLift && (
        <style>{`
          @media (max-width: 639px) {
            .relevanceai-chat-bubble-container {
              bottom: ${LIFTED_OFFSET_PX}px !important;
            }
          }
        `}</style>
      )}

      <Script
        id="relevanceai-chat-bubble"
        src="https://app.relevanceai.com/embed/chat-bubble.js"
        strategy="lazyOnload"
        data-relevanceai-share-id={SHARE_ID}
        data-share-styles={SHARE_STYLES}
      />
    </>
  );
}
