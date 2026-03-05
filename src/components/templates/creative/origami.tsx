import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function OrigamiTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)
  const lightBg = lightenColor(themeColor, 0.92)
  const veryLightBg = lightenColor(themeColor, 0.96)

  const skewedHeadingStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '5px 20px 5px 14px',
    backgroundColor: themeColor,
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    transform: 'skewX(-8deg)',
    marginBottom: '12px',
    marginTop: 0,
  }

  const skewedHeadingTextStyle: React.CSSProperties = {
    display: 'inline-block',
    transform: 'skewX(8deg)',
  }

  const triangleDecor = (size: number, color: string, position: React.CSSProperties): React.ReactNode => (
    <div
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: `${size}px solid transparent`,
        borderRight: `${size}px solid transparent`,
        borderBottom: `${size * 1.5}px solid ${color}`,
        ...position,
      }}
    />
  )

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
      {/* Header with geometric shapes */}
      <div
        style={{
          position: 'relative',
          padding: '36px 40px 28px',
          backgroundColor: themeColor,
          overflow: 'hidden',
        }}
      >
        {/* Triangular decorations */}
        {triangleDecor(40, 'rgba(255,255,255,0.06)', { top: '-10px', right: '80px' })}
        {triangleDecor(25, 'rgba(255,255,255,0.08)', { bottom: '5px', right: '30px', transform: 'rotate(180deg)' })}
        {triangleDecor(30, 'rgba(255,255,255,0.05)', { top: '10px', left: '350px' })}

        {/* Angled white strip at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '16px',
            backgroundColor: '#ffffff',
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
          }}
        />

        {personal.name && (
          <h1
            style={{
              fontSize: '34px',
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

        {contactParts.length > 0 && (
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 1 }}>
            {contactParts.map((part, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 500,
                  transform: 'skewX(-6deg)',
                }}
              >
                <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{part}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px 40px 28px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Summary</span>
            </h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10.5px', paddingLeft: '4px' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Experience</span>
            </h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  padding: '10px 14px',
                  backgroundColor: veryLightBg,
                  borderLeft: `4px solid ${themeColor}`,
                  position: 'relative',
                }}
              >
                {/* Small triangle accent on left border */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '8px',
                    width: 0,
                    height: 0,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: `6px solid ${themeColor}`,
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>
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
                  <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
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
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Education</span>
            </h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  padding: '8px 14px',
                  backgroundColor: veryLightBg,
                  borderLeft: `4px solid ${themeColor}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>
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

        {/* Skills with skewed pills */}
        {allSkills.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Skills</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    fontSize: '9px',
                    fontWeight: 600,
                    backgroundColor: i % 3 === 0 ? themeColor : i % 3 === 1 ? lightBg : veryLightBg,
                    color: i % 3 === 0 ? '#ffffff' : themeColor,
                    transform: 'skewX(-6deg)',
                  }}
                >
                  <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Projects</span>
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px', padding: '8px 14px', backgroundColor: veryLightBg, borderLeft: `4px solid ${themeColor}` }}>
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
                      <span key={i} style={{ display: 'inline-block', padding: '2px 8px', fontSize: '8px', fontWeight: 600, backgroundColor: themeColor, color: '#fff', transform: 'skewX(-6deg)' }}>
                        <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{tech}</span>
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
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Certifications</span>
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: `8px solid ${themeColor}`,
                    flexShrink: 0,
                  }}
                />
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
          <div>
            <h2 style={skewedHeadingStyle}>
              <span style={skewedHeadingTextStyle}>Languages</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  style={{
                    display: 'inline-block',
                    padding: '5px 14px',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    backgroundColor: lightBg,
                    color: themeColor,
                    border: `1px solid ${lightenColor(themeColor, 0.6)}`,
                    transform: 'skewX(-6deg)',
                  }}
                >
                  <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>
                    {lang.language}
                    {lang.proficiency && <span style={{ fontWeight: 400, color: '#888', marginLeft: '4px' }}>({lang.proficiency})</span>}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer geometric accent */}
      <div
        style={{
          height: '12px',
          background: `linear-gradient(135deg, ${themeColor} 25%, transparent 25%, transparent 50%, ${themeColor} 50%, ${themeColor} 75%, transparent 75%)`,
          backgroundSize: '20px 20px',
          opacity: 0.3,
        }}
      />
    </div>
  )
}
