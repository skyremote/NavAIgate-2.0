import { useState } from 'react';
import { Trash2, GripVertical, Edit2, Check } from 'lucide-react';
import type { EmailModule } from './modules/types';
import {
  HeaderModule,
  HeroModule,
  TextModule,
  CTAModule,
  DividerModule,
  ImageModule,
  ListModule,
  QuoteModule,
  FooterModule,
  SpacerModule,
} from './modules';

interface Props {
  modules: EmailModule[];
  onUpdateModule: (id: string, data: Record<string, unknown>) => void;
  onDeleteModule: (id: string) => void;
  onReorderModules: (modules: EmailModule[]) => void;
  onDropNewModule: (type: string, index?: number) => void;
}

const moduleComponents: Record<string, React.ComponentType<{
  data: Record<string, unknown>;
  isEditing?: boolean;
  onUpdate?: (id: string, data: Record<string, unknown>) => void;
  id: string;
}>> = {
  header: HeaderModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  hero: HeroModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  text: TextModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  cta: CTAModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  divider: DividerModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  image: ImageModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  list: ListModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  quote: QuoteModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  footer: FooterModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
  spacer: SpacerModule as React.ComponentType<{ data: Record<string, unknown>; isEditing?: boolean; onUpdate?: (id: string, data: Record<string, unknown>) => void; id: string }>,
};

export function EmailCanvas({
  modules,
  onUpdateModule,
  onDeleteModule,
  onReorderModules,
  onDropNewModule,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('reorderIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const isNewModule = e.dataTransfer.types.includes('moduletype');
    const isReorder = e.dataTransfer.types.includes('reorderindex');

    if (isNewModule || isReorder) {
      setDropIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDropIndex(null);

    const moduleType = e.dataTransfer.getData('moduleType');
    const reorderIndex = e.dataTransfer.getData('reorderIndex');

    if (moduleType) {
      // New module being added
      onDropNewModule(moduleType, targetIndex);
    } else if (reorderIndex !== '') {
      // Reordering existing modules
      const fromIndex = parseInt(reorderIndex, 10);
      if (fromIndex !== targetIndex) {
        const newModules = [...modules];
        const [movedModule] = newModules.splice(fromIndex, 1);
        newModules.splice(targetIndex, 0, movedModule);
        onReorderModules(newModules);
      }
    }

    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropIndex(null);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const moduleType = e.dataTransfer.getData('moduleType');
    if (moduleType) {
      onDropNewModule(moduleType);
    }
    setDropIndex(null);
  };

  if (modules.length === 0) {
    return (
      <div
        className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center bg-gray-800/20"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleCanvasDrop}
      >
        <div className="text-gray-500">
          <p className="text-lg mb-2">Drop modules here</p>
          <p className="text-sm">or click modules in the palette to add them</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-0 bg-white rounded-xl overflow-hidden shadow-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleCanvasDrop}
    >
      {modules.map((module, index) => {
        const ModuleComponent = moduleComponents[module.type];
        const isEditing = editingId === module.id;

        return (
          <div
            key={module.id}
            draggable={!isEditing}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative group ${
              draggedIndex === index ? 'opacity-50' : ''
            } ${dropIndex === index ? 'ring-2 ring-purple-500' : ''}`}
          >
            {/* Module Controls */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
              <button
                className="p-1.5 rounded bg-gray-800 text-gray-400 hover:text-white cursor-grab active:cursor-grabbing"
                title="Drag to reorder"
              >
                <GripVertical size={16} />
              </button>
              <button
                onClick={() => setEditingId(isEditing ? null : module.id)}
                className={`p-1.5 rounded ${isEditing ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                title={isEditing ? 'Done editing' : 'Edit module'}
              >
                {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
              </button>
              <button
                onClick={() => onDeleteModule(module.id)}
                className="p-1.5 rounded bg-gray-800 text-gray-400 hover:text-red-400"
                title="Delete module"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Module Content */}
            {isEditing ? (
              <div className="p-4 bg-gray-900 border-2 border-purple-500">
                <ModuleComponent
                  data={module.data}
                  isEditing
                  onUpdate={onUpdateModule}
                  id={module.id}
                />
              </div>
            ) : (
              <ModuleComponent
                data={module.data}
                id={module.id}
              />
            )}
          </div>
        );
      })}

      {/* Drop zone at the end */}
      <div
        className={`h-16 flex items-center justify-center border-2 border-dashed transition-colors ${
          dropIndex === modules.length
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-transparent hover:border-gray-600'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDropIndex(modules.length);
        }}
        onDragLeave={() => setDropIndex(null)}
        onDrop={(e) => handleDrop(e, modules.length)}
      >
        <span className="text-gray-500 text-sm">Drop here to add at end</span>
      </div>
    </div>
  );
}
