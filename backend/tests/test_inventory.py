import pytest
from app import create_app
from app.database import db
from app.models.part import Part
from app.models.inventory import Inventory

@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def test_part(app):
    with app.app_context():
        part = Part(
            name='エンジンオイル',
            part_number='EO-001',
            description='5W-30 合成オイル',
            price=3500
        )
        db.session.add(part)
        db.session.commit()
        return part

def test_get_inventory_empty(client):
    response = client.get('/api/inventory')
    assert response.status_code == 200
    assert response.json == {'inventory': []}

def test_create_inventory(client, test_part):
    data = {
        'part_id': test_part.id,
        'quantity': 50,
        'location': 'A-1-1'
    }
    response = client.post('/api/inventory', json=data)
    assert response.status_code == 200
    assert 'inventory' in response.json
    assert response.json['inventory']['quantity'] == 50
    assert response.json['inventory']['location'] == 'A-1-1'

def test_get_inventory_item(client, test_part):
    # テストデータの作成
    inventory = Inventory(
        part_id=test_part.id,
        quantity=50,
        location='A-1-1'
    )
    db.session.add(inventory)
    db.session.commit()
    
    response = client.get(f'/api/inventory/{inventory.id}')
    assert response.status_code == 200
    assert response.json['inventory']['quantity'] == 50

def test_update_inventory(client, test_part):
    # テストデータの作成
    inventory = Inventory(
        part_id=test_part.id,
        quantity=50,
        location='A-1-1'
    )
    db.session.add(inventory)
    db.session.commit()
    
    update_data = {
        'part_id': test_part.id,
        'quantity': 45,
        'location': 'A-1-2'
    }
    response = client.post('/api/inventory', json=update_data)
    assert response.status_code == 200
    assert response.json['inventory']['quantity'] == 45
    assert response.json['inventory']['location'] == 'A-1-2'

def test_delete_inventory_item(client, test_part):
    # テストデータの作成
    inventory = Inventory(
        part_id=test_part.id,
        quantity=50,
        location='A-1-1'
    )
    db.session.add(inventory)
    db.session.commit()
    
    response = client.post(f'/api/inventory/{inventory.id}/delete')
    assert response.status_code == 204
    
    # 削除確認
    response = client.get(f'/api/inventory/{inventory.id}')
    assert response.status_code == 404 