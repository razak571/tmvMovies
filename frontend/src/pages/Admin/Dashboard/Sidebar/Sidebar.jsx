import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen fixed bg-gray-900 text-white shadow-lg">
      <aside className="w-64 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/movies/dashboard"
              className="-translate-x-10 block p-3 bg-gradient-to-b bg-teal-400 hover:from-orange-500 to-orange-300 rounded-full text-center"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies/create"
              className="-translate-x-10  block p-3 bg-gradient-to-b from-green-500 to-lime-400 rounded-full text-center hover:bg-gradient-to-b hover:from-orange-500 hover:to-orange-300"
            >
              Create Movie
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies/genre"
              className="-translate-x-10 block p-3 bg-gradient-to-b  rounded-full text-center hover:bg-gradient-to-b bg-teal-400 hover:from-orange-500 to-orange-300"
            >
              Create Genre
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies-list"
              className="-translate-x-10 block p-3 bg-gradient-to-b from-green-500 to-lime-400 rounded-full text-center hover:bg-gradient-to-b hover:from-orange-500 hover:to-orange-300"
            >
              Update Movie
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies/comments"
              className="-translate-x-10 block p-3 bg-gradient-to-b from-orange-500 to-orange-300 rounded-full text-center hover:bg-gradient-to-b hover:from-green-600 hover:to-lime-500"
            >
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
