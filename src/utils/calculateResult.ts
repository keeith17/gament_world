export function calculateResult(answers: Record<string, string>) {
  const scores: Record<string, number> = {
    daegong: 0,
    qnam: 0,
    topju: 0,
    danju: 0,
  };

  // 답변 집계
  Object.values(answers).forEach((whose) => {
    if (typeof whose === "string" && whose in scores) {
      scores[whose]++;
    }
  });

  // 가장 높은 점수를 가진 캐릭터 찾기
  const maxScore = Math.max(...Object.values(scores));
  const winner = Object.keys(scores).find((key) => scores[key] === maxScore);

  return { scores, winner };
}
