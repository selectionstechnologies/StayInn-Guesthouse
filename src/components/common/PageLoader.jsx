export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream" role="status" aria-label="Loading page">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-100 border-t-primary" />
    </div>
  );
}
