import { Member } from "../src/api/dynamoDB/types";
import { createMember } from "../src/api/dynamoDB/operations/member";

// DynamoDBのダミーデータ作成スクリプト
const seedData: Omit<Member, "createdAt" | "updatedAt">[] = [
  {
    memberId: 1,
    memberName: "金光 一郎",
    departmentName: "WEB",
    size: 1,
  },
  {
    memberId: 2,
    memberName: "内田 二郎",
    departmentName: "ER",
    size: 1,
  },
  {
    memberId: 3,
    memberName: "飯塚 三郎",
    departmentName: "営業",
    size: 1,
  },
  {
    memberId: 4,
    memberName: "田中 四郎",
    departmentName: "ICT",
    size: 1,
  },
  {
    memberId: 5,
    memberName: "佐藤 五郎",
    departmentName: "DS",
    size: 1,
  },
  {
    memberId: 6,
    memberName: "鈴木 六郎",
    departmentName: "AI",
    size: 1,
  },
  {
    memberId: 7,
    memberName: "小林 七郎",
    departmentName: "WEB",
    size: 1,
  },
  {
    memberId: 8,
    memberName: "中村 八郎",
    departmentName: "ER",
    size: 1,
  },
  {
    memberId: 9,
    memberName: "佐藤 九郎",
    departmentName: "営業",
    size: 1,
  },
  {
    memberId: 10,
    memberName: "田中 十郎",
    departmentName: "ICT",
    size: 1,
  },
  {
    memberId: 11,
    memberName: "佐藤 十一郎",
    departmentName: "DS",
    size: 1,
  },
  {
    memberId: 12,
    memberName: "鈴木 十二郎",
    departmentName: "AI",
    size: 1,
  },
];

const seedMembers = async (
  seedData: Omit<Member, "createdAt" | "updatedAt">[]
) => {
  try {
    for (const member of seedData) {
      await createMember(member as Member);
    }
  } catch (error) {
    console.error("エラーが発生しました:" + error);
  }
};

seedMembers(seedData);
