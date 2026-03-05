import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function MonoTemplate({ content, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionStyle: React.CSSProperties = {
    marginBottom: '18px',
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: '#333',
    margin: '0 0 8px 0',
    borderBottom: '1px solid #ddd',
    paddingBottom: '4px',
  }

  const bodyTextStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 400,
    color: '#555',
    lineHeight: 1.6,
  }

  const dateStyle: React.CSSProperties = {
    fontSize: '9px',
    fontWeight: 300,
    color: '#888',
    whiteSpace: 'nowrap',
    marginLeft: '12px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '44px 48px',
        fontSize: '10px',
        lineHeight: 1.6,
        color: '#555',
      }}
    >
      {/* Header */}
      {personal.name && (
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#111',
            margin: '0 0 6px 0',
            letterSpacing: '0.5px',
          }}
        >
          {personal.name}
        </h1>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            fontSize: '9px',
            fontWeight: 300,
            color: '#999',
            marginBottom: '24px',
          }}
        >
          {contactParts.join('  ·  ')}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div style={sectionStyle}>
          <p style={{ ...bodyTextStyle, margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '14px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#222' }}>{exp.title}</span>
                {(exp.startDate || exp.endDate) && (
                  <span style={dateStyle}>
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </span>
                )}
              </div>
              {exp.company && (
                <div style={{ fontSize: '9.5px', fontWeight: 400, color: '#666', marginTop: '1px' }}>
                  {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                </div>
              )}
              {exp.description && (
                <div style={{ ...bodyTextStyle, marginTop: '4px', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Education</h2>
          {education.map((edu, i) => (
            <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '10px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#222' }}>{edu.degree}</span>
                {(edu.startDate || edu.endDate) && (
                  <span style={dateStyle}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                )}
              </div>
              {edu.school && (
                <div style={{ fontSize: '9.5px', fontWeight: 400, color: '#666', marginTop: '1px' }}>
                  {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                </div>
              )}
              {edu.gpa && (
                <div style={{ fontSize: '9px', fontWeight: 300, color: '#888', marginTop: '2px' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ fontSize: '10px', fontWeight: 300, color: '#999' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '10px' : '0' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#222' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ fontSize: '9px', fontWeight: 300, color: '#999', marginLeft: '8px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ ...bodyTextStyle, marginTop: '3px' }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ fontSize: '9px', fontWeight: 300, color: '#999', marginTop: '3px' }}>
                  {proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#222' }}>{cert.name}</span>
              {cert.issuer && <span style={{ fontWeight: 400, color: '#666' }}> — {cert.issuer}</span>}
              {cert.date && <span style={{ fontWeight: 300, color: '#999', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Languages</h2>
          <div style={bodyTextStyle}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 700, color: '#222' }}>{lang.language}</span>
                {lang.proficiency && <span style={{ fontWeight: 300, color: '#888' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
