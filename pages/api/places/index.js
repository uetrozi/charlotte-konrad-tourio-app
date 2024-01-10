import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      console.log(request.body);
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();
      response.status(201).json({ status: "Place created" });
    } catch (e) {
      console.error(e);
      response.status(400).json({ error: e.message });
    }
  }
}
