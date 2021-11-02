import { useEffect, useState } from "react";
import startCanvas from "../../utils/startCanvas.func";

export default function Canvas() {
  const [canvasRoot, setCanvasRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const stop = canvasRoot ? startCanvas(canvasRoot) : null;

    return () => {
      if (stop) {
        stop();
      }
    };
  }, [canvasRoot]);

  return (
    <div
      className="bg-black w-screen h-screen"
      ref={(el): void => setCanvasRoot(el)}
    ></div>
  );
}
