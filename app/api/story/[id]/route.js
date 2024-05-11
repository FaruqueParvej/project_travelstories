// GET(Read);

import Story from "@models/story";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const story = await Story.findById(params.id).populate("creator");
    if (!story) return new Response("story not found", { status: 404 });
    return new Response(JSON.stringify(story), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all storys", { status: 500 });
  }
};

// PATCH(update);

export const PATCH = async (request, { params }) => {
  const { story, tag } = await request.json();
  try {
    await connectToDB();
    const existingStory = await Story.findById(params.id);
    if (!existingStory) return new Response("story not found", { status: 404 });
    existingStory.story = story;
    existingStory.tag = tag;
    await existingStory.save();
    return new Response(JSON.stringify(existingStory), { status: 200 });
  } catch (error) {
    return new Response("Failed to update story", { status: 500 });
  }
};

// delete(delete);

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the story by ID and delete it
    await Story.findByIdAndDelete(params.id);
    return new Response("Story deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting story", { status: 500 });
  }
};
