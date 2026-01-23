import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const CourseChatbot = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    if (!input.trim()) return;

    const userText = input;

    // show user message immediately
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // ✅ CLEAN course context for AI
      const aiCourseContext = {
        title: course?.title,
        description: course?.description,
        moduleName: course?.moduleName,
        lessonName: course?.lessonName,
      };

      const res = await axios.post(
        `${API_BASE}/api/ai/course-chat`,
        {
          message: userText,        // ✅ correct key
          course: aiCourseContext,  // ✅ clean context
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.reply }, // ✅ correct response key
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't answer that 😔" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#2ec4b6] text-white px-4 py-3 rounded-full shadow-lg z-50"
      >
        🤖 Mentor
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col z-50">
          <div className="bg-[#2ec4b6] text-white p-3 rounded-t-xl font-semibold">
            AI Course Mentor
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  m.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm">Thinking...</div>
            )}
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Ask your doubt..."
              onKeyDown={(e) => e.key === "Enter" && askBot()}
            />
            <button
              onClick={askBot}
              className="bg-[#2ec4b6] text-white px-3"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseChatbot;
