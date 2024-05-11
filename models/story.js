import { Schema, model, models } from "mongoose";

const StorySchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  story: {
    type: String,
    required: [true, "Story is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Story = models.Story || model("Story", StorySchema);

export default Story;
