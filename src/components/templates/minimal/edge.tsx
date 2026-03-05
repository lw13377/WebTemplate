import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function EdgeTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionStyle: React.CSSProperties = {
    marginBottom: '6px',
    padding: '14px 28px',
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '9px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: themeColor,
    margin: '0 0 10px 0',
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
        padding: '0',
        fontSize: '10px',
        lineHeight: 1.6,
        color: '#333',
      }}
    >
      {/* Header — pushed to edges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '36px 28px 20px 28px',
          borderBottom: '1px solid #eee',
        }}
      >
        <div>
          {personal.name && (
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#111',
                margin: '0',
                letterSpacing: '0.5px',
              }}
            >
              {personal.name}
            </h1>
          )}
        </div>
        {contactParts.length > 0 && (
          <div
            style={{
              fontSize: '8px',
              color: '#999',
              textAlign: 'right',
              lineHeight: 1.8,
            }}
          >
            {contactParts.map((part, i) => (
              <div key={i}>{part}</div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div style={sectionStyle}>
          <p style={{ ...bodyTextStyle, margin: 0, color: '#666' }}>{summary}</p>
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
                  <span style={{ fontSize: '9px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </span>
                )}
              </div>
              {exp.company && (
                <div style={{ fontSize: '9.5px', color: '#777', marginTop: '1px' }}>
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
                  <span style={{ fontSize: '9px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                )}
              </div>
              {edu.school && (
                <div style={{ fontSize: '9.5px', color: '#777', marginTop: '1px' }}>
                  {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                </div>
              )}
              {edu.gpa && (
                <div style={{ fontSize: '9px', color: '#aaa', marginTop: '2px' }}>GPA: {edu.gpa}</div>
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
                  <span style={{ fontSize: '9px', color: '#aaa', marginLeft: '8px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ ...bodyTextStyle, marginTop: '3px' }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ fontSize: '9px', color: '#aaa', marginTop: '3px' }}>
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
              {cert.issuer && <span style={{ color: '#777' }}> — {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#aaa', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>}
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
                <span style={{ fontWeight: 600, color: '#111' }}>{lang.language}</span>
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
