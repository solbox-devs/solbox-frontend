"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useRef } from "react";

interface EarningPieChartProps {
  percentage: number;
}

export default function EarningPieChart({ percentage }: EarningPieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const size = 120;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Center of the circle
    const centerX = size / 2;
    const centerY = size / 2;

    // Outer radius for the progress ring
    const outerRadius = 45;
    const innerRadius = 35;

    // Background circle (dark fill)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 7, 0, Math.PI * 2);
    ctx.fillStyle = "#0F2C3A";
    ctx.fill();

    // Calculate angles for the progress arc
    const startAngle = Math.PI * 1.5; // Start from top (90 degrees in radians)
    const endAngle = startAngle + (Math.PI * 2 * percentage) / 100;

    // Create gradient for the progress arc
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#9D48C7");
    gradient.addColorStop(0.5, "#615FFF");
    gradient.addColorStop(1, "#275165");

    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw remaining arc (empty space)
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, endAngle, startAngle + Math.PI * 2);
    ctx.arc(
      centerX,
      centerY,
      innerRadius,
      startAngle + Math.PI * 2,
      endAngle,
      true
    );
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fill();
  }, [percentage]);

  return (
    <div className="relative w-[120px] h-[120px]">
      <canvas ref={canvasRef} className="w-[120px] h-[120px]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <ChevronUp className="h-3 w-3 mx-auto text-white" />
        <p className="text-sm font-bold text-white">{percentage}%</p>
      </div>
    </div>
  );
}
