import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function WatercolorTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)

  const pastel1 = lightenColor(themeColor, 0.88)
  const pastel2 = lightenColor(themeColor, 0.92)
  const pastel3 = lightenColor(themeColor, 0.95)
  const softAccent = lightenColor(themeColor, 0.4)

  const blobBg = (index: number): React.CSSProperties => {
    const gradients = [
      `radial-gradient(ellipse at 20% 50%, ${pastel1} 0%, ${pastel3} 50%, transparent 70%)`,
      `radial-gradient(ellipse at 80% 30%, ${pastel2} 0%, ${pastel3} 50%, transparent 70%)`,
      `radial-gradient(ellipse at 50% 70%, ${pastel1} 0%, ${pastel2} 50%, transparent 70%)`,
      `radial-gradient(ellipse at 30% 40%, ${pastel2} 0%, ${pastel3} 50%, transparent 70%)`,
    ]
    return {
      background: gradients[index % gradients.length],
      borderRadius: '20px',
      padding: '16px 20px',
      marginBottom: '14px',
    }
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    color: softAccent,
    marginBottom: '10px',
    marginTop: 0,
    letterSpacing: '1px',
  }

  const softDivider: React.CSSProperties = {
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${pastel1}, ${pastel2}, transparent)`,
    borderRadius: '1px',
    margin: '4px 0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: '#fefefe',
      }}
    >
      {/* Header with watercolor blob */}
      <div
        style={{
          position: 'relative',
          padding: '34px 40px 28px',
          overflow: 'hidden',
        }}
      >
        {/* Watercolor blob backgrounds */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: '-40px',
            width: '300px',
            height: '200px',
            background: `radial-gradient(ellipse, ${pastel1} 0%, ${pastel2} 40%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-30px',
            width: '250px',
            height: '180px',
            background: `radial-gradient(ellipse, ${pastel2} 0%, ${pastel3} 40%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.5,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {personal.name && (
            <h1
              style={{
                fontSize: '34px',
                fontWeight: 800,
                margin: 0,
                color: softAccent,
                letterSpacing: '-0.5px',
                lineHeight: 1.1,
              }}
            >
              {personal.name}
            </h1>
          )}

          {contactParts.length > 0 && (
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {contactParts.map((part, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    color: '#555',
                    fontSize: '9px',
                    fontWeight: 500,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  {part}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={softDivider} />

      {/* Body */}
      <div style={{ padding: '12px 32px 28px' }}>
        {/* Summary */}
        {summary && (
          <div style={blobBg(0)}>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <p style={{ margin: 0, color: '#555', lineHeight: 1.8, fontSize: '10.5px' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={blobBg(1)}>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  borderRadius: '14px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#333' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: softAccent, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: softAccent, fontWeight: 600, marginTop: '2px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#999', fontWeight: 400 }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '4px', color: '#555', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={blobBg(2)}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  padding: '8px 14px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#333' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: softAccent, fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: softAccent, fontWeight: 600, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#999', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && <div style={{ fontSize: '9px', color: '#888', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills as pastel pills */}
        {allSkills.length > 0 && (
          <div style={blobBg(3)}>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => {
                const pillColors = [pastel1, pastel2, pastel3]
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: '5px 14px',
                      borderRadius: '20px',
                      fontSize: '9px',
                      fontWeight: 600,
                      backgroundColor: pillColors[i % pillColors.length],
                      color: softAccent,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
          <div style={blobBg(0)}>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  borderRadius: '14px',
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#333' }}>{proj.name}</span>
                  {proj.url && <span style={{ color: softAccent, marginLeft: '8px', fontSize: '8.5px' }}>{proj.url}</span>}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#555', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={{ fontSize: '8px', padding: '2px 8px', borderRadius: '12px', backgroundColor: pastel1, color: softAccent, fontWeight: 600 }}>
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
          <div style={blobBg(1)}>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: softAccent,
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10px', color: '#333' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#888', fontSize: '9px' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#bbb', marginLeft: '4px', fontSize: '8.5px' }}>({cert.date})</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={blobBg(2)}>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  style={{
                    display: 'inline-block',
                    padding: '5px 16px',
                    borderRadius: '20px',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    color: softAccent,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  {lang.language}
                  {lang.proficiency && <span style={{ fontWeight: 400, color: '#aaa', marginLeft: '4px' }}>({lang.proficiency})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer watercolor accent */}
      <div
        style={{
          height: '16px',
          background: `linear-gradient(90deg, ${pastel1}, ${pastel2}, ${pastel3}, ${pastel1})`,
          opacity: 0.5,
          borderRadius: '0 0 4px 4px',
        }}
      />
    </div>
  )
}
