export const Sidebar = () => {
  const menu = ["Home", "Dashboard", "Users", "Settings"];
  return (
    <div className="flex flex-col gap-4 min-h-screen w-64 p-4 bg-gray-100 shadow-md rounded-r-2xl">
      <h2 className="bg-gray-400 p-2 text-center text-xl font-bold border-b pb-2">
        Admin Panel
      </h2>
      
      {menu.map((item) => (
        <div
          className="hover:bg-gray-200 cursor-pointer p-2 rounded-lg transition-all duration-200"
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
