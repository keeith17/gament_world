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
        <div className="w-[100%] md:w-[90%] mx-auto mb-8">
          <img
            src="/main_title.png"
            alt="GAMENT 제국에서 초대장이 도착했다! 초대장에 적힌 영애의 이름은?"
            className="w-full"
          />
        </div>

        <div
          className="w-[100%] md:w-[80%] mx-auto mb-8 flex items-center justify-center relative"
          style={{
            backgroundImage: "url(/invitation.png)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            aspectRatio: "2 / 1",
            padding: "10%",
          }}
        >
          <div
            className="text-center space-y-2 relative"
            style={{ top: "-10%" }}
          >
            <p
              className="text-xs md:text-base"
              style={{
                fontFamily: "HSbombaram, sans-serif",
                color: "#a778b1",
              }}
            >
              가먼트 제국으로부터 초대장이 도착했다.
            </p>
            <p
              className="text-xs md:text-base"
              style={{
                fontFamily: "HSbombaram, sans-serif",
                color: "#a778b1",
              }}
            >
              금요일 밤 9시, 성대한 파티가 열릴 예정이라는데...
            </p>
            <p
              className="text-xs md:text-base"
              style={{
                fontFamily: "HSbombaram, sans-serif",
                color: "#a778b1",
              }}
            >
              나는 누구와 파티에 가게 될까?
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-8 w-[90%] sm:w-4/5 mx-auto">
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
