import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const DataTable = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.gender) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
      };
      setData([...data, newItem]);
      setFormData({
        name: "",
        age: "",
        gender: "",
      });
    }
  };
  const handleDel = (id) => {
    const filterVal = data.filter((item) => item.id !== id);
    setData(filterVal);
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setEditId(id);
    setFormData({
      name: itemToEdit.name,
      age: itemToEdit.age,
      gender: itemToEdit.gender,
    });
  };

  // Save edited changes
  const handleSaveEdit = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...formData } : item
    );
    setData(updatedData);
    setEditId(null);
    setFormData({ name: "", age: "", gender: "" });
  };
  return (
    <div className="overflow-x-auto">
      <header className="p-10">
        <nav className="grid place-items-center">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="grid shadow-2xl grid-cols-4 gap-5 p-3 rounded-lg bg-white"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="enter name..."
              className="input"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              name="age"
              value={formData.age}
              placeholder="enter age..."
              className="input"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              placeholder="enter gender"
              className="input"
              onChange={handleChangeInput}
            />
            <button className="btn btn-primary">
              {editId ? "Save" : "Add"}
            </button>
          </form>
        </nav>
      </header>
      <table className="table table-zebra-zebra">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((data) => (
            <tr key={data.id}>
              <td className="text-xl font-bold text-blue-700 capitalize">{data.name}</td>
              <td className="text-xl font-bold text-red-700 capitalize">{data.gender}</td>
              <td className="text-xl font-bold text-gray-500">{data.age}</td>
              <td>
                {editId === data.id ? (
                  <button
                    className="btn btn-success mx-5"
                    onClick={() => handleSaveEdit(data.id)}
                  >
                    save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning mx-5"
                    onClick={() => handleEdit(data.id)}
                  >
                    edit
                  </button>
                )}
                <button
                  className="btn btn-error"
                  onClick={() => handleDel(data.id)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
