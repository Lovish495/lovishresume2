import { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { useAIInterview } from "@/hooks/useAIInterview";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { useToast } from "@/hooks/use-toast";
import { AIAvatar } from "@/components/bhansali/AIAvatar";
import { 
  Play, 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  Clock,
  Award,
  TrendingUp,
  Target,
  MessageSquare,
  Star,
  ChevronRight,
  User
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
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [interviewStartTime, setInterviewStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastSpokenRef = useRef<string>("");
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

  const { speak, stop: stopSpeaking, isSpeaking, isLoading: ttsLoading } = useTextToSpeech();
  const { createSession, updateMessages, completeSession, pastSessions } = useInterviewSession();

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

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, feedback]);

  // Timer for interview duration
  useEffect(() => {
    if (!interviewStartTime || feedback) return;

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - interviewStartTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [interviewStartTime, feedback]);

  // Speak AI responses automatically
  useEffect(() => {
    if (isMuted) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant" && !isLoading) {
      // Only speak if this is a new complete message
      if (lastMessage.content !== lastSpokenRef.current && lastMessage.content.length > 10) {
        lastSpokenRef.current = lastMessage.content;
        speak(lastMessage.content);
      }
    }
  }, [messages, isLoading, isMuted, speak]);

  // Update session messages
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      const formattedMessages = messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      }));
      updateMessages(sessionId, formattedMessages);
    }
  }, [messages, sessionId, updateMessages]);

  const handleStart = async () => {
    if (role && experience && industry) {
      const newSessionId = await createSession(role, experience, industry);
      setSessionId(newSessionId);
      setInterviewStartTime(new Date());
      lastSpokenRef.current = "";
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

  const handleEndCall = async () => {
    stopSpeaking();
    stopListening();
    endInterview();
  };

  const handleMuteToggle = () => {
    if (!isMuted) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  const handleNewInterview = () => {
    resetInterview();
    setSessionId(null);
    setInterviewStartTime(null);
    setElapsedTime(0);
    lastSpokenRef.current = "";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    const questionCount = messages.filter(m => m.role === "assistant").length;
    return Math.min((questionCount / 8) * 100, 100);
  };

  // Parse feedback for scores
  const parseScores = (feedbackText: string) => {
    const scores = {
      overall: 0,
      communication: 0,
      technical: 0,
      confidence: 0,
    };
    
    const overallMatch = feedbackText.match(/overall[:\s]*(\d+)/i);
    const commMatch = feedbackText.match(/communication[:\s]*(\d+)/i);
    const techMatch = feedbackText.match(/technical[:\s]*(\d+)/i);
    const confMatch = feedbackText.match(/confidence[:\s]*(\d+)/i);
    
    if (overallMatch) scores.overall = parseInt(overallMatch[1]);
    if (commMatch) scores.communication = parseInt(commMatch[1]);
    if (techMatch) scores.technical = parseInt(techMatch[1]);
    if (confMatch) scores.confidence = parseInt(confMatch[1]);
    
    // Default scores if not found
    if (scores.overall === 0) scores.overall = 75;
    if (scores.communication === 0) scores.communication = 70;
    if (scores.technical === 0) scores.technical = 72;
    if (scores.confidence === 0) scores.confidence = 68;
    
    return scores;
  };

  return (
    <>
      <Helmet>
        <title>AI Video Interview - BEPL Careers</title>
        <meta name="description" content="Practice your interview skills with our AI interviewer in a realistic video call environment" />
      </Helmet>

      <div className="min-h-screen bg-slate-950">
        {!isStarted && !feedback ? (
          /* Setup Screen */
          <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-4xl w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
                  <Video className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  AI Video Interview
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Experience a realistic interview simulation with our AI interviewer. Get real-time feedback and improvement suggestions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Setup Form */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Configure Your Interview</CardTitle>
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
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Video Interview
                    </Button>
                  </CardContent>
                </Card>

                {/* Past Sessions */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Past Interviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pastSessions.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No past interviews yet</p>
                        <p className="text-sm mt-1">Start your first interview to see history here</p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[280px]">
                        <div className="space-y-3">
                          {pastSessions.map((session) => (
                            <div
                              key={session.id}
                              className="p-3 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-slate-600 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-white font-medium">{session.role}</p>
                                  <p className="text-xs text-slate-400">{session.industry}</p>
                                </div>
                                {session.overall_score && (
                                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                                    {session.overall_score}%
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span>{new Date(session.started_at).toLocaleDateString()}</span>
                                {session.duration_seconds && (
                                  <span>{formatTime(session.duration_seconds)}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : feedback ? (
          /* Report Screen */
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white">Interview Report</h1>
                  <p className="text-slate-400">Performance analysis and improvement suggestions</p>
                </div>
                <Button onClick={handleNewInterview} className="bg-primary hover:bg-primary/90">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Interview
                </Button>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Overall", score: parseScores(feedback).overall, icon: Award, color: "text-yellow-400" },
                  { label: "Communication", score: parseScores(feedback).communication, icon: MessageSquare, color: "text-blue-400" },
                  { label: "Technical", score: parseScores(feedback).technical, icon: Target, color: "text-green-400" },
                  { label: "Confidence", score: parseScores(feedback).confidence, icon: TrendingUp, color: "text-purple-400" },
                ].map((item) => (
                  <Card key={item.label} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <item.icon className={`h-8 w-8 mx-auto mb-2 ${item.color}`} />
                      <p className="text-3xl font-bold text-white">{item.score}%</p>
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <Progress value={item.score} className="mt-2 h-1.5" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Interview Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{formatTime(elapsedTime)}</p>
                      <p className="text-sm text-slate-400">Duration</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{messages.filter(m => m.role === "assistant").length}</p>
                      <p className="text-sm text-slate-400">Questions Asked</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{role}</p>
                      <p className="text-sm text-slate-400">Target Role</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Feedback */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    Detailed Feedback & Improvement Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[50vh] pr-4">
                    <div className="prose prose-invert max-w-none">
                      {feedback.split("\n").map((line, i) => {
                        if (line.startsWith("## ")) {
                          return <h2 key={i} className="text-xl font-bold text-primary mt-6 mb-3 flex items-center gap-2">
                            <ChevronRight className="h-5 w-5" />
                            {line.replace("## ", "")}
                          </h2>;
                        }
                        if (line.startsWith("# ")) {
                          return <h1 key={i} className="text-2xl font-bold text-white mt-4 mb-4">{line.replace("# ", "")}</h1>;
                        }
                        if (line.startsWith("- ")) {
                          return <li key={i} className="text-slate-300 ml-4 mb-1">{line.replace("- ", "")}</li>;
                        }
                        if (line.match(/^\d+\. /)) {
                          return <li key={i} className="text-slate-300 ml-4 list-decimal mb-1">{line.replace(/^\d+\. /, "")}</li>;
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
            </div>
          </div>
        ) : (
          /* Video Call Interface */
          <div className="h-screen flex flex-col">
            {/* Top Bar */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-white font-medium">AI Video Interview - {role}</h1>
                <Badge variant="outline" className="text-slate-400 border-slate-600">
                  {experience}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Progress:</span>
                  <Progress value={calculateProgress()} className="w-32 h-2" />
                  <span className="text-sm text-slate-400">{Math.round(calculateProgress())}%</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
              {/* Video Area */}
              <div className="flex-1 relative bg-slate-950 p-4">
                {/* AI Avatar - Main View */}
                <div className="h-full flex items-center justify-center">
                  <AIAvatar 
                    isSpeaking={isSpeaking} 
                    className="w-full max-w-2xl aspect-video"
                  />
                </div>

                {/* User Video - Picture in Picture */}
                <div className="absolute top-6 right-6 w-48 h-36 rounded-lg overflow-hidden border-2 border-slate-700 bg-slate-800">
                  {isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center">
                        <User className="h-8 w-8 text-slate-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <VideoOff className="h-8 w-8 text-slate-500" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-xs text-white">
                    You
                  </div>
                  {isListening && (
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>

                {/* Live Caption */}
                {(isListening && transcript) && (
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-lg max-w-xl">
                    <p className="text-white text-center">{transcript}</p>
                  </div>
                )}

                {/* Current AI Message Caption */}
                {messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-lg max-w-2xl">
                    <p className="text-white text-center text-sm line-clamp-2">
                      {messages[messages.length - 1].content.slice(0, 200)}
                      {messages[messages.length - 1].content.length > 200 && "..."}
                    </p>
                  </div>
                )}
              </div>

              {/* Chat Sidebar */}
              <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
                <div className="p-3 border-b border-slate-800">
                  <h2 className="text-white font-medium">Chat</h2>
                </div>
                
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`${message.role === "user" ? "ml-auto text-right" : ""}`}
                      >
                        <div className="text-xs text-slate-500 mb-1">
                          {message.role === "user" ? "You" : "AI Interviewer"}
                        </div>
                        <div
                          className={`inline-block max-w-full rounded-lg px-3 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-slate-800 text-slate-100"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-xs">Typing...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-3 border-t border-slate-800">
                  {isListening && (
                    <div className="flex items-center gap-2 mb-2 p-2 rounded bg-red-500/10 border border-red-500/30">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs text-red-400">Listening...</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type or hold to speak..."
                      className="flex-1 min-h-[40px] max-h-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isLoading}
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Hold to speak, release to send
                  </p>
                </div>
              </div>
            </div>

            {/* Control Bar */}
            <div className="bg-slate-900 border-t border-slate-800 px-4 py-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full w-12 h-12 ${isMuted ? "bg-red-500/20 border-red-500 text-red-400" : "border-slate-600"}`}
                  onClick={handleMuteToggle}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full w-12 h-12 ${isListening ? "bg-green-500/20 border-green-500 text-green-400 animate-pulse" : "border-slate-600"}`}
                  onClick={handleVoiceToggle}
                  title={isSupported ? (isListening ? "Stop recording" : "Start voice input") : "Voice input not supported"}
                >
                  {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full w-12 h-12 ${!isVideoOn ? "bg-red-500/20 border-red-500 text-red-400" : "border-slate-600"}`}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>

                <Button
                  className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
                  onClick={handleEndCall}
                  disabled={isLoading || messages.length < 2}
                >
                  <PhoneOff className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 border-slate-600"
                  onClick={handleNewInterview}
                  title="End and restart"
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
