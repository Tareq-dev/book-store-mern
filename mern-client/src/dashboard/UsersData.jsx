import React from "react";
import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { updateUserRole } from "../utils/apiService";
function UsersData() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allUsers")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  const makeSeller = async (uid) => {
    const newRole = "seller";
    try {
      await updateUserRole(uid, newRole);
      setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uid === uid ? { ...user, role: newRole } : user
      )
    );
      alert("User role updated successfully");
    } catch (error) {
      // Handle error
      console.error("Error updating user role:", error);
    }
  };
  return (
    <div className="py-20">
      <Table className="lg:w-[800px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {allUsers.map((user, index) => (
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.username}
              </Table.Cell>

              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell className="flex gap-6">
                {user.role === "user" && (
                  <button
                    onClick={() => makeSeller(user.uid)}
                    className="bg-cyan-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  >
                    make seller
                  </button>
                )}
                <button
                  //   onClick={()=>makeSeller(uid)}
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}

export default UsersData;
