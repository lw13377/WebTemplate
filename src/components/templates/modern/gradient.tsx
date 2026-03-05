import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, lightenColor, pageContainerStyle } from '../base-styles'

export default function GradientTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)
  const rgb = hexToRgb(themeColor)
  const gradientFrom = themeColor
  const gradientTo = lightenColor(themeColor, 0.35)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: '#1a1a1a',
    marginBottom: '4px',
    marginTop: '20px',
    paddingBottom: '6px',
    position: 'relative' as const,
  }

  const gradientUnderline: React.CSSProperties = {
    height: '2px',
    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo}, transparent)`,
    marginBottom: '10px',
  }

  const dotMarkerStyle: React.CSSProperties = {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: themeColor,
    flexShrink: 0,
    marginTop: '5px',
  }

  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '4px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
    color: themeColor,
    marginRight: '5px',
    marginBottom: '5px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          color: '#ffffff',
          padding: '32px 40px 28px 40px',
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          >
            {personal.name}
          </h1>
        )}

        {/* Contact on gradient */}
        {(personal.email || personal.phone || personal.location || personal.website || personal.linkedin) && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px 18px',
              marginTop: '10px',
              fontSize: '9.5px',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        )}

        {/* Summary overlay on gradient */}
        {summary && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '6px',
              fontSize: '10px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {summary}
          </div>
        )}
      </div>

      {/* Body content */}
      <div style={{ padding: '4px 40px 36px 40px' }}>
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            <div style={gradientUnderline} />
            {experience.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                <div style={dotMarkerStyle} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap' }}>
                        {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                      {exp.company}
                      {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
                    </div>
                  )}
                  {exp.description && (
                    <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {exp.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Education</h2>
            <div style={gradientUnderline} />
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                <div style={dotMarkerStyle} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                    {(edu.startDate || edu.endDate) && (
                      <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap' }}>
                        {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                      </span>
                    )}
                  </div>
                  {edu.school && (
                    <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                      {edu.school}
                      {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                    </div>
                  )}
                  {edu.gpa && (
                    <div style={{ marginTop: '2px', color: '#666', fontSize: '9.5px' }}>GPA: {edu.gpa}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills - tag cloud */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={gradientUnderline} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allSkills.map((skill, i) => (
                <span key={i} style={tagStyle}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            <div style={gradientUnderline} />
            {projects.map((proj) => (
              <div key={proj.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={dotMarkerStyle} />
                <div style={{ flex: 1 }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                    {proj.url && (
                      <span style={{ color: themeColor, marginLeft: '8px', fontSize: '9px' }}>{proj.url}</span>
                    )}
                  </div>
                  {proj.description && (
                    <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6 }}>{proj.description}</div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={tagStyle}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Languages side by side */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div style={{ display: 'flex', gap: '30px' }}>
            {certifications.length > 0 && (
              <div style={{ flex: languages.length > 0 ? '1 1 55%' : '1 1 100%' }}>
                <h2 style={sectionHeadingStyle}>Certifications</h2>
                <div style={gradientUnderline} />
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cert.name}</span>
                    {cert.issuer && <span style={{ color: '#666' }}> - {cert.issuer}</span>}
                    {cert.date && (
                      <span style={{ color: '#888', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ flex: certifications.length > 0 ? '1 1 45%' : '1 1 100%' }}>
                <h2 style={sectionHeadingStyle}>Languages</h2>
                <div style={gradientUnderline} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={tagStyle}>
                      {lang.language}
                      {lang.proficiency && ` (${lang.proficiency})`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
