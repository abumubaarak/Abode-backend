import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import Stripe from "stripe";
import { asyncHandler } from "../middleware/async";
import response from "../utils/response";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? " ", {
  apiVersion: "2020-08-27",
});

var serviceAccount = require("../../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore()

export const checkout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

    const { property_id, tenant_id } = req.body;

    const propertyDocument = (await db.collection("Property").doc(property_id).get()).data()

    const user = (await db.collection("Users").doc(tenant_id).get()).data()!

    const customer = await stripe.customers.create({
      email: user?.email,
      name: user?.displayName,

    })

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );

    const {
      name,
      cost,
      address,
      uid: landlord_id,
      propertyType,
      remoteImages,
    } = propertyDocument!;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cost,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Payment for ${name} at ${address}`,
      metadata: {
        property_id,
        tenant_id: user?.uid,
        landlord_id,
        image: remoteImages[0]
      }
    });

    response(res, 200, true, {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.PUBLISHABLE_KEY
    });
  }
);

export const successfulPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
    console.log(req.body)
    const {
      created,
      data: {
        object: {
          id,
          metadata: { image, property_id, tenant_id, landlord_id },
          amount,
          status,
          description
        },
      },
    } = req.body;
    const propertyCollection = await db.collection("Property").doc(property_id)
    const paymentCollection = await db.collection("Payments").doc()

    paymentCollection.set({
      id: paymentCollection.id,
      tenant_id,
      property_id,
      description,
      landlord_id,
      created: new Date(),
      image,
      status: status === "succeeded" && "Paid",
      amount: amount,
      checkout_id: id,
    })
      .then(() => propertyCollection.update({
        status: "paid"
      }))
  }
);


