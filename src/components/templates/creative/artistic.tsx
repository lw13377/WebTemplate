import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { hexToRgb, lightenColor, darkenColor, pageContainerStyle } from '@/components/templates/base-styles'

export default function ArtisticTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const { r, g, b } = hexToRgb(themeColor)
  const lightTint = lightenColor(themeColor, 0.9)
  const medTint = lightenColor(themeColor, 0.7)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  /** Decorative diamond-shaped section marker */
  const sectionMarker = (label: string): React.ReactNode => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '18px',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: themeColor,
          transform: 'rotate(45deg)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '3px',
          color: themeColor,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          borderTop: `2px dotted ${medTint}`,
        }}
      />
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner accent - top left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60px',
          height: '60px',
          borderTop: `4px solid ${themeColor}`,
          borderLeft: `4px solid ${themeColor}`,
        }}
      />
      {/* Corner accent - top right */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60px',
          height: '60px',
          borderTop: `4px solid ${themeColor}`,
          borderRight: `4px solid ${themeColor}`,
        }}
      />
      {/* Corner accent - bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '60px',
          height: '60px',
          borderBottom: `4px solid ${themeColor}`,
          borderLeft: `4px solid ${themeColor}`,
        }}
      />
      {/* Corner accent - bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '60px',
          height: '60px',
          borderBottom: `4px solid ${themeColor}`,
          borderRight: `4px solid ${themeColor}`,
        }}
      />

      {/* Decorative geometric shapes */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '30px',
          width: '30px',
          height: '30px',
          border: `2px solid ${lightenColor(themeColor, 0.6)}`,
          borderRadius: '50%',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '100px',
          right: '50px',
          width: '14px',
          height: '14px',
          backgroundColor: lightenColor(themeColor, 0.75),
          transform: 'rotate(45deg)',
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div style={{ padding: '40px 44px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        {personal.name && (
          <div style={{ marginBottom: '6px' }}>
            <h1
              style={{
                fontSize: '30px',
                fontWeight: 300,
                margin: 0,
                color: '#1a1a1a',
                letterSpacing: '8px',
                textTransform: 'uppercase' as const,
                lineHeight: 1.2,
              }}
            >
              {personal.name.split(' ').map((word, i) => (
                <span key={i}>
                  <span style={{ color: i === 0 ? themeColor : '#1a1a1a', fontWeight: i === 0 ? 700 : 300 }}>
                    {word}
                  </span>
                  {i < personal.name.split(' ').length - 1 && ' '}
                </span>
              ))}
            </h1>
            <div
              style={{
                width: '50px',
                height: '3px',
                backgroundColor: themeColor,
                marginTop: '8px',
              }}
            />
          </div>
        )}

        {contactParts.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '10px',
              fontSize: '9px',
              color: '#666',
            }}
          >
            {contactParts.map((cp, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: themeColor,
                    transform: 'rotate(45deg)',
                    display: 'inline-block',
                  }}
                />
                {cp}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div>
            {sectionMarker('About')}
            <p
              style={{
                margin: 0,
                color: '#444',
                lineHeight: 1.75,
                fontSize: '10.5px',
                fontStyle: 'italic',
                paddingLeft: '20px',
                borderLeft: `2px solid ${medTint}`,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            {sectionMarker('Experience')}
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  paddingLeft: '18px',
                  borderLeft: idx % 2 === 0
                    ? `3px solid ${themeColor}`
                    : `3px dashed ${medTint}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#999', whiteSpace: 'nowrap', marginLeft: '8px', letterSpacing: '0.5px' }}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '2px', letterSpacing: '0.5px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> // {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.65, whiteSpace: 'pre-line', fontSize: '10px' }}>
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
            {sectionMarker('Education')}
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  paddingLeft: '18px',
                  borderLeft: idx % 2 === 0
                    ? `3px solid ${themeColor}`
                    : `3px dashed ${medTint}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#999', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> // {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: '#666', fontSize: '9.5px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills — creative scattered layout */}
        {allSkills.length > 0 && (
          <div>
            {sectionMarker('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
              {allSkills.map((skill, i) => {
                const sizes = ['9px', '10px', '9.5px', '8.5px']
                const paddings = ['3px 10px', '4px 12px', '3px 8px', '5px 14px']
                const borders = [
                  `1.5px solid ${themeColor}`,
                  `1.5px solid ${medTint}`,
                  `1.5px solid ${themeColor}`,
                  `1.5px dashed ${themeColor}`,
                ]
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: paddings[i % 4],
                      fontSize: sizes[i % 4],
                      fontWeight: i % 3 === 0 ? 700 : 500,
                      color: i % 2 === 0 ? themeColor : darkenColor(themeColor, 0.15),
                      border: borders[i % 4],
                      borderRadius: i % 3 === 0 ? '0' : i % 3 === 1 ? '12px' : '4px',
                      backgroundColor: i % 2 === 0 ? 'transparent' : lightTint,
                      transform: i % 5 === 0 ? 'rotate(-1deg)' : i % 5 === 3 ? 'rotate(1deg)' : 'none',
                    }}
                  >
                    {skill}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            {sectionMarker('Projects')}
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px', paddingLeft: '18px', borderLeft: `3px dotted ${medTint}` }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '9px', fontStyle: 'italic' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          fontSize: '8.5px',
                          color: themeColor,
                          border: `1px solid ${medTint}`,
                          borderRadius: i % 2 === 0 ? '0' : '8px',
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
            {sectionMarker('Certifications')}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: themeColor,
                    transform: 'rotate(45deg)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10px', color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', fontSize: '9.5px' }}> — {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            {sectionMarker('Languages')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {languages.map((lang, i) => (
                <div
                  key={lang.id}
                  style={{
                    padding: '5px 14px',
                    border: i % 2 === 0 ? `1.5px solid ${themeColor}` : `1.5px dashed ${themeColor}`,
                    borderRadius: i % 2 === 0 ? '0' : '12px',
                    fontSize: '9.5px',
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{lang.language}</span>
                  {lang.proficiency && (
                    <span style={{ color: '#888', marginLeft: '4px', fontWeight: 400 }}>({lang.proficiency})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
