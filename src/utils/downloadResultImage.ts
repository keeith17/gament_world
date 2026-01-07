import html2canvas from "html2canvas";

export async function downloadResultImage(fileName: string) {
  // 헤더와 바디를 모두 가져오기
  const headerElement = document.querySelector(".result-content-header");
  const bodyElement = document.querySelector(".result-content-body");

  if (!headerElement || !bodyElement) return;

  // 래퍼 생성
  const wrapperElement = document.createElement("div");
  wrapperElement.style.textAlign = "center";

  // 헤더와 바디 복제
  const clonedHeader = headerElement.cloneNode(true) as HTMLElement;
  const clonedBody = bodyElement.cloneNode(true) as HTMLElement;

  // 래퍼에 추가
  wrapperElement.appendChild(clonedHeader);
  const spacer = document.createElement("div");
  spacer.style.height = "24px";
  wrapperElement.appendChild(spacer);
  wrapperElement.appendChild(clonedBody);

  const clonedElement = wrapperElement;

  // 다운로드용 적절한 너비 설정 (모바일에서도 충분한 너비)
  const desiredWidth = Math.max(600, bodyElement.clientWidth);

  // 복제된 DOM을 화면 밖에 배치
  clonedElement.style.position = "absolute";
  clonedElement.style.left = "-99999px";
  clonedElement.style.top = "0";
  clonedElement.style.width = desiredWidth + "px";

  // 배경 이미지 추가
  clonedElement.style.backgroundImage = "url(/temp_letter4.png)";
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
    (badge as HTMLElement).style.paddingTop = "0";
    (badge as HTMLElement).style.paddingBottom = "0.75rem";
    (badge as HTMLElement).style.paddingLeft = "0.75rem";
    (badge as HTMLElement).style.paddingRight = "0.75rem";
  });

  document.body.appendChild(clonedElement);

  try {
    // 폰트 로딩 대기
    await document.fonts.ready;

    // html2canvas로 캡처
    const canvas = await html2canvas(clonedElement, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 2,
    });

    // 이미지 다운로드
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  } catch (error) {
    console.error("이미지 저장 실패:", error);
    alert("이미지 저장에 실패했습니다.");
  } finally {
    document.body.removeChild(clonedElement);
  }
}
