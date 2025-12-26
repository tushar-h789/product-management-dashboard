import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-purple-700 animate-spin" />
            <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-700 animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we load the content</p>
      </div>
    </div>
  );
}
