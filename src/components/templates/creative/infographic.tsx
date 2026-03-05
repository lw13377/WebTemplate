import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function InfographicTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)
  const lightBg = lightenColor(themeColor, 0.93)
  const veryLightBg = lightenColor(themeColor, 0.97)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '2.5px',
    color: themeColor,
    marginBottom: '12px',
    marginTop: 0,
    paddingBottom: '6px',
    borderBottom: `3px solid ${themeColor}`,
    display: 'inline-block',
  }

  const statCounterStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 900,
    color: themeColor,
    lineHeight: 1,
    marginBottom: '2px',
  }

  const statLabelStyle: React.CSSProperties = {
    fontSize: '8px',
    color: '#888',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    fontWeight: 600,
  }

  const dividerStyle: React.CSSProperties = {
    height: '4px',
    background: `linear-gradient(90deg, ${themeColor}, ${lightenColor(themeColor, 0.5)}, ${lightenColor(themeColor, 0.85)})`,
    borderRadius: '2px',
    margin: '16px 0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: themeColor,
          padding: '30px 36px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-30px', right: '60px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', right: '180px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
          <div>
            {personal.name && (
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: 0, color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                {personal.name}
              </h1>
            )}
            {contactParts.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {contactParts.map((part, i) => (
                  <span key={i} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                    {part}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats counters in header */}
          <div style={{ display: 'flex', gap: '20px', textAlign: 'center' as const }}>
            {experience.length > 0 && (
              <div>
                <div style={{ ...statCounterStyle, color: '#ffffff' }}>{experience.length}</div>
                <div style={{ ...statLabelStyle, color: 'rgba(255,255,255,0.7)' }}>Roles</div>
              </div>
            )}
            {allSkills.length > 0 && (
              <div>
                <div style={{ ...statCounterStyle, color: '#ffffff' }}>{allSkills.length}</div>
                <div style={{ ...statLabelStyle, color: 'rgba(255,255,255,0.7)' }}>Skills</div>
              </div>
            )}
            {projects.length > 0 && (
              <div>
                <div style={{ ...statCounterStyle, color: '#ffffff' }}>{projects.length}</div>
                <div style={{ ...statLabelStyle, color: 'rgba(255,255,255,0.7)' }}>Projects</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 36px 28px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
            <div style={dividerStyle} />
          </div>
        )}

        {/* Skills as progress bars */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px' }}>
              {allSkills.map((skill, i) => {
                const widthPercent = 60 + ((i * 17 + 7) % 35)
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: '#333' }}>{skill}</span>
                      <span style={{ fontSize: '8px', color: '#999' }}>{widthPercent}%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: lightenColor(themeColor, 0.85), borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${widthPercent}%`,
                          backgroundColor: themeColor,
                          borderRadius: '3px',
                          background: `linear-gradient(90deg, ${themeColor}, rgba(${r},${g},${b},0.7))`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={dividerStyle} />
          </div>
        )}

        {/* Experience with stat counters */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: '14px', display: 'flex', gap: '14px' }}>
                {/* Large index counter */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: idx % 2 === 0 ? themeColor : lightBg,
                    color: idx % 2 === 0 ? '#ffffff' : themeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>{exp.title}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>
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
                    <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                      {exp.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div style={dividerStyle} />
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', padding: '10px 14px', backgroundColor: veryLightBg, borderRadius: '8px', borderLeft: `4px solid ${themeColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
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
            <div style={dividerStyle} />
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ padding: '10px 12px', backgroundColor: veryLightBg, borderRadius: '8px', border: `1px solid ${lightenColor(themeColor, 0.8)}` }}>
                  <div style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{proj.name}</div>
                  {proj.url && <div style={{ fontSize: '8px', color: themeColor, marginTop: '2px' }}>{proj.url}</div>}
                  {proj.description && (
                    <div style={{ marginTop: '4px', color: '#555', fontSize: '9px', lineHeight: 1.5 }}>{proj.description}</div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={{ fontSize: '7.5px', padding: '2px 6px', borderRadius: '8px', backgroundColor: themeColor, color: '#fff', fontWeight: 600 }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={dividerStyle} />
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: themeColor, flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10px', color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', fontSize: '9px' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '8.5px' }}>({cert.date})</span>}
                </div>
              </div>
            ))}
            <div style={dividerStyle} />
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ textAlign: 'center' as const, padding: '8px 16px', borderRadius: '10px', backgroundColor: lightBg, border: `2px solid ${themeColor}` }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: themeColor }}>{lang.language}</div>
                  {lang.proficiency && (
                    <div style={{ fontSize: '8px', color: '#666', marginTop: '2px' }}>{lang.proficiency}</div>
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
