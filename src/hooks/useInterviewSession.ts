import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface InterviewSession {
  id: string;
  role: string;
  experience: string;
  industry: string;
  messages: Message[];
  feedback: string | null;
  overall_score: number | null;
  communication_score: number | null;
  technical_score: number | null;
  confidence_score: number | null;
  improvement_areas: string[] | null;
  strengths: string[] | null;
  status: string;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
}

// Generate a unique session ID for anonymous users
const getSessionId = () => {
  let sessionId = localStorage.getItem("interview_session_id");
  if (!sessionId) {
    sessionId = `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("interview_session_id", sessionId);
  }
  return sessionId;
};

export function useInterviewSession() {
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [pastSessions, setPastSessions] = useState<InterviewSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sessionId = getSessionId();

  // Fetch past sessions
  const fetchPastSessions = useCallback(async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      let query = supabase
        .from("interview_sessions")
        .select("*")
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(10);

      if (userData.user) {
        query = query.eq("user_id", userData.user.id);
      } else {
        query = query.eq("session_id", sessionId);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching sessions:", error);
        return;
      }

      setPastSessions((data || []) as unknown as InterviewSession[]);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchPastSessions();
  }, [fetchPastSessions]);

  // Create a new session
  const createSession = useCallback(async (
    role: string,
    experience: string,
    industry: string
  ): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();

      const insertData: Record<string, unknown> = {
        role,
        experience,
        industry,
        messages: [],
        status: "in_progress",
      };

      if (userData.user) {
        insertData.user_id = userData.user.id;
      } else {
        insertData.session_id = sessionId;
      }

      const { data, error } = await supabase
        .from("interview_sessions")
        .insert(insertData as any)
        .select()
        .single();

      if (error) {
        console.error("Error creating session:", error);
        return null;
      }

      setCurrentSession(data as unknown as InterviewSession);
      return data.id;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  // Update messages in session
  const updateMessages = useCallback(async (
    sessionIdParam: string,
    messages: Message[]
  ) => {
    try {
      const { error } = await supabase
        .from("interview_sessions")
        .update({ messages: JSON.parse(JSON.stringify(messages)) })
        .eq("id", sessionIdParam);

      if (error) {
        console.error("Error updating messages:", error);
      }
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  }, []);

  // Complete session with feedback and scores
  const completeSession = useCallback(async (
    sessionIdParam: string,
    feedback: string,
    scores: {
      overall: number;
      communication: number;
      technical: number;
      confidence: number;
    },
    strengths: string[],
    improvementAreas: string[],
    durationSeconds: number
  ) => {
    try {
      const { error } = await supabase
        .from("interview_sessions")
        .update({
          feedback,
          overall_score: scores.overall,
          communication_score: scores.communication,
          technical_score: scores.technical,
          confidence_score: scores.confidence,
          strengths,
          improvement_areas: improvementAreas,
          status: "completed",
          completed_at: new Date().toISOString(),
          duration_seconds: durationSeconds,
        })
        .eq("id", sessionIdParam);

      if (error) {
        console.error("Error completing session:", error);
        return false;
      }

      setCurrentSession(null);
      await fetchPastSessions();
      return true;
    } catch (error) {
      console.error("Error completing session:", error);
      return false;
    }
  }, [fetchPastSessions]);

  // Abandon session
  const abandonSession = useCallback(async (sessionIdParam: string) => {
    try {
      await supabase
        .from("interview_sessions")
        .update({ status: "abandoned" })
        .eq("id", sessionIdParam);

      setCurrentSession(null);
    } catch (error) {
      console.error("Error abandoning session:", error);
    }
  }, []);

  return {
    currentSession,
    pastSessions,
    isLoading,
    createSession,
    updateMessages,
    completeSession,
    abandonSession,
    fetchPastSessions,
  };
}
