export default function AddressCard({
  address,
  title,
  description,
  fallbackText,
}: {
  address: string | undefined;
  title: string;
  description: string;
  fallbackText: string;
}) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 shadow-lg rounded-lg px-6 py-6 flex flex-col">
      <div className="mb-3">
        <span className="font-semibold text-lg text-white">{title}</span>
      </div>
      <div className="text-sm text-white/70 mb-4 leading-relaxed">
        {description}
      </div>
      <div className="flex-1"></div>
      {address ? (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
          <div className="font-mono text-xs break-all text-cyan-400">
            {address}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-white/60 text-sm italic">
          {fallbackText}
        </div>
      )}
    </div>
  );
}
