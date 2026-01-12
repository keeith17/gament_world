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
  const [isImageHovered, setIsImageHovered] = useState(false);

  // 결과에 따른 프레임 색상
  const frameColors: Record<string, string> = {
    daegong: "#7d86ca",
    qnam: "#ca6969",
    topju: "#966dc9",
    danju: "#dfcc63",
  };
  const frameColor = winner ? frameColors[winner] : "#ce8799";

  useEffect(() => {
    // 페이지 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });

    const img = new Image();
    img.src = "/temp_letter4.png";
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "GAMENT 제국 티파티 결과",
      text: `${userName} 영애의 파트너는 ${result?.title}입니다. 매주 금요일 밤 9시, 가먼트 제국의 파티에서 당신의 파트너를 찾아보세요! #전엔티_초대장`,
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
      className="min-h-screen max-h-screen overflow-hidden p-0 sm:p-8 md:p-20"
      style={{
        backgroundImage: "url(/temp_letter4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center h-screen px-4 py-20 sm:p-4 md:p-8 overflow-y-auto result-content-scroll">
        <div className="text-center space-y-4 max-w-2xl w-full px-4 sm:px-4 flex flex-col h-full">
          {/* 고정된 타이틀과 이미지 */}
          <div className="flex-shrink-0 result-content-header">
            <div
              className="w-full relative flex flex-col items-center"
              style={{
                backgroundImage:
                  winner === "daegong"
                    ? "url(/invitation_daegong.png)"
                    : `url(/invitation_${winner}.png)`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                aspectRatio: "3 / 4",
              }}
            >
              {/* 위쪽 20% 빈 공간 */}
              <div style={{ height: "20%" }}></div>

              {/* default 이미지 30% */}
              <div
                style={{
                  height: "43%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href="https://chzzk.naver.com/2c0b37830652867ba09322c7d7f03672"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "70%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      isImageHovered
                        ? `/click_${winner}.png`
                        : `/default_${winner}.png`
                    }
                    alt={result.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                    onMouseDown={() => setIsImageHovered(true)}
                    onMouseUp={() => setIsImageHovered(false)}
                    onTouchStart={() => setIsImageHovered(true)}
                    onTouchEnd={() => setIsImageHovered(false)}
                  />
                </a>
              </div>

              {/* 초대장 문구 50% */}
              <div
                style={{
                  height: "37%",
                  width: "100%",
                  padding: "2%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  className="text-gray-700 whitespace-pre-line leading-relaxed text-center text-[0.75rem] md:text-base"
                  style={{
                    fontFamily: "HSbombaram, sans-serif",
                  }}
                >
                  {result.invitation.body.replace(/{{user}}/g, userName)}
                </p>
              </div>
            </div>
          </div>

          {/* 스크롤되는 내용 영역 */}
          <div className="flex-1 space-y-6 mt-4 pb-44">
            <div className="result-content-body space-y-6">
              <div className="bg-white/60 p-6 rounded-lg space-y-4">
                <div>
                  <h3
                    className="text-xs md:text-sm mb-2 font-bold"
                    style={{ color: frameColor }}
                  >
                    키워드
                  </h3>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {result.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs md:text-sm"
                        style={{
                          backgroundColor: `${frameColor}20`,
                          color: frameColor,
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <h3
                    className="text-xs md:text-sm mb-2 font-bold"
                    style={{ color: frameColor }}
                  >
                    당신의 성향
                  </h3>
                  {result.tendency.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 leading-relaxed text-xs md:text-base"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                <div className="text-left space-y-2">
                  <h3
                    className="text-xs md:text-sm mb-2 font-bold"
                    style={{ color: frameColor }}
                  >
                    인물 소개
                  </h3>
                  {result.character.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 leading-relaxed text-xs md:text-base"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 w-full h-20">
              <button
                onClick={handleDownloadImage}
                style={{
                  width: "25%",
                  backgroundImage: "url(/save.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-label="이미지로 저장하기"
              />

              <button
                onClick={handleShare}
                // className="w-20 h-20 sm:w-24 sm:h-24"
                style={{
                  width: "25%",
                  backgroundImage: "url(/share.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-label="결과 공유하기"
              />

              <button
                onClick={handleGoHome}
                // className="w-20 h-20 sm:w-24 sm:h-24"
                style={{
                  width: "25%",
                  backgroundImage: "url(/home.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-label="홈으로 돌아가기"
              />

              <a
                href="https://chzzk.naver.com/2c0b37830652867ba09322c7d7f03672"
                target="_blank"
                rel="noopener noreferrer"
                // className="w-20 h-20 sm:w-24 sm:h-24 block"
                style={{
                  width: "25%",
                  backgroundImage: "url(/chzzk.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-label="치지직 채널 방문"
              />
            </div>

            {/* 전광판 */}
            <div
              className="w-full mt-6 overflow-hidden"
              style={{
                backgroundColor: "#000000",
                padding: "18px 0",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  animation: "scroll-left 18s linear infinite",
                }}
              >
                <div
                  className="whitespace-nowrap"
                  style={{
                    color: "#f38ec3",
                    fontSize: "1rem",
                    fontFamily: "HSbombaram, sans-serif",
                    textShadow: "0 0 10px #f38ec3, 0 0 20px #f38ec3",
                    imageRendering: "pixelated",
                    filter: "contrast(1.2) brightness(1.1)",
                  }}
                >
                  매주 금요일 9시 치지직 전지적NT시점 ★ 1/30 전격 토§토 방＠송※
                  많관부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div
                  className="whitespace-nowrap"
                  style={{
                    color: "#f38ec3",
                    fontSize: "1rem",
                    fontFamily: "HSbombaram, sans-serif",
                    textShadow: "0 0 10px #f38ec3, 0 0 20px #f38ec3",
                    imageRendering: "pixelated",
                    filter: "contrast(1.2) brightness(1.1)",
                  }}
                >
                  매주 금요일 9시 치지직 전지적NT시점 ★ 1/30 전격 토§토 방＠송※
                  많관부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div
                  className="whitespace-nowrap"
                  style={{
                    color: "#f38ec3",
                    fontSize: "1rem",
                    fontFamily: "HSbombaram, sans-serif",
                    textShadow: "0 0 10px #f38ec3, 0 0 20px #f38ec3",
                    imageRendering: "pixelated",
                    filter: "contrast(1.2) brightness(1.1)",
                  }}
                >
                  매주 금요일 9시 치지직 전지적NT시점 ★ 1/30 전격 토§토 방＠송※
                  많관부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div
                  className="whitespace-nowrap"
                  style={{
                    color: "#f38ec3",
                    fontSize: "1rem",
                    fontFamily: "HSbombaram, sans-serif",
                    textShadow: "0 0 10px #f38ec3, 0 0 20px #f38ec3",
                    imageRendering: "pixelated",
                    filter: "contrast(1.2) brightness(1.1)",
                  }}
                >
                  매주 금요일 9시 치지직 전지적NT시점 ★ 1/30 전격 토§토 방＠송※
                  많관부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </div>

            <style>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-380.4%);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
