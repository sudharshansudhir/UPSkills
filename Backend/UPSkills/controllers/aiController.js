import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

export const courseChat = async (req, res) => {
  try {
    const { message, course } = req.body;

    // console.log("MESSAGE RECEIVED:", message);
    // console.log("COURSE RECEIVED:", course);

    if (!message || !course) {
      return res.json({
        reply: "Please ask a question related to the course.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI course mentor.

Course Title: ${course.title || "N/A"}
Description: ${course.description || "N/A"}
Module: ${course.moduleName || "N/A"}
Lesson: ${course.lessonName || "N/A"}

Student Question:
${message}

Rules:
- Answer only from the course context
- If unrelated, say politely
- Keep explanation simple
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({
      reply: "AI mentor is currently unavailable.",
    });
  }
};
