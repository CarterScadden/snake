import { useEffect, useState } from "react";
import snake from "../../utils/snake/snake.func";

export default function Canvas() {
  const [canvasRoot, setCanvasRoot] = useState<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(32);
  const [fps, setfps] = useState(8);

  useEffect(() => {
    const stop = canvasRoot ? snake(canvasRoot, width, fps) : null;

    return () => {
      if (stop) {
        stop();
      }
    };
  }, [canvasRoot, width, fps]);

  return (
    <div
      className="bg-black w-screen h-screen"
      ref={(el): void => setCanvasRoot(el)}
    ></div>
  );
}
