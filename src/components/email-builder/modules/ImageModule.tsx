import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface ImageData {
  imageUrl: string;
  altText: string;
  caption: string;
  bgColor: string;
  width: number; // percentage
}

interface Props extends BaseModuleProps {
  data: ImageData;
}

export const defaultImageData: ImageData = {
  imageUrl: 'https://via.placeholder.com/600x300',
  altText: 'Image description',
  caption: '',
  bgColor: emailColors.white,
  width: 100,
};

export function ImageModule({ data, isEditing, onUpdate, id }: Props) {
  const { imageUrl, altText, caption, bgColor, width } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => onUpdate(id, { ...data, imageUrl: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Image URL"
        />
        <input
          type="text"
          value={altText}
          onChange={(e) => onUpdate(id, { ...data, altText: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Alt text (accessibility)"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => onUpdate(id, { ...data, caption: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Caption (optional)"
        />
        <label>
          <span className="text-xs text-gray-400">Width: {width}%</span>
          <input
            type="range"
            min="30"
            max="100"
            value={width}
            onChange={(e) => onUpdate(id, { ...data, width: Number(e.target.value) })}
            className="w-full"
          />
        </label>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '20px 30px',
        textAlign: 'center',
      }}
    >
      <img
        src={imageUrl}
        alt={altText}
        style={{
          maxWidth: `${width}%`,
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          borderRadius: '8px',
        }}
      />
      {caption && (
        <p style={{ fontSize: '14px', color: emailColors.muted, marginTop: '10px' }}>
          {caption}
        </p>
      )}
    </div>
  );
}

export function imageToHTML(data: ImageData): string {
  const { imageUrl, altText, caption, bgColor, width } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td align="center" style="padding: 20px 30px;">
      <img src="${imageUrl}" alt="${altText}" width="${width}%" style="max-width: ${width}%; height: auto; display: block; border-radius: 8px;" />
      ${caption ? `<p style="margin: 10px 0 0 0; font-family: Arial, sans-serif; font-size: 14px; color: ${emailColors.muted};">${caption}</p>` : ''}
    </td>
  </tr>
</table>`;
}
