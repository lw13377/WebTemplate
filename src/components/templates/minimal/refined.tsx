import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { pageContainerStyle } from '@/components/templates/base-styles'

export default function RefinedTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 600,
    fontVariant: 'small-caps',
    letterSpacing: '2px',
    color: '#1a1a1a',
    margin: '0 0 6px 0',
    paddingTop: '18px',
    paddingBottom: '5px',
    borderBottom: `0.5px solid #ccc`,
  }

  const entrySeparatorStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    color: '#ccc',
    fontSize: '8px',
    margin: '10px 0',
    letterSpacing: '4px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '44px 60px',
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Header */}
      {personal.name && (
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 600,
              margin: '0',
              color: '#1a1a1a',
              textTransform: 'uppercase' as const,
              letterSpacing: '6px',
            }}
          >
            {personal.name}
          </h1>
        </div>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            textAlign: 'center',
            fontSize: '8.5px',
            color: '#999',
            marginTop: '8px',
            letterSpacing: '0.5px',
          }}
        >
          {contactParts.join('   |   ')}
        </div>
      )}

      {/* Two thin parallel lines under header */}
      <div style={{ textAlign: 'center', marginTop: '14px', marginBottom: '4px' }}>
        <div style={{ borderTop: `0.5px solid ${themeColor}`, margin: '0 auto', width: '100%' }} />
        <div style={{ height: '3px' }} />
        <div style={{ borderTop: `0.5px solid ${themeColor}`, margin: '0 auto', width: '100%' }} />
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeadingStyle}>Summary</h2>
          <p style={{ margin: '0', color: '#444', lineHeight: 1.65 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={exp.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '10.5px', color: '#1a1a1a' }}>{exp.title}</span>
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '8.5px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                  </span>
                )}
              </div>
              {exp.company && (
                <div style={{ fontSize: '9.5px', color: '#777', marginTop: '1px' }}>
                  {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                </div>
              )}
              {exp.description && (
                <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {exp.description}
                </div>
              )}
              {i < experience.length - 1 && (
                <div style={entrySeparatorStyle}>---</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Education</h2>
          {education.map((edu, i) => (
            <div key={edu.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '10.5px', color: '#1a1a1a' }}>{edu.degree}</span>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '8.5px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                  </span>
                )}
              </div>
              {edu.school && (
                <div style={{ fontSize: '9.5px', color: '#777', marginTop: '1px' }}>
                  {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                </div>
              )}
              {edu.gpa && (
                <div style={{ marginTop: '2px', color: '#999', fontSize: '8.5px' }}>GPA: {edu.gpa}</div>
              )}
              {i < education.length - 1 && (
                <div style={entrySeparatorStyle}>---</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ color: '#444' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={proj.id}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '10.5px', color: '#1a1a1a' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ color: '#aaa', marginLeft: '8px', fontSize: '8.5px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6 }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '3px', fontSize: '8.5px', color: '#999' }}>
                  {proj.technologies.join(', ')}
                </div>
              )}
              {i < projects.length - 1 && (
                <div style={entrySeparatorStyle}>---</div>
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
            <div key={cert.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#777' }}> - {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#aaa', marginLeft: '6px', fontSize: '8.5px' }}>({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Languages</h2>
          <div style={{ color: '#444' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#777' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && '   |   '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
