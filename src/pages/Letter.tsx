import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { questionData } from "../data/questionData";
import { calculateResult } from "../utils/calculateResult";
import { addDoc, collection } from "firebase/firestore";

export default function Letter() {
  const navigate = useNavigate();
  const params = useParams();
  const questionNumber = Number(params.id);
  const [selectedWhose, setSelectedWhose] = useState("");
  const handleSubmit = async () => {
    if (selectedWhose) {
      // 기존 답변 가져오기
      const existingAnswers = localStorage.getItem("answer");
      const answers = existingAnswers ? JSON.parse(existingAnswers) : {};

      // 현재 답변 추가
      answers[`question${params.id}`] = selectedWhose;

      // 로컬 스토리지에 저장
      localStorage.setItem("answer", JSON.stringify(answers));

      setSelectedWhose("");
      // 다음 페이지로 이동
      if (questionNumber >= 13) {
        // 마지막 질문일 때 Firestore에 저장
        const userName = localStorage.getItem("userName");
        const { winner } = calculateResult(answers);
        console.log(userName, winner);
        try {
          await addDoc(collection(db, "results"), {
            userName,
            answers,
            winner,
            createdAt: new Date(),
          });
        } catch (error) {
          console.error("Error saving to Firestore:", error);
        }

        navigate("/result");
      } else {
        navigate(`/letter/${questionNumber + 1}`);
      }
    }
  };

  const theseQuestion =
    questionData[questionNumber as keyof typeof questionData];

  const totalQuestions = 13;
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 진행 바 */}
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-pink-400 h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 진행 표시 */}
      <div className="w-full py-3 text-center backdrop-blur-sm">
        <div className="text-base font-semibold text-pink-500">
          Question {questionNumber} / {totalQuestions}
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {theseQuestion.question}
          </h1>

          <div className="space-y-3">
            {theseQuestion.answer.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedWhose(item.whose)}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  selectedWhose === item.whose
                    ? "border-pink-400 bg-pink-100"
                    : "border-pink-200 bg-white hover:border-pink-300"
                }`}
              >
                {item.select}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedWhose}
            className="w-full px-6 py-3 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {questionNumber === 13 ? "결과 보기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}
