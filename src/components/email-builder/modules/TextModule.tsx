import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface TextData {
  content: string;
  textColor: string;
  bgColor: string;
}

interface Props extends BaseModuleProps {
  data: TextData;
}

export const defaultTextData: TextData = {
  content: 'Enter your text content here. This is a paragraph block that you can use to add detailed information to your email.',
  textColor: emailColors.text,
  bgColor: emailColors.white,
};

export function TextModule({ data, isEditing, onUpdate, id }: Props) {
  const { content, textColor, bgColor } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => onUpdate(id, { ...data, content: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white resize-none"
          placeholder="Enter your text..."
          rows={5}
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
        padding: '20px 30px',
      }}
    >
      <p
        style={{
          color: textColor,
          fontSize: '16px',
          lineHeight: '1.6',
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  );
}

export function textToHTML(data: TextData): string {
  const { content, textColor, bgColor } = data;
  const htmlContent = content.split('\n').map(p => `<p style="margin: 0 0 15px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: ${textColor};">${p}</p>`).join('');
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td style="padding: 20px 30px;">
      ${htmlContent}
    </td>
  </tr>
</table>`;
}
