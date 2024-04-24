import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    // this must be this ways, since we are connecting to the database each time, when it does it's job, the function will end
    try {
        await connectToDB();
        const newPrompt = new Prompt({ 
            creator: userId, 
            prompt, 
            tag 
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}