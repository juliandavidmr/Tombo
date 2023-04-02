export type TPreventionAndSafetyEquipmentItem = {
  id: string | number;
  title: string;
  description: string;
  checked?: boolean;
};

export type TAppliesTo =
  | 'car'
  | 'motorcycle'
  | 'truck'
  | 'bus'
  | 'moto-taxi'
  | 'all';

export type TDbPreventionAndSafetyEquipment = {
  meta: {
    article: number;
    title: string;
    information: string;
    appliesTo: TAppliesTo[];
  };
  list: TPreventionAndSafetyEquipmentItem[];
};

export type TDb = {
  autos: {
    preventionAndSafetyEquipment: TDbPreventionAndSafetyEquipment;
  };
  motorcycles: {
    preventionAndSafetyEquipment: TDbPreventionAndSafetyEquipment;
  };
  // Mandatory documents
  mandatoryDocuments: TDbPreventionAndSafetyEquipment;
};
