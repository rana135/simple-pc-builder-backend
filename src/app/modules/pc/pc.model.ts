/* eslint-disable no-console */
import { Schema, model } from "mongoose"
import { IPc } from "./pc.interface"
 
const PCSchema = new Schema<IPc>(
  {
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
) 
export const PCParts = model<IPc>('pc-parts', PCSchema)
