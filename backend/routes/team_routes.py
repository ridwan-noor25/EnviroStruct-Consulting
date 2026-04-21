from flask import request, jsonify, Blueprint, session
from models.team_model import TeamMember
from extensions import db
from functools import wraps

team_bp = Blueprint('team', __name__, url_prefix='/api/team')

# Handle preflight OPTIONS requests
@team_bp.before_request
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

# Get all team members (public)
@team_bp.route('', methods=['GET'])
def get_team_members():
    try:
        category = request.args.get('category')
        query = TeamMember.query.filter_by(is_active=True)
        
        if category and category != 'all':
            query = query.filter_by(category=category)
        
        members = query.order_by(TeamMember.order).all()
        
        response = jsonify({
            'members': [member.to_dict() for member in members]
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get single team member
@team_bp.route('/<int:member_id>', methods=['GET'])
def get_team_member(member_id):
    try:
        member = TeamMember.query.get(member_id)
        if not member:
            return jsonify({'error': 'Team member not found'}), 404
        
        response = jsonify({'member': member.to_dict()})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create team member (Admin only)
@team_bp.route('', methods=['POST'])
@admin_required
def create_team_member():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'position', 'shortExpertise', 'coreExpertise', 
                          'qualifications', 'experience', 'email', 'phone', 'location', 'category']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Convert certifications list to string
        certs_str = ','.join(data.get('certifications', [])) if data.get('certifications') else ''
        
        member = TeamMember(
            name=data['name'],
            position=data['position'],
            short_expertise=data['shortExpertise'],
            core_expertise=data['coreExpertise'],
            qualifications=data['qualifications'],
            experience=data['experience'],
            email=data['email'],
            phone=data['phone'],
            location=data['location'],
            category=data['category'],
            certifications=certs_str,
            profile_image=data.get('profileImage', ''),
            order=data.get('order', 0),
            is_active=data.get('isActive', True)
        )
        
        db.session.add(member)
        db.session.commit()
        
        response = jsonify({
            'message': 'Team member created successfully',
            'member': member.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update team member (Admin only)
@team_bp.route('/<int:member_id>', methods=['PUT'])
@admin_required
def update_team_member(member_id):
    try:
        member = TeamMember.query.get(member_id)
        if not member:
            return jsonify({'error': 'Team member not found'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            member.name = data['name']
        if 'position' in data:
            member.position = data['position']
        if 'shortExpertise' in data:
            member.short_expertise = data['shortExpertise']
        if 'coreExpertise' in data:
            member.core_expertise = data['coreExpertise']
        if 'qualifications' in data:
            member.qualifications = data['qualifications']
        if 'experience' in data:
            member.experience = data['experience']
        if 'email' in data:
            member.email = data['email']
        if 'phone' in data:
            member.phone = data['phone']
        if 'location' in data:
            member.location = data['location']
        if 'category' in data:
            member.category = data['category']
        if 'certifications' in data:
            member.certifications = ','.join(data['certifications']) if data['certifications'] else ''
        if 'profileImage' in data:
            member.profile_image = data['profileImage']
        if 'order' in data:
            member.order = data['order']
        if 'isActive' in data:
            member.is_active = data['isActive']
        
        db.session.commit()
        
        response = jsonify({
            'message': 'Team member updated successfully',
            'member': member.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete team member (Admin only)
@team_bp.route('/<int:member_id>', methods=['DELETE'])
@admin_required
def delete_team_member(member_id):
    try:
        member = TeamMember.query.get(member_id)
        if not member:
            return jsonify({'error': 'Team member not found'}), 404
        
        db.session.delete(member)
        db.session.commit()
        
        response = jsonify({'message': 'Team member deleted successfully'})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get team categories
@team_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = [
            {'id': 'all', 'label': 'All Team'},
            {'id': 'leadership', 'label': 'Leadership'},
            {'id': 'environmental', 'label': 'Environmental'},
            {'id': 'social', 'label': 'Social Development'},
            {'id': 'engineering', 'label': 'Engineering'},
            {'id': 'technical', 'label': 'Technical'},
            {'id': 'monitoring', 'label': 'Monitoring & Evaluation'}
        ]
        
        response = jsonify({'categories': categories})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500