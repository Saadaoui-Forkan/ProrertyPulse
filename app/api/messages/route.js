import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

/**
 * method: GET
 * route : /api/messages
*/
export const GET = async (request) => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser

        const messages = await Message.find({ recipient: userId })
            .populate('sender', 'username')
            .populate('property', 'name')
        return new Response(JSON.stringify(messages), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('Something Went Wrong ==> Get Messages'), {
            status: 500,
        }) 
    }
}

/**
 * method: POST
 * route : /api/messages
*/
export const POST = async (request) => {
    try {
        await connectDB()

        const { name, email, phone, message, property, recipient } = await request.json()

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', { status: 401 });
        }
        const { user } = sessionUser

        // Can not sent message to self
        if (user.id === recipient) {
            return new Response(JSON.stringify({ message: 'Can not send message to yourself' }), {
                status: 400,
            });
        }

        const newMessage = new Message({
            sender: user._id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message,
        })
        await newMessage.save()

        return new Response(JSON.stringify({ message: 'Message Sent' }), {
            status: 200,
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('Something Went Wrong'), {
            status: 500,
        })   
    }
}