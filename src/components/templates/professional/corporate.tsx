import React from 'react'
import type { TemplateProps } from '../base-styles'
import { lightenColor, pageContainerStyle } from '../base-styles'

export default function CorporateTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    color: themeColor,
    marginBottom: '8px',
    marginTop: '18px',
    paddingBottom: '4px',
  }

  const contactItemStyle: React.CSSProperties = {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.9)',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.45,
        fontSize: '10.5px',
      }}
    >
      {/* Bold colored header bar */}
      <div
        style={{
          backgroundColor: themeColor,
          color: '#ffffff',
          padding: '28px 40px',
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          >
            {personal.name}
          </h1>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 20px',
            marginTop: '8px',
          }}
        >
          {personal.email && <span style={contactItemStyle}>{personal.email}</span>}
          {personal.phone && <span style={contactItemStyle}>{personal.phone}</span>}
          {personal.location && <span style={contactItemStyle}>{personal.location}</span>}
          {personal.website && <span style={contactItemStyle}>{personal.website}</span>}
          {personal.linkedin && <span style={contactItemStyle}>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '4px 40px 36px 40px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Professional Summary</h2>
            <p
              style={{
                margin: '0',
                color: '#333',
                lineHeight: 1.6,
                padding: '10px 14px',
                backgroundColor: lightenColor(themeColor, 0.94),
                borderRadius: '4px',
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Professional Experience</h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #eee',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap' }}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '11px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#777', fontWeight: 400 }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#333', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
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
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap' }}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '11px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#777', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills & Languages - Two column layout */}
        {(allSkills.length > 0 || languages.length > 0) && (
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '0',
            }}
          >
            {/* Skills column */}
            {allSkills.length > 0 && (
              <div style={{ flex: languages.length > 0 ? '1 1 60%' : '1 1 100%' }}>
                <h2 style={sectionHeadingStyle}>Skills</h2>
                <div style={{ color: '#333' }}>
                  {allSkills.join(', ')}
                </div>
              </div>
            )}

            {/* Languages column */}
            {languages.length > 0 && (
              <div style={{ flex: allSkills.length > 0 ? '1 1 40%' : '1 1 100%' }}>
                <h2 style={sectionHeadingStyle}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{lang.language}</span>
                    {lang.proficiency && (
                      <span style={{ color: '#555', marginLeft: '6px', fontSize: '10px' }}>
                        - {lang.proficiency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '10px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #eee',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, fontSize: '10px' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#333', lineHeight: 1.5 }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '3px', fontSize: '10px', color: '#555' }}>
                    <span style={{ fontWeight: 600 }}>Tech:</span> {proj.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#555' }}> - {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ color: '#777', fontSize: '10px' }}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
