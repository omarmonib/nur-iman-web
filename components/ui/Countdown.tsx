export default function Countdown({ seconds }: { seconds: number }) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        inline-block
        mt-1
        px-3 py-1
        rounded-sm
        font-sans font-bold
        text-secondary-foreground
        bg-card-foreground/40
        shadow
        w-24
        text-center
      "
    >
      {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </div>
  );
}
