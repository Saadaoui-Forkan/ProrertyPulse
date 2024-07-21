import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"

export const dynamic = 'force-dynamic'

/**
 * method: PUT
 * route : /api/messages/:id
*/
export const PUT = async (request, { params }) => {
    try {
        await connectDB()

        const { id } = params

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser

        const message = await Message.findById(id)
        
        if(!message) return new Response('Message Not Found', { status: 404 });
        // Verify The Ownership
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }
        // Update Message (read/unread) depending on the current status
        message.read = !message.read

        await message.save()

        return new Response(JSON.stringify(message), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('Something Went Wrong ==> Mark Message As Read'), {
            status: 500,
        }) 
    }
}

/**
 * method: DELETE
 * route : /api/messages/:id
*/
export const DELETE = async (request, { params }) => {
    try {
        await connectDB()

        const { id } = params

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser

        const message = await Message.findById(id)
        
        if(!message) return new Response('Message Not Found', { status: 404 });
        // Verify The Ownership
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        await message.deleteOne()
        return new Response(JSON.stringify({ message: "Message Deleted" }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('Something Went Wrong ==> Delete Message'), {
            status: 500,
        }) 
    }
}