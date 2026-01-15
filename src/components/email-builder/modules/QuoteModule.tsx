import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface QuoteData {
  quote: string;
  author: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
}

interface Props extends BaseModuleProps {
  data: QuoteData;
}

export const defaultQuoteData: QuoteData = {
  quote: 'This is a highlighted quote or callout that draws attention to important information.',
  author: '',
  accentColor: emailColors.primary,
  bgColor: '#f0f4ff',
  textColor: emailColors.text,
};

export function QuoteModule({ data, isEditing, onUpdate, id }: Props) {
  const { quote, author, accentColor, bgColor, textColor } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <textarea
          value={quote}
          onChange={(e) => onUpdate(id, { ...data, quote: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white resize-none"
          placeholder="Quote or callout text..."
          rows={3}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => onUpdate(id, { ...data, author: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Author (optional)"
        />
        <div className="flex gap-3">
          <label className="flex-1">
            <span className="text-xs text-gray-400">Accent</span>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => onUpdate(id, { ...data, accentColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </label>
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
            <span className="text-xs text-gray-400">Text</span>
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
    <div style={{ padding: '20px 30px', backgroundColor: emailColors.white }}>
      <div
        style={{
          backgroundColor: bgColor,
          borderLeft: `4px solid ${accentColor}`,
          padding: '20px 25px',
          borderRadius: '0 8px 8px 0',
        }}
      >
        <p style={{ color: textColor, fontSize: '16px', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
          "{quote}"
        </p>
        {author && (
          <p style={{ color: accentColor, fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>
            — {author}
          </p>
        )}
      </div>
    </div>
  );
}

export function quoteToHTML(data: QuoteData): string {
  const { quote, author, accentColor, bgColor, textColor } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${emailColors.white};">
  <tr>
    <td style="padding: 20px 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor}; border-left: 4px solid ${accentColor}; border-radius: 0 8px 8px 0;">
        <tr>
          <td style="padding: 20px 25px;">
            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: ${textColor}; font-style: italic;">"${quote}"</p>
            ${author ? `<p style="margin: 10px 0 0 0; font-family: Arial, sans-serif; font-size: 14px; color: ${accentColor}; font-weight: bold;">— ${author}</p>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
