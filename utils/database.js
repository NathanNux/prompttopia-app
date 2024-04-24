import mongoose from "mongoose";

let isConnected = false; // Database connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Mongo DB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
            dbName: 'shareprompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("Mongo DB is connected");
    } catch (error) {
        console.log(error);
    }
}