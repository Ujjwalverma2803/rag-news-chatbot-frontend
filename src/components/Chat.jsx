import React, { useState, useEffect } from "react";
import "./Chat.scss";

export default function Chat() {
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initSession() {
      const res = await fetch("http://localhost:4000/api/session", {
        method: "POST",
      });
      const data = await res.json();
      setSessionId(data.sessionId);
    }
    initSession();
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    async function fetchHistory() {
      const res = await fetch(
        `http://localhost:4000/api/session/${sessionId}/history`
      );
      const data = await res.json();
      setHistory(data.history || []);
    }
    fetchHistory();
  }, [sessionId]);

  async function send() {
    if (!sessionId || !text.trim()) return;

    const userMsg = { role: "user", text };
    setHistory((h) => [...h, userMsg]);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
      });

      const data = await res.json();

      setHistory((h) => [...h, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setHistory((h) => [
        ...h,
        { role: "assistant", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function reset() {
    if (!sessionId) return;
    await fetch(`http://localhost:4000/api/session/${sessionId}/reset`, {
      method: "POST",
    });
    setHistory([]);
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>AI News Assistant 📰</h3>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="chat-history">
        {history.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="bubble assistant typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your question..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="send-btn" onClick={send}>
          ➤
        </button>
      </div>
    </div>
  );
}
