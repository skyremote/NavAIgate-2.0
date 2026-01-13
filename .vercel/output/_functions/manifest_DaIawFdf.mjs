import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_FErFH_S7.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CZL3c0Cb.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/","cacheDir":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/node_modules/.astro/","outDir":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/dist/","srcDir":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/src/","publicDir":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/public/","buildClientDir":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/dist/client/","buildServerDir":"file:///Users/Sky/Documents/GitHub/NavAIgate%202.0/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"auth/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"auth/reset-password/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/reset-password","isIndex":false,"type":"page","pattern":"^\\/auth\\/reset-password\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"reset-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/reset-password.astro","pathname":"/auth/reset-password","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"auth/signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/signup","isIndex":false,"type":"page","pattern":"^\\/auth\\/signup\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/signup.astro","pathname":"/auth/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/callback.CgOWECsi.css"}],"routeData":{"route":"/auth/callback","isIndex":false,"type":"page","pattern":"^\\/auth\\/callback\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/callback.astro","pathname":"/auth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/callback.CgOWECsi.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://navaigate.dev","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/callback.astro",{"propagation":"none","containsHead":true}],["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/login.astro",{"propagation":"none","containsHead":true}],["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/reset-password.astro",{"propagation":"none","containsHead":true}],["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/signup.astro",{"propagation":"none","containsHead":true}],["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/auth/callback@_@astro":"pages/auth/callback.astro.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/auth/reset-password@_@astro":"pages/auth/reset-password.astro.mjs","\u0000@astro-page:src/pages/auth/signup@_@astro":"pages/auth/signup.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/lib/auth.ts":"_astro/auth.CDJVxmqK.js","\u0000@astrojs-manifest":"manifest_DaIawFdf.mjs","/Users/Sky/Documents/GitHub/NavAIgate 2.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D_mGYz3o.mjs","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/auth/LoginForm":"_astro/LoginForm.CtdF5CvF.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/auth/SignupForm":"_astro/SignupForm.BTlFMr78.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/Footer":"_astro/Footer.-5ulCQ7V.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/callback.astro?astro&type=script&index=0&lang.ts":"_astro/callback.astro_astro_type_script_index_0_lang.BHKAFEku.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/reset-password.astro?astro&type=script&index=0&lang.ts":"_astro/reset-password.astro_astro_type_script_index_0_lang.CbiPhvfV.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts":"_astro/dashboard.astro_astro_type_script_index_0_lang.IExrHHy2.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/ClientLogos":"_astro/ClientLogos.CtnXpbGD.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/AboutSection":"_astro/AboutSection.8yZBOPcx.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/AppsSection":"_astro/AppsSection.CI3b-F4d.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/ContactSection":"_astro/ContactSection.DtvhHK0x.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/NavBar":"_astro/NavBar.DjwrMQ_q.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/EntepriseSection":"_astro/EntepriseSection.D14KJnRT.js","@astrojs/react/client.js":"_astro/client.nc8uITnr.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/Hero":"_astro/Hero.BL5vsV6R.js","/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/components/auth/UserMenu":"_astro/UserMenu.X0vczpRz.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/Sky/Documents/GitHub/NavAIgate 2.0/src/pages/auth/callback.astro?astro&type=script&index=0&lang.ts","async function n(){{window.location.href=\"/auth/login?error=configuration\";return}}n();"]],"assets":["/_astro/callback.CgOWECsi.css","/robots.txt","/images/autodesk.svg","/images/bluplai-logo.png","/images/daniel.png","/logos/ComXo-Mastered-Logo.svg","/logos/NavAIgate.svg","/logos/autodesk.svg","/logos/katana.svg","/logos/matroschkasch.png","/_astro/AboutSection.8yZBOPcx.js","/_astro/AppsSection.CI3b-F4d.js","/_astro/Button.DY-lnZsT.js","/_astro/Card.B38ocYd4.js","/_astro/ClientLogos.CtnXpbGD.js","/_astro/ContactSection.DtvhHK0x.js","/_astro/EntepriseSection.D14KJnRT.js","/_astro/FloatingElements.UdynWo2U.js","/_astro/Footer.-5ulCQ7V.js","/_astro/GradientText.Dq8wBKxh.js","/_astro/Hero.BL5vsV6R.js","/_astro/LoginForm.CtdF5CvF.js","/_astro/NavBar.DjwrMQ_q.js","/_astro/SignupForm.BTlFMr78.js","/_astro/UserMenu.X0vczpRz.js","/_astro/auth.CDJVxmqK.js","/_astro/check-circle.DbDp-r6u.js","/_astro/chevron-down.9OK9mT3Q.js","/_astro/client.nc8uITnr.js","/_astro/createLucideIcon.haOcZxDw.js","/_astro/dashboard.astro_astro_type_script_index_0_lang.IExrHHy2.js","/_astro/index.DK-fsZOb.js","/_astro/index.DxWEhuCz.css","/_astro/jsx-runtime.ClP7wGfN.js","/_astro/loader-2.DZDihjp-.js","/_astro/lock.I42xD7R5.js","/_astro/mail.DGYVi2dc.js","/_astro/reset-password.astro_astro_type_script_index_0_lang.CbiPhvfV.js","/_astro/sparkles.BbxOZSnT.js","/_astro/user.BqMF8DsQ.js","/auth/login/index.html","/auth/reset-password/index.html","/auth/signup/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"4cp5rh8uHvNJBupLX1RKWb8ggQGtNt/tTUwBn8SV25Y="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
