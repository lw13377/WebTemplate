import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'

export default function FormalTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: '#1a1a1a',
    marginBottom: '10px',
    marginTop: '20px',
    textAlign: 'center' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const ornamentalLineStyle: React.CSSProperties = {
    flex: 1,
    height: '1px',
    backgroundColor: themeColor,
    opacity: 0.4,
  }

  const thinBorderStyle: React.CSSProperties = {
    border: 'none',
    borderTop: `0.5px solid ${themeColor}`,
    opacity: 0.3,
    margin: '0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Georgia", serif`,
        padding: '44px 48px',
        lineHeight: 1.5,
        fontSize: '10.5px',
        border: `0.5px solid ${themeColor}`,
        borderTop: 'none',
        borderBottom: 'none',
      }}
    >
      {/* Decorative top border */}
      <div
        style={{
          height: '1px',
          backgroundColor: themeColor,
          marginBottom: '4px',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          height: '0.5px',
          backgroundColor: themeColor,
          marginBottom: '24px',
          opacity: 0.3,
        }}
      />

      {/* Header - centered, formal */}
      {personal.name && (
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 400,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
            }}
          >
            {personal.name}
          </h1>
        </div>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            textAlign: 'center',
            fontSize: '9.5px',
            color: '#666',
            marginTop: '8px',
            letterSpacing: '0.5px',
          }}
        >
          {contactParts.join('   \u00B7   ')}
        </div>
      )}

      {/* Decorative lines below header */}
      <div style={{ marginTop: '18px' }}>
        <div
          style={{
            height: '0.5px',
            backgroundColor: themeColor,
            opacity: 0.3,
          }}
        />
        <div
          style={{
            height: '1px',
            backgroundColor: themeColor,
            marginTop: '4px',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Summary</span>
            <div style={ornamentalLineStyle} />
          </div>
          <p
            style={{
              margin: '0',
              color: '#333',
              lineHeight: 1.65,
              textAlign: 'justify' as const,
              fontStyle: 'italic',
            }}
          >
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Professional Experience</span>
            <div style={ornamentalLineStyle} />
          </div>
          {experience.map((exp, expIdx) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>{exp.title}</div>
                {exp.company && (
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '1px', fontStyle: 'italic' }}>
                    {exp.company}
                    {exp.location && `, ${exp.location}`}
                  </div>
                )}
                {(exp.startDate || exp.endDate) && (
                  <div style={{ fontSize: '9.5px', color: '#888', marginTop: '2px', letterSpacing: '0.5px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' \u2014 ' : ''}{exp.endDate}
                  </div>
                )}
              </div>
              {exp.description && (
                <div
                  style={{
                    marginTop: '6px',
                    color: '#333',
                    lineHeight: 1.6,
                    textAlign: 'justify' as const,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {exp.description}
                </div>
              )}
              {expIdx < experience.length - 1 && (
                <hr style={{ ...thinBorderStyle, marginTop: '12px' }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Education</span>
            <div style={ornamentalLineStyle} />
          </div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', textAlign: 'center' as const }}>
              <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{edu.degree}</div>
              {edu.school && (
                <div style={{ fontSize: '11px', color: '#555', fontStyle: 'italic', marginTop: '1px' }}>
                  {edu.school}
                  {edu.location && `, ${edu.location}`}
                </div>
              )}
              {(edu.startDate || edu.endDate) && (
                <div style={{ fontSize: '9.5px', color: '#888', marginTop: '2px', letterSpacing: '0.5px' }}>
                  {edu.startDate}{edu.startDate && edu.endDate ? ' \u2014 ' : ''}{edu.endDate}
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
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Skills</span>
            <div style={ornamentalLineStyle} />
          </div>
          <div style={{ textAlign: 'center' as const, color: '#333' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Projects</span>
            <div style={ornamentalLineStyle} />
          </div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px', textAlign: 'center' as const }}>
              <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                {proj.name}
                {proj.url && (
                  <span style={{ fontWeight: 400, color: themeColor, marginLeft: '8px', fontSize: '10px' }}>
                    {proj.url}
                  </span>
                )}
              </div>
              {proj.description && (
                <div
                  style={{
                    marginTop: '3px',
                    color: '#333',
                    lineHeight: 1.55,
                    textAlign: 'justify' as const,
                  }}
                >
                  {proj.description}
                </div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '3px', fontSize: '9.5px', color: '#666', fontStyle: 'italic' }}>
                  {proj.technologies.join(' \u00B7 ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Certifications</span>
            <div style={ornamentalLineStyle} />
          </div>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '5px', textAlign: 'center' as const }}>
              <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#555', fontStyle: 'italic' }}> \u2014 {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#888', marginLeft: '6px', fontSize: '9.5px' }}>({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>
            <div style={ornamentalLineStyle} />
            <span>Languages</span>
            <div style={ornamentalLineStyle} />
          </div>
          <div style={{ textAlign: 'center', color: '#333' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600 }}>{lang.language}</span>
                {lang.proficiency && (
                  <span style={{ color: '#555', fontStyle: 'italic' }}> ({lang.proficiency})</span>
                )}
                {i < languages.length - 1 && '   \u00B7   '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decorative bottom border */}
      <div style={{ marginTop: '24px' }}>
        <div
          style={{
            height: '1px',
            backgroundColor: themeColor,
            opacity: 0.5,
          }}
        />
        <div
          style={{
            height: '0.5px',
            backgroundColor: themeColor,
            marginTop: '4px',
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  )
}
