import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function GridTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const labelWidth = 100

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: '16px',
  }

  const labelStyle: React.CSSProperties = {
    width: `${labelWidth}px`,
    minWidth: `${labelWidth}px`,
    fontSize: '8px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    paddingTop: '2px',
    paddingRight: '16px',
    boxSizing: 'border-box' as const,
  }

  const contentColStyle: React.CSSProperties = {
    flex: 1,
    fontSize: '10px',
    color: '#333',
    lineHeight: 1.6,
  }

  const bodyTextStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#444',
    lineHeight: 1.6,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '44px 44px',
        fontSize: '10px',
        lineHeight: 1.6,
        color: '#333',
      }}
    >
      {/* Header */}
      {personal.name && (
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#111',
            margin: '0 0 4px 0',
          }}
        >
          {personal.name}
        </h1>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            fontSize: '9px',
            color: '#888',
            marginBottom: '24px',
          }}
        >
          {contactParts.join('  |  ')}
        </div>
      )}

      {/* Separator */}
      <div style={{ borderTop: `1px solid ${themeColor}`, marginBottom: '20px', opacity: 0.3 }} />

      {/* Summary */}
      {summary && (
        <div style={rowStyle}>
          <div style={labelStyle}>Summary</div>
          <div style={contentColStyle}>
            <p style={{ ...bodyTextStyle, margin: 0 }}>{summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={rowStyle}>
          <div style={labelStyle}>Experience</div>
          <div style={contentColStyle}>
            {experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '14px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '10.5px', color: '#111' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '9.5px', color: '#666', marginTop: '1px' }}>
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
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={rowStyle}>
          <div style={labelStyle}>Education</div>
          <div style={contentColStyle}>
            {education.map((edu, i) => (
              <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '10px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '10.5px', color: '#111' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '9.5px', color: '#666', marginTop: '1px' }}>
                    {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ fontSize: '9px', color: '#888', marginTop: '2px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div style={rowStyle}>
          <div style={labelStyle}>Skills</div>
          <div style={contentColStyle}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={rowStyle}>
          <div style={labelStyle}>Projects</div>
          <div style={contentColStyle}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '10px' : '0' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '10.5px', color: '#111' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ fontSize: '9px', color: '#999', marginLeft: '8px' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ ...bodyTextStyle, marginTop: '3px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ fontSize: '9px', color: '#888', marginTop: '3px' }}>
                    {proj.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={rowStyle}>
          <div style={labelStyle}>Certifications</div>
          <div style={contentColStyle}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#111' }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#666' }}> — {cert.issuer}</span>}
                {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={rowStyle}>
          <div style={labelStyle}>Languages</div>
          <div style={contentColStyle}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600, color: '#111' }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#777' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
