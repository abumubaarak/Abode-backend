import { Document, Model, model, Schema } from "mongoose";

interface IPayment {
  checkout_id: string;
  tenant_id: string;
  landlord_id: any;
  property_id: string;
  amount: number;
  status: string;
  paidOn: any;
}

interface IPaymentDocument extends IPayment, Document { }

const PaymentSchema: Schema = new Schema({
  checkout_id: {
    type: String,
  },
  tenant_id: {
    type: String,
    required: ["Tenant Id is require", true],
  },
  landlord_id: {
    type: String,
    required: ["Landlord Id is require", true],
  },
  property_id: {
    type: String,
    required: ["property Id is require", true],
  },
  amount: {
    type: Number,
    required: ["Amount is require", true],
  },
  status: {
    type: String,
    required: ["Status is require", true],
  },
  paidOn: {
    type: Date,
    default: Date.now,
  },
});

export const Payment: Model<IPaymentDocument> = model<IPaymentDocument>(
  "payments",
  PaymentSchema
);
