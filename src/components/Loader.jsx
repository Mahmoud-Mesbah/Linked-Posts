import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <Loader2
        className="animate-spin text-blue-600"
        size={40}
      />
    </div>
  );
}