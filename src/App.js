import React, { useState, useEffect } from "react";
import "./App.css";

function XPagination() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmployeeData();
  }, [currentPage]);

  const fetchEmployeeData = () => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / 10));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderEmployeeRows = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = Math.min(startIndex + 10, employees.length);
    const rows = [];

    for (let i = startIndex; i < endIndex; i++) {
      const employee = employees[i];
      rows.push(
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.role}</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className="back">
      <h1 style={{ textAlign: "center" }}>Employee Data Table</h1>
      <table id="customers">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="round">{renderEmployeeRows()}</tbody>
      </table>
      <div className="icon">
        <button
          className="icon1"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="number">{currentPage}</span>
        <button
          className="icon1"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default XPagination;
