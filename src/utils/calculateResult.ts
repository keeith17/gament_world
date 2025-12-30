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
  const topCandidates = Object.keys(scores).filter(
    (key) => scores[key] === maxScore
  );

  let winner: string | undefined;

  // 동점자가 여러 명일 경우
  if (topCandidates.length > 1) {
    // 우선순위 질문들 (가중치가 높은 질문 순서)
    const priorityQuestions = ["question2", "question1", "question6"];

    // 우선순위 질문의 답변으로 승자 결정
    for (const priorityQ of priorityQuestions) {
      const priorityAnswer = answers[priorityQ];
      if (priorityAnswer && topCandidates.includes(priorityAnswer)) {
        winner = priorityAnswer;
        break;
      }
    }

    // 우선순위 질문으로도 결정 안 되면 랜덤
    if (!winner) {
      winner = topCandidates[Math.floor(Math.random() * topCandidates.length)];
    }
  } else {
    winner = topCandidates[0];
  }

  return { scores, winner };
}
