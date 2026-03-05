import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function PinnacleTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)

  const sectionHeadingWithLines = (title: string): React.ReactElement => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '8px',
        gap: '12px',
      }}
    >
      <div style={{ flex: 1, height: '1px', backgroundColor: '#d0d0d0' }} />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '2.5px',
          color: themeColor,
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#d0d0d0' }} />
    </div>
  )

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Helvetica Neue", sans-serif`,
        padding: '36px 44px',
        lineHeight: 1.45,
        fontSize: '10.5px',
      }}
    >
      {/* Centered header */}
      <div style={{ textAlign: 'center' }}>
        {personal.name && (
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 300,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
            }}
          >
            {personal.name}
          </h1>
        )}

        {contactParts.length > 0 && (
          <div
            style={{
              marginTop: '8px',
              fontSize: '9.5px',
              color: '#666',
              letterSpacing: '0.5px',
            }}
          >
            {contactParts.join('   |   ')}
          </div>
        )}

        {/* Chevron accent below name */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '14px',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderTop: `10px solid ${themeColor}`,
            }}
          />
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          {sectionHeadingWithLines('Summary')}
          <p style={{ margin: '0', color: '#333', lineHeight: 1.65, textAlign: 'center' as const }}>
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          {sectionHeadingWithLines('Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '12px', color: '#1a1a1a' }}>
                  {exp.title}
                </div>
                {(exp.company || exp.location) && (
                  <div style={{ fontSize: '10.5px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {exp.company}
                    {exp.company && exp.location && ', '}
                    {exp.location}
                  </div>
                )}
                {(exp.startDate || exp.endDate) && (
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </div>
                )}
              </div>
              {exp.description && (
                <div
                  style={{
                    marginTop: '5px',
                    color: '#333',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                >
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
          {sectionHeadingWithLines('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                {edu.degree}
              </div>
              {(edu.school || edu.location) && (
                <div style={{ fontSize: '10.5px', color: '#555', marginTop: '1px' }}>
                  {edu.school}
                  {edu.school && edu.location && ', '}
                  {edu.location}
                </div>
              )}
              {(edu.startDate || edu.endDate) && (
                <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                  {formatDateRange(edu.startDate, edu.endDate)}
                </div>
              )}
              {edu.gpa && (
                <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div>
          {sectionHeadingWithLines('Skills')}
          <div style={{ color: '#333', textAlign: 'center' as const, lineHeight: 1.6 }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          {sectionHeadingWithLines('Projects')}
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>
                  {proj.name}
                </span>
                {proj.url && (
                  <span style={{ color: themeColor, marginLeft: '8px', fontSize: '10px' }}>
                    {proj.url}
                  </span>
                )}
              </div>
              {proj.description && (
                <div
                  style={{
                    marginTop: '3px',
                    color: '#333',
                    lineHeight: 1.55,
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                >
                  {proj.description}
                </div>
              )}
              {proj.technologies.length > 0 && (
                <div
                  style={{
                    marginTop: '3px',
                    fontSize: '10px',
                    color: '#555',
                    textAlign: 'center' as const,
                  }}
                >
                  Technologies: {proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          {sectionHeadingWithLines('Certifications')}
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginTop: '6px', textAlign: 'center' }}>
              <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#555' }}> — {cert.issuer}</span>}
              {cert.date && (
                <span style={{ color: '#888', marginLeft: '8px', fontSize: '10px' }}>
                  ({cert.date})
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          {sectionHeadingWithLines('Languages')}
          <div style={{ textAlign: 'center', color: '#333' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600 }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#555' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && '   |   '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom chevron accent */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px',
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '16px solid transparent',
            borderRight: '16px solid transparent',
            borderBottom: `8px solid ${lightenColor(themeColor, 0.5)}`,
          }}
        />
      </div>
    </div>
  )
}
