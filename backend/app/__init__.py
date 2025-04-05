from flask import Flask
from flask_cors import CORS
from app.database import init_db
from app.routes.parts import parts_bp
from app.routes.inventory import inventory_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car_parts.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)
    init_db(app)
    
    app.register_blueprint(parts_bp)
    app.register_blueprint(inventory_bp)
    
    return app 