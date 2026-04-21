from flask import request, jsonify, Blueprint, session
from models.project_model import Project
from extensions import db
from functools import wraps

project_bp = Blueprint('project', __name__, url_prefix='/api/projects')

# Disable strict slashes for this blueprint
project_bp.strict_slashes = False

# Handle preflight OPTIONS requests for all routes
@project_bp.before_request
def handle_options():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        return response, 200

# Admin authentication decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header and not session.get('admin_id'):
            return jsonify({'error': 'Admin authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Get all projects
@project_bp.route('', methods=['GET'])  # Note: removed trailing slash
def get_projects():
    try:
        category = request.args.get('category')
        featured = request.args.get('featured')
        
        query = Project.query
        
        if category and category != 'All':
            query = query.filter_by(category=category)
        if featured and featured.lower() == 'true':
            query = query.filter_by(featured=True)
        
        projects = query.order_by(Project.order, Project.year.desc()).all()
        
        response = jsonify({
            'projects': [project.to_dict() for project in projects],
            'total': len(projects)
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Get project categories
@project_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = db.session.query(Project.category).distinct().all()
        category_list = ['All'] + [cat[0] for cat in categories if cat[0]]
        
        response = jsonify({'categories': category_list})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Get single project
@project_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        response = jsonify({'project': project.to_dict()})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create new project (Admin only)
@project_bp.route('', methods=['POST'])  # Note: removed trailing slash
@admin_required
def create_project():
    try:
        data = request.get_json()
        
        required_fields = ['title', 'client', 'location', 'year', 'category', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        project = Project(
            title=data['title'],
            client=data['client'],
            location=data['location'],
            year=data['year'],
            status=data.get('status', 'Ongoing'),
            category=data['category'],
            description=data['description'],
            image=data.get('image', ''),
            icon=data.get('icon', 'Factory'),
            key_findings=data.get('keyFindings', ''),
            outcomes=data.get('outcomes', ''),
            featured=data.get('featured', False),
            order=data.get('order', 0)
        )
        
        db.session.add(project)
        db.session.commit()
        
        response = jsonify({
            'message': 'Project created successfully',
            'project': project.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update project (Admin only)
@project_bp.route('/<int:project_id>', methods=['PUT'])
@admin_required
def update_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        data = request.get_json()
        
        if 'title' in data:
            project.title = data['title']
        if 'client' in data:
            project.client = data['client']
        if 'location' in data:
            project.location = data['location']
        if 'year' in data:
            project.year = data['year']
        if 'status' in data:
            project.status = data['status']
        if 'category' in data:
            project.category = data['category']
        if 'description' in data:
            project.description = data['description']
        if 'image' in data:
            project.image = data['image']
        if 'icon' in data:
            project.icon = data['icon']
        if 'keyFindings' in data:
            project.key_findings = data['keyFindings']
        if 'outcomes' in data:
            project.outcomes = data['outcomes']
        if 'featured' in data:
            project.featured = data['featured']
        if 'order' in data:
            project.order = data['order']
        
        db.session.commit()
        
        response = jsonify({
            'message': 'Project updated successfully',
            'project': project.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete project (Admin only)
@project_bp.route('/<int:project_id>', methods=['DELETE'])
@admin_required
def delete_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404
        
        db.session.delete(project)
        db.session.commit()
        
        response = jsonify({'message': 'Project deleted successfully'})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get project stats
@project_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        total_projects = Project.query.count()
        completed_projects = Project.query.filter_by(status='Completed').count()
        ongoing_projects = Project.query.filter_by(status='Ongoing').count()
        
        response = jsonify({
            'total': total_projects,
            'completed': completed_projects,
            'ongoing': ongoing_projects
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500