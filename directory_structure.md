# ディレクトリ構成

```
car-parts-inventory/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── PartsList.js
│   │   │   ├── PartForm.js
│   │   │   ├── PartDetail.js
│   │   │   ├── InventoryList.js
│   │   │   └── InventoryDetail.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Parts.js
│   │   │   ├── PartDetail.js
│   │   │   ├── PartForm.js
│   │   │   ├── Inventory.js
│   │   │   └── InventoryDetail.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── part.py
│   │   │   └── inventory.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── parts.py
│   │   │   └── inventory.py
│   │   └── database.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_parts.py
│   │   └── test_inventory.py
│   ├── requirements.txt
│   └── README.md
└── README.md
``` 