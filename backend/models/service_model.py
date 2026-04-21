from extensions import db
from datetime import datetime

class Service(db.Model):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # 'environmental', 'engineering', 'advisory'
    description = db.Column(db.Text, nullable=False)
    benefits = db.Column(db.Text, nullable=True)  # Store as JSON string
    icon = db.Column(db.String(50), nullable=True)  # Icon name from lucide-react
    order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'description': self.description,
            'benefits': self.benefits.split(',') if self.benefits else [],
            'icon': self.icon,
            'order': self.order,
            'is_active': self.is_active
        }
    
    def __repr__(self):
        return f'<Service {self.title}>'