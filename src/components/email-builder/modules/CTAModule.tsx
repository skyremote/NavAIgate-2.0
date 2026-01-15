import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface CTAData {
  buttonText: string;
  buttonUrl: string;
  buttonColor: string;
  buttonTextColor: string;
  bgColor: string;
  align: 'left' | 'center' | 'right';
}

interface Props extends BaseModuleProps {
  data: CTAData;
}

export const defaultCTAData: CTAData = {
  buttonText: 'Get Started',
  buttonUrl: 'https://example.com',
  buttonColor: emailColors.primary,
  buttonTextColor: emailColors.white,
  bgColor: emailColors.white,
  align: 'center',
};

export function CTAModule({ data, isEditing, onUpdate, id }: Props) {
  const { buttonText, buttonUrl, buttonColor, buttonTextColor, bgColor, align } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <input
          type="text"
          value={buttonText}
          onChange={(e) => onUpdate(id, { ...data, buttonText: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Button Text"
        />
        <input
          type="url"
          value={buttonUrl}
          onChange={(e) => onUpdate(id, { ...data, buttonUrl: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Button URL"
        />
        <div className="flex gap-3">
          <label className="flex-1">
            <span className="text-xs text-gray-400">Button Color</span>
            <input
              type="color"
              value={buttonColor}
              onChange={(e) => onUpdate(id, { ...data, buttonColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </label>
          <label className="flex-1">
            <span className="text-xs text-gray-400">Text Color</span>
            <input
              type="color"
              value={buttonTextColor}
              onChange={(e) => onUpdate(id, { ...data, buttonTextColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </label>
        </div>
        <select
          value={align}
          onChange={(e) => onUpdate(id, { ...data, align: e.target.value as 'left' | 'center' | 'right' })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
        >
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
        </select>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '25px 30px',
        textAlign: align,
      }}
    >
      <a
        href={buttonUrl}
        style={{
          display: 'inline-block',
          backgroundColor: buttonColor,
          color: buttonTextColor,
          padding: '14px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        {buttonText}
      </a>
    </div>
  );
}

export function ctaToHTML(data: CTAData): string {
  const { buttonText, buttonUrl, buttonColor, buttonTextColor, bgColor, align } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td align="${align}" style="padding: 25px 30px;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${buttonUrl}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="10%" strokecolor="${buttonColor}" fillcolor="${buttonColor}">
        <w:anchorlock/>
        <center style="color:${buttonTextColor};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${buttonText}</center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="${buttonUrl}" style="display: inline-block; background-color: ${buttonColor}; color: ${buttonTextColor}; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-family: Arial, sans-serif; font-weight: bold; font-size: 16px;">${buttonText}</a>
      <!--<![endif]-->
    </td>
  </tr>
</table>`;
}
