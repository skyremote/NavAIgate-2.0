import type { BaseModuleProps } from './types';
import { emailColors } from './types';

interface SpacerData {
  height: number;
  bgColor: string;
}

interface Props extends BaseModuleProps {
  data: SpacerData;
}

export const defaultSpacerData: SpacerData = {
  height: 30,
  bgColor: emailColors.white,
};

export function SpacerModule({ data, isEditing, onUpdate, id }: Props) {
  const { height, bgColor } = data;

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        <label>
          <span className="text-xs text-gray-400">Height: {height}px</span>
          <input
            type="range"
            min="10"
            max="100"
            value={height}
            onChange={(e) => onUpdate(id, { ...data, height: Number(e.target.value) })}
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="text-xs text-gray-400">Background</span>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => onUpdate(id, { ...data, bgColor: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </label>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: `${height}px`,
      }}
    />
  );
}

export function spacerToHTML(data: SpacerData): string {
  const { height, bgColor } = data;
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor};">
  <tr>
    <td style="height: ${height}px; font-size: 0; line-height: 0;">&nbsp;</td>
  </tr>
</table>`;
}
