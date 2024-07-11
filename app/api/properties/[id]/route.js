import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

/**
 * method: GET
 * path  : api/properties/id
*/
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response("Property Not Found", { status: 404 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

/**
 * method: DELETE
 * path  : api/properties/id
*/
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;
    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property Not Found", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

/**
 * method: PUT
 * route : api/properties/:id
*/
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserId is required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const { id } = params;

    const formData = await request.formData();
    //  Access All Values From Amenities
    const amenities = formData.getAll("amenities");
    // Get Property To Update
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response("Property Does Not Exist", {
        status: 404,
      });
    }
    // Verify Ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Access Denied", {
        status: 401,
      });
    }

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //  Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.error("This is the error we are looking for: ", error);
    return new Response("Failed to add property", { status: 500 });
  }
};
