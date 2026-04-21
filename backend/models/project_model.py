from extensions import db
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    client = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    year = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Ongoing')
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(500), nullable=True)
    icon = db.Column(db.String(50), nullable=True)
    key_findings = db.Column(db.Text, nullable=True)
    outcomes = db.Column(db.Text, nullable=True)
    featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'client': self.client,
            'location': self.location,
            'year': self.year,
            'status': self.status,
            'category': self.category,
            'description': self.description,
            'image': self.image,
            'icon': self.icon,
            'keyFindings': self.key_findings,
            'outcomes': self.outcomes,
            'featured': self.featured,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Project {self.title}>'