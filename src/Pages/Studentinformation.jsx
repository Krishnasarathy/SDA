import { useEffect, useState } from "react";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import * as XLSX from "xlsx";

const StudentInformation = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto">
        <div className="flex justify-between mb-4">
          <h2 style={{textAlign:"center",color:"black"}} className="text-2xl font-bold">Student Information</h2>
          <MDBBtn color="primary" size="sm" onClick={downloadExcel}>Download Excel</MDBBtn>
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <MDBTable responsive striped bordered>
            <MDBTableHead dark>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Age</th>
                <th scope='col'>Class</th>
                <th scope='col'>School</th>
                <th scope='col'>Aadhar Number</th>
                <th scope='col'>Mobile Number</th>
                <th scope='col'>Father&apos;s Name</th>
                <th scope='col'>Mother&apos;s Name</th>
                <th scope='col'>Annual Income</th>
                <th scope='col'>Distance to School</th>
                <th scope='col'>Issue</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstname} {student.lastname}</td>
                  <td>{student.age}</td>
                  <td>{student.grade}</td>
                  <td>{student.schooltype}</td>
                  <td>{student.aadharnumber}</td>
                  <td>{student.mobile}</td>
                  <td>{student.fathersname}</td>
                  <td>{student.mothersname}</td>
                  <td>{student.annualincome}</td>
                  <td>{student.distancefromschooltohome}</td>
                  <td>{student.issue}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        )}
      </div>
    </div>
  );
};

export default StudentInformation;