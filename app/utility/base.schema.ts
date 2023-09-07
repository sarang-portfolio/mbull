import { Schema } from "mongoose";

export class BaseSchema extends Schema {
  constructor(schemaType: any, options?: any) {
    super(
      {
        ...schemaType,
        isDeleted: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
      { timestamps: true, ...options }
    );
  }
}
