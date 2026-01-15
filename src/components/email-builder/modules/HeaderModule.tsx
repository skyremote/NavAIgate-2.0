import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface HeaderData {
  companyName: string;
  tagline?: string;
  logoUrl?: string;
  bgColor: string;
  textColor: string;
}

interface Props extends BaseModuleProps {
  data: HeaderData;
}

export const defaultHeaderData: HeaderData = {
  companyName: 'Your Company',
  tagline: '',
  logoUrl: '',
  bgColor: emailColors.primary,
  textColor: emailColors.white,
};

export function HeaderModule({ data, isEditing, onUpdate, id }: Props) {
  const { companyName, tagline, bgColor, textColor } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <input
          type="text"
          value={companyName}
          onChange={(e) => onUpdate(id, { ...data, companyName: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Company Name"
        />
        <input
          type="text"
          value={tagline || ''}
          onChange={(e) => onUpdate(id, { ...data, tagline: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Tagline (optional)"
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
        padding: '30px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{companyName}</div>
      {tagline && (
        <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.9 }}>{tagline}</div>
      )}
    </div>
  );
}

export function headerToHTML(data: HeaderData): string {
  const { companyName, tagline, bgColor, textColor } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td align="center" style="padding: 30px 20px;">
      <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 28px; font-weight: bold; color: ${textColor};">${companyName}</h1>
      ${tagline ? `<p style="margin: 8px 0 0 0; font-family: Arial, sans-serif; font-size: 14px; color: ${textColor}; opacity: 0.9;">${tagline}</p>` : ''}
    </td>
  </tr>
</table>`;
}
