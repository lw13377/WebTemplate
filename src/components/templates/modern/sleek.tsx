import React from 'react'
import type { TemplateProps } from '../base-styles'
import { lightenColor, pageContainerStyle } from '../base-styles'

export default function SleekTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '2.5px',
    color: '#1a1a1a',
    marginBottom: '10px',
    marginTop: '22px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${themeColor}`,
  }

  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 12px',
    borderRadius: '20px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: lightenColor(themeColor, 0.88),
    color: themeColor,
    marginRight: '6px',
    marginBottom: '5px',
  }

  const dateBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '4px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: lightenColor(themeColor, 0.92),
    color: themeColor,
    whiteSpace: 'nowrap' as const,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Thin accent line at top */}
      <div style={{ height: '3px', backgroundColor: themeColor, width: '100%' }} />

      {/* Content with generous padding */}
      <div style={{ padding: '36px 48px 40px 48px' }}>
        {/* Header */}
        {personal.name && (
          <h1
            style={{
              fontSize: '30px',
              fontWeight: 300,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '1px',
              lineHeight: 1.2,
            }}
          >
            {personal.name}
          </h1>
        )}

        {/* Contact info with dot separators */}
        {(personal.email || personal.phone || personal.location || personal.website || personal.linkedin) && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '4px',
              marginTop: '10px',
              fontSize: '9.5px',
              color: '#666',
            }}
          >
            {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin]
              .filter(Boolean)
              .map((item, i, arr) => (
                <React.Fragment key={i}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: themeColor,
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>
                  )}
                </React.Fragment>
              ))}
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: '10px' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                    {exp.company && (
                      <span style={{ color: '#666', marginLeft: '8px', fontSize: '10px' }}>
                        {exp.company}
                        {exp.location && `, ${exp.location}`}
                      </span>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span style={dateBadgeStyle}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
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
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                    {edu.school && (
                      <span style={{ color: '#666', marginLeft: '8px', fontSize: '10px' }}>
                        {edu.school}
                        {edu.location && `, ${edu.location}`}
                      </span>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span style={dateBadgeStyle}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.gpa && (
                  <div style={{ marginTop: '3px', color: '#666', fontSize: '9.5px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allSkills.map((skill, i) => (
                <span key={i} style={pillStyle}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '9px' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6 }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap' }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={pillStyle}>{tech}</span>
                    ))}
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
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666', marginLeft: '6px' }}>- {cert.issuer}</span>}
                </div>
                {cert.date && <span style={dateBadgeStyle}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span key={lang.id} style={pillStyle}>
                  {lang.language}
                  {lang.proficiency && ` - ${lang.proficiency}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
