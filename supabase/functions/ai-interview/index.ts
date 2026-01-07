import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InterviewMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface InterviewRequest {
  messages: InterviewMessage[];
  type: "question" | "feedback";
  context: {
    role: string;
    experience: string;
    industry: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type, context }: InterviewRequest = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";

    if (type === "question") {
      systemPrompt = `You are a professional AI interviewer conducting a job interview for a ${context.role} position in the ${context.industry} industry. The candidate has ${context.experience} experience level.

Your role is to:
1. Ask relevant, industry-specific interview questions one at a time
2. Listen to the candidate's response and ask follow-up questions when appropriate
3. Be professional, encouraging, and create a realistic interview experience
4. Cover technical skills, behavioral questions, and situational scenarios
5. Adapt your questions based on the candidate's responses

Start with an introduction and then ask your first question. Keep responses concise but professional.
Ask one question at a time and wait for the response before proceeding.`;
    } else if (type === "feedback") {
      systemPrompt = `You are an expert interview coach analyzing interview responses for a ${context.role} position in the ${context.industry} industry.

Based on the conversation, provide detailed feedback including:

## Overall Performance Score: X/10

## Strengths
- List specific things the candidate did well
- Quote their strong responses when relevant

## Areas for Improvement
- Specific suggestions for better responses
- Missing elements they should have included

## Key Recommendations
1. Actionable tips for improving interview performance
2. Specific techniques or frameworks to use (STAR method, etc.)
3. Industry-specific advice

## Sample Better Responses
For the weakest answers, provide examples of how they could have responded better.

Be constructive, specific, and actionable in your feedback.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Interview AI error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
