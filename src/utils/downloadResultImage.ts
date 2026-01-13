import html2canvas from "html2canvas";

// 초대장 이미지를 Blob으로 생성하는 공통 함수
async function generateResultImageBlob(): Promise<Blob | null> {
    const headerElement = document.querySelector(".result-content-header");

    if (!headerElement) return null;

    const clonedElement = headerElement.cloneNode(true) as HTMLElement;
    const desiredWidth = Math.max(600, headerElement.clientWidth);

    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-99999px";
    clonedElement.style.top = "0";
    clonedElement.style.width = desiredWidth + "px";
    clonedElement.style.textAlign = "center";
    clonedElement.style.display = "block";

    const invitationText = clonedElement.querySelector("p");
    if (invitationText) {
        invitationText.style.fontSize = "18px";
    }

    document.body.appendChild(clonedElement);

    try {
        await document.fonts.ready;

        const canvas = await html2canvas(clonedElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scale: 2,
        });

        return new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            });
        });
    } catch (error) {
        console.error("이미지 생성 실패:", error);
        return null;
    } finally {
        document.body.removeChild(clonedElement);
    }
}

// 다운로드 함수
export async function downloadResultImage(fileName: string) {
    const blob = await generateResultImageBlob();

    if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    } else {
        alert("이미지 저장에 실패했습니다.");
    }
}

// 이미지와 함께 공유하는 함수
export async function shareResultWithImage(shareUrl: string, shareText: string) {
    try {
        // Web Share API 지원 확인
        if (!navigator.share) {
            alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
            return;
        }

        const blob = await generateResultImageBlob();

        if (!blob) {
            alert("이미지 생성에 실패했습니다.");
            return;
        }

        // Blob을 File 객체로 변환
        const file = new File([blob], "gament-result.png", { type: "image/png" });

        // 파일 공유 지원 확인
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "GAMENT 제국 티파티 파트너 테스트 결과",
                text: shareText,
                url: shareUrl,
            });
        } else {
            // 파일 공유 미지원 시 URL만 공유
            await navigator.share({
                title: "GAMENT 제국 티파티 파트너 테스트 결과",
                text: shareText,
                url: shareUrl,
            });
        }
    } catch (error) {
        // 사용자가 공유를 취소한 경우는 에러를 보여주지 않음
        if ((error as Error).name !== "AbortError") {
            console.error("공유 실패:", error);
        }
    }
}
