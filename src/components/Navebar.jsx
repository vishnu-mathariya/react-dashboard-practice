export const Navebar = () => {
  return (
    <div className="border m-4 flex gap-2 justify-between items-center p-4 shadow-md rounded-2xl flex-col md:flex-row ">
      <div className="justify-between flex gap-4 items-center ">
        <img
          src="/logoImage/logoImage.jpg"
          alt="logo"
          className="max-h-16 rounded-2xl "
        />
        <input
          className="border w-full md:w-96 p-2 rounded-lg  outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>

      <div >
        <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
          Profile
        </button>
      </div>
    </div>
  );
};
