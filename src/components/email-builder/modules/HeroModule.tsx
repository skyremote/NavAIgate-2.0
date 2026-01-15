import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface HeroData {
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
}

interface Props extends BaseModuleProps {
  data: HeroData;
}

export const defaultHeroData: HeroData = {
  title: 'Welcome to Our Newsletter',
  subtitle: 'Stay updated with the latest news and insights',
  bgColor: emailColors.dark,
  textColor: emailColors.white,
};

export function HeroModule({ data, isEditing, onUpdate, id }: Props) {
  const { title, subtitle, bgColor, textColor } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => onUpdate(id, { ...data, title: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-lg font-semibold"
          placeholder="Hero Title"
        />
        <textarea
          value={subtitle}
          onChange={(e) => onUpdate(id, { ...data, subtitle: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white resize-none"
          placeholder="Subtitle"
          rows={2}
        />
        <div className="flex gap-3">
          <label className="flex-1">
            <span className="text-xs text-gray-400">Background</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => onUpdate(id, { ...data, bgColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </label>
          <label className="flex-1">
            <span className="text-xs text-gray-400">Text Color</span>
            <input
              type="color"
              value={textColor}
              onChange={(e) => onUpdate(id, { ...data, textColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: '50px 30px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{title}</h1>
      <p style={{ fontSize: '16px', marginTop: '15px', opacity: 0.9 }}>{subtitle}</p>
    </div>
  );
}

export function heroToHTML(data: HeroData): string {
  const { title, subtitle, bgColor, textColor } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td align="center" style="padding: 50px 30px;">
      <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 32px; font-weight: bold; color: ${textColor};">${title}</h1>
      <p style="margin: 15px 0 0 0; font-family: Arial, sans-serif; font-size: 16px; color: ${textColor}; opacity: 0.9;">${subtitle}</p>
    </td>
  </tr>
</table>`;
}
