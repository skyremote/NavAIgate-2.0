import type { APIRoute } from 'astro';
// @ts-ignore - raw import of HTML file
import proposalHtml from '../../data/kajima-proposal.html?raw';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const COOKIE_NAME = 'navaigate_rfp_access';
  const hasAccess = cookies.get(COOKIE_NAME)?.value === 'granted';

  if (!hasAccess) {
    return new Response('Unauthorized', { status: 401 });
  }

  return new Response(proposalHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  });
};
