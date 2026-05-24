export default function ErrorMessage({message,}) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
      {message}
    </div>
  );
}