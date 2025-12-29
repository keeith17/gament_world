import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      navigate("/letter/1");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          GAMENT 제국의 초대장이 도착했다!
        </h1>
        <p className="text-lg text-gray-700">초대장에 적힌 영애의 이름은?</p>

        <div className="space-y-4 mt-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="영애의 이름을 입력하세요"
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />

          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full px-6 py-3 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            초대장 열어 보기
          </button>
        </div>
      </div>
    </div>
  );
}
