import connectDB from '../db.js';
import Text from '../models/Text.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).send('Missing ID');

  await connectDB();

  const textEntry = await Text.findById(id);
  if (!textEntry) return res.status(404).send('Link not found or expired');

  res.setHeader('Content-Type', 'text/html');
  res.send(`<pre>${textEntry.text}</pre>`);
}
