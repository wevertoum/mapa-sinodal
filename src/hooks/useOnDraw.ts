import { useEffect, useRef } from "react";

type MouseListener = (e: MouseEvent) => void;

export const useOnDraw = (
  onDraw: (
    ctx: CanvasRenderingContext2D,
    point: Models.Coords,
    prevPoint: Models.Coords | null
  ) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPointRef = useRef<Models.Coords | null>(null);
  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef<MouseListener | null>(null);
  const mouseUpListenerRef = useRef<MouseListener | null>(null);

  useEffect(() => {
    const initMouseMoveListener = () => {
      const mouseMoveListener = (e: MouseEvent) => {
        if (isDrawingRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current?.getContext("2d");
          if (onDraw && point && ctx) {
            onDraw(ctx, point, prevPointRef.current);
            prevPointRef.current = point;
          }
        }
      };
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    };

    const initMouseUpListener = () => {
      const mouseUpListener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      };
      mouseUpListenerRef.current = mouseUpListener;
      window.addEventListener("mouseup", mouseUpListener);
    };

    const computePointInCanvas = (clientX: number, clientY: number) => {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      } else {
        return null;
      }
    };

    const removeListeners = () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    };

    initMouseMoveListener();
    initMouseUpListener();

    return () => {
      removeListeners();
    };
  }, [onDraw]);

  const setCanvasRef = (ref: HTMLCanvasElement) => {
    if (!ref) return;
    canvasRef.current = ref;
  };

  const onMouseDown = () => {
    isDrawingRef.current = true;
  };

  return { setCanvasRef, onMouseDown };
};
