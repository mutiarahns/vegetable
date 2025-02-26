export type Vegetable = {
  id: number;
  name: string;
  classification: string;
  createdAt: string;
  updatedAt?: string | null;
};

export type VegetableClassification = {
  id: number;
  name: string;
};
