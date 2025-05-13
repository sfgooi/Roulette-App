//ローカル環境と本番環境の.envファイルはローカルで管理


## AWS SAM
# ビルド
sam build

# ローカルテスト
sam local invoke MembersFunction --event events/event.json

## デプロイ手順
# 初期化
terraform init

# プランの確認
terraform plan

# プランの適用
terraform apply