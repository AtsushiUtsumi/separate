from flask import Blueprint, request, jsonify
from app.models.inventory import Inventory
from app.database import db

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/api/inventory', methods=['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    return jsonify({'inventory': [item.to_dict() for item in inventory]})

@inventory_bp.route('/api/inventory/<int:id>', methods=['GET'])
def get_inventory_item(id):
    item = Inventory.query.get_or_404(id)
    return jsonify({'inventory': item.to_dict()})

@inventory_bp.route('/api/inventory', methods=['POST'])
def update_inventory():
    data = request.get_json()
    item = Inventory.query.filter_by(part_id=data['part_id']).first()
    
    if item:
        item.quantity = data['quantity']
        item.location = data['location']
    else:
        item = Inventory(
            part_id=data['part_id'],
            quantity=data['quantity'],
            location=data['location']
        )
        db.session.add(item)
    
    db.session.commit()
    return jsonify({'inventory': item.to_dict()})

@inventory_bp.route('/api/inventory/<int:id>/delete', methods=['POST'])
def delete_inventory_item(id):
    item = Inventory.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204 