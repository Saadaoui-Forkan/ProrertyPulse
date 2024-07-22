import connectDB from "@/config/database";
import Property from "@/models/Property";

<<<<<<< HEAD
export const dynamic = 'force-dynamic';
=======
export const dynamic = 'force-dynamic'; //TODO Put it to prevent static rendering for this rouyte
>>>>>>> 61bb16fd354701e9cfa4faaf410d786d1a27f483

/**
 * method: GET
 * route : /api/properties/search
 */

export const GET = async (request) => {
  try {
    await connectDB();

<<<<<<< HEAD
    const searchParams = request.nextUrl.searchParams;
=======
    const searchParams = request.nextUrl.searchParams //TODO Instead of  =>  const { searchParams } = new URL(request.url);
>>>>>>> 61bb16fd354701e9cfa4faaf410d786d1a27f483
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, "i");
        query.type = typePattern
    }

    const properties = await Property.find(query)

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong => Search Properties", {
      status: 500,
    });
  }
};
