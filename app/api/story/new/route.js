import Story from "@models/story";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, story, tag } = await request.json();

  try {
    await connectToDB();
    const newStory = new Story({ creator: userId, story, tag });

    await newStory.save();
    return new Response(JSON.stringify(newStory), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new story", { status: 500 });
  }
};
