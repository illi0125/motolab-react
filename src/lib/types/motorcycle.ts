import type {
  MotorcycleCollection,
  MotorcycleSize,
  MotorcycleStatus,
} from "../enums/motorcycle.enum";

export interface Motorcycle {
  _id: string;
  motorcycleStatus: MotorcycleStatus;
  motorcycleCollection: MotorcycleCollection;
  motorcycleName: string;
  motorcyclePrice: number;
  motorcycleLeftCount: number;
  motorcycleSize: MotorcycleSize;
  motorcycleVolume: string;
  motorcycleDesc?: string;
  motorcycleImages: string[];
  motorcycleViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MotorcycleInquiry {
  order: string;
  page: number;
  limit: number;
  motorcycleCollection?: MotorcycleCollection;
  search?: string;
}
