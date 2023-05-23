"use client";

import React, { useState } from "react";
import DataViz from "../../../components/DataViz";

const initialData = [
  { label: "A", value: 10 },
  { label: "B", value: 15 },
  { label: "C", value: 50 },
];

export default function Example1() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ label: "", value: "" });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newData = { label: form.label, value: Number(form.value) };
    setData([...data, newData]);
    setForm({ label: "", value: "" }); // clear the form
  };

  const clearData = () => {
    setData([]); // clear the data
  };

  const deleteData = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const options = {
    color: "#0088FE",
    label: "label",
  };

  return (
    <div>
      <h1>Example 1</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Label:
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Value:
          <input
            type="number"
            name="value"
            value={form.value}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Add Data" />
      </form>
      <button onClick={clearData}>Clear Data</button>
      <DataViz
        data={data}
        options={options}
        type="pie"
        width={400}
        height={500}
      />

      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.value}</td>
              <td>
                <button onClick={() => deleteData(index)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
