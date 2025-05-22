import {
  PutCommand,
  ScanCommand,
  UpdateCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Member } from "../types";
import { dynamoDb } from "../dynamodb";

const TABLE_NAME = "Members";

// メンバー全員取得
export const getAllMembers = async (): Promise<Member[]> => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });
    const response = await dynamoDb.send(command);
    return response.Items as Member[];
  } catch (error) {
    console.error("メンバー取得中にエラーが発生しました:", error);
    throw new Error("メンバーの取得に失敗しました");
  }
};

// メンバー作成/更新
export const createMember = async (
  member: Omit<Member, "createdAt" | "updatedAt">
): Promise<void> => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      ...member,
      departmentName: member.departmentName || "【未所属】", // デフォルト値を設定
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
  try {
    await dynamoDb.send(command);
  } catch (error) {
    console.error("メンバー作成中にエラーが発生しました:", error);
    throw error;
  }
};

// メンバー削除
export const deleteMember = async (deletedMembers: Member[]): Promise<void> => {
  // 25件ずつに分割（DynamoDBのバッチ処理の制限）
  for (let i = 0; i < deletedMembers.length; i += 25) {
    const batch = deletedMembers.slice(i, i + 25);

    const command = new BatchWriteCommand({
      RequestItems: {
        [TABLE_NAME]: batch.map((member) => ({
          DeleteRequest: {
            Key: {
              memberId: member.memberId,
            },
          },
        })),
      },
    });

    await dynamoDb.send(command);
  }
};

//メンバー保存
export const saveMembers = async (
  updateMembers: Member[],
  originalMembers: Member[]
): Promise<void> => {
  try {
    // 削除されたメンバーのmemberIDを特定
    const deletedMembers = originalMembers.filter((member) => {
      return !updateMembers.some((u) => u.memberId === member.memberId);
    });

    if (deletedMembers.length > 0) {
      // 削除実行
      await deleteMember(deletedMembers);
    }

    await Promise.all(
      updateMembers.map(async (member) => {
        // 既存のメンバーの場合
        if (member.memberId) {
          const command = new UpdateCommand({
            TableName: TABLE_NAME,
            Key: {
              memberId: member.memberId,
            },
            UpdateExpression:
              "SET memberName = :name, size = :size, departmentName = :departmentName, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
              ":name": member.memberName,
              ":size": member.size,
              ":departmentName": member.departmentName,
              ":updatedAt": new Date().toISOString(),
            },
          });
          await dynamoDb.send(command);
        }
        // 新規メンバーの場合
        else {
          await createMember(member);
        }
      })
    );
  } catch (error) {
    console.error("メンバー保存中にエラーが発生しました:", error);
    throw error;
  }
};

export const handler = async () => {
  try {
    const members = await getAllMembers();
    return {
      statusCode: 200,
      body: JSON.stringify(members),
    };
  } catch (error) {
    console.error("メンバー保存中にエラーが発生しました:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
