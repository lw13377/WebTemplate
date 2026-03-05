import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function RetroTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)

  // Retro 70s warm palette derived from themeColor
  const warmOrange = `rgb(${Math.min(255, r + 60)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 40)})`
  const warmBrown = `rgb(${Math.max(0, Math.round(r * 0.6))}, ${Math.max(0, Math.round(g * 0.4))}, ${Math.max(0, Math.round(b * 0.3))})`
  const cream = '#faf5eb'
  const lightCream = '#fef9f0'
  const retroBg = lightenColor(themeColor, 0.9)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 900,
    color: warmBrown,
    marginBottom: '10px',
    marginTop: 0,
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
  }

  const retroDivider: React.CSSProperties = {
    height: '4px',
    borderRadius: '2px',
    background: `linear-gradient(90deg, ${themeColor}, ${warmOrange}, ${lightenColor(themeColor, 0.6)})`,
    margin: '14px 0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: cream,
        color: '#3d2b1f',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '30px 40px 24px',
          backgroundColor: themeColor,
          borderRadius: '0 0 40px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Retro circle decorations */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '40px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            right: '80px',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '300px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.1)',
          }}
        />

        {personal.name && (
          <h1
            style={{
              fontSize: '38px',
              fontWeight: 900,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '-1px',
              lineHeight: 1.0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {personal.name}
          </h1>
        )}

        {contactParts.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', position: 'relative', zIndex: 1 }}>
            {contactParts.map((part, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 600,
                }}
              >
                {part}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 40px 28px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>About Me</h2>
            <p
              style={{
                margin: 0,
                color: '#5a4632',
                lineHeight: 1.8,
                fontSize: '10.5px',
                padding: '12px 16px',
                backgroundColor: lightCream,
                borderRadius: '16px',
                border: `2px solid ${retroBg}`,
              }}
            >
              {summary}
            </p>
            <div style={retroDivider} />
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  padding: '12px 16px',
                  backgroundColor: lightCream,
                  borderRadius: '16px',
                  border: `2px solid ${retroBg}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 800, fontSize: '13px', color: warmBrown }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: '8.5px',
                        color: '#ffffff',
                        backgroundColor: warmOrange,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        whiteSpace: 'nowrap',
                        marginLeft: '8px',
                        fontWeight: 700,
                      }}
                    >
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 700, marginTop: '2px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#a89280', fontWeight: 400 }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#5a4632', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
            <div style={retroDivider} />
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 16px',
                  backgroundColor: lightCream,
                  borderRadius: '16px',
                  border: `2px solid ${retroBg}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 800, fontSize: '12px', color: warmBrown }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '8.5px', color: warmOrange, fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 700, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#a89280', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && <div style={{ fontSize: '9px', color: '#8a7560', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
            <div style={retroDivider} />
          </div>
        )}

        {/* Skills as retro rounded badges */}
        {allSkills.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {allSkills.map((skill, i) => {
                const badgeColors = [themeColor, warmOrange, warmBrown]
                const bgColor = badgeColors[i % badgeColors.length]
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: '5px 14px',
                      borderRadius: '20px',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#ffffff',
                      backgroundColor: bgColor,
                    }}
                  >
                    {skill}
                  </span>
                )
              })}
            </div>
            <div style={retroDivider} />
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 16px',
                  backgroundColor: lightCream,
                  borderRadius: '16px',
                  border: `2px solid ${retroBg}`,
                }}
              >
                <div>
                  <span style={{ fontWeight: 800, fontSize: '11px', color: warmBrown }}>{proj.name}</span>
                  {proj.url && <span style={{ color: themeColor, marginLeft: '8px', fontSize: '8.5px', fontWeight: 600 }}>{proj.url}</span>}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#5a4632', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '8px',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          backgroundColor: warmOrange,
                          color: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={retroDivider} />
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: warmOrange,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span style={{ fontWeight: 800, fontSize: '10px', color: warmBrown }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#8a7560', fontSize: '9px' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#b0a090', marginLeft: '4px', fontSize: '8.5px' }}>({cert.date})</span>}
                </div>
              </div>
            ))}
            <div style={retroDivider} />
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang, i) => {
                const badgeColors = [themeColor, warmOrange, warmBrown]
                return (
                  <span
                    key={lang.id}
                    style={{
                      display: 'inline-block',
                      padding: '5px 16px',
                      borderRadius: '20px',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: '#ffffff',
                      backgroundColor: badgeColors[i % badgeColors.length],
                    }}
                  >
                    {lang.language}
                    {lang.proficiency && <span style={{ fontWeight: 400, marginLeft: '4px', opacity: 0.8 }}>({lang.proficiency})</span>}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer retro wave */}
      <div
        style={{
          height: '16px',
          background: `linear-gradient(90deg, ${themeColor}, ${warmOrange}, ${warmBrown}, ${themeColor})`,
          borderRadius: '40px 40px 0 0',
          margin: '0 40px',
        }}
      />
    </div>
  )
}
