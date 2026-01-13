/* empty css                                       */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_FErFH_S7.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CQpFxgi7.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Callback = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Authenticating...", "description": "Completing authentication" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center"> <div class="text-center"> <div class="w-16 h-16 mx-auto mb-4"> <svg class="w-full h-full animate-spin text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 12a9 9 0 1 1-6.219-8.56"></path> </svg> </div> <h2 class="text-xl font-semibold text-white mb-2">Completing sign in...</h2> <p class="text-gray-400">Please wait while we authenticate you.</p> </div> </div> ${renderScript($$result2, "/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/callback.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/callback.astro", void 0);

const $$file = "/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/callback.astro";
const $$url = "/auth/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
