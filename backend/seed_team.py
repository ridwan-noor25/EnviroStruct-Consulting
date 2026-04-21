from app import create_app
from extensions import db
from models.team_model import TeamMember

app = create_app()

team_members_data = [
    {
        "name": "Ibrahim Mohamed Aden",
        "position": "Managing Consultant / Lead Expert",
        "short_expertise": "Environmental & Social Safeguards",
        "core_expertise": "Environmental and Social Safeguards Instruments (ESIA, ESMP, RAP, SEP, LMP, SMP, ESMS ESG), safeguards compliance, climate risk management",
        "qualifications": "PGCert Sustainability Leadership for the Built Environment – University of Cambridge (UK); MSc Environmental & Business Management – Bangor University (UK); BSc Environmental Studies – Kenyatta University (Kenya)",
        "experience": "9+ Years",
        "email": "ibrahim.aden@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "leadership",
        "certifications": ["ESIA Expert", "Climate Risk Management", "ESG Specialist", "Safeguards Compliance"],
        "order": 1
    },
    {
        "name": "Yasmin Daud Noor",
        "position": "Associate Expert – Environmental & Social Safeguards",
        "short_expertise": "Environmental assessments & climate resilience",
        "core_expertise": "Environmental assessments, climate resilience programs, stakeholder consultations, ESMP monitoring",
        "qualifications": "BSc Environmental Studies (Community Development) – Kenyatta University (Kenya)",
        "experience": "6+ Years",
        "email": "yasmin.noor@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "environmental",
        "certifications": ["Environmental Auditor", "Climate Resilience Specialist", "Stakeholder Engagement"],
        "order": 2
    },
    {
        "name": "Isnino Mohamed Ibrahim",
        "position": "Social Development Consultant",
        "short_expertise": "Social impact & community engagement",
        "core_expertise": "Social impact assessments, community consultations, grievance redress mechanisms",
        "qualifications": "BA Sociology, Psychology & Conflict and Peace Studies – University of Nairobi (Kenya)",
        "experience": "5+ Years",
        "email": "isnino.ibrahim@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "social",
        "certifications": ["Social Safeguards Specialist", "Community Engagement Expert", "Grievance Mechanism"],
        "order": 3
    },
    {
        "name": "Eng. Abdirahim Ibrahim Mohamed",
        "position": "Senior Civil Engineer / Infrastructure Specialist",
        "short_expertise": "Infrastructure design & supervision",
        "core_expertise": "Infrastructure design, roads, WASH systems, drainage, construction supervision",
        "qualifications": "BSc Civil Engineering – University of Nairobi (Kenya); Registered Professional Engineer – Engineers Board of Kenya (EBK)",
        "experience": "12+ Years",
        "email": "abdirahim.mohamed@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "engineering",
        "certifications": ["Registered Engineer EBK", "Infrastructure Design Expert", "Construction Supervision"],
        "order": 4
    },
    {
        "name": "Salim Said Abdalla",
        "position": "Planner / GIS & Land Use Specialist",
        "short_expertise": "GIS analysis & spatial planning",
        "core_expertise": "GIS analysis, spatial planning, land administration, environmental mapping",
        "qualifications": "BSc Urban & Regional Planning with IT – Maseno University (Kenya)",
        "experience": "5+ Years",
        "email": "salim.abdalla@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "technical",
        "certifications": ["GIS Professional", "Land Use Planner", "Spatial Analysis"],
        "order": 5
    },
    {
        "name": "Fardowsa Hassan Bare",
        "position": "Land Surveyor",
        "short_expertise": "Topographic & cadastral surveys",
        "core_expertise": "Topographic surveys, cadastral mapping, infrastructure surveys",
        "qualifications": "B-Tech Land Surveying – Technical University of Kenya (TUK); Diploma Land Surveying – Kenya Institute of Surveying and Mapping (KISM)",
        "experience": "5+ Years",
        "email": "fardowsa.bare@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "technical",
        "certifications": ["Licensed Surveyor", "Cadastral Mapping Expert", "Infrastructure Surveyor"],
        "order": 6
    },
    {
        "name": "Muktar Abbey",
        "position": "Water & Environmental Engineer",
        "short_expertise": "WASH & water systems design",
        "core_expertise": "WASH infrastructure, water systems design, safeguards monitoring",
        "qualifications": "BSc Water & Environmental Engineering – Egerton University (Kenya)",
        "experience": "5+ Years",
        "email": "muktar.abbey@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "engineering",
        "certifications": ["Water Systems Designer", "Environmental Engineer", "WASH Specialist"],
        "order": 7
    },
    {
        "name": "Naima Ibrahim",
        "position": "Monitoring & Evaluation Specialist",
        "short_expertise": "M&E systems & data analytics",
        "core_expertise": "M&E systems, data analytics, impact assessments",
        "qualifications": "BSc Economics & Statistics – Kenyatta University (Kenya); MSc Data Science – Strathmore University (Ongoing)",
        "experience": "5+ Years",
        "email": "naima.ibrahim@envirostruct.net",
        "phone": "+254 XXX XXX XXX",
        "location": "Nairobi, Kenya",
        "category": "monitoring",
        "certifications": ["M&E Professional", "Data Analytics Expert", "Impact Assessment"],
        "order": 8
    }
]

with app.app_context():
    # Clear existing team members
    TeamMember.query.delete()
    
    # Insert new team members
    for data in team_members_data:
        certs_str = ','.join(data['certifications']) if data.get('certifications') else ''
        member = TeamMember(
            name=data['name'],
            position=data['position'],
            short_expertise=data['short_expertise'],
            core_expertise=data['core_expertise'],
            qualifications=data['qualifications'],
            experience=data['experience'],
            email=data['email'],
            phone=data['phone'],
            location=data['location'],
            category=data['category'],
            certifications=certs_str,
            order=data['order'],
            is_active=True
        )
        db.session.add(member)
    
    db.session.commit()
    print(f"✅ {len(team_members_data)} team members seeded successfully!")
    
    # Verify
    members = TeamMember.query.all()
    print(f"\n📋 Team members by category:")
    for category in ['leadership', 'environmental', 'social', 'engineering', 'technical', 'monitoring']:
        count = TeamMember.query.filter_by(category=category).count()
        print(f"   - {category}: {count}")