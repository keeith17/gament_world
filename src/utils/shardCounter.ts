import { db } from "../config/firebase";
import { doc, getDoc, setDoc, increment, writeBatch, collection, getDocs } from "firebase/firestore";

const NUM_SHARDS = 5;

// 랜덤 샤드 선택
function getRandomShardId(): string {
  const shardNum = Math.floor(Math.random() * NUM_SHARDS);
  return `shard_${shardNum}`;
}

// 샤드 초기화 (필요시)
export async function initializeShard(shardId: string) {
  const shardRef = doc(db, "stats", "globalResults", "shards", shardId);
  const shardDoc = await getDoc(shardRef);

  if (!shardDoc.exists()) {
    await setDoc(shardRef, {
      daegong: 0,
      qnam: 0,
      topju: 0,
      danju: 0,
    });
  }
}

// 결과 카운트 증가
export async function incrementResultCount(winner: string) {
  const shardId = getRandomShardId();
  const shardRef = doc(db, "stats", "globalResults", "shards", shardId);

  try {
    // 샤드가 없으면 초기화
    await initializeShard(shardId);

    // 해당 결과 카운트 +1
    await setDoc(
      shardRef,
      {
        [winner]: increment(1),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error incrementing shard counter:", error);
  }
}

// 전체 통계 조회 (모든 샤드 합산)
export async function getTotalStats() {
  const shardsRef = collection(db, "stats", "globalResults", "shards");
  const shardsSnapshot = await getDocs(shardsRef);

  const totals = {
    daegong: 0,
    qnam: 0,
    topju: 0,
    danju: 0,
  };

  shardsSnapshot.forEach((doc) => {
    const data = doc.data();
    totals.daegong += data.daegong || 0;
    totals.qnam += data.qnam || 0;
    totals.topju += data.topju || 0;
    totals.danju += data.danju || 0;
  });

  return totals;
}

// 모든 샤드 초기화 (개발/테스트용)
export async function initializeAllShards() {
  const batch = writeBatch(db);

  for (let i = 0; i < NUM_SHARDS; i++) {
    const shardRef = doc(db, "stats", "globalResults", "shards", `shard_${i}`);
    batch.set(shardRef, {
      daegong: 0,
      qnam: 0,
      topju: 0,
      danju: 0,
    });
  }

  await batch.commit();
  console.log("All shards initialized!");
}
