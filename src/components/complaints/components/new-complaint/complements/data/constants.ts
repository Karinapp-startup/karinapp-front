export const MAX_ACCUSED = 10;
export const MAX_WITNESSES = 5;
export const MAX_SAFEGUARD_MEASURES = 5;
export const TOTAL_STEPS = 9;

export const MIN_SUMMARY_LENGTH = 50;
export const MAX_SUMMARY_LENGTH = 1000;

export const SITUATION_TYPES = {
  HARASSMENT: 'HARASSMENT',
  SEXUAL_HARASSMENT: 'SEXUAL_HARASSMENT',
  WORKPLACE_VIOLENCE: 'WORKPLACE_VIOLENCE'
} as const;

export const SITUATION_LABELS = {
  [SITUATION_TYPES.HARASSMENT]: 'Acoso Laboral',
  [SITUATION_TYPES.SEXUAL_HARASSMENT]: 'Acoso Sexual',
  [SITUATION_TYPES.WORKPLACE_VIOLENCE]: 'Violencia en el Trabajo'
} as const;

export const SITUATION_DESCRIPTIONS = {
  [SITUATION_TYPES.HARASSMENT]: 'Agresión u hostigamiento, sea puntual o reiterado, que causa maltrato, humillación o perjudica la situación laboral de la persona.',
  [SITUATION_TYPES.SEXUAL_HARASSMENT]: 'Requerimientos sexuales indebidos y no consentidos que afectan la situación o condiciones laborales de quien los recibe.',
  [SITUATION_TYPES.WORKPLACE_VIOLENCE]: 'Conductas ejercidas por terceros ajenos a la relación laboral que afectan al trabajador durante la prestación de servicios.'
} as const;

export const FREQUENCY_TYPES = {
  ONCE: 'once',
  OCCASIONAL: 'occasional',
  FREQUENT: 'frequent',
  DAILY: 'daily'
} as const;

export const timeOptions = {
  hours: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
  minutes: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
};

export const RELATIONSHIP_TYPES = {
  DIRECT: 'direct',
  INDIRECT: 'indirect',
  NONE: 'none'
} as const;

export const HIERARCHY_LEVELS = {
  SUPERIOR: 'superior',
  PEER: 'peer',
  SUBORDINATE: 'subordinate'
} as const;

export const WITNESS_TYPES = {
  DIRECT: 'direct',
  INDIRECT: 'indirect',
  NONE: 'none'
} as const;

export const SAFEGUARD_TYPES = {
  SEPARATION: 'separation',
  RELOCATION: 'relocation',
  SCHEDULE_ADJUSTMENT: 'schedule_adjustment',
  OTHER: 'other'
} as const;

export const SAFEGUARD_LABELS = {
  [SAFEGUARD_TYPES.SEPARATION]: 'Separación',
  [SAFEGUARD_TYPES.RELOCATION]: 'Reubicación',
  [SAFEGUARD_TYPES.SCHEDULE_ADJUSTMENT]: 'Ajuste de horario',
  [SAFEGUARD_TYPES.OTHER]: 'Otra medida'
} as const;

export const SAFEGUARD_DESCRIPTIONS = {
  [SAFEGUARD_TYPES.SEPARATION]: 'Separación temporal del denunciado del lugar de trabajo',
  [SAFEGUARD_TYPES.RELOCATION]: 'Reubicación del denunciante o denunciado a otra área',
  [SAFEGUARD_TYPES.SCHEDULE_ADJUSTMENT]: 'Modificación de horarios para evitar contacto',
  [SAFEGUARD_TYPES.OTHER]: 'Otra medida de resguardo no listada'
} as const;

export const INVESTIGATION_TYPES = {
  EMPLOYER: 'employer',
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  LABOR_DIRECTION: 'labor_direction'
} as const;

export const SAFEGUARD_MEASURE_OPTIONS = [
  {
    value: 'workspace_separation' as const,
    label: 'Separación de espacios de trabajo'
  },
  {
    value: 'schedule_modification' as const,
    label: 'Modificación de jornadas'
  },
  {
    value: 'psychological_attention' as const,
    label: 'Atención psicológica temprana del organismo administrador de la empresa (accidentes laborales)'
  },
  {
    value: 'other' as const,
    label: 'Otra'
  }
] as const; 