export enum SlotPricing {
  LOW = 75,
  STANDARD = 100,
  PEAK = 150,
  NIGHT = 250,
}

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  pricing: SlotPricing;
  label: string;
}

// Exact 9 sloturi zilnice conform specificațiilor
export const DAY_SLOTS: TimeSlot[] = [
  {
    id: 1,
    startTime: '06:00',
    endTime: '07:30',
    pricing: SlotPricing.LOW,
    label: '06:00 - 07:30 (LOW - 0.75 credite)',
  },
  {
    id: 2,
    startTime: '07:45',
    endTime: '09:15',
    pricing: SlotPricing.STANDARD,
    label: '07:45 - 09:15 (STANDARD - 1 credit)',
  },
  {
    id: 3,
    startTime: '09:30',
    endTime: '11:00',
    pricing: SlotPricing.STANDARD,
    label: '09:30 - 11:00 (STANDARD - 1 credit)',
  },
  {
    id: 4,
    startTime: '11:15',
    endTime: '12:45',
    pricing: SlotPricing.STANDARD,
    label: '11:15 - 12:45 (STANDARD - 1 credit)',
  },
  {
    id: 5,
    startTime: '13:00',
    endTime: '14:30',
    pricing: SlotPricing.LOW,
    label: '13:00 - 14:30 (LOW - 0.75 credite)',
  },
  {
    id: 6,
    startTime: '14:45',
    endTime: '16:15',
    pricing: SlotPricing.STANDARD,
    label: '14:45 - 16:15 (STANDARD - 1 credit)',
  },
  {
    id: 7,
    startTime: '16:30',
    endTime: '18:00',
    pricing: SlotPricing.PEAK,
    label: '16:30 - 18:00 (PEAK - 1.5 credite)',
  },
  {
    id: 8,
    startTime: '18:15',
    endTime: '19:45',
    pricing: SlotPricing.PEAK,
    label: '18:15 - 19:45 (PEAK - 1.5 credite)',
  },
  {
    id: 9,
    startTime: '20:00',
    endTime: '21:30',
    pricing: SlotPricing.PEAK,
    label: '20:00 - 21:30 (PEAK - 1.5 credite)',
  },
];

// Noapte: 22:00 - 06:00 (2.5 credite = 250 units)
export const NIGHT_SLOT = {
  startTime: '22:00',
  endTime: '06:00',
  pricing: SlotPricing.NIGHT,
  label: '22:00 - 06:00 (NOAPTE - 2.5 credite)',
};

export function getSlotById(id: number): TimeSlot | undefined {
  return DAY_SLOTS.find(slot => slot.id === id);
}

export function formatCredits(units: number): string {
  const credits = units / 100;
  return `${credits.toFixed(2)} ${credits === 1 ? 'credit' : 'credite'}`;
}
