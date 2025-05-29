import connectDB from '../db.js';
import Text from '../models/Text.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text, expiresInSeconds } = req.body;
  if (!text || !expiresInSeconds) {
    return res.status(400).json({ error: 'Text and expiry are required' });
  }

  await connectDB();

  const savedText = new Text({
    text,
    expiresAt: new Date(Date.now() + expiresInSeconds * 1000),
  });

  await savedText.save();
  const fullLink = `${process.env.BASE_URL}/api/view?id=${savedText._id}`;
  res.status(200).json({ link: fullLink });
}
