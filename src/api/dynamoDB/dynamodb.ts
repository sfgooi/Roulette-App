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
