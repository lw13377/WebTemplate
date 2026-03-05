import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function StampTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)
  const warmBg = lightenColor(themeColor, 0.95)
  const warmBorder = lightenColor(themeColor, 0.7)

  const stampBorderStyle: React.CSSProperties = {
    border: `2px dashed ${warmBorder}`,
    borderRadius: '4px',
    padding: '12px 16px',
    marginBottom: '14px',
    position: 'relative',
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const perforatedEdge: React.CSSProperties = {
    backgroundImage: `radial-gradient(circle, ${warmBorder} 1.5px, transparent 1.5px)`,
    backgroundSize: '10px 10px',
    height: '6px',
    margin: '0 -16px',
    marginBottom: '10px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: warmBg,
      }}
    >
      {/* Perforated top edge */}
      <div
        style={{
          backgroundImage: `radial-gradient(circle, ${warmBorder} 2px, transparent 2px)`,
          backgroundSize: '12px 12px',
          height: '8px',
          backgroundPosition: '6px 0',
        }}
      />

      {/* Header - Stamp frame around name */}
      <div style={{ padding: '20px 36px 16px' }}>
        <div
          style={{
            border: `3px solid ${themeColor}`,
            borderRadius: '6px',
            padding: '20px 24px',
            position: 'relative',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Corner decorations */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
            const isTop = corner.includes('top')
            const isLeft = corner.includes('left')
            return (
              <div
                key={corner}
                style={{
                  position: 'absolute',
                  [isTop ? 'top' : 'bottom']: '-4px',
                  [isLeft ? 'left' : 'right']: '-4px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: themeColor,
                  borderRadius: '50%',
                }}
              />
            )
          })}

          {/* Inner dashed border */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              left: '6px',
              right: '6px',
              bottom: '6px',
              border: `1px dashed ${warmBorder}`,
              borderRadius: '3px',
              pointerEvents: 'none',
            }}
          />

          {personal.name && (
            <h1
              style={{
                fontSize: '30px',
                fontWeight: 800,
                margin: 0,
                color: themeColor,
                textAlign: 'center' as const,
                letterSpacing: '2px',
                lineHeight: 1.1,
                textTransform: 'uppercase' as const,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {personal.name}
            </h1>
          )}

          {contactParts.length > 0 && (
            <div
              style={{
                textAlign: 'center' as const,
                marginTop: '8px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ fontSize: '9px', color: '#666', letterSpacing: '1px' }}>
                {contactParts.join('  \u2022  ')}
              </div>
            </div>
          )}

          {/* Stamp price label */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '14px',
              fontSize: '8px',
              color: themeColor,
              fontWeight: 700,
              letterSpacing: '1px',
              opacity: 0.4,
              transform: 'rotate(-12deg)',
              zIndex: 1,
            }}
          >
            RESUME
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '8px 36px 24px' }}>
        {/* Summary */}
        {summary && (
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9993;</span>
              Summary
            </h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9998;</span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  backgroundColor: warmBg,
                  borderLeft: `3px dotted ${themeColor}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: '8.5px',
                        color: '#ffffff',
                        backgroundColor: themeColor,
                        padding: '2px 8px',
                        borderRadius: '2px',
                        whiteSpace: 'nowrap',
                        marginLeft: '8px',
                        fontWeight: 600,
                      }}
                    >
                      {formatDateRange(exp.startDate, exp.endDate)}
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
                  <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9733;</span>
              Education
            </h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '8px',
                  padding: '8px 12px',
                  backgroundColor: warmBg,
                  borderLeft: `3px dotted ${themeColor}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '8.5px', color: themeColor, fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9881;</span>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    border: `1.5px dashed ${themeColor}`,
                    borderRadius: '3px',
                    fontSize: '9px',
                    fontWeight: 600,
                    color: themeColor,
                    backgroundColor: '#ffffff',
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
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9997;</span>
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px', padding: '8px 12px', backgroundColor: warmBg, borderLeft: `3px dotted ${themeColor}` }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && <span style={{ color: themeColor, marginLeft: '8px', fontSize: '8.5px' }}>{proj.url}</span>}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={{ fontSize: '8px', padding: '2px 8px', border: `1px dashed ${themeColor}`, borderRadius: '2px', color: themeColor, fontWeight: 600, backgroundColor: '#ffffff' }}>
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
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9883;</span>
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', border: `1.5px solid ${themeColor}`, borderRadius: '50%', flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10px', color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', fontSize: '9px' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '8.5px' }}>({cert.date})</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={stampBorderStyle}>
            <div style={perforatedEdge} />
            <h2 style={sectionHeadingStyle}>
              <span style={{ color: themeColor }}>&#9788;</span>
              Languages
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  style={{
                    display: 'inline-block',
                    padding: '5px 14px',
                    border: `2px dashed ${themeColor}`,
                    borderRadius: '4px',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    color: themeColor,
                    backgroundColor: '#ffffff',
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

      {/* Perforated bottom edge */}
      <div
        style={{
          backgroundImage: `radial-gradient(circle, ${warmBorder} 2px, transparent 2px)`,
          backgroundSize: '12px 12px',
          height: '8px',
          backgroundPosition: '6px 0',
        }}
      />
    </div>
  )
}
