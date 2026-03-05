import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

function hslToRgb(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r1 = 0, g1 = 0, b1 = 0
  if (h < 60) { r1 = c; g1 = x }
  else if (h < 120) { r1 = x; g1 = c }
  else if (h < 180) { g1 = c; b1 = x }
  else if (h < 240) { g1 = x; b1 = c }
  else if (h < 300) { r1 = x; b1 = c }
  else { r1 = c; b1 = x }
  return `rgb(${Math.round((r1 + m) * 255)}, ${Math.round((g1 + m) * 255)}, ${Math.round((b1 + m) * 255)})`
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
  else if (max === g) h = ((b - r) / d + 2) * 60
  else h = ((r - g) / d + 4) * 60
  return { h, s, l }
}

export default function SpectrumTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)
  const baseHsl = rgbToHsl(r, g, b)

  const getShiftedColor = (index: number): string => {
    const hueShift = index * 30
    const newHue = (baseHsl.h + hueShift) % 360
    return hslToRgb(newHue, Math.min(baseHsl.s, 0.7), Math.max(baseHsl.l, 0.4))
  }

  const getShiftedColorLight = (index: number): string => {
    const hueShift = index * 30
    const newHue = (baseHsl.h + hueShift) % 360
    return hslToRgb(newHue, Math.min(baseHsl.s, 0.5), 0.93)
  }

  let sectionCounter = 0

  const sectionHeading = (label: string): React.ReactNode => {
    const color = getShiftedColor(sectionCounter)
    const lightColor = getShiftedColorLight(sectionCounter)
    sectionCounter++
    return (
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '6px',
            height: '24px',
            backgroundColor: color,
            borderRadius: '3px',
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontSize: '13px',
            fontWeight: 800,
            textTransform: 'uppercase' as const,
            letterSpacing: '2px',
            color: color,
            margin: 0,
          }}
        >
          {label}
        </h2>
        <div
          style={{
            flex: 1,
            height: '2px',
            background: `linear-gradient(90deg, ${color}, ${lightColor}, transparent)`,
          }}
        />
      </div>
    )
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
      {/* Rainbow gradient header */}
      <div
        style={{
          position: 'relative',
          padding: '32px 40px 24px',
          background: `linear-gradient(135deg, ${getShiftedColor(0)}, ${getShiftedColor(2)}, ${getShiftedColor(4)}, ${getShiftedColor(6)})`,
          overflow: 'hidden',
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 900,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '-0.5px',
              lineHeight: 1.1,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {personal.name}
          </h1>
        )}

        {contactParts.length > 0 && (
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {contactParts.map((part, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 500,
                }}
              >
                {part}
              </span>
            ))}
          </div>
        )}

        {/* Bottom gradient fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: `linear-gradient(90deg, ${getShiftedColor(0)}, ${getShiftedColor(1)}, ${getShiftedColor(2)}, ${getShiftedColor(3)}, ${getShiftedColor(4)}, ${getShiftedColor(5)}, ${getShiftedColor(6)}, ${getShiftedColor(7)})`,
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: '20px 40px 28px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '18px' }}>
            {sectionHeading('Summary')}
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {sectionHeading('Experience')}
            {experience.map((exp, idx) => {
              const accentColor = getShiftedColor(idx)
              return (
                <div key={exp.id} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `3px solid ${accentColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>{exp.title}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span style={{ fontSize: '9px', color: accentColor, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <div style={{ fontSize: '10px', color: accentColor, fontWeight: 600, marginTop: '1px' }}>
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
              )
            })}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {sectionHeading('Education')}
            {education.map((edu, idx) => {
              const accentColor = getShiftedColor(idx + 2)
              return (
                <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `3px solid ${accentColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                    {(edu.startDate || edu.endDate) && (
                      <span style={{ fontSize: '9px', color: accentColor, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    )}
                  </div>
                  {edu.school && (
                    <div style={{ fontSize: '10px', color: accentColor, fontWeight: 600, marginTop: '1px' }}>
                      {edu.school}
                      {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                    </div>
                  )}
                  {edu.gpa && <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
                </div>
              )
            })}
          </div>
        )}

        {/* Skills as rainbow pills */}
        {allSkills.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {sectionHeading('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => {
                const pillColor = getShiftedColor(i)
                const pillBg = getShiftedColorLight(i)
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '14px',
                      fontSize: '9px',
                      fontWeight: 600,
                      backgroundColor: pillBg,
                      color: pillColor,
                      border: `1px solid ${pillColor}`,
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
          <div style={{ marginBottom: '18px' }}>
            {sectionHeading('Projects')}
            {projects.map((proj, idx) => {
              const accentColor = getShiftedColor(idx + 4)
              return (
                <div key={proj.id} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `3px solid ${accentColor}` }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{proj.name}</span>
                    {proj.url && <span style={{ color: accentColor, marginLeft: '8px', fontSize: '8.5px' }}>{proj.url}</span>}
                  </div>
                  {proj.description && (
                    <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={{ fontSize: '8px', padding: '2px 8px', borderRadius: '10px', backgroundColor: accentColor, color: '#fff', fontWeight: 600 }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {sectionHeading('Certifications')}
            {certifications.map((cert, idx) => (
              <div key={cert.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getShiftedColor(idx), flexShrink: 0 }} />
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
            {sectionHeading('Languages')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang, idx) => {
                const langColor = getShiftedColor(idx + 1)
                return (
                  <span
                    key={lang.id}
                    style={{
                      display: 'inline-block',
                      padding: '5px 14px',
                      borderRadius: '16px',
                      fontSize: '9.5px',
                      fontWeight: 600,
                      backgroundColor: getShiftedColorLight(idx + 1),
                      color: langColor,
                      border: `1.5px solid ${langColor}`,
                    }}
                  >
                    {lang.language}
                    {lang.proficiency && <span style={{ fontWeight: 400, marginLeft: '4px', opacity: 0.7 }}>({lang.proficiency})</span>}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer rainbow bar */}
      <div
        style={{
          height: '6px',
          background: `linear-gradient(90deg, ${getShiftedColor(0)}, ${getShiftedColor(1)}, ${getShiftedColor(2)}, ${getShiftedColor(3)}, ${getShiftedColor(4)}, ${getShiftedColor(5)}, ${getShiftedColor(6)}, ${getShiftedColor(7)})`,
        }}
      />
    </div>
  )
}
