import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function LineTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionStyle: React.CSSProperties = {
    marginBottom: '18px',
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: '#222',
    margin: '0 0 8px 0',
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
        padding: '48px 50px',
        fontSize: '10px',
        lineHeight: 1.6,
        color: '#333',
      }}
    >
      {/* Header */}
      {personal.name && (
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 300,
            color: '#111',
            margin: '0 0 6px 0',
            letterSpacing: '1px',
          }}
        >
          {personal.name}
        </h1>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            fontSize: '9px',
            color: '#777',
            marginBottom: '10px',
          }}
        >
          {contactParts.join('  |  ')}
        </div>
      )}

      {/* The single line — the only decorative element */}
      <div
        style={{
          height: '1px',
          backgroundColor: themeColor,
          marginBottom: '24px',
        }}
      />

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
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Education</h2>
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
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={bodyTextStyle}>
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
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#111' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#666' }}> — {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>}
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
                {lang.language}
                {lang.proficiency && <span style={{ color: '#888' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
