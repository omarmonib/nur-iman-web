export default function AzkarLoading() {
  return (
    <div className="container py-6 flex flex-col items-center animate-pulse">
      <div className="mb-6 max-w-3xl w-full border rounded-lg p-6 bg-muted/50">
        <div className="h-8 bg-muted rounded w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-muted rounded w-full mb-2" />
        <div className="h-4 bg-muted rounded w-5/6 mx-auto mb-4" />
        <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
      </div>

      <div className="flex gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 w-36 bg-muted rounded-xl" />
        ))}
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border bg-card flex flex-col gap-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6 mr-auto" />
            <div className="h-4 bg-muted rounded w-4/6 mr-auto" />
            <div className="flex justify-end gap-2 mt-1">
              <div className="h-7 w-16 bg-muted rounded" />
              <div className="h-7 w-16 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
