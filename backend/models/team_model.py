from extensions import db
from datetime import datetime

class TeamMember(db.Model):
    __tablename__ = 'team_members'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    position = db.Column(db.String(200), nullable=False)
    short_expertise = db.Column(db.String(200), nullable=False)
    core_expertise = db.Column(db.Text, nullable=False)
    qualifications = db.Column(db.Text, nullable=False)
    experience = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # leadership, environmental, social, engineering, technical, monitoring
    certifications = db.Column(db.Text, nullable=True)  # Store as JSON string
    profile_image = db.Column(db.String(500), nullable=True)
    order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'shortExpertise': self.short_expertise,
            'coreExpertise': self.core_expertise,
            'qualifications': self.qualifications,
            'experience': self.experience,
            'email': self.email,
            'phone': self.phone,
            'location': self.location,
            'category': self.category,
            'certifications': self.certifications.split(',') if self.certifications else [],
            'profileImage': self.profile_image,
            'order': self.order,
            'isActive': self.is_active
        }
    
    def __repr__(self):
        return f'<TeamMember {self.name}>'