export interface BaseModuleProps {
  id: string;
  onUpdate?: (id: string, data: Record<string, unknown>) => void;
  onDelete?: (id: string) => void;
  isEditing?: boolean;
}

export interface ModuleDefinition {
  type: string;
  label: string;
  icon: string;
  defaultData: Record<string, unknown>;
}

export interface EmailModule {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

// Color palette for emails
export const emailColors = {
  primary: '#6366f1',      // Indigo
  secondary: '#8b5cf6',    // Purple
  accent: '#06b6d4',       // Cyan
  dark: '#1e293b',         // Slate dark
  light: '#f8fafc',        // Slate light
  text: '#334155',         // Slate text
  muted: '#64748b',        // Slate muted
  border: '#e2e8f0',       // Slate border
  white: '#ffffff',
};
