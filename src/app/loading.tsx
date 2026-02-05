export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background text-foreground dark:bg-background dark:text-foreground">
      <div className="flex flex-col items-center gap-4">
        <div
          aria-label="Loading"
          className="size-12 animate-spin rounded-full border-2 border-primary border-t-transparent dark:border-primary"
          role="status"
        />
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
          Loading…
        </p>
      </div>
    </div>
  );
}
