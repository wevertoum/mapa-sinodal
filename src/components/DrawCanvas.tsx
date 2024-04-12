"use client";
import { useOnDraw } from "@/hooks/useOnDraw";
import { useCallback, useEffect, useState } from "react";

interface CanvasProps {
  disabled?: boolean;
  width: number;
  height: number;
  onChange?: (lines: Models.DrawedLine) => void;
  preferences?: {
    color: string;
    width: number;
  };
  drawedLines?: Models.DrawedLine[];
}

const DrawCanvas = ({
  disabled,
  width,
  height,
  onChange,
  preferences,
  drawedLines,
}: CanvasProps) => {
  const drawLine = (
    start: Models.Coords,
    end: Models.Coords,
    ctx: CanvasRenderingContext2D,
    color = "#000000",
    width = 5
  ) => {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const onDraw = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    prevPoint: Models.Coords | null,
    color?: string,
    width?: number
  ) => {
    if (prevPoint) {
      const newLine = {
        start: prevPoint,
        end: point,
        color,
        width,
      } as Models.DrawedLine;
      onChange?.(newLine);
      requestAnimationFrame(() => {
        drawLine(prevPoint, point, ctx, color, width);
      });
    }
  };

  const { setCanvasRef, onMouseDown } = useOnDraw(
    onDraw,
    drawedLines,
    preferences,
    disabled
  );

  return (
    <div
      className={`flex flex-col items-center ${
        disabled ? "cursor-not-allowed" : "cursor-crosshair"
      }`}
    >
      <canvas
        aria-disabled={disabled}
        className="border border-black"
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        ref={setCanvasRef}
      />
    </div>
  );
};

export default DrawCanvas;
