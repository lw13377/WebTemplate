import React from 'react'
import type { TemplateProps } from '../base-styles'
import { lightenColor, pageContainerStyle, PAGE_HEIGHT } from '../base-styles'

export default function SidebarTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const sidebarWidth = '35%'
  const mainWidth = '65%'

  const sidebarSectionTitle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: '#ffffff',
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '5px',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
  }

  const mainSectionTitle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '5px',
    borderBottom: `1px solid ${lightenColor(themeColor, 0.7)}`,
  }

  const contactIconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }

  const contactDotStyle: React.CSSProperties = {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        display: 'flex',
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          minHeight: `${PAGE_HEIGHT}px`,
          backgroundColor: themeColor,
          color: '#ffffff',
          padding: '32px 20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Name on sidebar */}
        {personal.name && (
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              margin: 0,
              color: '#ffffff',
              lineHeight: 1.2,
              wordWrap: 'break-word' as const,
            }}
          >
            {personal.name}
          </h1>
        )}

        {/* Contact info */}
        {(personal.email || personal.phone || personal.location || personal.website || personal.linkedin) && (
          <div style={{ marginTop: '18px' }}>
            <h2 style={{ ...sidebarSectionTitle, marginTop: '0' }}>Contact</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {personal.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={contactIconStyle}><div style={contactDotStyle} /></div>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', wordBreak: 'break-all' as const }}>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={contactIconStyle}><div style={contactDotStyle} /></div>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)' }}>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={contactIconStyle}><div style={contactDotStyle} /></div>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)' }}>{personal.location}</span>
                </div>
              )}
              {personal.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={contactIconStyle}><div style={contactDotStyle} /></div>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', wordBreak: 'break-all' as const }}>{personal.website}</span>
                </div>
              )}
              {personal.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={contactIconStyle}><div style={contactDotStyle} /></div>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', wordBreak: 'break-all' as const }}>{personal.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills on sidebar */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sidebarSectionTitle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    fontSize: '8.5px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages on sidebar */}
        {languages.length > 0 && (
          <div>
            <h2 style={sidebarSectionTitle}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 600, fontSize: '9.5px', color: '#ffffff' }}>{lang.language}</span>
                {lang.proficiency && (
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', marginLeft: '5px' }}>
                    - {lang.proficiency}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications on sidebar */}
        {certifications.length > 0 && (
          <div>
            <h2 style={sidebarSectionTitle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '9.5px', color: '#ffffff' }}>{cert.name}</div>
                {cert.issuer && (
                  <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' }}>{cert.issuer}</div>
                )}
                {cert.date && (
                  <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginTop: '1px' }}>{cert.date}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div
        style={{
          width: mainWidth,
          padding: '32px 28px',
          boxSizing: 'border-box',
        }}
      >
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={{ ...mainSectionTitle, marginTop: '0' }}>About Me</h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: '10px' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={mainSectionTitle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
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
                  <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={mainSectionTitle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
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
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={mainSectionTitle}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '6px', fontSize: '9px' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          fontSize: '8.5px',
                          backgroundColor: lightenColor(themeColor, 0.9),
                          color: themeColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
