export interface ExamplePair {
  id: string;
  es: string;
  arm: string;
  context?: string;
}

export interface ModalidadType {
  id: string;
  number: number;
  esTitle: string;
  armTitle: string;
  esSummary: string;
  armSummary: string;
  badge: string;
  iconName: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    subtle: string;
  };
  subtypes?: Array<{ es: string; arm: string }>;
  frequentWords?: Array<{ es: string; arm: string }>;
  examples: ExamplePair[];
}

export interface TableItem {
  id: string;
  modalidad: string;
  armModalidad: string;
  funcion: string;
  armFuncion: string;
  icon: string;
}

export interface QAItem {
  id: number;
  esQuestion: string;
  armQuestion: string;
  esAnswer: string;
  armAnswer: string;
  category: string;
}

export interface ParagraphPair {
  id: string;
  es: string;
  arm: string;
  hasSpecialFormatting?: boolean;
}
