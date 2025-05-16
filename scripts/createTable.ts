import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDb } from "../src/api/dynamoDB/dynamodb";

const createTable = async () => {
  const command = new CreateTableCommand({
    TableName: "Members",
    AttributeDefinitions: [
      {
        AttributeName: "memberId",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "memberId",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  try {
    await dynamoDb.send(command);
  } catch (error) {
    console.error("エラーが発生しました:" + error);
    process.exit(1);
  }
};

createTable().catch((error) => {
  console.error("予期せぬエラーが発生しました:" + error);
  process.exit(1);
});
