import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/user";

import unidecode from 'unidecode';

// I needed to add this, czech language has special characters, and the username was not being generated correctly

function generateUsername(name) {
    // Replace special characters with their closest ASCII equivalents
    let username = unidecode(name);

    // Remove non-alphanumeric characters except underscores and periods, and convert to lowercase
    username = username.replace(/[^a-zA-Z0-9_.]/g, '').toLowerCase();

    // Remove leading and trailing underscores and periods
    username = username.replace(/^[_.]|[_.]$/g, '');

    // Replace multiple underscores or periods with a single one
    username = username.replace(/[_\.]{2,}/g, '_');

    // Ensure username is within 8-20 characters
    if (username.length > 20) {
        username = username.substring(0, 20);
    } else if (username.length < 8) {
        // If username is less than 8 characters, pad it with underscores
        username = username.padEnd(8, '_');
    }

    return username;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({ email: session.user.email });
    
            session.user.id = sessionUser._id.toString();
    
            return session;
    
            // this will add the user id to the session object and create a new session for the user
        },
        async signIn ({ profile }) {
            console.log(profile);
            try {
                await connectToDB();
                // check if a user already exists in the database
                const userExists = await User.findOne({ email: profile.email });
                // if not create a new user
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: generateUsername(profile.name),
                        image: profile.picture,
                    });
                }
                return true 
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false
            }
    
        }
    }
    
})

export { handler as GET, handler as POST}