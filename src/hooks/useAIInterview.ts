import { useState, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface InterviewContext {
  role: string;
  experience: string;
  industry: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-interview`;

export function useAIInterview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<InterviewContext | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const streamResponse = async (
    apiMessages: { role: string; content: string }[],
    type: "question" | "feedback",
    onDelta: (delta: string) => void,
    onDone: () => void
  ) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: apiMessages, type, context }),
    });

    if (!resp.ok || !resp.body) {
      const error = await resp.json().catch(() => ({ error: "Failed to start interview" }));
      throw new Error(error.error || "Failed to connect to AI");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    onDone();
  };

  const startInterview = useCallback(async (interviewContext: InterviewContext) => {
    setContext(interviewContext);
    setIsStarted(true);
    setIsLoading(true);
    setMessages([]);
    setFeedback(null);

    let assistantContent = "";
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages([{ role: "assistant", content: assistantContent, timestamp: new Date() }]);
    };

    try {
      await streamResponse([], "question", updateAssistant, () => setIsLoading(false));
    } catch (error) {
      console.error("Start interview error:", error);
      setIsLoading(false);
      setMessages([{ 
        role: "assistant", 
        content: "Sorry, I couldn't start the interview. Please try again.", 
        timestamp: new Date() 
      }]);
    }
  }, []);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!context || isLoading) return;

    const userMsg: Message = { role: "user", content: userMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const apiMessages = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    let assistantContent = "";
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === assistantContent.slice(0, -chunk.length)) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
        }
        if (prev[prev.length - 1]?.role === "user") {
          return [...prev, { role: "assistant", content: assistantContent, timestamp: new Date() }];
        }
        return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
      });
    };

    try {
      await streamResponse(apiMessages, "question", updateAssistant, () => setIsLoading(false));
    } catch (error) {
      console.error("Send message error:", error);
      setIsLoading(false);
    }
  }, [context, messages, isLoading]);

  const endInterview = useCallback(async () => {
    if (!context || messages.length === 0) return;
    
    setIsLoading(true);
    const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));

    let feedbackContent = "";
    const updateFeedback = (chunk: string) => {
      feedbackContent += chunk;
      setFeedback(feedbackContent);
    };

    try {
      await streamResponse(apiMessages, "feedback", updateFeedback, () => setIsLoading(false));
    } catch (error) {
      console.error("Get feedback error:", error);
      setIsLoading(false);
      setFeedback("Sorry, couldn't generate feedback. Please try again.");
    }
  }, [context, messages]);

  const resetInterview = useCallback(() => {
    setMessages([]);
    setContext(null);
    setIsStarted(false);
    setFeedback(null);
  }, []);

  return {
    messages,
    isLoading,
    isStarted,
    feedback,
    context,
    startInterview,
    sendMessage,
    endInterview,
    resetInterview,
  };
}
