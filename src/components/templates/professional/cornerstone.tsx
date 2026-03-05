import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function CornerstoneTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: themeColor,
    marginBottom: '8px',
    marginTop: '18px',
  }

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: '#e0e0e0',
    marginTop: '4px',
    marginBottom: '0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Helvetica Neue", sans-serif`,
        padding: '0',
        lineHeight: 1.45,
        fontSize: '10.5px',
        position: 'relative',
      }}
    >
      {/* Top-left corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '8px',
          height: '100px',
          backgroundColor: themeColor,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100px',
          height: '8px',
          backgroundColor: themeColor,
        }}
      />

      {/* Bottom-right corner accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '8px',
          height: '100px',
          backgroundColor: themeColor,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100px',
          height: '8px',
          backgroundColor: themeColor,
        }}
      />

      {/* Content area */}
      <div style={{ padding: '36px 44px 40px 44px' }}>
        {/* Header */}
        {personal.name && (
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 300,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
            }}
          >
            {personal.name}
          </h1>
        )}

        {contactParts.length > 0 && (
          <div
            style={{
              marginTop: '8px',
              fontSize: '9.5px',
              color: '#666',
              letterSpacing: '0.5px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {contactParts.map((part, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      backgroundColor: themeColor,
                      marginRight: '6px',
                    }}
                  />
                )}
                {part}
              </span>
            ))}
          </div>
        )}

        <div style={dividerStyle} />

        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Profile</h2>
            <p style={{ margin: '0', color: '#333', lineHeight: 1.6 }}>{summary}</p>
          </div>
        )}

        {/* Experience + Education in a structured layout */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Professional Experience</h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  paddingLeft: '12px',
                  borderLeft: `2px solid ${themeColor}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                    {exp.title}
                  </span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <div style={{ fontSize: '10.5px', color: '#555', marginTop: '1px' }}>
                    {exp.company}
                    {exp.company && exp.location && ', '}
                    {exp.location}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '4px', color: '#333', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
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
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  paddingLeft: '12px',
                  borderLeft: `2px solid ${themeColor}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                    {edu.degree}
                  </span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {(edu.school || edu.location) && (
                  <div style={{ fontSize: '10.5px', color: '#555', marginTop: '1px' }}>
                    {edu.school}
                    {edu.school && edu.location && ', '}
                    {edu.location}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ color: '#333', lineHeight: 1.6 }}>
              {allSkills.join(', ')}
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
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                    {proj.name}
                  </span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '10px' }}>
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#333', lineHeight: 1.55 }}>
                    {proj.description}
                  </div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '3px', fontSize: '10px', color: '#555' }}>
                    Technologies: {proj.technologies.join(', ')}
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
              <div key={cert.id} style={{ marginTop: '6px' }}>
                <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#555' }}> — {cert.issuer}</span>}
                {cert.date && (
                  <span style={{ color: '#888', marginLeft: '8px', fontSize: '10px' }}>
                    ({cert.date})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ marginTop: '6px', color: '#333' }}>
              {languages.map((lang, i) => (
                <span key={lang.id}>
                  <span style={{ fontWeight: 600 }}>{lang.language}</span>
                  {lang.proficiency && <span style={{ color: '#555' }}> ({lang.proficiency})</span>}
                  {i < languages.length - 1 && '  |  '}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
