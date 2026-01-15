// Import modules, HTML exporters, and default data
import { HeaderModule, headerToHTML, defaultHeaderData } from './HeaderModule';
import { HeroModule, heroToHTML, defaultHeroData } from './HeroModule';
import { TextModule, textToHTML, defaultTextData } from './TextModule';
import { CTAModule, ctaToHTML, defaultCTAData } from './CTAModule';
import { DividerModule, dividerToHTML, defaultDividerData } from './DividerModule';
import { ImageModule, imageToHTML, defaultImageData } from './ImageModule';
import { ListModule, listToHTML, defaultListData } from './ListModule';
import { QuoteModule, quoteToHTML, defaultQuoteData } from './QuoteModule';
import { FooterModule, footerToHTML, defaultFooterData } from './FooterModule';
import { SpacerModule, spacerToHTML, defaultSpacerData } from './SpacerModule';
import type { EmailModule } from './types';

// Re-export module components
export {
  HeaderModule,
  HeroModule,
  TextModule,
  CTAModule,
  DividerModule,
  ImageModule,
  ListModule,
  QuoteModule,
  FooterModule,
  SpacerModule,
};

// Re-export HTML generators
export {
  headerToHTML,
  heroToHTML,
  textToHTML,
  ctaToHTML,
  dividerToHTML,
  imageToHTML,
  listToHTML,
  quoteToHTML,
  footerToHTML,
  spacerToHTML,
};

// Re-export default data
export {
  defaultHeaderData,
  defaultHeroData,
  defaultTextData,
  defaultCTAData,
  defaultDividerData,
  defaultImageData,
  defaultListData,
  defaultQuoteData,
  defaultFooterData,
  defaultSpacerData,
};

// Types
export type { EmailModule, ModuleDefinition, BaseModuleProps } from './types';
export { emailColors } from './types';

// Module registry for the builder
export const moduleRegistry = [
  { type: 'header', label: 'Header', icon: '🏢', defaultData: { ...defaultHeaderData } },
  { type: 'hero', label: 'Hero', icon: '🎯', defaultData: { ...defaultHeroData } },
  { type: 'text', label: 'Text Block', icon: '📝', defaultData: { ...defaultTextData } },
  { type: 'cta', label: 'CTA Button', icon: '👆', defaultData: { ...defaultCTAData } },
  { type: 'divider', label: 'Divider', icon: '➖', defaultData: { ...defaultDividerData } },
  { type: 'image', label: 'Image', icon: '🖼️', defaultData: { ...defaultImageData } },
  { type: 'list', label: 'List', icon: '📋', defaultData: { ...defaultListData } },
  { type: 'quote', label: 'Quote', icon: '💬', defaultData: { ...defaultQuoteData } },
  { type: 'footer', label: 'Footer', icon: '📧', defaultData: { ...defaultFooterData } },
  { type: 'spacer', label: 'Spacer', icon: '↕️', defaultData: { ...defaultSpacerData } },
] as const;

// HTML export helper map
const htmlExporters: Record<string, (data: Record<string, unknown>) => string> = {
  header: headerToHTML as (data: Record<string, unknown>) => string,
  hero: heroToHTML as (data: Record<string, unknown>) => string,
  text: textToHTML as (data: Record<string, unknown>) => string,
  cta: ctaToHTML as (data: Record<string, unknown>) => string,
  divider: dividerToHTML as (data: Record<string, unknown>) => string,
  image: imageToHTML as (data: Record<string, unknown>) => string,
  list: listToHTML as (data: Record<string, unknown>) => string,
  quote: quoteToHTML as (data: Record<string, unknown>) => string,
  footer: footerToHTML as (data: Record<string, unknown>) => string,
  spacer: spacerToHTML as (data: Record<string, unknown>) => string,
};

export function exportEmailToHTML(modules: EmailModule[], title: string = 'Email'): string {
  const modulesHTML = modules.map(m => {
    const exporter = htmlExporters[m.type];
    return exporter ? exporter(m.data) : '';
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <center style="width: 100%; background-color: #f4f4f4;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width: 600px;">
    <tr>
    <td>
    <![endif]-->
    <table class="email-container" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <tr>
        <td>
${modulesHTML}
        </td>
      </tr>
    </table>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>`;
}
