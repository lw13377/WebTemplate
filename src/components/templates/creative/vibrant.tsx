import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { hexToRgb, lightenColor, darkenColor, pageContainerStyle } from '@/components/templates/base-styles'

export default function VibrantTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const { r, g, b } = hexToRgb(themeColor)
  const tintBg = lightenColor(themeColor, 0.92)
  const darkAccent = darkenColor(themeColor, 0.15)

  const contactParts: { label: string; value: string }[] = []
  if (personal.email) contactParts.push({ label: 'Email', value: personal.email })
  if (personal.phone) contactParts.push({ label: 'Phone', value: personal.phone })
  if (personal.location) contactParts.push({ label: 'Location', value: personal.location })
  if (personal.website) contactParts.push({ label: 'Web', value: personal.website })
  if (personal.linkedin) contactParts.push({ label: 'LinkedIn', value: personal.linkedin })

  const sectionIndex = { current: 0 }
  const getSectionBg = () => {
    const idx = sectionIndex.current
    sectionIndex.current++
    return idx % 2 === 0 ? '#ffffff' : tintBg
  }

  const sectionStyle = (bg: string): React.CSSProperties => ({
    padding: '14px 36px',
    backgroundColor: bg,
    borderRadius: '8px',
    marginTop: '2px',
  })

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const dotDecor: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: themeColor,
    flexShrink: 0,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: '#f9f9fb',
      }}
    >
      {/* Header with rounded bottom corners */}
      <div
        style={{
          backgroundColor: themeColor,
          padding: '36px 36px 28px 36px',
          borderRadius: '0 0 24px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: `rgba(255,255,255,0.08)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '40px',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: `rgba(255,255,255,0.06)`,
          }}
        />

        {personal.name && (
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 800,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '-0.5px',
              lineHeight: 1.1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {personal.name}
          </h1>
        )}

        {/* Contact pills */}
        {contactParts.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '14px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {contactParts.map((cp, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 500,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {cp.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '8px 0 20px 0' }}>
        {/* Summary */}
        {summary && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Summary
              </h2>
              <p
                style={{
                  margin: 0,
                  color: '#444',
                  lineHeight: 1.7,
                  fontSize: '10.5px',
                  backgroundColor: '#ffffff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  borderLeft: `3px solid ${themeColor}`,
                }}
              >
                {summary}
              </p>
            </div>
          )
        })()}

        {/* Experience */}
        {experience.length > 0 && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Experience
              </h2>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    marginBottom: '12px',
                    backgroundColor: bg === '#ffffff' ? tintBg : '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>{exp.title}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span
                        style={{
                          fontSize: '9px',
                          color: '#ffffff',
                          backgroundColor: themeColor,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          whiteSpace: 'nowrap',
                          marginLeft: '8px',
                        }}
                      >
                        {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '2px' }}>
                      {exp.company}
                      {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
                    </div>
                  )}
                  {exp.description && (
                    <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        })()}

        {/* Education */}
        {education.length > 0 && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Education
              </h2>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    marginBottom: '10px',
                    backgroundColor: bg === '#ffffff' ? tintBg : '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                    {(edu.startDate || edu.endDate) && (
                      <span
                        style={{
                          fontSize: '9px',
                          color: '#ffffff',
                          backgroundColor: themeColor,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          whiteSpace: 'nowrap',
                          marginLeft: '8px',
                        }}
                      >
                        {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                      </span>
                    )}
                  </div>
                  {edu.school && (
                    <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '2px' }}>
                      {edu.school}
                      {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                    </div>
                  )}
                  {edu.gpa && (
                    <div style={{ marginTop: '2px', color: '#666', fontSize: '9.5px' }}>GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          )
        })()}

        {/* Skills */}
        {allSkills.length > 0 && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {allSkills.map((skill, i) => {
                  const opacity = 0.15 + (i % 4) * 0.1
                  return (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '9px',
                        fontWeight: 600,
                        backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
                        color: darkenColor(themeColor, 0.2),
                      }}
                    >
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* Projects */}
        {projects.length > 0 && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Projects
              </h2>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    marginBottom: '12px',
                    backgroundColor: bg === '#ffffff' ? tintBg : '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '10px',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                    {proj.url && (
                      <span style={{ color: themeColor, marginLeft: '8px', fontSize: '9px' }}>{proj.url}</span>
                    )}
                  </div>
                  {proj.description && (
                    <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, fontSize: '10px' }}>
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
                            padding: '2px 10px',
                            borderRadius: '12px',
                            fontSize: '8.5px',
                            fontWeight: 600,
                            backgroundColor: themeColor,
                            color: '#ffffff',
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
          )
        })()}

        {/* Certifications */}
        {certifications.length > 0 && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: lightenColor(themeColor, 0.8),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: themeColor,
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {cert.name.charAt(0)}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{cert.name}</span>
                    {cert.issuer && <span style={{ color: '#666', fontSize: '9.5px' }}> - {cert.issuer}</span>}
                    {cert.date && (
                      <span style={{ color: '#999', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        })()}

        {/* Languages */}
        {languages.length > 0 && (() => {
          const bg = getSectionBg()
          return (
            <div style={sectionStyle(bg)}>
              <h2 style={sectionHeadingStyle}>
                <div style={dotDecor} />
                Languages
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {languages.map((lang) => (
                  <span
                    key={lang.id}
                    style={{
                      display: 'inline-block',
                      padding: '5px 14px',
                      borderRadius: '16px',
                      fontSize: '9.5px',
                      fontWeight: 600,
                      backgroundColor: lightenColor(themeColor, 0.85),
                      color: darkenColor(themeColor, 0.1),
                      border: `1px solid ${lightenColor(themeColor, 0.6)}`,
                    }}
                  >
                    {lang.language}
                    {lang.proficiency && (
                      <span style={{ fontWeight: 400, marginLeft: '4px', opacity: 0.7 }}>({lang.proficiency})</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
