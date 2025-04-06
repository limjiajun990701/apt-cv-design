import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";
import { formatDate, formatUrl } from "@/lib/utils";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData }) => {
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
    <div className="p-8 font-sans">
      {/* Header with different styling */}
      <div className="mb-6 border-l-4 border-blue-500 pl-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {personalInfo.name} {personalInfo.middleName && personalInfo.middleName}
        </h1>
        {personalInfo.title && (
          <p className="text-xl text-blue-600 font-medium">{personalInfo.title}</p>
        )}
      </div>

      {/* Contact Info in a modern layout */}
      <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
        {personalInfo.phone && (
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {personalInfo.phone}
          </div>
        )}
        {personalInfo.email && (
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">
              {personalInfo.email}
            </a>
          </div>
        )}
        {personalInfo.location && (
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {personalInfo.location}
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          </div>
        )}
        {personalInfo.github && (
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <a href={formatUrl(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </div>
        )}
      </div>

      {/* Summary with different styling */}
      {summary && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2 text-blue-600 uppercase">Profile</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience with modern look */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600 uppercase flex items-center">
            <span className="bg-blue-600 w-3 h-3 mr-2 inline-block"></span> 
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5 border-l-2 border-gray-200 pl-4 hover:border-blue-500 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                <div className="text-sm text-blue-600 font-medium">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              <p className="text-gray-600 font-medium mt-1">{exp.company}, {exp.location}</p>
              
              {exp.scope && (
                <p className="text-gray-700 mt-2 text-sm">
                  <span className="font-semibold">Scope:</span> {exp.scope}
                </p>
              )}
              
              <p className="text-gray-700 mt-2 text-sm">{exp.description}</p>
              
              {exp.projects && (
                <p className="text-gray-700 mt-2 text-sm">
                  <span className="font-semibold">Projects:</span> {exp.projects}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education with modern styling */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600 uppercase flex items-center">
            <span className="bg-blue-600 w-3 h-3 mr-2 inline-block"></span>
            Education
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded shadow-sm hover:shadow transition-shadow">
                <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                <p className="text-blue-600">{edu.degree} in {edu.field}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                </p>
                <p className="text-gray-700 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects with cards */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600 uppercase flex items-center">
            <span className="bg-blue-600 w-3 h-3 mr-2 inline-block"></span>
            Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-700 text-sm my-2">{project.description}</p>
                {project.url && (
                  <a 
                    href={formatUrl(project.url)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline text-sm inline-flex items-center"
                  >
                    <span>View Project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills with modern UI */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600 uppercase flex items-center">
            <span className="bg-blue-600 w-3 h-3 mr-2 inline-block"></span>
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages with progress bars */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600 uppercase flex items-center">
            <span className="bg-blue-600 w-3 h-3 mr-2 inline-block"></span>
            Languages
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {languages.map((language) => (
              <div key={language.id} className="flex items-center">
                <span className="font-medium text-gray-700 w-24">{language.name}:</span>
                <span className="text-blue-600">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other sections with modern styling */}
      {(achievements.length > 0 || certifications.length > 0 || activities.length > 0 || badges.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600 uppercase flex items-center">
            <span className="bg-blue-600 w-3 h-3 mr-2 inline-block"></span>
            Additional Information
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Achievements</h3>
                <ul className="space-y-2">
                  {achievements.map((achievement) => (
                    <li key={achievement.id} className="text-gray-700 text-sm">
                      <span className="font-medium text-blue-600">{achievement.title}</span>
                      <div>
                        {formatDate(achievement.date)} - {achievement.description}
                        {achievement.url && (
                          <span className="ml-1">
                            <a href={formatUrl(achievement.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Certifications</h3>
                <ul className="space-y-2">
                  {certifications.map((certification) => (
                    <li key={certification.id} className="text-gray-700 text-sm">
                      <span className="font-medium text-blue-600">{certification.name}</span>
                      <div>
                        {certification.issuer} ({formatDate(certification.date)}
                        {certification.expiry && ` to ${formatDate(certification.expiry)}`})
                        {certification.url && (
                          <span className="ml-1">
                            <a href={formatUrl(certification.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Verify</a>
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Activities */}
            {activities.length > 0 && (
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Activities</h3>
                <ul className="space-y-2">
                  {activities.map((activity) => (
                    <li key={activity.id} className="text-gray-700 text-sm">
                      <span className="font-medium text-blue-600">{activity.name}</span>
                      <div>
                        {activity.description}
                        {activity.url && (
                          <span className="ml-1">
                            <a href={formatUrl(activity.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Learn more</a>
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Badges */}
            {badges.length > 0 && (
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Badges</h3>
                <ul className="space-y-2">
                  {badges.map((badge) => (
                    <li key={badge.id} className="text-gray-700 text-sm">
                      <span className="font-medium text-blue-600">{badge.name}</span>
                      <div>
                        {badge.issuer} ({formatDate(badge.date)})
                        {badge.url && (
                          <span className="ml-1">
                            <a href={formatUrl(badge.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View badge</a>
                          </span>
                        )}
                      </div>
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

export default ModernTemplate;
