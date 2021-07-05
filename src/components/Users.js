import React, { useEffect, useState } from "react";
import UserTable from "./UsersTable";
export default function Users() {
  const [usersList, setUsersList] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setUsersList(res))
      .catch((err) => console.log(err));
  }, []);

  function search(rows) {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1 ||
        row.email.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1
    );
  }

  return (
    <div>
      <div className="filter-field">
        <label>filter by Name or Email:</label>
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
      <div>
        <UserTable data={search(usersList)} />
      </div>
    </div>
  );
}
