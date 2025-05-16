import { useState } from "react";
import { students } from "./dataStudents";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvg, setFilterAvg] = useState("");
  const [filterRank, setFilterRank] = useState("");

  // Hàm tính điểm trung bình
  const calculateAverage = (student) => {
    return ((student.math + student.literature + student.english) / 3).toFixed(
      2
    );
  };

  // Hàm xác định học lực
  const getAcademicRank = (average) => {
    if (average >= 8) return "Giỏi";
    if (average >= 6.5) return "Khá";
    if (average >= 5) return "Trung bình";
    return "Yếu";
  };

  // Lọc danh sách sinh viên dựa trên tìm kiếm và bộ lọc
  const filteredStudents = students.filter((student) => {
    const average = calculateAverage(student); // Sửa: Truyền student thay vì average
    const rank = getAcademicRank(average);

    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesAvg =
      filterAvg === "" ||
      (filterAvg === "8" && average >= 8) ||
      (filterAvg === "6.5" && average >= 6.5 && average < 8) ||
      (filterAvg === "5" && average >= 5 && average < 6.5) ||
      (filterAvg === "<5" && average < 5);

    const matchesRank = filterRank === "" || rank === filterRank; // Sửa: Xóa từ khóa filter thừa

    return matchesSearch && matchesAvg && matchesRank;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý sinh viên</h1>

      {/* Input tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterAvg}
          onChange={(e) => setFilterAvg(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Lọc theo điểm trung bình</option>
          <option value="8">≥ 8</option>
          <option value="6.5">6.5 - 7.9</option>
          <option value="5">5 - 6.4</option>
          <option value="<5">&lt; 5</option> {/* Sửa: Dùng ký tự HTML entity */}
        </select>

        <select
          value={filterRank}
          onChange={(e) => setFilterRank(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Lọc theo học lực</option>
          <option value="Giỏi">Giỏi</option>
          <option value="Khá">Khá</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Yếu">Yếu</option>
        </select>
      </div>

      {/* Bảng sinh viên */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Toán</th>
            <th className="border p-2">Văn</th>
            <th className="border p-2">Anh</th>
            <th className="border p-2">Điểm TB</th>
            <th className="border p-2">Học lực</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => {
            const average = calculateAverage(student);
            return (
              <tr key={student.id}>
                <td className="border p-2">{student.id}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.math}</td>
                <td className="border p-2">{student.literature}</td>
                <td className="border p-2">{student.english}</td>
                <td className="border p-2">{average}</td>
                <td className="border p-2">{getAcademicRank(average)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
