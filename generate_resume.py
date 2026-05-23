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
    # Setup document with 0.5 inch margins
    margin = 36 # 0.5 inches in points
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    
    story = []
    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#1e3a8a") # Deep Blue
    secondary_color = colors.HexColor("#7c3aed") # Deep Purple
    text_color = colors.HexColor("#1f2937") # Charcoal Text
    
    # Custom Stylesheet definitions
    title_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=30,
        textColor=primary_color,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=secondary_color,
        spaceAfter=10
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=text_color,
        alignment=1 # Centered
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitleStyle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_color
    )
    
    bold_body_style = ParagraphStyle(
        'BoldBodyStyle',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    
    # Header Section
    story.append(Paragraph("AAYUSH ANIL HARAL", title_style))
    story.append(Paragraph("Computer Engineer & Web Developer", subtitle_style))
    
    # Contact grid (using Table for clean layout)
    contact_data = [
        [
            Paragraph("<b>Email:</b> aayushharal05@gmail.com", contact_style),
            Paragraph("<b>Phone:</b> +91 98348 69758", contact_style),
            Paragraph("<b>WhatsApp:</b> +91 95034 23644", contact_style)
        ],
        [
            Paragraph("<b>Location:</b> Nashik, Maharashtra, India", contact_style),
            Paragraph("<b>LinkedIn:</b> linkedin.com/in/aayush-haral", contact_style),
            Paragraph("<b>GitHub:</b> github.com/aayush-haral", contact_style)
        ]
    ]
    
    contact_table = Table(contact_data, colWidths=[180, 180, 180])
    contact_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(contact_table)
    
    # Draw horizontal divider
    divider_data = [['']]
    divider_table = Table(divider_data, colWidths=[540])
    divider_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 1.5, primary_color),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(divider_table)
    
    story.append(Spacer(1, 8))
    
    # Career Objective
    story.append(Paragraph("CAREER OBJECTIVE", section_title_style))
    story.append(Paragraph(
        "To obtain a challenging position in the software and web development field where I can apply my "
        "technical knowledge, improve my programming skills, and contribute to innovative real-world projects "
        "while continuously learning new technologies.", body_style
    ))
    
    story.append(Spacer(1, 8))
    
    # Education
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
            Paragraph("Savitribai Phule Pune University", body_style),
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
    edu_table = Table(edu_data, colWidths=[200, 180, 80, 80])
    edu_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f3f4f6")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#d1d5db")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(edu_table)
    
    story.append(Spacer(1, 8))
    
    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_title_style))
    skills_data = [
        [Paragraph("<b>Frontend Technologies:</b>", bold_body_style), Paragraph("HTML, CSS, JavaScript, React.js", body_style)],
        [Paragraph("<b>Backend & Logic:</b>", bold_body_style), Paragraph("PHP, Python", body_style)],
        [Paragraph("<b>Databases:</b>", bold_body_style), Paragraph("MySQL", body_style)],
        [Paragraph("<b>Tools & Systems:</b>", bold_body_style), Paragraph("Git, GitHub, VS Code", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[150, 390])
    skills_table.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e5e7eb")),
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#f9fafb")),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(skills_table)
    
    story.append(Spacer(1, 8))
    
    # Projects
    story.append(Paragraph("KEY PROJECTS", section_title_style))
    
    # Project 1
    story.append(Paragraph("<b>Smart Attendance Management System</b>", bold_body_style))
    story.append(Paragraph("<i>Technologies: HTML, CSS, JavaScript, PHP, MySQL</i>", body_style))
    story.append(Paragraph(
        "• Built student attendance tracking system featuring an interactive admin dashboard.<br/>"
        "• Integrated secure role-based login authentication and attendance query reporting modules.", body_style
    ))
    story.append(Spacer(1, 4))
    
    # Project 2
    story.append(Paragraph("<b>Student Management System</b>", bold_body_style))
    story.append(Paragraph("<i>Technologies: HTML, CSS, JavaScript, PHP, MySQL</i>", body_style))
    story.append(Paragraph(
        "• Implemented robust CRUD operations for adding, searching, updating and deleting student records.<br/>"
        "• Designed responsive layout optimized across devices with instant search capabilities.", body_style
    ))
    
    story.append(Spacer(1, 8))
    
    # Certifications & Hobbies (using Table side-by-side for compact single page design)
    cert_text = (
        "<b>EduSkills Academy Certifications:</b><br/>"
        "• Full Stack PHP Development<br/>"
        "• Ethical Hacking<br/>"
        "• Zscaler Zero Trust Cloud Security"
    )
    
    hobbies_text = (
        "<b>Hobbies & Interests:</b><br/>"
        "• Coding & Problem Solving<br/>"
        "• Learning New Technologies<br/>"
        "• Web Designing<br/>"
        "• Listening to Music"
    )
    
    footer_cols_data = [
        [Paragraph(cert_text, body_style), Paragraph(hobbies_text, body_style)]
    ]
    footer_cols_table = Table(footer_cols_data, colWidths=[270, 270])
    footer_cols_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(Paragraph("CERTIFICATIONS & INTERESTS", section_title_style))
    story.append(footer_cols_table)
    
    # Build Document
    doc.build(story)
    print(f"Success: Professional resume PDF generated at '{filename}'.")

if __name__ == "__main__":
    create_resume_pdf("resume.pdf")
