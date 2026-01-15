import { useState, useRef } from 'react';
import { Upload, Link, X } from 'lucide-react';
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
  imageUrl: '',
  altText: 'Image description',
  caption: '',
  bgColor: emailColors.white,
  width: 100,
};

export function ImageModule({ data, isEditing, onUpdate, id }: Props) {
  const { imageUrl, altText, caption, bgColor, width } = data;
  const [inputMode, setInputMode] = useState<'upload' | 'url'>(
    imageUrl.startsWith('data:') ? 'upload' : 'url'
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdate) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB for base64 embedding)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2MB');
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onUpdate(id, { ...data, imageUrl: base64, altText: altText || file.name });
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('Failed to read file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      alert('Failed to upload image');
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    if (onUpdate) {
      onUpdate(id, { ...data, imageUrl: '' });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isEditing && onUpdate) {
    return (
      <div className="space-y-3">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setInputMode('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
              inputMode === 'upload'
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            <Upload size={16} />
            Upload
          </button>
          <button
            onClick={() => setInputMode('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
              inputMode === 'url'
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            <Link size={16} />
            URL
          </button>
        </div>

        {/* Upload Mode */}
        {inputMode === 'upload' && (
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id={`image-upload-${id}`}
            />
            <label
              htmlFor={`image-upload-${id}`}
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isUploading
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 hover:border-purple-500 hover:bg-gray-800/50'
              }`}
            >
              {isUploading ? (
                <span className="text-purple-400">Uploading...</span>
              ) : imageUrl && imageUrl.startsWith('data:') ? (
                <div className="relative w-full h-full p-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-contain rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      clearImage();
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto mb-2 text-gray-500" size={24} />
                  <span className="text-sm text-gray-400">Click to upload image</span>
                  <span className="block text-xs text-gray-500 mt-1">Max 2MB</span>
                </div>
              )}
            </label>
          </div>
        )}

        {/* URL Mode */}
        {inputMode === 'url' && (
          <input
            type="url"
            value={imageUrl.startsWith('data:') ? '' : imageUrl}
            onChange={(e) => onUpdate(id, { ...data, imageUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            placeholder="https://example.com/image.jpg"
          />
        )}

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

  // Show placeholder if no image
  if (!imageUrl) {
    return (
      <div
        style={{
          backgroundColor: bgColor,
          padding: '40px 30px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '30px',
            color: '#999',
          }}
        >
          <Upload size={32} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
          <p style={{ margin: 0, fontSize: '14px' }}>Click edit to add an image</p>
        </div>
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

  // Skip empty images in HTML output
  if (!imageUrl) {
    return '';
  }

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
