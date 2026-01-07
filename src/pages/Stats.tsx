import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTotalStats } from "../utils/shardCounter";
import Loading from "../components/Loading";

export default function Stats() {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getTotalStats,
  });

  if (isLoading) {
    return <Loading message="통계를 불러오는 중..." />;
  }

  const total = stats
    ? stats.daegong + stats.qnam + stats.topju + stats.danju
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "Cafe24ClassicType, sans-serif",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            결과 통계
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors"
          >
            홈으로
          </button>
        </div>

        <div className="bg-white/80 p-6 rounded-lg space-y-4">
          {stats && (
            <div className="space-y-4">
              {/* 대공 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                  className="bg-gray-400 h-full absolute top-0 left-0 transition-all duration-500"
                  style={{
                    width: `${
                      total > 0 ? ((stats.daegong / total) * 100).toFixed(1) : 0
                    }%`,
                  }}
                />
                <div className="flex justify-between items-center p-4 relative z-10">
                  <span className="text-lg font-semibold text-gray-700">
                    대공
                  </span>
                  <span className="text-xl font-bold text-gray-800">
                    {total > 0 ? ((stats.daegong / total) * 100).toFixed(1) : 0}
                    %
                  </span>
                </div>
              </div>

              {/* 쾌남 */}
              <div className="bg-red-50 rounded-lg overflow-hidden relative">
                <div
                  className="bg-red-300 h-full absolute top-0 left-0 transition-all duration-500"
                  style={{
                    width: `${
                      total > 0 ? ((stats.qnam / total) * 100).toFixed(1) : 0
                    }%`,
                  }}
                />
                <div className="flex justify-between items-center p-4 relative z-10">
                  <span className="text-lg font-semibold text-red-700">
                    쾌남
                  </span>
                  <span className="text-xl font-bold text-red-800">
                    {total > 0 ? ((stats.qnam / total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              {/* 탑주 */}
              <div className="bg-purple-50 rounded-lg overflow-hidden relative">
                <div
                  className="bg-purple-300 h-full absolute top-0 left-0 transition-all duration-500"
                  style={{
                    width: `${
                      total > 0 ? ((stats.topju / total) * 100).toFixed(1) : 0
                    }%`,
                  }}
                />
                <div className="flex justify-between items-center p-4 relative z-10">
                  <span className="text-lg font-semibold text-purple-700">
                    탑주
                  </span>
                  <span className="text-xl font-bold text-purple-800">
                    {total > 0 ? ((stats.topju / total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              {/* 단주 */}
              <div className="bg-yellow-50 rounded-lg overflow-hidden relative">
                <div
                  className="bg-yellow-300 h-full absolute top-0 left-0 transition-all duration-500"
                  style={{
                    width: `${
                      total > 0 ? ((stats.danju / total) * 100).toFixed(1) : 0
                    }%`,
                  }}
                />
                <div className="flex justify-between items-center p-4 relative z-10">
                  <span className="text-lg font-semibold text-yellow-700">
                    단주
                  </span>
                  <span className="text-xl font-bold text-yellow-800">
                    {total > 0 ? ((stats.danju / total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
