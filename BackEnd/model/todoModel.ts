import { Document, Schema, model } from "mongoose"



export interface iProps{
    title: string
    description: string
    progress: boolean
    date: string
    done: boolean
}

interface iPropsData extends iProps, Document{}

const todoModel = new Schema<iPropsData>(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    progress: {
      type: Boolean,
    },

    date: {
      type: String,
    },

    done: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default model<iPropsData>("todos", todoModel )