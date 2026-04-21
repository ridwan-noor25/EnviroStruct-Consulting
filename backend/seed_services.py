from app import create_app
from extensions import db
from models.service_model import Service
import json

app = create_app()

services_data = [
    # Environmental & Social Services
    {
        "title": "Environmental and Social Impact Assessments (ESIA)",
        "category": "environmental",
        "description": "Comprehensive assessments of environmental, social, health, safety, and human rights impacts associated with proposed projects. The process includes screening, scoping, baseline studies, stakeholder engagement, impact analysis, and preparation of mitigation measures in accordance with national regulations and international safeguards standards.",
        "benefits": [
            "Enables informed decision-making",
            "Ensures regulatory compliance",
            "Minimizes environmental and social impacts",
            "Comprehensive stakeholder engagement"
        ],
        "icon": "Shield",
        "order": 1
    },
    {
        "title": "Environmental Audits (EA)",
        "category": "environmental",
        "description": "Systematic evaluation of environmental performance and regulatory compliance of existing projects or facilities. The audits identify gaps, assess environmental management practices, and recommend corrective actions to improve environmental performance and compliance with environmental regulations.",
        "benefits": [
            "Identifies compliance gaps",
            "Improves environmental performance",
            "Avoids regulatory penalties",
            "Recommends corrective actions"
        ],
        "icon": "ClipboardCheck",
        "order": 2
    },
    {
        "title": "Strategic Environmental and Social Assessments (SESA)",
        "category": "environmental",
        "description": "High-level assessments conducted for policies, plans, and programs to integrate environmental and social considerations into strategic decision-making processes and promote sustainable development outcomes.",
        "benefits": [
            "Integrates environmental considerations",
            "Supports strategic decision-making",
            "Promotes sustainable outcomes",
            "Policy-level impact analysis"
        ],
        "icon": "TrendingUp",
        "order": 3
    },
    {
        "title": "Environmental and Social Management Systems (ESMS)",
        "category": "environmental",
        "description": "Development and implementation of structured management systems to help organizations manage environmental and social risks. This includes preparation of Environmental and Social Management Plans (ESMPs), monitoring frameworks, emergency response procedures, and operational safeguards.",
        "benefits": [
            "Systematic risk management",
            "Long-term operational compliance",
            "Institutional capacity strengthening",
            "Comprehensive safeguards framework"
        ],
        "icon": "Settings",
        "order": 4
    },
    {
        "title": "Resettlement Action Plans (RAPs)",
        "category": "environmental",
        "description": "Preparation and implementation support for resettlement frameworks where projects affect land use or livelihoods. Services include socio-economic surveys, asset valuation, compensation planning, stakeholder engagement, grievance mechanisms, and monitoring of resettlement outcomes.",
        "benefits": [
            "Fair and transparent resettlement",
            "Minimizes social disruption",
            "Protects community livelihoods",
            "Comprehensive grievance mechanisms"
        ],
        "icon": "Users",
        "order": 5
    },
    {
        "title": "Occupational Health and Safety (OHS) Advisory",
        "category": "environmental",
        "description": "Workplace health and safety assessments, policy development, risk identification, compliance audits, and training programs aimed at improving employee safety and ensuring compliance with national and international OHS standards.",
        "benefits": [
            "Improves workplace safety",
            "Reduces accident risks",
            "Ensures regulatory compliance",
            "Comprehensive staff training"
        ],
        "icon": "HardHat",
        "order": 6
    },
    {
        "title": "Sustainability and Environmental Risk Management",
        "category": "environmental",
        "description": "Identification, assessment, and mitigation of environmental and social risks associated with projects and business operations. This includes climate risk screening, ESG integration, and sustainability advisory services.",
        "benefits": [
            "Climate risk screening",
            "ESG integration",
            "Sustainability reporting",
            "Resilience planning"
        ],
        "icon": "Leaf",
        "order": 7
    },
    
    # Engineering Services
    {
        "title": "Engineering and Pre-Design Studies",
        "category": "engineering",
        "description": "Technical assessments and preliminary studies required for infrastructure and development projects.",
        "benefits": [
            "Informed project planning",
            "Risk identification early",
            "Cost estimation",
            "Technical feasibility"
        ],
        "icon": "Ruler",
        "order": 1
    },
    {
        "title": "Feasibility Studies",
        "category": "engineering",
        "description": "Comprehensive assessment of project viability including technical, economic, and financial analysis.",
        "benefits": [
            "Investment decision support",
            "Risk assessment",
            "ROI analysis",
            "Project viability confirmation"
        ],
        "icon": "TrendingUp",
        "order": 2
    },
    {
        "title": "Detailed Engineering Designs",
        "category": "engineering",
        "description": "Comprehensive engineering designs and technical drawings for infrastructure projects.",
        "benefits": [
            "Technical specifications",
            "Construction-ready drawings",
            "Material specifications",
            "Quality assurance"
        ],
        "icon": "PenTool",
        "order": 3
    },
    {
        "title": "Topographic Surveys",
        "category": "engineering",
        "description": "Detailed mapping and surveying services for infrastructure planning and design.",
        "benefits": [
            "Accurate elevation data",
            "Site mapping",
            "Terrain analysis",
            "Construction planning support"
        ],
        "icon": "Map",
        "order": 4
    },
    {
        "title": "Geotechnical Investigations",
        "category": "engineering",
        "description": "Subsurface exploration and soil testing to inform foundation design and construction.",
        "benefits": [
            "Soil property analysis",
            "Foundation recommendations",
            "Ground stability assessment",
            "Construction risk mitigation"
        ],
        "icon": "Droplets",
        "order": 5
    },
    {
        "title": "Infrastructure Planning Assessments",
        "category": "engineering",
        "description": "Strategic planning and assessment of infrastructure requirements and impacts.",
        "benefits": [
            "Infrastructure gap analysis",
            "Capacity planning",
            "Environmental integration",
            "Stakeholder alignment"
        ],
        "icon": "Building2",
        "order": 6
    },
    {
        "title": "Construction Supervision",
        "category": "engineering",
        "description": "On-site supervision and quality control during construction phases.",
        "benefits": [
            "Quality assurance",
            "Safety compliance",
            "Timeline management",
            "Contractor coordination"
        ],
        "icon": "HardHat",
        "order": 7
    },
    
    # Advisory & Management Services
    {
        "title": "Project Management Services",
        "category": "advisory",
        "description": "Comprehensive project management support including planning, resource allocation, implementation supervision, and performance monitoring.",
        "benefits": [
            "Efficient project delivery",
            "Timely completion",
            "Resource optimization",
            "Quality assurance"
        ],
        "icon": "Briefcase",
        "order": 1
    },
    {
        "title": "Business and Organizational Advisory",
        "category": "advisory",
        "description": "Strategic advisory services designed to support organizations in improving operational efficiency and long-term strategic planning.",
        "benefits": [
            "Strategic planning",
            "Operational efficiency",
            "Organizational development",
            "Change management"
        ],
        "icon": "Building2",
        "order": 2
    },
    {
        "title": "Financial Advisory Services",
        "category": "advisory",
        "description": "Financial analysis and advisory services including investment appraisal, financial planning, risk assessment, and due diligence.",
        "benefits": [
            "Investment decisions",
            "Financial planning",
            "Risk assessment",
            "Due diligence"
        ],
        "icon": "DollarSign",
        "order": 3
    },
    {
        "title": "Information Technology and Digital Solutions",
        "category": "advisory",
        "description": "Technology advisory services including digital transformation strategies, cybersecurity advisory, cloud computing solutions, and data analytics.",
        "benefits": [
            "Digital transformation",
            "Data security",
            "Cloud solutions",
            "Data-driven decisions"
        ],
        "icon": "Globe",
        "order": 4
    },
    {
        "title": "Training and Professional Development",
        "category": "advisory",
        "description": "Customized training programs designed to enhance leadership capacity, technical skills, and institutional performance.",
        "benefits": [
            "Skills development",
            "Leadership training",
            "Capacity building",
            "Professional growth"
        ],
        "icon": "GraduationCap",
        "order": 5
    },
    {
        "title": "Monitoring and Evaluation (M&E)",
        "category": "advisory",
        "description": "Comprehensive M&E systems, data analytics, and impact assessments to track project performance and outcomes.",
        "benefits": [
            "Performance tracking",
            "Impact measurement",
            "Data-driven insights",
            "Continuous improvement"
        ],
        "icon": "BarChart3",
        "order": 6
    },
    {
        "title": "Capacity Development Programs",
        "category": "advisory",
        "description": "Institutional capacity strengthening programs to enhance organizational effectiveness and sustainability.",
        "benefits": [
            "Institutional strengthening",
            "Process improvement",
            "Knowledge transfer",
            "Sustainable practices"
        ],
        "icon": "Users",
        "order": 7
    }
]

with app.app_context():
    # Clear existing services
    Service.query.delete()
    
    # Insert new services
    for data in services_data:
        benefits_str = ','.join(data['benefits']) if data.get('benefits') else ''
        service = Service(
            title=data['title'],
            category=data['category'],
            description=data['description'],
            benefits=benefits_str,
            icon=data['icon'],
            order=data['order'],
            is_active=True
        )
        db.session.add(service)
    
    db.session.commit()
    print(f"✅ {len(services_data)} services seeded successfully!")
    
    # Verify
    services = Service.query.all()
    print(f"\n📋 Services by category:")
    env_count = Service.query.filter_by(category='environmental').count()
    eng_count = Service.query.filter_by(category='engineering').count()
    adv_count = Service.query.filter_by(category='advisory').count()
    print(f"   - Environmental: {env_count}")
    print(f"   - Engineering: {eng_count}")
    print(f"   - Advisory: {adv_count}")