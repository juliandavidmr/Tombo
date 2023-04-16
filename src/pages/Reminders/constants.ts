export type TReminder = {
  storageKey: string;
  title: string;
  expirationDate?: Date;
  updatedAt: Date;
};

export const REMINDERS: Readonly<TReminder>[] = [
  {
    storageKey: 'reminder-extintor',
    title: 'Vencimiento extintor',
    expirationDate: undefined,
    updatedAt: new Date(),
  },
  {
    storageKey: 'reminder-soat',
    title: 'Vencimiento SOAT',
    expirationDate: undefined,
    updatedAt: new Date(),
  },
  {
    storageKey: 'reminder-rtm',
    title: 'Vencimiento revisión técnica',
    expirationDate: undefined,
    updatedAt: new Date(),
  },
  {
    storageKey: 'reminder-licencia',
    title: 'Vencimiento licencia de conducir',
    expirationDate: undefined,
    updatedAt: new Date(),
  },
];
