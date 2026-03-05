import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function CollageTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)
  const lightBg = lightenColor(themeColor, 0.92)
  const veryLightBg = lightenColor(themeColor, 0.96)

  const cardRotations = [-1.2, 0.8, -0.5, 1.0, -0.7, 0.6, -1.0, 0.4]

  const cardStyle = (index: number, bg?: string): React.CSSProperties => ({
    backgroundColor: bg || '#ffffff',
    padding: '14px 18px',
    borderRadius: '4px',
    boxShadow: '2px 3px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)',
    transform: `rotate(${cardRotations[index % cardRotations.length]}deg)`,
    position: 'relative',
    marginBottom: '12px',
    border: '1px solid rgba(0,0,0,0.04)',
  })

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: themeColor,
    marginBottom: '8px',
    marginTop: 0,
  }

  const tapeDecor = (rotation: number, left: string): React.CSSProperties => ({
    position: 'absolute',
    top: '-6px',
    left,
    width: '40px',
    height: '12px',
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
    transform: `rotate(${rotation}deg)`,
    borderRadius: '1px',
    zIndex: 2,
  })

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: '#f5f0eb',
      }}
    >
      {/* Header card */}
      <div style={{ padding: '28px 36px 8px' }}>
        <div
          style={{
            ...cardStyle(0, '#ffffff'),
            padding: '24px 28px',
            transform: 'rotate(-0.5deg)',
            textAlign: 'center' as const,
          }}
        >
          {/* Tape decoration */}
          <div style={tapeDecor(-15, '20px')} />
          <div style={tapeDecor(10, 'calc(100% - 60px)')} />

          {personal.name && (
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 900,
                margin: 0,
                color: '#1a1a1a',
                letterSpacing: '-0.5px',
                lineHeight: 1.1,
              }}
            >
              {personal.name}
            </h1>
          )}

          <div
            style={{
              width: '50px',
              height: '3px',
              backgroundColor: themeColor,
              margin: '8px auto',
            }}
          />

          {contactParts.length > 0 && (
            <div style={{ fontSize: '9px', color: '#666', letterSpacing: '0.5px' }}>
              {contactParts.join('  \u2022  ')}
            </div>
          )}
        </div>
      </div>

      {/* Body - collage of cards */}
      <div style={{ padding: '4px 36px 24px' }}>
        {/* Summary card */}
        {summary && (
          <div style={cardStyle(1, veryLightBg)}>
            <div style={tapeDecor(-8, '30px')} />
            <h2 style={sectionHeadingStyle}>About Me</h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
          </div>
        )}

        {/* Experience cards */}
        {experience.length > 0 && (
          <div style={cardStyle(2)}>
            <div style={tapeDecor(5, '40px')} />
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  backgroundColor: idx % 2 === 0 ? lightenColor(themeColor, 0.95) : '#fafafa',
                  borderRadius: '4px',
                  borderLeft: `3px solid ${themeColor}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '8.5px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '9.5px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Two small side-by-side cards */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Education card */}
          {education.length > 0 && (
            <div style={{ ...cardStyle(3, lightenColor(themeColor, 0.94)), flex: 1 }}>
              <div style={tapeDecor(-12, '15px')} />
              <h2 style={sectionHeadingStyle}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{edu.degree}</div>
                  {edu.school && (
                    <div style={{ fontSize: '9.5px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
                      {edu.school}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                    {(edu.startDate || edu.endDate) && (
                      <span style={{ fontSize: '8.5px', color: '#888' }}>
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    )}
                    {edu.location && <span style={{ fontSize: '8.5px', color: '#aaa' }}>{edu.location}</span>}
                  </div>
                  {edu.gpa && <div style={{ fontSize: '8.5px', color: '#666', marginTop: '1px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills card - sticky note style */}
          {allSkills.length > 0 && (
            <div
              style={{
                ...cardStyle(4, `rgba(${r}, ${g}, ${b}, 0.08)`),
                flex: 1,
              }}
            >
              <div style={tapeDecor(8, '25px')} />
              <h2 style={sectionHeadingStyle}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {allSkills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '8.5px',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: themeColor,
                      border: `1px solid ${lightenColor(themeColor, 0.6)}`,
                      boxShadow: '1px 1px 2px rgba(0,0,0,0.05)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects card */}
        {projects.length > 0 && (
          <div style={cardStyle(5)}>
            <div style={tapeDecor(-6, '50px')} />
            <h2 style={sectionHeadingStyle}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: projects.length > 1 ? '1fr 1fr' : '1fr', gap: '8px' }}>
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  style={{
                    padding: '8px 10px',
                    backgroundColor: idx % 2 === 0 ? veryLightBg : '#fafafa',
                    borderRadius: '4px',
                    border: `1px solid ${lightenColor(themeColor, 0.8)}`,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '10px', color: '#1a1a1a' }}>{proj.name}</div>
                  {proj.url && <div style={{ fontSize: '8px', color: themeColor, marginTop: '1px' }}>{proj.url}</div>}
                  {proj.description && (
                    <div style={{ marginTop: '3px', color: '#555', fontSize: '9px', lineHeight: 1.5 }}>{proj.description}</div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={{ fontSize: '7px', padding: '1px 6px', borderRadius: '8px', backgroundColor: themeColor, color: '#fff', fontWeight: 600 }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: two small cards */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Certifications card */}
          {certifications.length > 0 && (
            <div style={{ ...cardStyle(6, '#ffffff'), flex: 1 }}>
              <div style={tapeDecor(4, '20px')} />
              <h2 style={sectionHeadingStyle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <span style={{ fontWeight: 700, fontSize: '9.5px', color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', fontSize: '8.5px' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#999', marginLeft: '4px', fontSize: '8px' }}>({cert.date})</span>}
                </div>
              ))}
            </div>
          )}

          {/* Languages card */}
          {languages.length > 0 && (
            <div style={{ ...cardStyle(7, lightBg), flex: 1 }}>
              <div style={tapeDecor(-10, '30px')} />
              <h2 style={sectionHeadingStyle}>Languages</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {languages.map((lang) => (
                  <span
                    key={lang.id}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '14px',
                      fontSize: '9px',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: themeColor,
                      boxShadow: '1px 1px 3px rgba(0,0,0,0.08)',
                    }}
                  >
                    {lang.language}
                    {lang.proficiency && <span style={{ fontWeight: 400, color: '#888', marginLeft: '3px' }}>({lang.proficiency})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
