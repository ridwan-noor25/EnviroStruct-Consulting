from extensions import db
from datetime import datetime

class Contact(db.Model):
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    organization = db.Column(db.String(200), nullable=True)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='pending')  # pending, read, replied, archived
    is_read = db.Column(db.Boolean, default=False)
    replied_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'fullName': self.full_name,
            'email': self.email,
            'organization': self.organization,
            'subject': self.subject,
            'message': self.message,
            'status': self.status,
            'isRead': self.is_read,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'repliedAt': self.replied_at.isoformat() if self.replied_at else None
        }
    
    def __repr__(self):
        return f'<Contact {self.full_name} - {self.subject}>'