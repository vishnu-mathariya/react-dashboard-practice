import { useEffect, useState } from "react";
import { DashboardCard } from "../components/DashboardCard";
import { Sidebar } from "../components/Sidebar";
import { Navebar } from "../components/Navebar";
import { MdDeleteOutline, MdEdit, MdSave } from "react-icons/md";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");

  const [userData, setUserData] = useState([
    {
      id: 1,
      name: "Vishnu",
      email: "Vishnu@gmail.com",
      status: "Active",
      role: "Admin",
    },

    {
      id: 2,
      name: "Bharat",
      email: "bharat@gmail.com",
      status: "Inactive",
      role: "Admin",
    },

    {
      id: 3,
      name: "Kunj",
      email: "kishnu@gmail.com",
      status: "Active",
      role: "Admin",
    },

    {
      id: 4,
      name: "Jassi",
      email: "jassiu@gmail.com",
      status: "Inactive",
      role: "Admin",
    },
  ]);

  const cardData = [
    {
      id: 1,
      title: "User",
      count: "1200",
    },
    {
      id: 2,
      title: "Order",
      count: "450",
    },
    {
      id: 3,
      title: "Revenue",
      count: "150k",
    },
    {
      id: 4,
      title: "Sales",
      count: "120",
    },
  ];


  useEffect(()=>{
    
  },[])

  const tableHeading = ["Name", "Email", "Status", "Role", "Action"];

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    const updateUsers = userData.filter((user) => user.id !== id);
    setUserData(updateUsers);
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditName(user.name);
  };

  const handleSave = (id) => {
    const updatedUsers = userData.map((user) =>
      user.id === id ? { ...user, name: editName } : user,
    );

    setUserData(updatedUsers);
    setEditUserId(null);
  };
  return (
    <div>
      <Navebar search={search} setSearch={setSearch} />

      <div className="flex">
        <Sidebar />

        <div className="p-6 w-full bg-gray-100 min-h-screen ">
          <h1 className="font-bold text-2xl mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((data) => (
              <DashboardCard
                key={data.id}
                title={data.title}
                count={data.count}
              />
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md mt-8  overflow-x-auto">
            <h2 className="font-bold text-xl mb-4">User Table</h2>
            <table>
              <thead className="bg-gray-200">
                <tr>
                  {tableHeading.map((heading) => (
                    <th className="p-3 border text-left" key={heading}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-3">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border p-2 rounded"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="border p-3">{user.email}</td>

                    <td
                      className={`border p-3 ${user.status === "Active" ? "text-green-600" : "text-red-600"}  `}
                    >
                      {user.status}
                    </td>
                    <td className="border p-3">{user.role}</td>
                    <td className="border p-3">
                      <button
                        className=" cursor-pointer text-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEdit(user)}
                      >
                        <MdEdit />
                      </button>

                      {editUserId === user.id && (
                        <button
                          className="cursor-pointer "
                          onClick={() => handleSave(user.id)}
                        >
                          <MdSave />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
