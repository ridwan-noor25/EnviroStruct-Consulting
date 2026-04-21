from flask import request, jsonify, Blueprint, session
from models.contact_model import Contact
from extensions import db
from datetime import datetime
from functools import wraps

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contacts')

# Handle preflight OPTIONS requests
@contact_bp.before_request
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

# Public: Submit contact form
@contact_bp.route('', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new contact message
        contact = Contact(
            full_name=data['fullName'],
            email=data['email'],
            organization=data.get('organization', ''),
            subject=data['subject'],
            message=data['message'],
            status='pending',
            is_read=False
        )
        
        db.session.add(contact)
        db.session.commit()
        
        response = jsonify({
            'message': 'Contact message sent successfully',
            'contact': contact.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Admin: Get all contact messages
@contact_bp.route('', methods=['GET'])
@admin_required
def get_contacts():
    try:
        status = request.args.get('status')
        query = Contact.query
        
        if status:
            query = query.filter_by(status=status)
        
        contacts = query.order_by(Contact.created_at.desc()).all()
        
        response = jsonify({
            'contacts': [contact.to_dict() for contact in contacts],
            'total': len(contacts)
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin: Get single contact message
@contact_bp.route('/<int:contact_id>', methods=['GET'])
@admin_required
def get_contact(contact_id):
    try:
        contact = Contact.query.get(contact_id)
        if not contact:
            return jsonify({'error': 'Contact message not found'}), 404
        
        # Mark as read if not already
        if not contact.is_read:
            contact.is_read = True
            if contact.status == 'pending':
                contact.status = 'read'
            db.session.commit()
        
        response = jsonify({'contact': contact.to_dict()})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin: Update contact status
@contact_bp.route('/<int:contact_id>/status', methods=['PUT'])
@admin_required
def update_contact_status(contact_id):
    try:
        contact = Contact.query.get(contact_id)
        if not contact:
            return jsonify({'error': 'Contact message not found'}), 404
        
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status in ['pending', 'read', 'replied', 'archived']:
            contact.status = new_status
            if new_status == 'replied':
                contact.replied_at = datetime.utcnow()
        
        db.session.commit()
        
        response = jsonify({
            'message': 'Contact status updated',
            'contact': contact.to_dict()
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Admin: Delete contact message
@contact_bp.route('/<int:contact_id>', methods=['DELETE'])
@admin_required
def delete_contact(contact_id):
    try:
        contact = Contact.query.get(contact_id)
        if not contact:
            return jsonify({'error': 'Contact message not found'}), 404
        
        db.session.delete(contact)
        db.session.commit()
        
        response = jsonify({'message': 'Contact message deleted successfully'})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Admin: Get contact statistics
@contact_bp.route('/stats', methods=['GET'])
@admin_required
def get_contact_stats():
    try:
        total = Contact.query.count()
        pending = Contact.query.filter_by(status='pending').count()
        read = Contact.query.filter_by(status='read').count()
        replied = Contact.query.filter_by(status='replied').count()
        archived = Contact.query.filter_by(status='archived').count()
        
        response = jsonify({
            'total': total,
            'pending': pending,
            'read': read,
            'replied': replied,
            'archived': archived
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500