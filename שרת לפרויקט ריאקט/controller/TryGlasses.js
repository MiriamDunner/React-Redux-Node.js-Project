import express from 'express';
import multer from 'multer';
import OpenAI from 'openai';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/api/merge-glasses', upload.fields([
  { name: 'person', maxCount: 1 },
  { name: 'glasses', maxCount: 1 },
]), async (req, res) => {
  try {
    const personPath = req.files['person'][0].path;
    const glassesPath = req.files['glasses'][0].path;

    const response = await openai.images.edit({
      image: fs.createReadStream(personPath),
      mask: fs.createReadStream(glassesPath),
      prompt: "Add these glasses naturally on the person's face",
      n: 1,
      size: '512x512',
    });

    const imageUrl = response.data[0].url;
    res.send({ image: imageUrl });

  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).send({ error: 'Failed to process image' });
  }
});

export default router;
