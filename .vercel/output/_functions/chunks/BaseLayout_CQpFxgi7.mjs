import { e as createAstro, f as createComponent, r as renderTemplate, n as renderSlot, o as renderHead, h as addAttribute } from './astro/server_FErFH_S7.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://navaigate.dev");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "AI Consultancy helping enterprises navigate the AI landscape. From strategy to implementation, we build solutions that transform businesses.",
    image = "/og-image.png",
    canonicalURL = Astro2.url.href
  } = Astro2.props;
  const siteTitle = title ? `${title} | NavAIgate` : "NavAIgate - AI Consultancy";
  const imageURL = new URL(image, Astro2.site).href;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- SEO Meta Tags --><title>', '</title><meta name="description"', '><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"><!-- JSON-LD Structured Data --><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "Organization",\n        "name": "NavAIgate",\n        "url": "https://navaigate.dev",\n        "logo": "https://navaigate.dev/favicon.svg",\n        "description": "AI Consultancy helping enterprises navigate the AI landscape. From strategy to implementation, we build solutions that transform businesses.",\n        "founder": {\n          "@type": "Person",\n          "name": "Daniel",\n          "jobTitle": "Founder"\n        },\n        "sameAs": [\n          "https://bluplai.com"\n        ],\n        "contactPoint": {\n          "@type": "ContactPoint",\n          "email": "dw@navaigate.dev",\n          "contactType": "sales"\n        }\n      }\n    <\/script><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "WebSite",\n        "name": "NavAIgate",\n        "url": "https://navaigate.dev"\n      }\n    <\/script>', '</head> <body class="min-h-screen bg-gray-900 text-white overflow-x-hidden font-poppins"> ', " </body></html>"])), siteTitle, addAttribute(description, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(siteTitle, "content"), addAttribute(description, "content"), addAttribute(imageURL, "content"), addAttribute(canonicalURL, "content"), addAttribute(siteTitle, "content"), addAttribute(description, "content"), addAttribute(imageURL, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
