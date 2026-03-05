import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function ZenTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionStyle: React.CSSProperties = {
    marginBottom: '22px',
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '9px',
    fontWeight: 400,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: '#999',
    margin: '0 0 10px 0',
  }

  const bodyTextStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#444',
    lineHeight: 1.7,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '50px 50px 50px 70px',
        fontSize: '10px',
        lineHeight: 1.7,
        color: '#444',
        position: 'relative',
      }}
    >
      {/* Vertical line on left margin */}
      <div
        style={{
          position: 'absolute',
          left: '44px',
          top: '50px',
          bottom: '50px',
          width: '1px',
          backgroundColor: themeColor,
          opacity: 0.4,
        }}
      />

      {/* Header — name right-aligned */}
      {personal.name && (
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 300,
            color: '#222',
            margin: '0 0 6px 0',
            textAlign: 'right',
            letterSpacing: '2px',
          }}
        >
          {personal.name}
        </h1>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            fontSize: '8.5px',
            color: '#aaa',
            textAlign: 'right',
            marginBottom: '40px',
            letterSpacing: '0.5px',
          }}
        >
          {contactParts.join('   ·   ')}
        </div>
      )}

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
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '16px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 500, fontSize: '10.5px', color: '#222' }}>{exp.title}</span>
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '8.5px', color: '#bbb', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </span>
                )}
              </div>
              {exp.company && (
                <div style={{ fontSize: '9.5px', color: '#888', marginTop: '2px' }}>
                  {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                </div>
              )}
              {exp.description && (
                <div style={{ ...bodyTextStyle, marginTop: '5px', whiteSpace: 'pre-line' }}>
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
            <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '12px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 500, fontSize: '10.5px', color: '#222' }}>{edu.degree}</span>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '8.5px', color: '#bbb', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                )}
              </div>
              {edu.school && (
                <div style={{ fontSize: '9.5px', color: '#888', marginTop: '2px' }}>
                  {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                </div>
              )}
              {edu.gpa && (
                <div style={{ fontSize: '8.5px', color: '#bbb', marginTop: '2px' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ ...bodyTextStyle, color: '#777' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '12px' : '0' }}>
              <div>
                <span style={{ fontWeight: 500, fontSize: '10.5px', color: '#222' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ fontSize: '8.5px', color: '#bbb', marginLeft: '8px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ ...bodyTextStyle, marginTop: '3px' }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ fontSize: '8.5px', color: '#bbb', marginTop: '3px' }}>
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
            <div key={cert.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 500, color: '#222' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#888' }}> — {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#bbb', marginLeft: '6px', fontSize: '8.5px' }}>({cert.date})</span>}
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
                {lang.proficiency && <span style={{ color: '#999' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
