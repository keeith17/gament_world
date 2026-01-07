import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { calculateResult } from "../utils/calculateResult";
import { resultData } from "../data/resultData";
import { downloadResultImage } from "../utils/downloadResultImage";
import Loading from "../components/Loading";

export default function Result() {
  const navigate = useNavigate();
  const existingAnswers = localStorage.getItem("answer");
  const answers = existingAnswers ? JSON.parse(existingAnswers) : {};

  const { winner } = calculateResult(answers);
  const userName = localStorage.getItem("userName") || "당신";
  const result = winner ? resultData[winner as keyof typeof resultData] : null;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });

    const img = new Image();
    img.src = "/temp_letter3.png";
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, []);

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
        const textToCopy = `${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(textToCopy);
        alert("결과가 클립보드에 복사되었습니다!");
      }
    } catch (error) {
      console.error("공유 실패:", error);
    }
  };

  const handleDownloadImage = async () => {
    if (!result) return;
    await downloadResultImage(`${result.title}_${userName}.png`);
  };

  const handleGoHome = () => {
    localStorage.removeItem("answer");
    localStorage.removeItem("userName");
    navigate("/");
  };

  if (isLoading) {
    return <Loading message="결과를 불러오는 중..." />;
  }

  if (!result) {
    return <Loading message="결과를 찾을 수 없습니다..." />;
  }

  return (
    <div
      className="min-h-screen max-h-screen overflow-hidden p-4 sm:p-8 md:p-20"
      style={{
        backgroundImage: "url(/temp_letter3.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center h-screen p-2 sm:p-4 md:p-8">
        <div className="text-center space-y-4 max-w-2xl w-full px-2 sm:px-4 flex flex-col h-full">
          {/* 고정된 타이틀과 이미지 */}
          <div className="flex-shrink-0 result-content-header">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {result.title}
            </h1>

            <div className="flex gap-2 sm:gap-4 justify-center items-end">
              <img
                src={`/${winner}.png`}
                alt={result.title}
                className="max-h-40 sm:max-h-52 md:max-h-64 w-auto rounded-lg"
              />
              <img
                src={`/${winner}2.png`}
                alt={result.title}
                className="max-h-32 sm:max-h-44 md:max-h-52 w-auto rounded-lg pb-2"
              />
            </div>
          </div>

          {/* 스크롤되는 내용 영역 */}
          <div className="flex-1 overflow-y-auto space-y-6 mt-4 pb-32 result-content-scroll">
            <div className="result-content-body space-y-6">
              <div className="bg-white/80 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="text-sm text-pink-700 mb-2">키워드</h3>
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
                  <h3 className="text-sm text-pink-700 mb-2">당신의 성향</h3>
                  {result.tendency.map((text, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>

                <div className="text-left space-y-2">
                  <h3 className="text-sm text-pink-700 mb-2">인물 소개</h3>
                  {result.character.map((text, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>

                <div className="bg-pink-50 p-4 rounded-lg text-left">
                  <h3 className="text-sm text-pink-700 mb-2">초대장</h3>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {result.invitation.body.replace(/{{user}}/g, userName)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadImage}
              className="w-full px-6 py-3 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors"
            >
              이미지로 저장하기
            </button>

            <button
              onClick={handleShare}
              className="w-full px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors"
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
    </div>
  );
}
