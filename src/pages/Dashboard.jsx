import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DashboardCard } from "../components/DashboardCard";
import { Sidebar } from "../components/Sidebar";
import { Navebar } from "../components/Navebar";
import { MdDeleteOutline, MdEdit, MdSave } from "react-icons/md";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const timeoutRef = useRef(null);
  const timer = useRef(null);

  const usersPerPage = 10;
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;

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

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await axios.get("https://dummyjson.com/users");

        setUserData(response.data.users);
      } catch (err) {
        console.log(err);
        setError("Error occured");
      } finally {
        setLoading(false);
      }
    };

    timeoutRef.current = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [search]);

  const tableHeading = ["Name", "Email", "Gender", "Role", "Action"];

  const filteredUsers = userData.filter((user) =>
    user.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);

  const totalPage = Math.ceil(filteredUsers.length / usersPerPage);
  const handleDelete = (id) => {
    const updateUsers = userData.filter((user) => user.id !== id);
    setUserData(updateUsers);
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditName(user.firstName);
  };

  const handleSave = (id) => {
    const updatedUsers = userData.map((user) =>
      user.id === id ? { ...user, firstName: editName } : user,
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
                {error ? (
                  <tr>
                    <td colSpan="5">{error}</td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
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
                          user.firstName
                        )}
                      </td>
                      <td className="border p-3">{user.email}</td>

                      <td
                        className={`border p-3 ${user.gender === "male" ? "text-green-600" : "text-red-600"}  `}
                      >
                        {user.gender}
                      </td>
                      <td className="border p-3">{user.company.title}</td>
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
                  ))
                )}
              </tbody>
            </table>

            <div className="m-4 flex gap-4 justify-between ">
              <button
                className="border p-1 px-4  bg-red-200 rounded shadow-md cursor-pointer"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <p>Page{currentPage}</p>

              <button
                className="border p-1 px-4  bg-green-200 rounded  shadow-md  cursor-pointer"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
