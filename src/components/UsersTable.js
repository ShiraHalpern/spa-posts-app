import React from "react";
import "./usersTable.css";
import { Link } from "react-router-dom";
export default function UsersTable({ data }) {
  const columns = [
    { id: 0, heading: "Name", name: "name" },
    { id: 1, heading: "Email", name: "email" },
    { id: 2, heading: "Company Name", name: "company.name" },
  ];
  return (
    <>
      <table cellPadding={5} cellSpacing={5}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id}>{col.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
