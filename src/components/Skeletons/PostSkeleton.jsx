export default function PostSkeleton() {
    return (
      <div className="bg-white rounded-2xl shadow p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
  
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-20 h-3 bg-gray-200 rounded" />
          </div>
        </div>
  
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  