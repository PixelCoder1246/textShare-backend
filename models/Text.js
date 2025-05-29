import mongoose from 'mongoose';

const textSchema = new mongoose.Schema({
  text: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.models.Text || mongoose.model('Text', textSchema);
