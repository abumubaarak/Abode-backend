import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Conversation } from "../conversation/conversationModel";
import { Message } from "./messageModel";

export const getMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, id } = req.query;

    if (user === "landlord") {
      const message = await Message.find()
        .where("landlord_id", id).sort({ sentAt: -1 })
      if (!message) {
        return next(new ErrorResponse(400, "Not found"));
      }
      response(res, 200, true, message);
    } else {
      const message = await Message.find()
        .where("tenant_id", id).sort({ sentAt: -1 })
      if (!message) {
        return next(new ErrorResponse(400, "Not found"));
      }
      response(res, 200, true, message);
    }
  }
);


// @desc   Send Message
// @route  POST /messages
// @access Private
export const initiateMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tenant_id, landlord_id, message, property_id, tenant_name, landlord_name } = req.body;

    Message.create(
      {
        tenant_id,
        tenant_name,
        landlord_id,
        property_id,
        message,
        landlord_name
      },
      async (err, doc) => {
        Conversation.create(
          {
            tenant_id,
            landlord_id,
            message,
            message_id: doc._id,
            sender: tenant_id,
          },
          (err: any, doc: any) => {
            if (doc) {
              response(res, 201, true, {});
            }
          }
        );
      }
    );

  }
);
