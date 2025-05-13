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
    console.log("テーブルの作成を開始します...");
    await dynamoDb.send(command);
    console.log("テーブルの作成が完了しました！");
  } catch (error) {
    alert("エラーが発生しました:" + error);
    process.exit(1);
  }
};

createTable().catch((error) => {
  alert("予期せぬエラーが発生しました:" + error);
  process.exit(1);
});
