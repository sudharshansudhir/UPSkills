// controllers/uploadController.js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadVideoFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // full URL to be returned to client
    const serverUrl = process.env.SERVER_URL || `http://localhost:5000`;
    const videoUrl = `${serverUrl}/uploads/videos/${req.file.filename}`;

    return res.status(200).json({ url: videoUrl });
  } catch (err) {
    console.error("uploadVideoFile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
