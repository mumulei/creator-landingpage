export function createStepSequence({ onStep, onSettled, schedule = setTimeout, cancel = clearTimeout }) {
  let current = 0, target = 0, timer, disposed = false;
  const advance = () => {
    timer = undefined;
    if (disposed) return;
    if (current !== target) {
      current += Math.sign(target - current);
      onStep(current);
      timer = schedule(advance, 280);
    } else {
      onSettled(current);
    }
  };
  return {
    jump(value) {
      cancel(timer);timer=undefined;
      current=target=Math.min(4,Math.max(0,value));
      onStep(current);
    },
    target(value) {
      const next = Math.min(4, Math.max(0, value));
      if (next === target) return;
      target = next;
      if (timer === undefined) advance();
    },
    destroy() { disposed = true; cancel(timer); },
  };
}
