export default function use60Fps(
  callback: (timestamp: number, frame: number) => void
) {
  const delay = 1000 / 60;
  let previousTimeStamp: number | null = null;
  let frame = -1;
  let paused = false;

  let frameID = requestAnimationFrame(function loop(timestamp: number): void {
    if (!paused) {
      if (previousTimeStamp == null) previousTimeStamp = timestamp;
      const calculatedFrame = Math.floor(
        (timestamp - previousTimeStamp) / delay
      );

      if (calculatedFrame > frame) {
        frame = calculatedFrame;
        callback(timestamp, frame);
      }
    }

    frameID = requestAnimationFrame(loop);
  });

  const monad = {
    stop() {
      cancelAnimationFrame(frameID);
      return monad;
    },
    resume() {
      paused = false;
      return monad;
    },
    pause() {
      paused = true;
      return monad;
    },
    useAnimationFrameID<t = unknown>(getter: (frameid: number) => t) {
      getter(frameID);
      return monad;
    },
    useFrame<t = unknown>(getter: (frame: number) => t) {
      getter(frame);
      return monad;
    },
    useDelay<t = unknown>(getter: (delay: number) => t) {
      getter(delay);
      return monad;
    },
    usePreviousTimeStamp<t = unknown>(
      getter: (previousTimeStamp: number) => t
    ) {
      getter(previousTimeStamp);
      return monad;
    },
  };

  return monad;
}
