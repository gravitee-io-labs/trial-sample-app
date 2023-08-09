export default function NoData({
  message,
  className = "w-full text-center text-xl font-semibold",
}) {
  return (
    <div className="flex justify-center py-12">
      <p className={className}>{message}</p>
    </div>
  );
}
