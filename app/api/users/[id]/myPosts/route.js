import Story from "@models/story";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const storys = await Story.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(storys), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all storys", { status: 500 });
  }
};
