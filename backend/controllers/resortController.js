import Resort from "../models/Resort.js";

export async function listResorts(req, res) {
  const resorts = await Resort.find().sort({ createdAt: 1 });
  res.json({ resorts });
}
