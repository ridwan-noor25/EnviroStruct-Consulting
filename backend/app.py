from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_session import Session
from config import Config
from extensions import db
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Remove trailing slash handling
    app.url_map.strict_slashes = False
    
    # Configure CORS
    CORS(app, 
         origins=["http://localhost:5173", "http://127.0.0.1:5173"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         allow_headers=["Content-Type", "Authorization", "Accept"],
         supports_credentials=True,
         expose_headers=["Content-Type"])
    
    # Initialize session
    Session(app)
    db.init_app(app)
    
    # Import models
    from models.admin_model import Admin
    
    # Import and register routes
    from routes.admin_routes import register_admin_routes
    from routes.project_routes import project_bp
    from routes.service_routes import service_bp
    from routes.team_routes import team_bp
    from routes.contact_routes import contact_bp
    


    # Register blueprints
    app.register_blueprint(project_bp, url_prefix='/api/projects')
    app.register_blueprint(service_bp, url_prefix='/api/services')
    app.register_blueprint(team_bp, url_prefix='/api/team')
    app.register_blueprint(contact_bp, url_prefix='/api/contacts')
    
    # Register admin routes
    register_admin_routes(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()
        
        # Create default super admin if not exists
        if not Admin.query.filter_by(username='superadmin').first():
            default_admin = Admin(
                username='superadmin',
                email='admin@envirostruct.com',
                full_name='Super Administrator',
                role='super_admin',
                is_active=True
            )
            default_admin.set_password('admin123')
            db.session.add(default_admin)
            db.session.commit()
            print("✅ Default super admin created: admin@envirostruct.com / admin123")
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000, host='0.0.0.0')