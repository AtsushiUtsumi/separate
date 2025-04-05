import pytest
from app import create_app
from app.database import db
from app.models.part import Part

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

def test_get_parts_empty(client):
    response = client.get('/api/parts')
    assert response.status_code == 200
    assert response.json == {'parts': []}

def test_create_part(client):
    data = {
        'name': 'エンジンオイル',
        'part_number': 'EO-001',
        'description': '5W-30 合成オイル',
        'price': 3500
    }
    response = client.post('/api/parts', json=data)
    assert response.status_code == 201
    assert 'part' in response.json
    assert response.json['part']['name'] == 'エンジンオイル'

def test_get_part(client):
    # テストデータの作成
    part = Part(
        name='エンジンオイル',
        part_number='EO-001',
        description='5W-30 合成オイル',
        price=3500
    )
    db.session.add(part)
    db.session.commit()
    
    response = client.get(f'/api/parts/{part.id}')
    assert response.status_code == 200
    assert response.json['part']['name'] == 'エンジンオイル'

def test_update_part(client):
    # テストデータの作成
    part = Part(
        name='エンジンオイル',
        part_number='EO-001',
        description='5W-30 合成オイル',
        price=3500
    )
    db.session.add(part)
    db.session.commit()
    
    update_data = {
        'name': 'エンジンオイル（新）',
        'price': 3800
    }
    response = client.post(f'/api/parts/{part.id}/update', json=update_data)
    assert response.status_code == 200
    assert response.json['part']['name'] == 'エンジンオイル（新）'
    assert response.json['part']['price'] == 3800

def test_delete_part(client):
    # テストデータの作成
    part = Part(
        name='エンジンオイル',
        part_number='EO-001',
        description='5W-30 合成オイル',
        price=3500
    )
    db.session.add(part)
    db.session.commit()
    
    response = client.post(f'/api/parts/{part.id}/delete')
    assert response.status_code == 204
    
    # 削除確認
    response = client.get(f'/api/parts/{part.id}')
    assert response.status_code == 404 