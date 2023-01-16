import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Conversation } from "./conversationModel";

// @desc   Get Conversation
// @route  GET /api/v1/conversation
// @access Private
export const getConversation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const conversation = await Conversation.find().where(
      "message_id",
      req.query.id
    ).sort({ sentAt: -1 })
    if (!conversation) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true, conversation);
  }
);


