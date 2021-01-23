import mongoose, { Schema, Document } from 'mongoose';

export interface CarInterface extends Document {
    provider: string;
    uuid: string;
    vin: string;
    make: string;
    model: any;
    mileage: string;
    year: string;
    price: string;
    zipCode: string;
    createDate: string;
    updateDate: string;
}

const CarSchema: Schema = new Schema(
  {
    provider: { type: String, required: true },
    uuid: { type: String, required: true },
    vin: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    mileage: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
    zipCode: { type: String, required: true },
    createDate: { type: String, required: true },
    updateDate: { type: String, required: true },
  },
);

const Data = mongoose.model<CarInterface>('car', CarSchema);
export default Data;
