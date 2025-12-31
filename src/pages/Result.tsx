import { useNavigate } from "react-router-dom";
import { calculateResult } from "../utils/calculateResult";
import { resultData } from "../data/resultData";

export default function Result() {
  const navigate = useNavigate();
  const existingAnswers = localStorage.getItem("answer");
  const answers = existingAnswers ? JSON.parse(existingAnswers) : {};

  const { winner } = calculateResult(answers);

  const userName = localStorage.getItem("userName") || "당신";
  const result = winner ? resultData[winner as keyof typeof resultData] : null;

  const handleShare = async () => {
    const shareData = {
      title: "GAMENT 제국 티파티 결과",
      text: `${userName} 영애의 파트너는 ${result?.title}입니다! GAMENT 제국에서 당신의 파트너를 찾아보세요!`,
      url: `${window.location.origin}?v=3`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // fallback: 클립보드에 복사
        const textToCopy = `${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(textToCopy);
        alert("결과가 클립보드에 복사되었습니다!");
      }
    } catch (error) {
      console.error("공유 실패:", error);
    }
  };

  const handleGoHome = () => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("answer");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen overflow-y-auto"
      style={{
        backgroundImage: "url(/temp_letter2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-start min-h-screen p-8">
        <div className="text-center space-y-6 max-w-2xl">
          {result && (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {result.title}
              </h1>

              <img
                src={`/${winner}.png`}
                alt={result.title}
                className="max-h-64 w-auto mx-auto rounded-lg"
              />

              <div className="bg-white/80 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">키워드</h3>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {result.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <h3 className="text-sm text-gray-500 mb-2">당신의 성향</h3>
                  {result.tendency.map((text, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>

                <div className="text-left space-y-2">
                  <h3 className="text-sm text-gray-500 mb-2">인물 소개</h3>
                  {result.character.map((text, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>

                <div className="bg-pink-50 p-4 rounded-lg text-left">
                  <h3 className="text-sm text-gray-500 mb-2">초대장</h3>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {result.invitation.body.replace(/{{user}}/g, userName)}
                  </p>
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleShare}
            className="w-full px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors mt-6"
          >
            결과 공유하기
          </button>

          <button
            onClick={handleGoHome}
            className="w-full px-6 py-3 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
