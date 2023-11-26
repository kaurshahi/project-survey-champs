const Notification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-3 text-center">
      {message}
      <button onClick={onClose} className="text-lg ml-4">
        ✕
      </button>
    </div>
  );
};

export default Notification;
