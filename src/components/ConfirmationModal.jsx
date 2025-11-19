export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-card p-6 rounded-2xl shadow-lg border border-white/10 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-text">{title}</h3>
        <p className="text-subtle mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}