import { useNavigate } from "react-router-dom";
import { calculateResult } from "../utils/calculateResult";
import { resultData } from "../data/resultData";
import html2canvas from "html2canvas";

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

  const handleDownloadImage = async () => {
    if (!result) return;

    // 1. 캡처할 콘텐츠 영역을 찾기
    const contentElement = document.querySelector(".result-content");
    if (!contentElement) return;

    // 2. DOM 복제
    const clonedElement = contentElement.cloneNode(true) as HTMLElement;

    // 3. 복제된 DOM을 화면 밖에 배치
    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-99999px";
    clonedElement.style.top = "0";
    clonedElement.style.width = contentElement.clientWidth + "px";

    // 배경 이미지 추가
    clonedElement.style.backgroundImage = "url(/temp_letter3.png)";
    clonedElement.style.backgroundSize = "cover";
    clonedElement.style.backgroundPosition = "center";
    clonedElement.style.backgroundRepeat = "no-repeat";
    clonedElement.style.padding = "40px";

    // 전체 컨테이너 정렬 및 스타일 수정
    clonedElement.style.textAlign = "center";
    clonedElement.style.display = "block";

    // 타이틀 가운데 정렬
    const title = clonedElement.querySelector("h1");
    if (title) {
      (title as HTMLElement).style.textAlign = "center";
      (title as HTMLElement).style.margin = "0 auto";
    }

    // 키워드 배지의 line-height 수정
    const keywordBadges = clonedElement.querySelectorAll(".bg-pink-100");
    keywordBadges.forEach((badge) => {
      // (badge as HTMLElement).style.display = "inline-flex";
      // (badge as HTMLElement).style.alignItems = "center";
      // (badge as HTMLElement).style.justifyContent = "center";
      // (badge as HTMLElement).style.verticalAlign = "middle";
      // (badge as HTMLElement).style.height = "100%";
      // (badge as HTMLElement).style.height = "100%";
      (badge as HTMLElement).style.paddingTop = "0";
      (badge as HTMLElement).style.paddingBottom = "0.75rem";
      (badge as HTMLElement).style.paddingLeft = "0.75rem";
      (badge as HTMLElement).style.paddingRight = "0.75rem";
    });

    document.body.appendChild(clonedElement);

    try {
      // 폰트 로딩 대기
      await document.fonts.ready;

      // 4. html2canvas로 캡처
      const canvas = await html2canvas(clonedElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2, // 고해상도
      });

      // 5. 이미지 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${result.title}_${userName}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      alert("이미지 저장에 실패했습니다.");
    } finally {
      // 6. 복제된 DOM 제거
      document.body.removeChild(clonedElement);
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
      className="min-h-screen max-h-screen overflow-y-auto p-20"
      style={{
        backgroundImage: "url(/temp_letter3.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-start min-h-screen p-8">
        <div className="text-center space-y-6 max-w-2xl w-full">
          {result && (
            <>
              <div className="result-content space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {result.title}
                </h1>

                <div className="flex gap-4 justify-center items-end">
                  <img
                    src={`/${winner}.png`}
                    alt={result.title}
                    className="max-h-64 w-auto rounded-lg"
                  />
                  <img
                    src={`/${winner}2.png`}
                    alt={result.title}
                    className="max-h-52 w-auto rounded-lg pb-2"
                  />
                </div>

                <div className="bg-white/80 p-6 rounded-lg space-y-4 mt-6">
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
                className="w-full px-6 py-3 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors mt-6"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
