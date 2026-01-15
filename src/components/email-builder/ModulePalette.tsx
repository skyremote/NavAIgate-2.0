import { moduleRegistry } from './modules';

interface Props {
  onAddModule: (type: string) => void;
}

export function ModulePalette({ onAddModule }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Modules
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {moduleRegistry.map((module) => (
          <button
            key={module.type}
            onClick={() => onAddModule(module.type)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('moduleType', module.type);
              e.dataTransfer.effectAllowed = 'copy';
            }}
            className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500 hover:bg-gray-800 transition-all text-left group"
          >
            <span className="text-xl">{module.icon}</span>
            <span className="text-sm text-gray-300 group-hover:text-white">
              {module.label}
            </span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Click or drag modules to add them to your email
      </p>
    </div>
  );
}
