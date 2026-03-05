import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function DiplomatTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const initials = personal.name
    ? personal.name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : ''

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.2px',
    color: '#2a2a2a',
    marginBottom: '6px',
    marginTop: '18px',
    paddingBottom: '4px',
    borderBottom: `1px solid #d0d0d0`,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Georgia", serif`,
        padding: '0',
        lineHeight: 1.45,
        fontSize: '10.5px',
      }}
    >
      {/* Two-tone header: dark band */}
      <div
        style={{
          backgroundColor: '#1e1e2e',
          padding: '28px 40px 24px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Monogram circle */}
        {initials && (
          <div
            style={{
              width: '56px',
              height: '56px',
              minWidth: '56px',
              borderRadius: '50%',
              backgroundColor: themeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            {initials}
          </div>
        )}

        <div style={{ flex: 1 }}>
          {personal.name && (
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 700,
                margin: 0,
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              {personal.name}
            </h1>
          )}
          {contactParts.length > 0 && (
            <div
              style={{
                fontSize: '9.5px',
                color: '#c0c0c8',
                marginTop: '6px',
                letterSpacing: '0.3px',
              }}
            >
              {contactParts.join('  |  ')}
            </div>
          )}
        </div>
      </div>

      {/* Accent stripe */}
      <div
        style={{
          height: '3px',
          backgroundColor: themeColor,
        }}
      />

      {/* Body */}
      <div style={{ padding: '12px 40px 36px 40px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Professional Summary</h2>
            <p style={{ margin: '6px 0 0 0', color: '#333', lineHeight: 1.6, fontStyle: 'italic' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                      {exp.title}
                    </span>
                    {exp.company && (
                      <span style={{ color: themeColor, marginLeft: '6px', fontWeight: 600 }}>
                        {exp.company}
                      </span>
                    )}
                    {exp.location && (
                      <span style={{ color: '#777', marginLeft: '6px', fontSize: '10px' }}>
                        {exp.location}
                      </span>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
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
              <div key={edu.id} style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                      {edu.degree}
                    </span>
                    {edu.school && (
                      <span style={{ color: '#555', marginLeft: '6px', fontStyle: 'italic' }}>
                        {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                      </span>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: '#555', fontSize: '10px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ marginTop: '6px', color: '#333' }}>
              {allSkills.join(', ')}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginTop: '10px' }}>
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
