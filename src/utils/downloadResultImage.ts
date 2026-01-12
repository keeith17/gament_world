import html2canvas from "html2canvas";

export async function downloadResultImage(fileName: string) {
    // 초대장 영역만 가져오기
    const headerElement = document.querySelector(".result-content-header");

    if (!headerElement) return;

    // 헤더 복제
    const clonedElement = headerElement.cloneNode(true) as HTMLElement;

    // 다운로드용 적절한 너비 설정 (모바일에서도 충분한 너비)
    const desiredWidth = Math.max(600, headerElement.clientWidth);

    // 복제된 DOM을 화면 밖에 배치
    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-99999px";
    clonedElement.style.top = "0";
    clonedElement.style.width = desiredWidth + "px";

    // 전체 컨테이너 정렬 및 스타일 수정
    clonedElement.style.textAlign = "center";
    clonedElement.style.display = "block";

    // 초대장 문구 글씨 크기 키우기
    const invitationText = clonedElement.querySelector("p");
    if (invitationText) {
        invitationText.style.fontSize = "18px";
    }

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
