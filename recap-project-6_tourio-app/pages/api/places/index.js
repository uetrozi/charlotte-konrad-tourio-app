

export default async function handler(request, response) {

if (request.method === "GET") {
  const db_places = await Places.find();
  return response.status(200).json(db_places);
}

}
