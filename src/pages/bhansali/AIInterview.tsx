import { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIInterview } from "@/hooks/useAIInterview";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  CheckCircle,
  Loader2,
  Brain,
  Target,
  Clock,
  Award
} from "lucide-react";

const roles = [
  "Chemical Engineer",
  "Process Engineer", 
  "Quality Analyst",
  "R&D Scientist",
  "Production Manager",
  "Safety Officer",
  "Lab Technician",
  "Plant Manager",
  "Sales Manager - Chemicals",
  "Supply Chain Manager",
  "Environmental Engineer",
  "Maintenance Engineer",
];

const experienceLevels = [
  "Fresher (0-1 years)",
  "Entry Level (1-3 years)",
  "Mid Level (3-5 years)",
  "Senior Level (5-10 years)",
  "Expert Level (10+ years)",
];

const industries = [
  "Chemicals & Petrochemicals",
  "Pharmaceuticals",
  "FMCG",
  "Manufacturing",
  "Energy & Utilities",
  "Automotive",
  "Textiles",
  "Food Processing",
];

export default function AIInterview() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [industry, setIndustry] = useState("");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    messages,
    isLoading,
    isStarted,
    feedback,
    startInterview,
    sendMessage,
    endInterview,
    resetInterview,
  } = useAIInterview();

  const handleVoiceResult = useCallback((transcript: string) => {
    setInput(prev => prev + (prev ? " " : "") + transcript);
  }, []);

  const { 
    isListening, 
    transcript, 
    isSupported, 
    toggleListening,
    stopListening 
  } = useSpeechRecognition({
    onResult: handleVoiceResult,
    continuous: true,
    language: "en-US",
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, feedback]);

  // Update input with interim transcript while speaking
  useEffect(() => {
    if (isListening && transcript) {
      // Show interim results in a lighter way
    }
  }, [isListening, transcript]);

  const handleStart = () => {
    if (role && experience && industry) {
      startInterview({ role, experience, industry });
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      if (isListening) {
        stopListening();
      }
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (!isSupported) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Please use Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }
    toggleListening();
  };

  return (
    <Layout>
      <Helmet>
        <title>AI Interview Practice - BEPL Careers</title>
        <meta name="description" content="Practice your interview skills with our AI interviewer and get instant feedback" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              AI Interview Practice
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Practice with our AI interviewer and get instant feedback to improve your performance
            </p>
          </div>

          {!isStarted && !feedback ? (
            /* Setup Card */
            <Card className="max-w-xl mx-auto bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Configure Your Interview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Target Role</label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Experience Level</label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((e) => (
                        <SelectItem key={e} value={e}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Industry</label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleStart}
                  disabled={!role || !experience || !industry}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Interview
                </Button>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700">
                  <div className="text-center">
                    <Target className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-slate-400">Role-specific Questions</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-slate-400">Real-time Feedback</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-slate-400">Performance Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : feedback ? (
            /* Feedback View */
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Interview Feedback
                </CardTitle>
                <Button variant="outline" onClick={resetInterview}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Interview
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="prose prose-invert max-w-none">
                    {feedback.split("\n").map((line, i) => {
                      if (line.startsWith("## ")) {
                        return <h2 key={i} className="text-xl font-bold text-primary mt-6 mb-3">{line.replace("## ", "")}</h2>;
                      }
                      if (line.startsWith("# ")) {
                        return <h1 key={i} className="text-2xl font-bold text-white mt-4 mb-4">{line.replace("# ", "")}</h1>;
                      }
                      if (line.startsWith("- ")) {
                        return <li key={i} className="text-slate-300 ml-4">{line.replace("- ", "")}</li>;
                      }
                      if (line.match(/^\d+\. /)) {
                        return <li key={i} className="text-slate-300 ml-4 list-decimal">{line.replace(/^\d+\. /, "")}</li>;
                      }
                      if (line.trim()) {
                        return <p key={i} className="text-slate-300 mb-2">{line}</p>;
                      }
                      return null;
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            /* Interview Chat */
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Info Sidebar */}
              <Card className="lg:col-span-1 bg-slate-800/50 border-slate-700 h-fit">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400">Role</p>
                    <Badge variant="secondary" className="mt-1">{role}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Experience</p>
                    <Badge variant="secondary" className="mt-1">{experience}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Industry</p>
                    <Badge variant="secondary" className="mt-1">{industry}</Badge>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Questions Asked</p>
                    <p className="text-2xl font-bold text-white">
                      {messages.filter(m => m.role === "assistant").length}
                    </p>
                  </div>
                  <Button 
                    onClick={endInterview} 
                    variant="outline" 
                    className="w-full"
                    disabled={isLoading || messages.length < 2}
                  >
                    End & Get Feedback
                  </Button>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">AI Interviewer</CardTitle>
                      <p className="text-xs text-slate-400">
                        {isLoading ? "Thinking..." : "Online"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[50vh] p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-slate-700 text-slate-100"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-60 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && messages[messages.length - 1]?.role === "user" && (
                        <div className="flex justify-start">
                          <div className="bg-slate-700 rounded-2xl px-4 py-3">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t border-slate-700">
                    {/* Voice indicator */}
                    {isListening && (
                      <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm text-red-400">Listening... Speak now</span>
                        {transcript && (
                          <span className="text-sm text-slate-400 ml-2 italic">"{transcript}"</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleVoiceToggle}
                        className={isListening ? "bg-red-500/20 border-red-500 text-red-400" : ""}
                        title={isSupported ? (isListening ? "Stop recording" : "Start voice input") : "Voice input not supported"}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={isListening ? "Listening... or type here" : "Type or click mic to speak..."}
                        className="min-h-[44px] max-h-32 bg-slate-900 border-slate-600 text-white resize-none"
                        disabled={isLoading}
                      />
                      <Button 
                        onClick={handleSend} 
                        disabled={!input.trim() || isLoading}
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      {isSupported 
                        ? "Click mic to speak, Enter to send, Shift+Enter for new line"
                        : "Enter to send, Shift+Enter for new line"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
