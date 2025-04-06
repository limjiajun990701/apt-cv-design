
import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";
import { formatDate, formatUrl } from "@/lib/utils";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resumeData }) => {
  const { 
    personalInfo, 
    summary, 
    experience, 
    education, 
    skills, 
    languages, 
    achievements, 
    certifications, 
    activities, 
    badges,
    projects
  } = resumeData;

  return (
    <div className="p-8 font-serif">
      {/* Professional Header with Dividers */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2">
          {personalInfo.name} {personalInfo.middleName && personalInfo.middleName}
        </h1>
        {personalInfo.title && (
          <p className="text-xl text-gray-700 mt-2">{personalInfo.title}</p>
        )}
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-700 border-b-2 border-gray-300 pb-4">
        {personalInfo.phone && <div>{personalInfo.phone}</div>}
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:underline">
            {personalInfo.email}
          </a>
        )}
        {personalInfo.location && <div>{personalInfo.location}</div>}
        {personalInfo.linkedin && (
          <a 
            href={formatUrl(personalInfo.linkedin)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-900 hover:underline"
          >
            LinkedIn
          </a>
        )}
        {personalInfo.github && (
          <a 
            href={formatUrl(personalInfo.github)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-900 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-1">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-1">Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-semibold text-gray-900">{exp.title} | {exp.company}</h3>
                <div className="text-sm font-medium">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              <p className="text-gray-700 italic">{exp.location}</p>
              
              {exp.scope && (
                <p className="text-gray-800 mt-2 text-sm">
                  <span className="font-semibold">Scope:</span> {exp.scope}
                </p>
              )}
              
              <p className="text-gray-700 mt-2 text-sm">{exp.description}</p>
              
              {exp.projects && (
                <p className="text-gray-700 mt-2 text-sm">
                  <span className="font-semibold">Key Projects:</span> {exp.projects}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-sm font-medium">
                  {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                </div>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-1">Notable Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <p className="text-gray-700 text-sm">{project.description}</p>
                {project.url && (
                  <div className="text-sm">
                    <a 
                      href={formatUrl(project.url)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-900 hover:underline"
                    >
                      View Project
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two-column layout for skills and languages */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-1">Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-1">Languages</h2>
            <div className="space-y-1">
              {languages.map((language) => (
                <div key={language.id} className="text-gray-700">
                  <span className="font-semibold">{language.name}:</span> {language.proficiency}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      {(achievements.length > 0 || certifications.length > 0 || activities.length > 0 || badges.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-1">Additional Qualifications</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Professional Certifications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {certifications.map((certification) => (
                    <li key={certification.id} className="text-gray-700 text-sm">
                      <span className="font-medium">{certification.name}</span> - {certification.issuer} ({formatDate(certification.date)}
                      {certification.expiry && ` to ${formatDate(certification.expiry)}`})
                      {certification.url && (
                        <span> - <a href={formatUrl(certification.url)} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">Verify</a></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Achievements */}
            {achievements.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Awards & Achievements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {achievements.map((achievement) => (
                    <li key={achievement.id} className="text-gray-700 text-sm">
                      <span className="font-medium">{achievement.title}</span> ({formatDate(achievement.date)}) - {achievement.description}
                      {achievement.url && (
                        <span> - <a href={formatUrl(achievement.url)} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">View</a></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Activities */}
            {activities.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Professional Activities</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {activities.map((activity) => (
                    <li key={activity.id} className="text-gray-700 text-sm">
                      <span className="font-medium">{activity.name}</span> - {activity.description}
                      {activity.url && (
                        <span> - <a href={formatUrl(activity.url)} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">Learn more</a></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Badges */}
            {badges.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Professional Badges</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {badges.map((badge) => (
                    <li key={badge.id} className="text-gray-700 text-sm">
                      <span className="font-medium">{badge.name}</span> - {badge.issuer} ({formatDate(badge.date)})
                      {badge.url && (
                        <span> - <a href={formatUrl(badge.url)} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">View badge</a></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
