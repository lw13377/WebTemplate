import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function MagazineTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const lightBg = lightenColor(themeColor, 0.95)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '4px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: 0,
    paddingBottom: '4px',
    borderBottom: `1px solid ${themeColor}`,
  }

  const thinRule: React.CSSProperties = {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '14px 0',
    border: 'none',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", serif`,
        padding: 0,
        lineHeight: 1.6,
        fontSize: '10px',
      }}
    >
      {/* Masthead / Header */}
      <div
        style={{
          padding: '32px 40px 20px',
          borderBottom: `3px double ${themeColor}`,
          textAlign: 'center' as const,
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '44px',
              fontWeight: 300,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '6px',
              lineHeight: 1.1,
              textTransform: 'uppercase' as const,
            }}
          >
            {personal.name}
          </h1>
        )}
        <div style={{ height: '2px', width: '60px', backgroundColor: themeColor, margin: '10px auto' }} />
        {contactParts.length > 0 && (
          <div style={{ fontSize: '9px', color: '#666', letterSpacing: '2px', fontWeight: 400 }}>
            {contactParts.join('  |  ')}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 40px 28px' }}>
        {/* Summary with drop cap and multi-column feel */}
        {summary && (
          <div style={{ marginBottom: '6px' }}>
            <h2 style={sectionHeadingStyle}>Profile</h2>
            <div style={{ position: 'relative' }}>
              {summary.length > 0 && (
                <div style={{ lineHeight: 1.8, color: '#333', fontSize: '10.5px' }}>
                  {/* Drop cap first letter */}
                  <span
                    style={{
                      float: 'left' as const,
                      fontSize: '48px',
                      fontWeight: 700,
                      lineHeight: 0.8,
                      marginRight: '6px',
                      marginTop: '4px',
                      color: themeColor,
                      fontFamily: `"${fontFamily}", serif`,
                    }}
                  >
                    {summary.charAt(0)}
                  </span>
                  <span>{summary.slice(1)}</span>
                </div>
              )}
            </div>
            <div style={thinRule} />
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a', fontStyle: 'italic' as const }}>
                    {exp.title}
                  </span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#999', fontStyle: 'italic' as const, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '1px', letterSpacing: '1px', textTransform: 'uppercase' as const }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400, textTransform: 'none' as const }}> — {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.7, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
                {/* Pull quote style for first experience entry */}
                {idx === 0 && exp.description && exp.description.length > 80 && (
                  <div
                    style={{
                      margin: '8px 20px 4px',
                      padding: '8px 16px',
                      borderLeft: `3px solid ${themeColor}`,
                      borderRight: `3px solid ${themeColor}`,
                      fontStyle: 'italic' as const,
                      fontSize: '10px',
                      color: themeColor,
                      fontWeight: 600,
                      textAlign: 'center' as const,
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;{exp.description.split('.')[0]}.&rdquo;
                  </div>
                )}
              </div>
            ))}
            <div style={thinRule} />
          </div>
        )}

        {/* Two-column layout for Education + Skills */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Education column */}
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={sectionHeadingStyle}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a', fontStyle: 'italic' as const }}>
                    {edu.degree}
                  </div>
                  {edu.school && (
                    <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '1px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                      {edu.school}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                    {(edu.startDate || edu.endDate) && (
                      <span style={{ fontSize: '9px', color: '#888', fontStyle: 'italic' as const }}>
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    )}
                    {edu.location && <span style={{ fontSize: '9px', color: '#aaa' }}>{edu.location}</span>}
                  </div>
                  {edu.gpa && <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills column */}
          {allSkills.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={sectionHeadingStyle}>Skills</h2>
              <div style={{ columnCount: 2, columnGap: '12px' }}>
                {allSkills.map((skill, i) => (
                  <div key={i} style={{ fontSize: '9.5px', color: '#333', marginBottom: '3px', fontWeight: 500, breakInside: 'avoid' as const }}>
                    <span style={{ color: themeColor, marginRight: '4px' }}>&bull;</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={thinRule} />

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a', fontStyle: 'italic' as const }}>{proj.name}</span>
                  {proj.url && <span style={{ fontSize: '8.5px', color: themeColor }}>{proj.url}</span>}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.7, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '4px', fontSize: '8.5px', color: '#888', fontStyle: 'italic' as const }}>
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
            <div style={thinRule} />
          </div>
        )}

        {/* Bottom row: Certifications + Languages */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {certifications.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={sectionHeadingStyle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '10px', color: '#1a1a1a', fontStyle: 'italic' as const }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', fontSize: '9px' }}> — {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#aaa', fontSize: '8.5px', marginLeft: '4px' }}>({cert.date})</span>}
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={sectionHeadingStyle}>Languages</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    style={{
                      padding: '4px 14px',
                      border: `1px solid ${themeColor}`,
                      borderRadius: '2px',
                      fontSize: '9px',
                      fontWeight: 600,
                      color: themeColor,
                    }}
                  >
                    {lang.language}
                    {lang.proficiency && <span style={{ fontWeight: 400, color: '#888', marginLeft: '4px' }}>({lang.proficiency})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer rule */}
      <div style={{ borderTop: `3px double ${themeColor}`, margin: '0 40px' }} />
    </div>
  )
}
