import DownloadStudentPDF from "./Download";

const StudentProfile = () => {
  const student = {
    firstname: "John",
    lastname: "Doe",
    mobile: 1234567890, 
  };

  console.log("Student Mobile:", student.mobile); // Debugging

  return (
    <div>
      <h2>{student.firstname} {student.lastname}</h2>
      <p>Mobile: {student.mobile}</p>
      <DownloadStudentPDF mobile={student.mobile} />  {/* Ensure mobile is passed correctly */}
    </div>
  );
};

export default StudentProfile;
