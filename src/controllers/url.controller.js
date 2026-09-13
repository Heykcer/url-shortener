import url from '../models/url.model.js';
import {nanoid} from 'nanoid';

function generateShortUrl() {
  return nanoid(8); // Generates a unique 8-character short URL
}
 export  async function handleGenerateShortUrl(req, res) {
  try {
    const { longUrl } = req.body;

    try{
      new URL(longUrl);
    }catch(error){
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Check if the URL already exists in the database
    const existingUrl = await url.findOne({ where: { longUrl } });
    if (existingUrl) {
      return res.status(200).json(existingUrl);
    }

    const shortUrl = generateShortUrl();
    const newUrl = await url.create({ longUrl, shortUrl });
    return res.status(201).json(newUrl);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export  async function handleRedirect(req, res) {
  try {
    const { shortUrl } = req.params;
    const urlEntry = await url.findOne({ where: { shortUrl } });
    if (urlEntry) {
      urlEntry.clicks += 1;
      urlEntry.save().catch((error)=>{
        console.error('Failed to Update clicks:',error)
      });
      return res.redirect(urlEntry.longUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
