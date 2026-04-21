from flask import request, jsonify, Blueprint, session
from models.service_model import Service
from extensions import db
from functools import wraps
import json

service_bp = Blueprint('service', __name__, url_prefix='/api/services')

# Handle preflight OPTIONS requests
@service_bp.before_request
def handle_options():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        return response, 200

# Admin authentication decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_id'):
            return jsonify({'error': 'Admin authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Get all services (public)
@service_bp.route('', methods=['GET'])
def get_services():
    try:
        category = request.args.get('category')
        query = Service.query.filter_by(is_active=True)
        
        if category:
            query = query.filter_by(category=category)
        
        services = query.order_by(Service.order).all()
        
        response = jsonify({
            'services': [service.to_dict() for service in services]
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get single service
@service_bp.route('/<int:service_id>', methods=['GET'])
def get_service(service_id):
    try:
        service = Service.query.get(service_id)
        if not service:
            return jsonify({'error': 'Service not found'}), 404
        
        response = jsonify({'service': service.to_dict()})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create new service (Admin only)
@service_bp.route('', methods=['POST'])
@admin_required
def create_service():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'category', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Convert benefits list to string
        benefits_str = ','.join(data.get('benefits', [])) if data.get('benefits') else ''
        
        service = Service(
            title=data['title'],
            category=data['category'],
            description=data['description'],
            benefits=benefits_str,
            icon=data.get('icon', ''),
            order=data.get('order', 0),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(service)
        db.session.commit()
        
        response = jsonify({
            'message': 'Service created successfully',
            'service': service.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update service (Admin only)
@service_bp.route('/<int:service_id>', methods=['PUT'])
@admin_required
def update_service(service_id):
    try:
        service = Service.query.get(service_id)
        if not service:
            return jsonify({'error': 'Service not found'}), 404
        
        data = request.get_json()
        
        if 'title' in data:
            service.title = data['title']
        if 'category' in data:
            service.category = data['category']
        if 'description' in data:
            service.description = data['description']
        if 'benefits' in data:
            service.benefits = ','.join(data['benefits']) if data['benefits'] else ''
        if 'icon' in data:
            service.icon = data['icon']
        if 'order' in data:
            service.order = data['order']
        if 'is_active' in data:
            service.is_active = data['is_active']
        
        db.session.commit()
        
        response = jsonify({
            'message': 'Service updated successfully',
            'service': service.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete service (Admin only)
@service_bp.route('/<int:service_id>', methods=['DELETE'])
@admin_required
def delete_service(service_id):
    try:
        service = Service.query.get(service_id)
        if not service:
            return jsonify({'error': 'Service not found'}), 404
        
        db.session.delete(service)
        db.session.commit()
        
        response = jsonify({'message': 'Service deleted successfully'})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get services by category
@service_bp.route('/category/<string:category>', methods=['GET'])
def get_services_by_category(category):
    try:
        services = Service.query.filter_by(category=category, is_active=True).order_by(Service.order).all()
        
        response = jsonify({
            'category': category,
            'services': [service.to_dict() for service in services]
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get service categories
@service_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = ['environmental', 'engineering', 'advisory']
        response = jsonify({'categories': categories})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500