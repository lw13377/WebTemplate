import React from 'react'
import type { TemplateProps } from '../base-styles'
import { lightenColor, pageContainerStyle } from '../base-styles'

export default function ExecutiveTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    color: '#1a1a1a',
    marginBottom: '8px',
    marginTop: '18px',
    paddingLeft: '10px',
    borderLeft: `3px solid ${themeColor}`,
    lineHeight: 1.3,
  }

  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: lightenColor(themeColor, 0.88),
    color: themeColor,
    padding: '2px 8px',
    borderRadius: '3px',
    fontSize: '9.5px',
    fontWeight: 600,
    marginRight: '5px',
    marginBottom: '4px',
  }

  const contactItemStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#555',
    marginBottom: '2px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.45,
        fontSize: '10.5px',
      }}
    >
      {/* Two-column header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '32px 40px 20px 40px',
        }}
      >
        {/* Left side: name and title */}
        <div>
          {personal.name && (
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                margin: 0,
                color: '#1a1a1a',
              }}
            >
              {personal.name}
            </h1>
          )}
          {experience.length > 0 && experience[0].title && (
            <div
              style={{
                fontSize: '13px',
                color: themeColor,
                fontWeight: 500,
                marginTop: '4px',
              }}
            >
              {experience[0].title}
            </div>
          )}
        </div>

        {/* Right side: contact details */}
        <div style={{ textAlign: 'right', paddingTop: '4px' }}>
          {personal.email && <div style={contactItemStyle}>{personal.email}</div>}
          {personal.phone && <div style={contactItemStyle}>{personal.phone}</div>}
          {personal.location && <div style={contactItemStyle}>{personal.location}</div>}
          {personal.website && <div style={contactItemStyle}>{personal.website}</div>}
          {personal.linkedin && <div style={contactItemStyle}>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{
          height: '2.5px',
          background: `linear-gradient(to right, ${themeColor}, ${lightenColor(themeColor, 0.6)})`,
          margin: '0 40px',
        }}
      />

      {/* Body */}
      <div style={{ padding: '4px 40px 36px 40px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Professional Summary</h2>
            <p style={{ margin: '0', color: '#333', lineHeight: 1.6 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{exp.title}</span>
                    {exp.company && (
                      <span style={{ color: themeColor, marginLeft: '6px', fontWeight: 500 }}>
                        at {exp.company}
                      </span>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.location && (
                  <div style={{ fontSize: '10px', color: '#777', marginTop: '1px' }}>{exp.location}</div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#333', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                    {exp.description.split('\n').map((line, idx) => {
                      const trimmed = line.trim()
                      if (!trimmed) return null
                      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('*')
                      return (
                        <div
                          key={idx}
                          style={{
                            paddingLeft: isBullet ? '12px' : '0',
                            textIndent: isBullet ? '-8px' : '0',
                            marginTop: idx > 0 ? '2px' : '0',
                          }}
                        >
                          {isBullet ? `\u2022 ${trimmed.slice(1).trim()}` : trimmed}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{edu.degree}</span>
                    {edu.school && (
                      <span style={{ color: '#555', marginLeft: '6px' }}>- {edu.school}</span>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.location && (
                  <div style={{ fontSize: '10px', color: '#777', marginTop: '1px' }}>{edu.location}</div>
                )}
                {edu.gpa && (
                  <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills - displayed as inline tags */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => (
                <span key={i} style={tagStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '10px' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#333', lineHeight: 1.5 }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '4px' }}>
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} style={tagStyle}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#555' }}> - {cert.issuer}</span>}
                {cert.date && (
                  <span style={{ color: '#777', marginLeft: '8px', fontSize: '10px' }}>({cert.date})</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
    </div>
  )
}
