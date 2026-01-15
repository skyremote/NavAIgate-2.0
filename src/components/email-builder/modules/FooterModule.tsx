import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface FooterData {
  companyName: string;
  address: string;
  email: string;
  unsubscribeText: string;
  bgColor: string;
  textColor: string;
}

interface Props extends BaseModuleProps {
  data: FooterData;
}

export const defaultFooterData: FooterData = {
  companyName: 'Your Company',
  address: '123 Business St, City, Country',
  email: 'contact@example.com',
  unsubscribeText: 'Unsubscribe from these emails',
  bgColor: emailColors.dark,
  textColor: '#94a3b8',
};

export function FooterModule({ data, isEditing, onUpdate, id }: Props) {
  const { companyName, address, email, unsubscribeText, bgColor, textColor } = data;

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
          value={address}
          onChange={(e) => onUpdate(id, { ...data, address: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Address"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => onUpdate(id, { ...data, email: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Contact Email"
        />
        <input
          type="text"
          value={unsubscribeText}
          onChange={(e) => onUpdate(id, { ...data, unsubscribeText: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Unsubscribe Text"
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
        padding: '30px',
        textAlign: 'center',
      }}
    >
      <p style={{ color: textColor, fontSize: '14px', margin: '0 0 10px 0', fontWeight: 'bold' }}>
        {companyName}
      </p>
      <p style={{ color: textColor, fontSize: '12px', margin: '0 0 5px 0', opacity: 0.8 }}>
        {address}
      </p>
      <p style={{ color: textColor, fontSize: '12px', margin: '0 0 15px 0' }}>
        <a href={`mailto:${email}`} style={{ color: textColor }}>{email}</a>
      </p>
      <p style={{ fontSize: '11px', margin: 0 }}>
        <a href="#" style={{ color: textColor, opacity: 0.7 }}>{unsubscribeText}</a>
      </p>
    </div>
  );
}

export function footerToHTML(data: FooterData): string {
  const { companyName, address, email, unsubscribeText, bgColor, textColor } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td align="center" style="padding: 30px;">
      <p style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 14px; color: ${textColor}; font-weight: bold;">${companyName}</p>
      <p style="margin: 0 0 5px 0; font-family: Arial, sans-serif; font-size: 12px; color: ${textColor}; opacity: 0.8;">${address}</p>
      <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif; font-size: 12px;"><a href="mailto:${email}" style="color: ${textColor};">${email}</a></p>
      <p style="margin: 0; font-family: Arial, sans-serif; font-size: 11px;"><a href="#" style="color: ${textColor}; opacity: 0.7;">${unsubscribeText}</a></p>
    </td>
  </tr>
</table>`;
}
