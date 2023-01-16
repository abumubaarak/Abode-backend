import { Document, Model, model, Schema } from "mongoose";

interface IMessage {
  tenant_id: string;
  landlord_id: string;
  tenant_name: string
  landlord_name: string
  property_id: string;
  message: string;
  sentAt: any;
}

interface IMessageDocument extends IMessage, Document { }

const MessageSchema: Schema = new Schema({
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
  },
  message: {
    type: String,
    required: ["Message is require", true],
  },
  tenant_name: {
    type: String,
    required: ["Tenant name is require", true],
  },
  landlord_name: {
    type: String,
    required: ["Landlord name is require", true],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message: Model<IMessageDocument> = model<IMessageDocument>(
  "message",
  MessageSchema
);
