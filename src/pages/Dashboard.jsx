import { DashboardCard } from "../components/DashboardCard";
import { Sidebar } from "../components/Sidebar";
import { Navebar } from "../components/Navebar";

export const Dashboard = () => {
  return (
    <div>
      <Navebar />

      <div className="flex">
        <Sidebar />

        <div className="p-6 w-full bg-gray-100 min-h-screen">
          <h1 className="font-bold text-2xl mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="User" count="1200" />
            <DashboardCard title="Orders" count="400" />
            <DashboardCard title="Revenue" count="150k" />
            <DashboardCard title="Sales" count="320" />
          </div>
        </div>
      </div>
    </div>
  );
};
