import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface ListData {
  items: string[];
  listType: 'bullet' | 'number';
  textColor: string;
  bgColor: string;
}

interface Props extends BaseModuleProps {
  data: ListData;
}

export const defaultListData: ListData = {
  items: ['First item', 'Second item', 'Third item'],
  listType: 'bullet',
  textColor: emailColors.text,
  bgColor: emailColors.white,
};

export function ListModule({ data, isEditing, onUpdate, id }: Props) {
  const { items, listType, textColor, bgColor } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <textarea
          value={items.join('\n')}
          onChange={(e) => onUpdate(id, { ...data, items: e.target.value.split('\n').filter(Boolean) })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white resize-none"
          placeholder="One item per line..."
          rows={5}
        />
        <select
          value={listType}
          onChange={(e) => onUpdate(id, { ...data, listType: e.target.value as 'bullet' | 'number' })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
        >
          <option value="bullet">Bullet Points</option>
          <option value="number">Numbered List</option>
        </select>
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

  const ListTag = listType === 'number' ? 'ol' : 'ul';

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '20px 30px',
      }}
    >
      <ListTag
        style={{
          color: textColor,
          fontSize: '16px',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '25px',
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}

export function listToHTML(data: ListData): string {
  const { items, listType, textColor, bgColor } = data;
  const tag = listType === 'number' ? 'ol' : 'ul';
  const itemsHtml = items.map(item =>
    `<li style="margin-bottom: 8px; font-family: Arial, sans-serif; font-size: 16px; color: ${textColor};">${item}</li>`
  ).join('');

  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td style="padding: 20px 30px;">
      <${tag} style="margin: 0; padding-left: 25px; line-height: 1.8;">
        ${itemsHtml}
      </${tag}>
    </td>
  </tr>
</table>`;
}
