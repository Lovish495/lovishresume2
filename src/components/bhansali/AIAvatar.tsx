import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AIAvatarProps {
  isSpeaking: boolean;
  className?: string;
}

export function AIAvatar({ isSpeaking, className }: AIAvatarProps) {
  const [blinkState, setBlinkState] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth animation when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(0);
      return;
    }

    const mouthInterval = setInterval(() => {
      setMouthOpen(Math.random() * 0.8 + 0.2);
    }, 100);

    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  // Draw avatar on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 - 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const gradient = ctx.createRadialGradient(centerX, centerY + 100, 0, centerX, centerY + 100, 400);
    gradient.addColorStop(0, "#1e3a5f");
    gradient.addColorStop(1, "#0f172a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Body/Shirt
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath();
    ctx.ellipse(centerX, height + 50, 180, 200, 0, Math.PI, 0);
    ctx.fill();

    // Collar
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.moveTo(centerX - 40, height - 80);
    ctx.lineTo(centerX, height - 40);
    ctx.lineTo(centerX + 40, height - 80);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillStyle = "#d4a574";
    ctx.fillRect(centerX - 30, centerY + 80, 60, 60);

    // Face
    ctx.fillStyle = "#e0b088";
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 85, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 50, 90, 60, 0, Math.PI, 0);
    ctx.fill();
    
    // Side hair
    ctx.beginPath();
    ctx.ellipse(centerX - 75, centerY - 20, 20, 50, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 75, centerY - 20, 20, 50, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = "#e0b088";
    ctx.beginPath();
    ctx.ellipse(centerX - 85, centerY, 15, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 85, centerY, 15, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    const eyeY = centerY - 10;
    const eyeOffset = 30;
    const eyeHeight = blinkState ? 2 : 15;

    // Eye whites
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(centerX - eyeOffset, eyeY, 20, eyeHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + eyeOffset, eyeY, 20, eyeHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    if (!blinkState) {
      // Irises
      ctx.fillStyle = "#4a3728";
      ctx.beginPath();
      ctx.ellipse(centerX - eyeOffset, eyeY, 10, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + eyeOffset, eyeY, 10, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupils
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.ellipse(centerX - eyeOffset, eyeY, 5, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + eyeOffset, eyeY, 5, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye shine
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(centerX - eyeOffset - 3, eyeY - 3, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + eyeOffset - 3, eyeY - 3, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Eyebrows
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    
    ctx.beginPath();
    ctx.moveTo(centerX - eyeOffset - 20, eyeY - 25);
    ctx.quadraticCurveTo(centerX - eyeOffset, eyeY - 30, centerX - eyeOffset + 15, eyeY - 25);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + eyeOffset - 15, eyeY - 25);
    ctx.quadraticCurveTo(centerX + eyeOffset, eyeY - 30, centerX + eyeOffset + 20, eyeY - 25);
    ctx.stroke();

    // Glasses
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 3;
    
    // Left lens
    ctx.beginPath();
    ctx.roundRect(centerX - eyeOffset - 28, eyeY - 22, 56, 44, 8);
    ctx.stroke();
    
    // Right lens
    ctx.beginPath();
    ctx.roundRect(centerX + eyeOffset - 28, eyeY - 22, 56, 44, 8);
    ctx.stroke();
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(centerX - eyeOffset + 28, eyeY);
    ctx.lineTo(centerX + eyeOffset - 28, eyeY);
    ctx.stroke();

    // Nose
    ctx.strokeStyle = "#c9956a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.quadraticCurveTo(centerX + 10, centerY + 25, centerX, centerY + 30);
    ctx.stroke();

    // Mouth
    const mouthY = centerY + 50;
    ctx.fillStyle = "#c9544a";
    
    if (isSpeaking && mouthOpen > 0.3) {
      // Open mouth when speaking
      ctx.beginPath();
      ctx.ellipse(centerX, mouthY, 20, 8 + mouthOpen * 12, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Teeth
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(centerX, mouthY - 3, 15, 4, 0, 0, Math.PI);
      ctx.fill();
    } else {
      // Closed/slight smile
      ctx.strokeStyle = "#c9544a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - 25, mouthY);
      ctx.quadraticCurveTo(centerX, mouthY + 10, centerX + 25, mouthY);
      ctx.stroke();
    }

    // Mustache
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.moveTo(centerX - 35, centerY + 38);
    ctx.quadraticCurveTo(centerX - 20, centerY + 45, centerX, centerY + 40);
    ctx.quadraticCurveTo(centerX + 20, centerY + 45, centerX + 35, centerY + 38);
    ctx.quadraticCurveTo(centerX + 25, centerY + 42, centerX, centerY + 38);
    ctx.quadraticCurveTo(centerX - 25, centerY + 42, centerX - 35, centerY + 38);
    ctx.fill();

    // Speaking indicator glow
    if (isSpeaking) {
      ctx.shadowColor = "#22c55e";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(width - 30, height - 30, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

  }, [blinkState, mouthOpen, isSpeaking]);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={400}
        height={450}
        className="w-full h-full object-cover rounded-lg"
      />
      {/* Name tag */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-md">
        <span className="text-white text-sm font-medium">AI Interviewer</span>
      </div>
      {/* Status indicator */}
      <div className={cn(
        "absolute bottom-4 right-4 w-3 h-3 rounded-full",
        isSpeaking ? "bg-green-500 animate-pulse" : "bg-green-500"
      )} />
    </div>
  );
}
