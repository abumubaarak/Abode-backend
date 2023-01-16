import { Document, Model, model, Schema } from "mongoose";

interface IConversation {
  tenant_id: string;
  landlord_id: string;
  message: string;
  message_id: string;
  sender: string
  sentAt: any;
}

interface IConversationDocument extends IConversation, Document { }

const ConversationSchema: Schema = new Schema({
  tenant_id: {
    type: String,
  },
  landlord_id: {
    type: String,
    required: ["Landlord Id is require", true],
  },
  message: {
    type: String,
    required: ["Message is require", true],
  },
  message_id: {
    type: String,
    required: ["Message Id is require", true],
  },
  sender: {
    type: String,
    required: ["Sender is require", true],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const Conversation: Model<IConversationDocument> =
  model<IConversationDocument>("conversation", ConversationSchema);
