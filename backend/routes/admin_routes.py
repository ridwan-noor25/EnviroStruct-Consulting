from flask import request, jsonify, session
from models.admin_model import Admin
from extensions import db
from datetime import datetime

def register_admin_routes(app):
    
    @app.route('/api/admin/login', methods=['POST', 'OPTIONS'])
    def admin_login():
        if request.method == 'OPTIONS':
            return '', 200
            
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            
            print(f"Login attempt: {email}")
            
            admin = Admin.query.filter_by(email=email).first()
            
            if not admin:
                return jsonify({'error': 'Invalid credentials'}), 401
            
            if not admin.check_password(password):
                return jsonify({'error': 'Invalid credentials'}), 401
            
            # Set session
            session['admin_id'] = admin.id
            session['admin_email'] = admin.email
            session['admin_name'] = admin.full_name
            session['admin_role'] = admin.role
            
            print(f"✅ Login successful: {admin.email}")
            print(f"Session set: admin_id={session.get('admin_id')}")
            
            return jsonify({
                'message': 'Login successful',
                'authenticated': True,
                'admin': admin.to_dict()
            }), 200
            
        except Exception as e:
            print(f"Login error: {str(e)}")
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/admin/check-session', methods=['GET', 'OPTIONS'])
    def check_session():
        if request.method == 'OPTIONS':
            return '', 200
            
        admin_id = session.get('admin_id')
        print(f"Session check - admin_id: {admin_id}")
        
        if admin_id:
            admin = Admin.query.get(admin_id)
            if admin:
                return jsonify({
                    'authenticated': True,
                    'admin': {
                        'id': admin.id,
                        'email': admin.email,
                        'name': admin.full_name,
                        'role': admin.role
                    }
                }), 200
        
        return jsonify({'authenticated': False}), 200
    
    @app.route('/api/admin/logout', methods=['POST', 'OPTIONS'])
    def admin_logout():
        if request.method == 'OPTIONS':
            return '', 200
            
        session.clear()
        return jsonify({'message': 'Logged out successfully'}), 200
    
    print("✅ Admin routes registered")