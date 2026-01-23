import { Types, Document } from "mongoose";

export enum LabelColor {
  Blue = "Blue",
  Grape = "Grape",
  Violet = "Violet",
  Lavender = "Lavender",
  Magenta = "Magenta",
  Salmon = "Salmon",
  Charcoal = "Charcoal",
  Gray = "Gray",
  GrayishBrown = "Grayish brown",
  Ruby = "Ruby",
  Red = "Red",
  Orange = "Orange",
  Yellow = "Yellow",
  OliveGreen = "Olive green",
  LimeGreen = "Lime green",
  Green = "Green",
  LightGreen = "Light green",
  Teal = "Teal",
}

export interface ITag {
  name: string;
  color?: LabelColor | null;
  isfavorite: boolean;
  userId: Types.ObjectId | string;
}

export type TagDocument = Document & ITag;
