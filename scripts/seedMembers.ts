import { Member } from "../src/api/dynamoDB/types";
import { createMember } from "../src/api/dynamoDB/operations/member";

// DynamoDBのダミーデータ作成スクリプト
const seedData: Omit<Member, "createdAt" | "updatedAt">[] = [
  {
    memberId: 1,
    memberName: "山田太郎",
    departmentId: 1,
    departmentName: "WEB事業部",
    size: 1,
  },
  {
    memberId: 2,
    memberName: "鈴木花子",
    departmentId: 1,
    departmentName: "WEB事業部",
    size: 1,
  },
  {
    memberId: 3,
    memberName: "佐藤二郎",
    departmentId: 2,
    departmentName: "開発部",
    size: 1,
  },
  {
    memberId: 4,
    memberName: "田中美咲",
    departmentId: 2,
    departmentName: "開発部",
    size: 1,
  },
];

const seedMembers = async () => {
  try {

    for (const member of seedData) {
      await createMember(member as Member);
    }

  } catch (error) {
    console.error("エラーが発生しました:" + error);
  }
};

seedMembers();
