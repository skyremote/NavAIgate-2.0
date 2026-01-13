import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BGsQjxeB.mjs';
import { manifest } from './manifest_DaIawFdf.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/auth/callback.astro.mjs');
const _page2 = () => import('./pages/auth/login.astro.mjs');
const _page3 = () => import('./pages/auth/reset-password.astro.mjs');
const _page4 = () => import('./pages/auth/signup.astro.mjs');
const _page5 = () => import('./pages/dashboard.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/auth/callback.astro", _page1],
    ["src/pages/auth/login.astro", _page2],
    ["src/pages/auth/reset-password.astro", _page3],
    ["src/pages/auth/signup.astro", _page4],
    ["src/pages/dashboard.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "38035c4b-300f-4187-8fb4-9abcec4b04b7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
