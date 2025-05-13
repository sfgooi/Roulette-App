import {
  PutCommand,
  ScanCommand,
  UpdateCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Member } from "../types";
import { dynamoDb } from "../dynamodb";

const TABLE_NAME = "Members";

export const memberOperations = {
  // メンバー全員取得
  getAllMembers: async (): Promise<Member[]> => {
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
  },

  // メンバー作成/更新
  createMember: async (member: Member): Promise<void> => {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        ...member,
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
  },

  // メンバー削除
  deleteMember: async (deletedMembers: Member[]): Promise<void> => {
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
  },

  //メンバー保存
  saveMembers: async (
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
        await memberOperations.deleteMember(deletedMembers);
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
                "SET memberName = :name, size = :size, updatedAt = :updatedAt",
              ExpressionAttributeValues: {
                ":name": member.memberName,
                ":size": member.size,
                ":updatedAt": new Date().toISOString(),
              },
            });
            await dynamoDb.send(command);
          }
          // 新規メンバーの場合
          else {
            await memberOperations.createMember(member);
          }
        })
      );
    } catch (error) {
      console.error("メンバー保存中にエラーが発生しました:", error);
      throw error;
    }
  },
};

export const handler = async () => {
  try {
    const members = await memberOperations.getAllMembers();
    return {
      statusCode: 200,
      body: JSON.stringify(members),
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
