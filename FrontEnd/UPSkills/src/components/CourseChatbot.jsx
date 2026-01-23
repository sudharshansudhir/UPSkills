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

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const aiCourseContext = {
        title: course?.title,
        description: course?.description,
        moduleName: course?.moduleName,
        lessonName: course?.lessonName,
      };

      const res = await axios.post(
        `${API_BASE}/api/ai/course-chat`,
        {
          message: userText,
          course: aiCourseContext,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.reply },
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
      {/* Floating Mentor Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 
                   bg-[#2ec4b6] text-white px-5 py-3 rounded-full 
                   shadow-xl z-50 text-sm sm:text-base"
      >
        🤖 Mentor
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed z-50 bg-white flex flex-col shadow-2xl
            bottom-0 right-0 left-0 h-[85vh]
            sm:bottom-24 sm:right-6 sm:left-auto sm:h-auto
            sm:w-96 sm:rounded-xl
            rounded-t-2xl
          "
        >
          {/* Header */}
          <div className="bg-[#2ec4b6] text-white px-4 py-3 font-semibold flex justify-between items-center rounded-t-2xl sm:rounded-t-xl">
            <span>AI Course Mentor</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg sm:hidden"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-blue-500 text-white rounded-br-none"
                    : "mr-auto bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-xs">AI is thinking…</div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-2 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askBot()}
              className="
                flex-1 px-3 py-2 text-sm outline-none
                border rounded-lg focus:ring-2 focus:ring-[#2ec4b6]
              "
              placeholder="Ask your doubt..."
            />
            <button
              onClick={askBot}
              className="
                bg-[#2ec4b6] text-white px-4 py-2 rounded-lg
                text-sm font-medium
              "
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
