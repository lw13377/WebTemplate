import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function ChancellorTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '6px',
    marginTop: '20px',
    paddingBottom: '3px',
  }

  const sectionDividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: lightenColor(themeColor, 0.7),
    marginBottom: '6px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Helvetica Neue", sans-serif`,
        padding: '0',
        lineHeight: 1.45,
        fontSize: '10.5px',
      }}
    >
      {/* Full-width dark header band */}
      <div
        style={{
          backgroundColor: themeColor,
          padding: '30px 44px 26px 44px',
          textAlign: 'center',
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              margin: 0,
              color: '#ffffff',
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
              marginTop: '10px',
              fontSize: '9.5px',
              color: 'rgba(255, 255, 255, 0.85)',
              letterSpacing: '0.5px',
            }}
          >
            {contactParts.join('   \u00B7   ')}
          </div>
        )}
      </div>

      {/* Thin accent line below header */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(to right, transparent, ${lightenColor(themeColor, 0.4)}, transparent)`,
        }}
      />

      {/* Body */}
      <div style={{ padding: '8px 44px 36px 44px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <div style={sectionDividerStyle} />
            <p style={{ margin: '0', color: '#333', lineHeight: 1.6 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Professional Experience</h2>
            <div style={sectionDividerStyle} />
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>
                      {exp.title}
                    </span>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <div style={{ fontSize: '10.5px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {exp.company}
                    {exp.company && exp.location && '  \u2014  '}
                    {exp.location && (
                      <span style={{ color: '#777', fontWeight: 400 }}>{exp.location}</span>
                    )}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#333', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
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
            <div style={sectionDividerStyle} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                      {edu.degree}
                    </span>
                    {edu.school && (
                      <span style={{ color: '#555', marginLeft: '8px' }}>
                        {edu.school}
                      </span>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
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

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Core Competencies</h2>
            <div style={sectionDividerStyle} />
            <div style={{ color: '#333', lineHeight: 1.6 }}>
              {allSkills.join(', ')}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            <div style={sectionDividerStyle} />
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
            <div style={sectionDividerStyle} />
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginTop: '6px' }}>
                <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#555' }}> — {cert.issuer}</span>}
                {cert.date && (
                  <span style={{ color: '#777', marginLeft: '8px', fontSize: '10px' }}>
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
            <div style={sectionDividerStyle} />
            <div style={{ marginTop: '4px', color: '#333' }}>
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
