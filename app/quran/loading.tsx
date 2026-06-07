export default function QuranLoading() {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      <div className="h-9 w-64 bg-muted rounded mx-auto mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="p-4 border rounded flex flex-col gap-2">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
