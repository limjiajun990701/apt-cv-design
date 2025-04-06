
import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";
import { formatDate, formatUrl } from "@/lib/utils";

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resumeData }) => {
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
    <div className="p-8 font-sans text-gray-800">
      {/* Minimal Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-normal uppercase tracking-widest">
          {personalInfo.name} {personalInfo.middleName && personalInfo.middleName}
        </h1>
        {personalInfo.title && (
          <p className="text-gray-600 mt-1">{personalInfo.title}</p>
        )}
      </div>

      {/* Minimal Contact Info */}
      <div className="flex flex-wrap gap-3 mb-8 text-sm text-gray-600">
        {personalInfo.phone && <div>{personalInfo.phone}</div>}
        {personalInfo.email && (
          <>
            <div>|</div>
            <a href={`mailto:${personalInfo.email}`} className="hover:underline">
              {personalInfo.email}
            </a>
          </>
        )}
        {personalInfo.location && (
          <>
            <div>|</div>
            <div>{personalInfo.location}</div>
          </>
        )}
        {personalInfo.linkedin && (
          <>
            <div>|</div>
            <a 
              href={formatUrl(personalInfo.linkedin)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </>
        )}
        {personalInfo.github && (
          <>
            <div>|</div>
            <a 
              href={formatUrl(personalInfo.github)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-3 border-b pb-1">Profile</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-4 border-b pb-1">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-medium">{exp.title}</h3>
                <div className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}, {exp.location}</p>
              
              {exp.scope && (
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Scope:</span> {exp.scope}
                </p>
              )}
              
              <p className="text-gray-700 text-sm">{exp.description}</p>
              
              {exp.projects && (
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-medium">Projects:</span> {exp.projects}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-4 border-b pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p className="text-gray-700">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
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
          <h2 className="text-sm uppercase tracking-widest mb-4 border-b pb-1">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-gray-700 text-sm">{project.description}</p>
              {project.url && (
                <div className="text-sm">
                  <a 
                    href={formatUrl(project.url)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                  >
                    View Project
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-3 border-b pb-1">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-3 border-b pb-1">Languages</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {languages.map((language) => (
              <div key={language.id} className="text-sm">
                <span className="font-medium">{language.name}:</span> {language.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Sections */}
      {(achievements.length > 0 || certifications.length > 0 || activities.length > 0 || badges.length > 0) && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-widest mb-4 border-b pb-1">Additional Information</h2>
          
          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Achievements</h3>
              <ul className="space-y-1 text-sm">
                {achievements.map((achievement) => (
                  <li key={achievement.id} className="text-gray-700">
                    <span className="font-medium">{achievement.title}</span> ({formatDate(achievement.date)}) - {achievement.description}
                    {achievement.url && (
                      <span> - <a href={formatUrl(achievement.url)} target="_blank" rel="noopener noreferrer" className="hover:underline">View</a></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Certifications</h3>
              <ul className="space-y-1 text-sm">
                {certifications.map((certification) => (
                  <li key={certification.id} className="text-gray-700">
                    <span className="font-medium">{certification.name}</span> - {certification.issuer} ({formatDate(certification.date)}
                    {certification.expiry && ` to ${formatDate(certification.expiry)}`})
                    {certification.url && (
                      <span> - <a href={formatUrl(certification.url)} target="_blank" rel="noopener noreferrer" className="hover:underline">Verify</a></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Activities */}
          {activities.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Activities</h3>
              <ul className="space-y-1 text-sm">
                {activities.map((activity) => (
                  <li key={activity.id} className="text-gray-700">
                    <span className="font-medium">{activity.name}</span> - {activity.description}
                    {activity.url && (
                      <span> - <a href={formatUrl(activity.url)} target="_blank" rel="noopener noreferrer" className="hover:underline">Learn more</a></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Badges</h3>
              <ul className="space-y-1 text-sm">
                {badges.map((badge) => (
                  <li key={badge.id} className="text-gray-700">
                    <span className="font-medium">{badge.name}</span> - {badge.issuer} ({formatDate(badge.date)})
                    {badge.url && (
                      <span> - <a href={formatUrl(badge.url)} target="_blank" rel="noopener noreferrer" className="hover:underline">View badge</a></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
