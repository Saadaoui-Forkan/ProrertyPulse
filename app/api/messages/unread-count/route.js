import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'; //TODO Put it to prevent static rendering for this rouyte

/**
 * method: GET
 * route : /api/messages/unread-count
 */

export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;

    const unreadMessagesCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(unreadMessagesCount), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify("Something Went Wrong ==> Get unreadMessages Count"),
      {
        status: 500,
      }
    );
  }
};
