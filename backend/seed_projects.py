# seed_projects.py
from app import create_app
from extensions import db
from models.project_model import Project

app = create_app()

projects_data = [
    {
        "title": "Gypsum Powder Processing Plant ESIA",
        "client": "Mahad Gypsum Ltd",
        "location": "Bulla Dagah, Garissa County, Kenya",
        "year": "2025",
        "status": "Completed",
        "category": "Industrial",
        "description": "Comprehensive Environmental and Social Impact Assessment (ESIA) and Environmental and Social Management Plan (ESMP) for a gypsum powder processing plant. The project included baseline studies, stakeholder consultations, impact analysis, and development of mitigation measures to ensure regulatory compliance and sustainable operations.",
        "image": "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
        "icon": "Factory",
        "key_findings": "Identified key environmental risks including air quality, noise pollution, and waste management. Developed comprehensive mitigation strategies.",
        "outcomes": "Successfully obtained NEMA license. Project implemented with full regulatory compliance.",
        "featured": True,
        "order": 1
    },
    {
        "title": "17 Water Pans ESIA & Monitoring",
        "client": "Ewaso Nyiro North Development Authority (ENNDA)",
        "location": "Northern Kenya",
        "year": "2025",
        "status": "Completed",
        "category": "Water Resources",
        "description": "Environmental and Social Impact Assessment and monitoring for seventeen (17) water pans in arid and semi-arid regions of Northern Kenya. The project involved baseline environmental assessments, stakeholder engagement, and development of Environmental and Social Management Plans (ESMPs).",
        "image": "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
        "icon": "Droplets",
        "key_findings": "Assessed water quality, ecosystem impact, and community water access. Developed sustainable water management plans.",
        "outcomes": "Enhanced water access for 50+ communities. Improved drought resilience in the region.",
        "featured": True,
        "order": 2
    },
    {
        "title": "Artisanal Gold Mining ESIA",
        "client": "Hamakosi & Hilltop Cooperative Societies",
        "location": "Marsabit County, Kenya",
        "year": "2024",
        "status": "Completed",
        "category": "Mining",
        "description": "Environmental and Social Impact Assessment for artisanal gold mining projects in Marsabit County. The project included comprehensive environmental baseline studies, socio-economic surveys, stakeholder consultations, and development of mitigation measures for responsible mining practices.",
        "image": "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
        "icon": "TrendingUp",
        "key_findings": "Identified mercury contamination risks, habitat disruption, and community health concerns. Developed safer mining practices.",
        "outcomes": "Implemented safer mining techniques. Improved community awareness on environmental protection.",
        "featured": True,
        "order": 3
    },
    {
        "title": "Community Water Supply Projects ESIA",
        "client": "Development Partners & County Government",
        "location": "Various Counties, Kenya",
        "year": "2024",
        "status": "Completed",
        "category": "Water Resources",
        "description": "Environmental and Social Assessment for multiple community water supply projects across different counties. The projects focused on improving access to clean water while ensuring environmental sustainability and social inclusivity.",
        "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
        "icon": "Droplets",
        "key_findings": "Assessed water source sustainability, community impact, and environmental safeguards.",
        "outcomes": "Improved water access for 100,000+ community members. Sustainable water management systems established.",
        "featured": False,
        "order": 4
    },
    {
        "title": "Deqsane Mining Co. Gypsum ESIA",
        "client": "Deqsane Mining Co. Ltd",
        "location": "Garissa County, Kenya",
        "year": "2024",
        "status": "Completed",
        "category": "Mining",
        "description": "Environmental and Social Impact Assessment for gypsum mining operations in Garissa County. The project included comprehensive environmental studies, community engagement, and development of sustainable mining practices.",
        "image": "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
        "icon": "Factory",
        "key_findings": "Evaluated mining impacts on local ecosystems, air quality, and community livelihoods.",
        "outcomes": "Sustainable mining framework implemented. Community compensation plan established.",
        "featured": False,
        "order": 5
    },
    {
        "title": "Infrastructure Development ESIA",
        "client": "Kenya National Highways Authority",
        "location": "Multiple Locations, Kenya",
        "year": "2023",
        "status": "Completed",
        "category": "Infrastructure",
        "description": "Environmental and Social Impact Assessment for major road infrastructure projects, including baseline studies, resettlement action plans, and environmental management planning.",
        "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
        "icon": "HardHat",
        "key_findings": "Assessed displacement impacts, noise pollution, and ecosystem fragmentation.",
        "outcomes": "Resettlement action plans implemented. Environmental mitigation measures in place.",
        "featured": False,
        "order": 6
    },
    {
        "title": "Renewable Energy Project ESIA",
        "client": "Rural Electrification Authority",
        "location": "Eastern Region, Kenya",
        "year": "2023",
        "status": "Ongoing",
        "category": "Energy",
        "description": "Environmental and Social Impact Assessment for solar and wind energy projects, focusing on land use, biodiversity, and community benefits.",
        "image": "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
        "icon": "Leaf",
        "key_findings": "Evaluated land use conflicts, bird migration patterns, and community benefit sharing.",
        "outcomes": "Renewable energy projects advancing with community support and environmental safeguards.",
        "featured": False,
        "order": 7
    }
]

with app.app_context():
    # Clear existing projects
    Project.query.delete()
    
    # Insert new projects
    for data in projects_data:
        project = Project(**data)
        db.session.add(project)
    
    db.session.commit()
    print(f"✅ {len(projects_data)} projects seeded successfully!")
    
    # Verify
    projects = Project.query.all()
    print(f"\n📋 Projects in database: {len(projects)}")
    for project in projects:
        print(f"   - {project.title}")