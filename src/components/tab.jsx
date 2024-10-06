const Tab = ({ label, isActive, onClick }) => {
  return (
    <>
      <li className="me-2">
        <button
          onClick={onClick}
          className={`inline-block p-4 border-b-2 rounded-t-lg ${
            isActive
              ? "text-purple-700 border-purple-700 dark:text-purple-500 dark:border-purple-500"
              : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          }`}
        >
          {label}
        </button>
      </li>
    </>
  );
};
export default Tab;
