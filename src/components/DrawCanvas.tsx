"use client";
import { useOnDraw } from "@/hooks/useOnDraw";

interface CanvasProps {
  width: number;
  height: number;
}

const DrawCanvas = ({ width, height }: CanvasProps) => {
  const drawLine = (
    start: Models.Coords,
    end: Models.Coords,
    ctx: CanvasRenderingContext2D,
    color: string,
    width = 1
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
    prevPoint: Models.Coords | null
  ) => {
    if (prevPoint) {
      drawLine(prevPoint, point, ctx, "#ffffff", 5);
    }
  };

  const { setCanvasRef, onMouseDown } = useOnDraw(onDraw);

  return (
    <canvas
      className="border border-black"
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      ref={setCanvasRef}
      onChange={(e) => console.log(e)}
    />
  );
};

export default DrawCanvas;
