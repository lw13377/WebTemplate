import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { hexToRgb, lightenColor, darkenColor, pageContainerStyle, PAGE_HEIGHT } from '@/components/templates/base-styles'

export default function AsymmetricTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const { r, g, b } = hexToRgb(themeColor)
  const lightTint = lightenColor(themeColor, 0.9)
  const darkTheme = darkenColor(themeColor, 0.15)

  const contactParts: { value: string }[] = []
  if (personal.email) contactParts.push({ value: personal.email })
  if (personal.phone) contactParts.push({ value: personal.phone })
  if (personal.location) contactParts.push({ value: personal.location })
  if (personal.website) contactParts.push({ value: personal.website })
  if (personal.linkedin) contactParts.push({ value: personal.linkedin })

  const rightSectionHeading = (label: string): React.ReactNode => (
    <div
      style={{
        marginTop: '16px',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        style={{
          width: '18px',
          height: '2px',
          backgroundColor: themeColor,
          flexShrink: 0,
        }}
      />
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '2.5px',
          color: themeColor,
          margin: 0,
        }}
      >
        {label}
      </h2>
    </div>
  )

  const leftSectionHeading = (label: string): React.ReactNode => (
    <div
      style={{
        marginTop: '18px',
        marginBottom: '8px',
        paddingBottom: '4px',
        borderBottom: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <h2
        style={{
          fontSize: '9px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '2.5px',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
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
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        display: 'flex',
      }}
    >
      {/* Left narrow column (30%) */}
      <div
        style={{
          width: '30%',
          minHeight: `${PAGE_HEIGHT}px`,
          backgroundColor: themeColor,
          color: '#ffffff',
          padding: '32px 18px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Name */}
        {personal.name && (
          <div style={{ marginBottom: '16px' }}>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 800,
                margin: 0,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.3px',
                wordWrap: 'break-word' as const,
              }}
            >
              {personal.name}
            </h1>
            <div
              style={{
                width: '30px',
                height: '3px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginTop: '8px',
              }}
            />
          </div>
        )}

        {/* Contact */}
        {contactParts.length > 0 && (
          <div>
            {leftSectionHeading('Contact')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {contactParts.map((cp, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '8.5px',
                    color: 'rgba(255,255,255,0.85)',
                    wordBreak: 'break-all' as const,
                    paddingLeft: '10px',
                    borderLeft: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  {cp.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills on left */}
        {allSkills.length > 0 && (
          <div>
            {leftSectionHeading('Skills')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {allSkills.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '8.5px',
                    color: '#ffffff',
                    padding: '3px 8px',
                    backgroundColor: `rgba(255,255,255,${0.08 + (i % 3) * 0.05})`,
                    borderRadius: '3px',
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages on left */}
        {languages.length > 0 && (
          <div>
            {leftSectionHeading('Languages')}
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '5px' }}>
                <div style={{ fontWeight: 700, fontSize: '9px', color: '#ffffff' }}>{lang.language}</div>
                {lang.proficiency && (
                  <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginTop: '1px' }}>
                    {lang.proficiency}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications on left */}
        {certifications.length > 0 && (
          <div>
            {leftSectionHeading('Certifications')}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '9px', color: '#ffffff', lineHeight: 1.3 }}>{cert.name}</div>
                {cert.issuer && (
                  <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginTop: '1px' }}>
                    {cert.issuer}
                  </div>
                )}
                {cert.date && (
                  <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.5)', marginTop: '1px' }}>
                    {cert.date}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right wide column (70%) */}
      <div
        style={{
          width: '70%',
          padding: '32px 28px',
          boxSizing: 'border-box',
        }}
      >
        {/* Summary */}
        {summary && (
          <div>
            {rightSectionHeading('Profile')}
            <p
              style={{
                margin: 0,
                color: '#444',
                lineHeight: 1.7,
                fontSize: '10.5px',
                paddingLeft: '14px',
                borderLeft: `3px solid ${lightenColor(themeColor, 0.7)}`,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            {rightSectionHeading('Experience')}
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '14px',
                  paddingLeft: idx % 2 === 0 ? '0' : '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10.5px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
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
            {rightSectionHeading('Education')}
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  paddingLeft: idx % 2 === 0 ? '16px' : '0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
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
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            {rightSectionHeading('Projects')}
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '12px',
                  paddingLeft: idx % 2 === 0 ? '0' : '16px',
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '6px', fontSize: '9px' }}>{proj.url}</span>
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
                          padding: '2px 8px',
                          borderRadius: '3px',
                          fontSize: '8.5px',
                          backgroundColor: lightTint,
                          color: themeColor,
                          fontWeight: 600,
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
      </div>
    </div>
  )
}
