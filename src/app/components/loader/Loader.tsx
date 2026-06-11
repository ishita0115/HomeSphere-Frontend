export default function CircularIndeterminate() {
  return (
    <div className="flex items-center justify-center" style={{ height: "50vh" }}>
      <div className="w-10 h-10 rounded-full border-4 border-navy-100 border-t-primary animate-spin" />
    </div>
  );
}
