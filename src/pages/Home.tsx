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
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* 우측 상단 통계 버튼 */}
      <button
        onClick={() => navigate("/stats")}
        className="absolute top-4 right-4 px-3 py-2 bg-purple-300 text-white text-sm rounded-lg hover:bg-purple-400 transition-colors"
      >
        통계
      </button>

      <div className="w-full text-center space-y-6 p-8">
        {/* 데스크탑 */}
        <div className="hidden sm:block">
          <h1
            className="text-6xl font-bold"
            style={{
              fontFamily: "Cafe24ClassicType, sans-serif",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter:
                "drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(0 0 6px #FAF4C0) drop-shadow(0 0 6px #FAF4C0)",
            }}
          >
            GAMENT 제국에서
          </h1>
          <h1
            className="text-4xl font-bold mt-4"
            style={{
              fontFamily: "Cafe24ClassicType, sans-serif",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter:
                "drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(0 0 6px #FAF4C0) drop-shadow(0 0 6px #FAF4C0)",
            }}
          >
            초대장이 도착했다!
          </h1>
        </div>

        {/* 모바일 */}
        <div className="sm:hidden">
          <h1
            className="text-6xl font-bold"
            style={{
              fontFamily: "Cafe24ClassicType, sans-serif",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(0 0 6px #FAF4C0) drop-shadow(0 0 6px #FAF4C0)",
            }}
          >
            GAMENT
          </h1>
          <h1
            className="text-6xl font-bold"
            style={{
              fontFamily: "Cafe24ClassicType, sans-serif",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(0 0 6px #FAF4C0) drop-shadow(0 0 6px #FAF4C0)",
            }}
          >
            제국에서
          </h1>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "Cafe24ClassicType, sans-serif",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(0 0 6px #FAF4C0) drop-shadow(0 0 6px #FAF4C0)",
            }}
          >
            초대장이 도착했다!
          </h1>
        </div>
        <p
          className="text-lg text-gray-700"
          style={{ fontFamily: "Cafe24ClassicType, sans-serif" }}
        >
          초대장에 적힌 영애의 이름은?
        </p>

        <div className="space-y-4 mt-8 w-4/5 mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="영애의 이름을 입력하세요"
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
