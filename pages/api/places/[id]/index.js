import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";
import Comment from "../../../../db/models/Comments";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    switch (request.method) {
      case "GET":
        const place = await Place.findById(id).populate("comments");

        if (!place) {
          return response.status(404).json({ status: "Not Found" });
        }

        response.status(200).json(place);
        break;


      case "POST":
        const { name, comment } = request.body;

        const newComment = new Comment({ name, comment });
        await newComment.save();

        const updatedPlace = await Place.findByIdAndUpdate(
          id,
          { $push: { comments: newComment._id } },
          { new: true }
        ).populate("comments");

        response.status(201).json(updatedPlace);
        break;

    

      case "PATCH": 

        await Place.findByIdAndUpdate(id, { $set: request.body });
        response.status(200).json({ status: "Place successfully updated." });
        break;

      case "DELETE":
        await Place.findByIdAndDelete(id);
        response.status(200).json({ status: "Place successfully deleted." });
        break;

      default:
        response.status(405).json({ status: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error processing request:", error.message);
    response
      .status(500)
      .json({ status: "Internal Server Error", error: error.message });
  }
}
