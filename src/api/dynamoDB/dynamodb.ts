import { Member } from "./types";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const isDevelopment = import.meta.env.MODE === "development";

const client = new DynamoDBClient(
  isDevelopment
    ? {
        endpoint: "http://127.0.0.1:8000",
        region: "local",
        credentials: {
          accessKeyId: "dummy",
          secretAccessKey: "dummy",
        },
        tls: false,
      }
    : {
        region: "ap-northeast-1", // AWSリージョンを指定
      }
);

export const dynamoDb = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const memberOperations = {
  getAllMembers: async (): Promise<Member[]> => {
    try {
      const { ScanCommand } = await import("@aws-sdk/lib-dynamodb");
      const command = new ScanCommand({
        TableName: "Members",
      });

      const response = await dynamoDb.send(command);
      return response.Items as Member[];
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  },

  createMember: async (member: Member): Promise<void> => {
    try {
      const { PutCommand } = await import("@aws-sdk/lib-dynamodb");
      const command = new PutCommand({
        TableName: "Members",
        Item: member,
      });

      await dynamoDb.send(command);
    } catch (error) {
      console.error("Error creating member:", error);
      throw error;
    }
  },
};
