import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { hexToRgb, lightenColor, darkenColor, pageContainerStyle } from '@/components/templates/base-styles'

export default function BoldTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const { r, g, b } = hexToRgb(themeColor)
  const lightTint = lightenColor(themeColor, 0.88)
  const veryLightTint = lightenColor(themeColor, 0.94)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const sectionHeading = (label: string): React.ReactNode => (
    <div
      style={{
        marginTop: '18px',
        marginBottom: '10px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-44px',
          top: '0',
          bottom: '0',
          width: 'calc(100% + 88px)',
          backgroundColor: veryLightTint,
          zIndex: 0,
        }}
      />
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 900,
          textTransform: 'uppercase' as const,
          letterSpacing: '2px',
          color: themeColor,
          margin: 0,
          padding: '6px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </h2>
    </div>
  )

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '36px 44px 20px 44px' }}>
        {personal.name && (
          <h1
            style={{
              fontSize: '42px',
              fontWeight: 900,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '-1.5px',
              lineHeight: 1.0,
              textTransform: 'uppercase' as const,
            }}
          >
            {personal.name.split(' ').map((word, i) => (
              <span key={i}>
                {i > 0 && ' '}
                {i === personal.name.split(' ').length - 1 ? (
                  <span style={{ color: themeColor }}>{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>
        )}

        {/* Thick colored bar */}
        <div
          style={{
            width: '80px',
            height: '5px',
            backgroundColor: themeColor,
            marginTop: '10px',
          }}
        />

        {contactParts.length > 0 && (
          <div
            style={{
              marginTop: '12px',
              fontSize: '9.5px',
              color: '#555',
              fontWeight: 500,
              letterSpacing: '0.3px',
            }}
          >
            {contactParts.join('  //  ')}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '0 44px 28px 44px', position: 'relative' }}>
        {/* Summary */}
        {summary && (
          <div>
            {sectionHeading('Profile')}
            <p
              style={{
                margin: 0,
                color: '#333',
                lineHeight: 1.7,
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            {sectionHeading('Experience')}
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: '13px',
                      color: '#1a1a1a',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {exp.title}
                  </span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: '9px',
                        color: '#888',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        marginLeft: '10px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase' as const,
                      }}
                    >
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div
                    style={{
                      fontSize: '14px',
                      color: themeColor,
                      fontWeight: 700,
                      marginTop: '1px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {exp.company}
                    {exp.location && (
                      <span style={{ color: '#aaa', fontWeight: 400, fontSize: '10px', marginLeft: '8px' }}>
                        {exp.location}
                      </span>
                    )}
                  </div>
                )}
                {exp.description && (
                  <div
                    style={{
                      marginTop: '5px',
                      color: '#444',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      fontSize: '10px',
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
            {sectionHeading('Education')}
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: '12px',
                      color: '#1a1a1a',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {edu.degree}
                  </span>
                  {(edu.startDate || edu.endDate) && (
                    <span
                      style={{
                        fontSize: '9px',
                        color: '#888',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        marginLeft: '10px',
                        letterSpacing: '1px',
                      }}
                    >
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '12px', color: themeColor, fontWeight: 700, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && (
                      <span style={{ color: '#aaa', fontWeight: 400, fontSize: '10px', marginLeft: '8px' }}>
                        {edu.location}
                      </span>
                    )}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: '#666', fontSize: '10px', fontWeight: 600 }}>
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            {sectionHeading('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '5px 14px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: themeColor,
                    backgroundColor: lightTint,
                    borderLeft: `3px solid ${themeColor}`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            {sectionHeading('Projects')}
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: '12px',
                      color: '#1a1a1a',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {proj.name}
                  </span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '9px', fontWeight: 600 }}>
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6, fontSize: '10px' }}>
                    {proj.description}
                  </div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#ffffff',
                          backgroundColor: themeColor,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.5px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            {sectionHeading('Certifications')}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '7px' }}>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: '11px',
                    color: '#1a1a1a',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {cert.name}
                </span>
                {cert.issuer && (
                  <span style={{ color: themeColor, fontSize: '10px', fontWeight: 600 }}> // {cert.issuer}</span>
                )}
                {cert.date && (
                  <span style={{ color: '#999', marginLeft: '8px', fontSize: '9px', fontWeight: 700 }}>
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            {sectionHeading('Languages')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  style={{
                    display: 'inline-block',
                    padding: '5px 16px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: themeColor,
                    backgroundColor: lightTint,
                    borderLeft: `3px solid ${themeColor}`,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.5px',
                  }}
                >
                  {lang.language}
                  {lang.proficiency && (
                    <span style={{ fontWeight: 400, textTransform: 'none' as const, marginLeft: '4px', color: '#666' }}>
                      ({lang.proficiency})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
