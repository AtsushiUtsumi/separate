# URLマッピングリスト

## フロントエンド
- `/` - ホーム画面
- `/parts` - 部品一覧画面
- `/parts/new` - 新規部品登録画面
- `/parts/:id` - 部品詳細画面
- `/parts/:id/edit` - 部品編集画面
- `/inventory` - 在庫一覧画面
- `/inventory/:id` - 在庫詳細画面

## バックエンドAPI
- `GET /api/parts` - 部品一覧取得
- `GET /api/parts/:id` - 部品詳細取得
- `POST /api/parts` - 新規部品登録
- `POST /api/parts/:id/update` - 部品情報更新
- `POST /api/parts/:id/delete` - 部品削除
- `GET /api/inventory` - 在庫一覧取得
- `GET /api/inventory/:id` - 在庫詳細取得
- `POST /api/inventory` - 在庫更新
- `POST /api/inventory/:id/delete` - 在庫削除 