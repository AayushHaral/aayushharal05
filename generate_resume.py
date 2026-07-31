import subprocess
import sys
import os

# Auto-install reportlab if not present
try:
    import reportlab
except ImportError:
    print("ReportLab library not found. Installing it now...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_resume_pdf(filename):
    # Setup document with exactly 0.5 inch margins (36 points) on all sides
    # Setup document with optimized margins (0.35-0.4 inch) for single-page fit
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=30,
        rightMargin=30,
        topMargin=24,
        bottomMargin=24
    )
    
    story = []
    styles = getSampleStyleSheet()
    
    # Professional color palette
    primary_color = colors.HexColor("#1e3a8a")   # Professional Deep Blue Accent
    text_color = colors.HexColor("#000000")      # Solid Black for body text
    muted_text_color = colors.HexColor("#374151") # Charcoal for metadata/subtitles
    
    # Typography Styles using standard built-in Times family
    title_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Heading1'],
        fontName='Times-Bold',
        fontSize=21,
        leading=24,
        textColor=primary_color,
        alignment=1, # Centered
        spaceAfter=2
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10,
        leading=12,
        textColor=muted_text_color,
        alignment=1, # Centered
        spaceAfter=6
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        alignment=1 # Centered
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitleStyle',
        parent=styles['Heading2'],
        fontName='Times-Bold',
        fontSize=10.5,
        leading=13,
        textColor=primary_color,
        spaceBefore=0,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11,
        textColor=text_color
    )
    
    bold_body_style = ParagraphStyle(
        'BoldBodyStyle',
        parent=body_style,
        fontName='Times-Bold'
    )
    
    italic_body_style = ParagraphStyle(
        'ItalicBodyStyle',
        parent=body_style,
        fontName='Times-Italic'
    )
    
    # Custom bullet point style with hanging indent for clean list alignment
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=1
    )
    
    # 1. Header Section
    story.append(Paragraph("AAYUSH HARAL", title_style))
    story.append(Paragraph("Computer Engineer & Web Developer", subtitle_style))
    
    # 2. Contact Information Grid (Centered)
    contact_data = [
        [
            Paragraph("<b>Email:</b> aayushharal05@gmail.com", contact_style),
            Paragraph("<b>Phone:</b> +91 98348 69758", contact_style),
            Paragraph("<b>WhatsApp:</b> +91 95034 23644", contact_style)
        ],
        [
            Paragraph("<b>Location:</b> Nashik, Maharashtra, India", contact_style),
            Paragraph("<b>LinkedIn:</b> linkedin.com/in/aayush-haral-8b4113305", contact_style),
            Paragraph("<b>GitHub:</b> github.com/aayush-haral", contact_style)
        ]
    ]
    
    contact_table = Table(contact_data, colWidths=[184, 184, 184])
    contact_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(contact_table)
    
    # Divider below Header (Blue Accent line)
    divider_data = [['']]
    divider_table = Table(divider_data, colWidths=[552])
    divider_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 1.2, primary_color),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(divider_table)
    
    story.append(Spacer(1, 8))
    
    # 3. Career Objective Section
    story.append(Paragraph("CAREER OBJECTIVE", section_title_style))
    story.append(Paragraph(
        "Computer Engineering student with hands-on experience in web development using HTML, CSS, JavaScript, "
        "React.js, PHP, Java, Python, MySQL, and MongoDB. Developed academic projects including a Smart Attendance "
        "Management System, SmartCartAI demonstrating skills in full-stack development and problem-solving. "
        "Passionate about building innovative software solutions and continuously learning modern technologies. "
        "Seeking an opportunity as a Software Developer or Full Stack Developer to apply my technical skills and "
        "contribute to real-world projects.", body_style
    ))
    
    story.append(Spacer(1, 10))
    
    # 4. Education Section
    story.append(Paragraph("EDUCATION", section_title_style))
    edu_data = [
        [
            Paragraph("<b>Degree / Certificate</b>", bold_body_style),
            Paragraph("<b>Board / University</b>", bold_body_style),
            Paragraph("<b>Year</b>", bold_body_style),
            Paragraph("<b>Percentage</b>", bold_body_style)
        ],
        [
            Paragraph("B.E. Computer Engineering", body_style),
            Paragraph("Guru Gobind Singh College of Engineering & Research Centre, Nashik (SPPU)", body_style),
            Paragraph("2023 - Present", body_style),
            Paragraph("Pursuing", body_style)
        ],
        [
            Paragraph("Higher Secondary Certificate (HSC)", body_style),
            Paragraph("State Board of Maharashtra", body_style),
            Paragraph("2022 - 2023", body_style),
            Paragraph("71%", body_style)
        ],
        [
            Paragraph("Secondary School Certificate (SSC)", body_style),
            Paragraph("State Board of Maharashtra", body_style),
            Paragraph("2019 - 2020", body_style),
            Paragraph("82%", body_style)
        ]
    ]
    edu_table = Table(edu_data, colWidths=[190, 190, 80, 80])
    edu_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f9fafb")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#d1d5db")),
        ('PADDING', (0,0), (-1,-1), 3.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(edu_table)
    
    story.append(Spacer(1, 10))
    
    # 5. Technical Skills Section
    story.append(Paragraph("TECHNICAL SKILLS", section_title_style))
    skills_data = [
        [Paragraph("<b>Frontend Technologies:</b>", bold_body_style), Paragraph("HTML, CSS, JavaScript, React.js", body_style)],
        [Paragraph("<b>Backend & Logic:</b>", bold_body_style), Paragraph("PHP, Python, Java", body_style)],
        [Paragraph("<b>Databases:</b>", bold_body_style), Paragraph("MySQL, MongoDB", body_style)],
        [Paragraph("<b>Tools & Systems:</b>", bold_body_style), Paragraph("Git, GitHub, VS Code", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[140, 400])
    skills_table.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e5e7eb")),
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#fcfcfc")),
        ('PADDING', (0,0), (-1,-1), 3.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(skills_table)
    
    story.append(Spacer(1, 10))
    
    # 6. Key Projects Section
    story.append(Paragraph("KEY PROJECTS", section_title_style))
    
    # Project 1: Smart Attendance Management System
    story.append(Paragraph("<b>Smart Attendance Management System</b>", bold_body_style))
    story.append(Paragraph("<i>Technologies: HTML, CSS, JavaScript, PHP, MySQL</i>", italic_body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Built student attendance tracking system featuring an interactive admin dashboard.", bullet_style))
    story.append(Paragraph("• Integrated secure role-based login authentication and attendance query reporting modules.", bullet_style))
    
    story.append(Spacer(1, 6))
    
    # Project 2: SmartCartAI
    story.append(Paragraph("<b>SmartCartAI</b>", bold_body_style))
    story.append(Paragraph("<i>Technologies: React.js, Python, JavaScript, HTML, CSS, MySQL, MongoDB</i>", italic_body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Developed AI-assisted smart shopping cart application featuring real-time item detection and billing automation.", bullet_style))
    story.append(Paragraph("• Integrated full-stack API workflows and database synchronization for inventory management and instant digital receipts.", bullet_style))
    
    story.append(Spacer(1, 6))

    # Project 3: Personal Portfolio Web Application
    story.append(Paragraph("<b>Personal Portfolio Web Application</b>", bold_body_style))
    story.append(Paragraph("<i>Technologies: HTML5, CSS3, JavaScript (ES6+), ReportLab</i>", italic_body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Architected modern, responsive single-page portfolio with dynamic dark/light themes and particle canvas animations.", bullet_style))
    story.append(Paragraph("• Implemented automated contact processing and programmatic PDF resume generation pipeline.", bullet_style))

    story.append(Spacer(1, 10))
    
    # 7. Professional Memberships Section
    story.append(Paragraph("PROFESSIONAL MEMBERSHIPS", section_title_style))
    story.append(Paragraph("• Member, Association for Computing Machinery (ACM)", bullet_style))
    
    story.append(Spacer(1, 10))
    
    # 8. Certifications Section
    story.append(Paragraph("CERTIFICATIONS", section_title_style))
    story.append(Paragraph("• Advanced Robotics Using AI And IoT — EduSkills Academy Virtual Internship", bullet_style))
    story.append(Paragraph("• Full Stack PHP Development — EduSkills Academy Virtual Internship", bullet_style))
    story.append(Paragraph("• Ethical Hacking — EduSkills Academy Virtual Internship", bullet_style))
    story.append(Paragraph("• Zscaler Zero Trust Cloud Security — EduSkills Academy Virtual Internship", bullet_style))
    
    story.append(Spacer(1, 10))
    
    # 9. Hobbies & Interests Section
    story.append(Paragraph("HOBBIES & INTERESTS", section_title_style))
    story.append(Paragraph("• Coding & Problem Solving | Learning New Technologies | Web Designing | Listening to Music", body_style))
    
    # Build Document with debug page template callback
    def page_callback(canvas, doc):
        print(f"DEBUG Page Callback: Drawing page {doc.page}...")
        
    doc.build(story, onFirstPage=page_callback, onLaterPages=page_callback)
    print(f"Success: Professional resume PDF generated at '{filename}'.")

if __name__ == "__main__":
    create_resume_pdf("resume.pdf")
