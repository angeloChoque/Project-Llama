import mongoose, { SchemaTypes } from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    employeeIds: {
      type: SchemaTypes.Array,
      required: true,
      trim: true,
    },
    title: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    severity: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    description: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    state: {
      type: SchemaTypes.String,
      trim: true,
      default: "Backlog",
    },
    startedAt: {
      type: SchemaTypes.Date,
    },
    finishedAt: {
      type: SchemaTypes.Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
