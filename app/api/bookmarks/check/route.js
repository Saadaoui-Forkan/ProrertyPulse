
import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"

export const dynamic = 'force-dynamic'

export const POST = async(request) => {
    try {
        await connectDB()

        const { propertyId } = request.json()
        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User Id is required", { status: 401 });
        }

        const { userId } = sessionUser
        // Find user in database
        const user = await User.findOne({ _id: userId })
        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)

        return new Response(JSON.stringify({ isBookmarked }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response("Failed to add property", { status: 500 });
    }
}