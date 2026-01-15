import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface DividerData {
  lineColor: string;
  bgColor: string;
  thickness: number;
  width: number; // percentage
}

interface Props extends BaseModuleProps {
  data: DividerData;
}

export const defaultDividerData: DividerData = {
  lineColor: emailColors.border,
  bgColor: emailColors.white,
  thickness: 1,
  width: 100,
};

export function DividerModule({ data, isEditing, onUpdate, id }: Props) {
  const { lineColor, bgColor, thickness, width } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <div className="flex gap-3">
          <label className="flex-1">
            <span className="text-xs text-gray-400">Line Color</span>
            <input
              type="color"
              value={lineColor}
              onChange={(e) => onUpdate(id, { ...data, lineColor: e.target.value })}
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
        </div>
        <label>
          <span className="text-xs text-gray-400">Thickness: {thickness}px</span>
          <input
            type="range"
            min="1"
            max="5"
            value={thickness}
            onChange={(e) => onUpdate(id, { ...data, thickness: Number(e.target.value) })}
            className="w-full"
          />
        </label>
        <label>
          <span className="text-xs text-gray-400">Width: {width}%</span>
          <input
            type="range"
            min="20"
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
      <hr
        style={{
          border: 'none',
          borderTop: `${thickness}px solid ${lineColor}`,
          width: `${width}%`,
          margin: '0 auto',
        }}
      />
    </div>
  );
}

export function dividerToHTML(data: DividerData): string {
  const { lineColor, bgColor, thickness, width } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td align="center" style="padding: 20px 30px;">
      <table width="${width}%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-top: ${thickness}px solid ${lineColor}; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
