import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function BarristerTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    color: themeColor,
    marginBottom: '0px',
    marginTop: '0px',
    paddingTop: '14px',
    paddingBottom: '6px',
    fontVariant: 'small-caps',
  }

  const ruleStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid #c0c0c0',
    margin: '0',
  }

  const thickRuleStyle: React.CSSProperties = {
    border: 'none',
    borderTop: `1.5px solid ${themeColor}`,
    margin: '0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Georgia", "Times New Roman", serif`,
        padding: '40px 48px',
        lineHeight: 1.5,
        fontSize: '10.5px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        {personal.name && (
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 400,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '4px',
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
              color: '#555',
              letterSpacing: '1px',
            }}
          >
            {contactParts.join('  \u2022  ')}
          </div>
        )}
      </div>

      <hr style={{ ...thickRuleStyle, marginTop: '14px' }} />

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeadingStyle}>Professional Summary</h2>
          <hr style={ruleStyle} />
          <p
            style={{
              margin: '8px 0 0 0',
              color: '#333',
              lineHeight: 1.65,
              textAlign: 'justify' as const,
            }}
          >
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          <hr style={ruleStyle} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                    {exp.title}
                  </span>
                  {exp.company && (
                    <span style={{ color: '#444', marginLeft: '6px' }}>
                      — {exp.company}
                    </span>
                  )}
                  {exp.location && (
                    <span style={{ color: '#777', marginLeft: '4px', fontSize: '10px' }}>
                      ({exp.location})
                    </span>
                  )}
                </div>
                {(exp.startDate || exp.endDate) && (
                  <span
                    style={{
                      fontSize: '10px',
                      color: '#777',
                      whiteSpace: 'nowrap',
                      marginLeft: '12px',
                      fontStyle: 'italic',
                    }}
                  >
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </span>
                )}
              </div>
              {exp.description && (
                <div
                  style={{
                    marginTop: '4px',
                    color: '#333',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                    textAlign: 'justify' as const,
                  }}
                >
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
          <hr style={ruleStyle} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                    {edu.degree}
                  </span>
                  {edu.school && (
                    <span style={{ color: '#444', marginLeft: '6px' }}>
                      — {edu.school}
                    </span>
                  )}
                  {edu.location && (
                    <span style={{ color: '#777', marginLeft: '4px', fontSize: '10px' }}>
                      ({edu.location})
                    </span>
                  )}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span
                    style={{
                      fontSize: '10px',
                      color: '#777',
                      whiteSpace: 'nowrap',
                      marginLeft: '12px',
                      fontStyle: 'italic',
                    }}
                  >
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                )}
              </div>
              {edu.gpa && (
                <div style={{ marginTop: '2px', color: '#555', fontSize: '10px' }}>
                  Grade Point Average: {edu.gpa}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Areas of Expertise</h2>
          <hr style={ruleStyle} />
          <div style={{ marginTop: '8px', color: '#333', lineHeight: 1.6 }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Notable Projects</h2>
          <hr style={ruleStyle} />
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
                <div style={{ marginTop: '3px', color: '#333', lineHeight: 1.6, textAlign: 'justify' as const }}>
                  {proj.description}
                </div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '3px', fontSize: '10px', color: '#555', fontStyle: 'italic' }}>
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
          <h2 style={sectionHeadingStyle}>Certifications &amp; Licenses</h2>
          <hr style={ruleStyle} />
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginTop: '6px' }}>
              <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#444' }}> — {cert.issuer}</span>}
              {cert.date && (
                <span style={{ color: '#777', marginLeft: '8px', fontSize: '10px', fontStyle: 'italic' }}>
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
          <hr style={ruleStyle} />
          <div style={{ marginTop: '6px', color: '#333' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600 }}>{lang.language}</span>
                {lang.proficiency && (
                  <span style={{ color: '#555', fontStyle: 'italic' }}> ({lang.proficiency})</span>
                )}
                {i < languages.length - 1 && '  \u2022  '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom rule */}
      <hr style={{ ...thickRuleStyle, marginTop: '20px' }} />
    </div>
  )
}
