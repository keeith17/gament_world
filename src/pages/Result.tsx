import { useNavigate } from "react-router-dom";
import { calculateResult } from "../utils/calculateResult";

export default function Result() {
  const navigate = useNavigate();
  const existingAnswers = localStorage.getItem("answer");
  const answers = existingAnswers ? JSON.parse(existingAnswers) : {};

  const { scores, winner } = calculateResult(answers);

  const handleGoHome = () => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("answer");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">결과</h1>

        <div className="space-y-3 w-full">
          <div className="bg-white p-4 rounded-lg border-2 border-pink-200">
            <p className="font-semibold">대공: {scores.daegong}표</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-pink-200">
            <p className="font-semibold">쾌남: {scores.qnam}표</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-pink-200">
            <p className="font-semibold">탑주: {scores.topju}표</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-pink-200">
            <p className="font-semibold">단주: {scores.danju}표</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-pink-100 rounded-lg border-2 border-pink-300">
          <h2 className="text-xl font-bold text-gray-800">
            당신의 파트너는: {winner}
          </h2>
        </div>

        <button
          onClick={handleGoHome}
          className="w-full px-6 py-3 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors mt-6"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
