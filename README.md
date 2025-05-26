# ルーレットアプリケーション仕様書
- 本番環境URL：※terraform設定中

## 1. 主要技術スタック一覧
- フロントエンド: React + TypeScript (一番モダンで型安全)
- ビルドツール: Vite (ビルドが早い最高)
- パッケージマネージャー: pnpm (唯一使ったことがなかったパッケージマネージャー、使ってみたら爆速で使い勝手が良かった)
- UIフレームワーク: Material-UI (MUI + styled) (毎度おなじみMUI、Hero UIと迷ったがMUIを使いたくなった)
- データベース: DynamoDB (本番環境デプロイを想定して安価なため採用)
- データベース操作: AWS SDK（Software Development Kit）
- API: AWS Lambda (サーバーレスのド定番、安価+データベースと同じ理由で採用)
- ストレージ: AWS S3 (フロントエンドのソースを格納する)

## 2. 主要機能
- ルーレット機能（react-custom-rouletteを採用）
- メンバー管理機能 (CRUD対応)
- 部署管理機能 (CRUD対応)
- データグリッド表示
- 部署単位でのルーレット対象メンバー切り替え機能

## 3. 開発環境
- TypeScriptによる型管理
- ESLint、Prettierによるコード品質管理
- Dockerによるローカル開発環境
- DynamoDB LocalによるローカルDB開発環境

## 4. デプロイメント(予定)
- フロントエンド: AWS S3
- ドメイン: Route53 CloudFront + AWS Lambda + DynamoDB
- コンテンツ配信: CloudFront
- API: AWS Lambda
- DB: DynamoDB

## 5. データベース操作
- テーブル作成機能
- シードデータ投入機能
- DynamoDB Admin UIによる管理機能

## 6. 開発コマンド
- `pnpm dev`: 開発サーバー起動
- `pnpm build`: 本番用ビルド
- `pnpm db:start`: ローカルDB起動
- `pnpm db:stop`: ローカルDB停止
- `pnpm db:create`: テーブル作成(ローカル開発用)
- `pnpm db:seed`: メンバーデータ投入(ローカル開発用)
- `pnpm db:admin`: DynamoDB Admin起動

## 7. 開発した感想
- terraformでの設定がややこしく本番環境の反映が間に合わなかった。悲しい。
- 本来であればログイン機能や編集権限機能を付けて特定のユーザーだけメンバーの編集をできるようにすべきだと思うが開発期間を考慮してあえて未実装。
- 当初、部署管理まで実装するつもりがなかったため状態管理ライブラリは採用しなかった。
- 案の定、propsとstate祭りになってしまったので採用してればと後悔
- 今後はどんな開発規模感でもReduxかRecoilを採用して要件変更に耐えうる開発環境を整備すべきと学べた。
- 業務でReactを使用することがほぼ無くなったがやってみるとUIに関してライブラリや文献がたくさんあり、やはり一番楽しい。将来的にはReactが絡んだフルスタックの案件に行きたいと改めて感じた。

## 8. 挙動動画

