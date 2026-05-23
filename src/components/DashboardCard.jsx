export const DashboardCard = ({ title, count }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-gray-500 text-lg">{title}</h2>
      <h1 className="text-3xl font-bold mt-2">{count}</h1>
    </div>
  );
};
