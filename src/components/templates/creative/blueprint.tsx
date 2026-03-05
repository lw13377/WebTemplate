import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function BlueprintTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)

  const gridColor = `rgba(${r}, ${g}, ${b}, 0.08)`
  const lineColor = `rgba(${r}, ${g}, ${b}, 0.15)`
  const annotationColor = `rgba(${r}, ${g}, ${b}, 0.5)`
  const darkBlue = themeColor

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    color: darkBlue,
    marginBottom: '10px',
    marginTop: 0,
    fontFamily: '"Courier New", Courier, monospace',
    borderBottom: `1.5px solid ${lineColor}`,
    paddingBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }

  const annotationStyle: React.CSSProperties = {
    fontSize: '7px',
    color: annotationColor,
    fontFamily: '"Courier New", Courier, monospace',
    fontWeight: 400,
    letterSpacing: '0.5px',
    fontStyle: 'italic' as const,
  }

  const monoStyle: React.CSSProperties = {
    fontFamily: '"Courier New", Courier, monospace',
  }

  const crosshairMark = (top: string, left: string): React.ReactNode => (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width: '12px',
        height: '12px',
        zIndex: 2,
      }}
    >
      <div style={{ position: 'absolute', top: '5px', left: 0, width: '12px', height: '1px', backgroundColor: lineColor }} />
      <div style={{ position: 'absolute', top: 0, left: '5px', width: '1px', height: '12px', backgroundColor: lineColor }} />
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
        backgroundColor: '#f8fbff',
        position: 'relative',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Crosshair registration marks */}
      {crosshairMark('12px', '12px')}
      {crosshairMark('12px', 'calc(100% - 24px)')}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header - Engineering title block style */}
        <div
          style={{
            padding: '24px 40px 18px',
            borderBottom: `2px solid ${lineColor}`,
          }}
        >
          {/* Annotation */}
          <div style={{ ...annotationStyle, marginBottom: '4px' }}>
            // PERSONNEL FILE — CURRICULUM VITAE
          </div>

          {personal.name && (
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                margin: 0,
                color: darkBlue,
                letterSpacing: '2px',
                lineHeight: 1.1,
                textTransform: 'uppercase' as const,
                ...monoStyle,
              }}
            >
              {personal.name}
            </h1>
          )}

          {contactParts.length > 0 && (
            <div style={{ marginTop: '8px', ...monoStyle }}>
              {contactParts.map((part, i) => (
                <span key={i} style={{ fontSize: '8.5px', color: darkBlue, marginRight: '12px', opacity: 0.7 }}>
                  <span style={{ color: annotationColor, marginRight: '3px' }}>[{String(i + 1).padStart(2, '0')}]</span>
                  {part}
                </span>
              ))}
            </div>
          )}

          {/* Title block border */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: `1px solid ${lineColor}`,
              paddingTop: '4px',
            }}
          >
            <span style={annotationStyle}>REV. 1.0</span>
            <span style={annotationStyle}>SCALE: 1:1</span>
            <span style={annotationStyle}>SHEET 1 OF 1</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 40px 28px' }}>
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>01</span>
                Summary
              </h2>
              <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10px', ...monoStyle }}>{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>02</span>
                Experience
              </h2>
              {experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  style={{
                    marginBottom: '10px',
                    padding: '8px 12px',
                    border: `1px solid ${lineColor}`,
                    position: 'relative',
                  }}
                >
                  {/* Index annotation */}
                  <span style={{ ...annotationStyle, position: 'absolute', top: '-8px', left: '8px', backgroundColor: '#f8fbff', padding: '0 4px' }}>
                    EXP-{String(idx + 1).padStart(3, '0')}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a', ...monoStyle }}>{exp.title}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span style={{ fontSize: '8.5px', color: darkBlue, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px', ...monoStyle }}>
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <div style={{ fontSize: '9.5px', color: darkBlue, fontWeight: 600, marginTop: '2px', ...monoStyle }}>
                      {exp.company}
                      {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
                    </div>
                  )}
                  {exp.description && (
                    <div style={{ marginTop: '4px', color: '#555', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '9.5px', ...monoStyle }}>
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>03</span>
                Education
              </h2>
              {education.map((edu, idx) => (
                <div
                  key={edu.id}
                  style={{
                    marginBottom: '8px',
                    padding: '8px 12px',
                    border: `1px solid ${lineColor}`,
                    position: 'relative',
                  }}
                >
                  <span style={{ ...annotationStyle, position: 'absolute', top: '-8px', left: '8px', backgroundColor: '#f8fbff', padding: '0 4px' }}>
                    EDU-{String(idx + 1).padStart(3, '0')}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a', ...monoStyle }}>{edu.degree}</span>
                    {(edu.startDate || edu.endDate) && (
                      <span style={{ fontSize: '8.5px', color: darkBlue, fontWeight: 600, whiteSpace: 'nowrap', ...monoStyle }}>
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    )}
                  </div>
                  {edu.school && (
                    <div style={{ fontSize: '9.5px', color: darkBlue, fontWeight: 600, marginTop: '1px', ...monoStyle }}>
                      {edu.school}
                      {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                    </div>
                  )}
                  {edu.gpa && <div style={{ fontSize: '8.5px', color: '#666', marginTop: '2px', ...monoStyle }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills as monospace items */}
          {allSkills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>04</span>
                Technical Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {allSkills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      border: `1px solid ${lineColor}`,
                      fontSize: '8.5px',
                      fontWeight: 600,
                      color: darkBlue,
                      backgroundColor: '#ffffff',
                      ...monoStyle,
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
            <div style={{ marginBottom: '16px' }}>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>05</span>
                Projects
              </h2>
              {projects.map((proj, idx) => (
                <div key={proj.id} style={{ marginBottom: '8px', padding: '8px 12px', border: `1px solid ${lineColor}`, position: 'relative' }}>
                  <span style={{ ...annotationStyle, position: 'absolute', top: '-8px', left: '8px', backgroundColor: '#f8fbff', padding: '0 4px' }}>
                    PRJ-{String(idx + 1).padStart(3, '0')}
                  </span>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '10px', color: '#1a1a1a', ...monoStyle }}>{proj.name}</span>
                    {proj.url && <span style={{ color: darkBlue, marginLeft: '8px', fontSize: '8px', ...monoStyle }}>{proj.url}</span>}
                  </div>
                  {proj.description && (
                    <div style={{ marginTop: '3px', color: '#555', lineHeight: 1.6, fontSize: '9.5px', ...monoStyle }}>{proj.description}</div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={{ fontSize: '7.5px', padding: '2px 6px', border: `1px solid ${darkBlue}`, color: darkBlue, fontWeight: 600, ...monoStyle }}>
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
            <div style={{ marginBottom: '16px' }}>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>06</span>
                Certifications
              </h2>
              {certifications.map((cert, idx) => (
                <div key={cert.id} style={{ marginBottom: '4px', ...monoStyle }}>
                  <span style={{ color: annotationColor, fontSize: '8px', marginRight: '6px' }}>[CERT-{String(idx + 1).padStart(2, '0')}]</span>
                  <span style={{ fontWeight: 700, fontSize: '9.5px', color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', fontSize: '9px' }}> | {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '8px' }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 style={sectionHeadingStyle}>
                <span style={{ ...monoStyle, fontSize: '9px', opacity: 0.5 }}>07</span>
                Languages
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {languages.map((lang) => (
                  <span
                    key={lang.id}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      border: `1.5px solid ${darkBlue}`,
                      fontSize: '9px',
                      fontWeight: 600,
                      color: darkBlue,
                      ...monoStyle,
                    }}
                  >
                    {lang.language}
                    {lang.proficiency && <span style={{ fontWeight: 400, color: '#888', marginLeft: '4px' }}>({lang.proficiency})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '6px 40px',
            borderTop: `2px solid ${lineColor}`,
            display: 'flex',
            justifyContent: 'space-between',
            ...annotationStyle,
          }}
        >
          <span>DOCUMENT: CV-001</span>
          <span>STATUS: CURRENT</span>
        </div>
      </div>
    </div>
  )
}
