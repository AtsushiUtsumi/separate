from datetime import datetime
from app.database import db

class Inventory(db.Model):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key=True)
    part_id = db.Column(db.Integer, db.ForeignKey('parts.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    part = db.relationship('Part', backref=db.backref('inventory', lazy=True))

    def __init__(self, part_id, quantity, location):
        self.part_id = part_id
        self.quantity = quantity
        self.location = location

    def to_dict(self):
        return {
            'id': self.id,
            'part_id': self.part_id,
            'quantity': self.quantity,
            'location': self.location,
            'last_updated': self.last_updated.isoformat()
        } 