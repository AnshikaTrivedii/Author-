import { cn } from "@/lib/utils";

export function FilmFrame({
  className,
  inset = "inset-4 sm:inset-6 lg:inset-8",
}: {
  className?: string;
  inset?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-10", inset, className)}
    >
      <span className="absolute top-0 left-0 h-7 w-7 border-t border-l border-gilt/70 sm:h-10 sm:w-10" />
      <span className="absolute top-0 right-0 h-7 w-7 border-t border-r border-gilt/70 sm:h-10 sm:w-10" />
      <span className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-gilt/70 sm:h-10 sm:w-10" />
      <span className="absolute right-0 bottom-0 h-7 w-7 border-r border-b border-gilt/70 sm:h-10 sm:w-10" />
    </div>
  );
}
