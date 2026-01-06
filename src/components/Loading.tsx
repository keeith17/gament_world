export default function Loading({ message = "로딩 중..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-400 mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg">{message}</p>
      </div>
    </div>
  );
}
