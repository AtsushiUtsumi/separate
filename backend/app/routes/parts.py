from flask import Blueprint, request, jsonify
from app.models.part import Part
from app.database import db

parts_bp = Blueprint('parts', __name__)

@parts_bp.route('/api/parts', methods=['GET'])
def get_parts():
    parts = Part.query.all()
    return jsonify({'parts': [part.to_dict() for part in parts]})

@parts_bp.route('/api/parts/<int:id>', methods=['GET'])
def get_part(id):
    part = Part.query.get_or_404(id)
    return jsonify({'part': part.to_dict()})

@parts_bp.route('/api/parts', methods=['POST'])
def create_part():
    data = request.get_json()
    part = Part(
        name=data['name'],
        part_number=data['part_number'],
        description=data.get('description', ''),
        price=data['price']
    )
    db.session.add(part)
    db.session.commit()
    return jsonify({'part': part.to_dict()}), 201

@parts_bp.route('/api/parts/<int:id>/update', methods=['POST'])
def update_part(id):
    part = Part.query.get_or_404(id)
    data = request.get_json()
    
    part.name = data.get('name', part.name)
    part.part_number = data.get('part_number', part.part_number)
    part.description = data.get('description', part.description)
    part.price = data.get('price', part.price)
    
    db.session.commit()
    return jsonify({'part': part.to_dict()})

@parts_bp.route('/api/parts/<int:id>/delete', methods=['POST'])
def delete_part(id):
    part = Part.query.get_or_404(id)
    db.session.delete(part)
    db.session.commit()
    return '', 204 