"use client";

import { useState } from "react";
// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import { api } from "@/trpc/server";
// import { api } from "@/trpc/client";
import { api } from "@/trpc/react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const getAllUsers = api.user.getAllUsers.useQuery();
  const fetchAllUsers = api.user.getAllUsers.useQuery();
  const fetchOneUser = api.user.getUserById.useQuery(
    { id: userId },
    { enabled: !!userId },
  );
  const createUser = api.user.createUser.useMutation();
  const updateUser = api.user.updateUser.useMutation();
  const deleteUser = api.user.deleteUser.useMutation();

  const handleCreateUser = async () => {
    try {
      await createUser.mutateAsync({ name, email });
      setName("");
      setEmail("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const handleUpdateUser = async () => {
    try {
      await updateUser.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUser.mutateAsync({ id: userIdToDelete });
      setUserIdToDelete("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleFetchUser = async () => {
    try {
      await fetchOneUser.refetch();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      <div className="mx-auto p-8">
        {/* Get all users */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
          <button
            className="hover: rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => fetchAllUsers.refetch()}
          >
            Get All Users
          </button>
          <div className="mt-4 mb-4 grid grid-cols-3 gap-4 font-bold text-gray-700">
            <p>ID</p>
            <p>Name</p>
            <p>Email</p>
          </div>
          {fetchAllUsers.isLoading && <p>Loading...</p>}
          {fetchAllUsers.isError && (
            <p>Error: {fetchAllUsers.error?.message}</p>
          )}
          {fetchAllUsers &&
            fetchAllUsers.data?.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-3 gap-4 rounded border-b py-2"
              >
                <p>{user.id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            ))}
        </div>
        {/* Get one user */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Get User By ID</h2>
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(String(e.target.value))}
              className="mr-2 w-1/3 rounded border px-4 py-2"
            />
            <button
              className="hover: rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => fetchOneUser.refetch()}
            >
              Get User
            </button>
          </div>
          {fetchOneUser.isLoading && <p>Loading...</p>}
          {fetchOneUser.isError && <p>Error: {fetchOneUser.error?.message}</p>}
          {fetchOneUser.data && (
            <div className="grid grid-cols-3 gap-4 rounded border-b py-2">
              <p>{fetchOneUser.data.id}</p>
              <p>{fetchOneUser.data.name}</p>
              <p>{fetchOneUser.data.email}</p>
            </div>
          )}
        </div>
        {/* Create user */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Create User</h2>
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(String(e.target.value))}
              className="mr-2 w-1/3 rounded border px-4 py-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(String(e.target.value))}
              className="mr-2 w-1/3 rounded border px-4 py-2"
            />
            <button
              className="hover: rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => handleCreateUser()}
            >
              Create User
            </button>
          </div>
        </div>
      </div>

      {/* Update a user */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="User ID"
            value={userIdToUpdate}
            onChange={(e) => setUserIdToUpdate(String(e.target.value))}
            className="mr-2 w-1/3 rounded border px-4 py-2"
          />
          <input
            type="text"
            placeholder="Name"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(String(e.target.value))}
            className="mr-2 w-1/3 rounded border px-4 py-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(String(e.target.value))}
            className="mr-2 w-1/3 rounded border px-4 py-2"
          />
          <button
            className="hover: rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => handleUpdateUser()}
          >
            Update User
          </button>
        </div>
      </div>
      {/* Delete a user */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="User ID"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(String(e.target.value))}
            className="mr-2 w-1/3 rounded border px-4 py-2"
          />
          <button
            className="hover: rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => handleDeleteUser()}
          >
            Delete User
          </button> 
        </div>
        {deleteUser.isMutating && <p>Loading...</p>}
        {deleteUser.isError && (
          <p>Error: {deleteUser.error?.message}</p>
        )}
        {deleteUser.isSuccess && (
          <p>User deleted successfully!</p>
        )}  

      </div>

      <div>Hello</div>
    </>
  );
}
