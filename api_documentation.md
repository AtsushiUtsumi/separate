# APIドキュメント

## 部品管理API

### 部品一覧取得
- エンドポイント: `GET /api/parts`
- 説明: 登録されている全ての部品情報を取得します
- レスポンス:
```json
{
  "parts": [
    {
      "id": 1,
      "name": "エンジンオイル",
      "part_number": "EO-001",
      "description": "5W-30 合成オイル",
      "price": 3500,
      "created_at": "2024-03-20T10:00:00Z"
    }
  ]
}
```

### 部品詳細取得
- エンドポイント: `GET /api/parts/:id`
- 説明: 指定されたIDの部品情報を取得します
- パラメータ:
  - id: 部品ID
- レスポンス:
```json
{
  "part": {
    "id": 1,
    "name": "エンジンオイル",
    "part_number": "EO-001",
    "description": "5W-30 合成オイル",
    "price": 3500,
    "created_at": "2024-03-20T10:00:00Z"
  }
}
```

### 新規部品登録
- エンドポイント: `POST /api/parts`
- 説明: 新しい部品を登録します
- リクエストボディ:
```json
{
  "name": "エンジンオイル",
  "part_number": "EO-001",
  "description": "5W-30 合成オイル",
  "price": 3500
}
```

### 部品情報更新
- エンドポイント: `POST /api/parts/:id/update`
- 説明: 指定されたIDの部品情報を更新します
- パラメータ:
  - id: 部品ID
- リクエストボディ:
```json
{
  "name": "エンジンオイル",
  "part_number": "EO-001",
  "description": "5W-30 合成オイル",
  "price": 3800
}
```

### 部品削除
- エンドポイント: `POST /api/parts/:id/delete`
- 説明: 指定されたIDの部品を削除します
- パラメータ:
  - id: 部品ID

## 在庫管理API

### 在庫一覧取得
- エンドポイント: `GET /api/inventory`
- 説明: 全ての在庫情報を取得します
- レスポンス:
```json
{
  "inventory": [
    {
      "id": 1,
      "part_id": 1,
      "quantity": 50,
      "location": "A-1-1",
      "last_updated": "2024-03-20T10:00:00Z"
    }
  ]
}
```

### 在庫詳細取得
- エンドポイント: `GET /api/inventory/:id`
- 説明: 指定されたIDの在庫情報を取得します
- パラメータ:
  - id: 在庫ID
- レスポンス:
```json
{
  "inventory": {
    "id": 1,
    "part_id": 1,
    "quantity": 50,
    "location": "A-1-1",
    "last_updated": "2024-03-20T10:00:00Z"
  }
}
```

### 在庫更新
- エンドポイント: `POST /api/inventory`
- 説明: 在庫情報を更新します
- リクエストボディ:
```json
{
  "part_id": 1,
  "quantity": 45,
  "location": "A-1-1"
}
```

### 在庫削除
- エンドポイント: `POST /api/inventory/:id/delete`
- 説明: 指定されたIDの在庫情報を削除します
- パラメータ:
  - id: 在庫ID 