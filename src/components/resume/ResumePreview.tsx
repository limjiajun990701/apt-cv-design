
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { formatDate } from "@/lib/utils";

const ResumePreview: React.FC = () => {
  const { resumeData } = useResumeContext();
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
    badges 
  } = resumeData;

  return (
    <div className="bg-white p-8 rounded-lg resume-paper overflow-auto h-full">
      {/* Header - NAME and MIDDLE */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-resume-blue">
          {personalInfo.name} {personalInfo.middleName && personalInfo.middleName}
        </h1>
      </div>

      {/* Contact Info Row */}
      <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm text-gray-600">
        <div>{personalInfo.phone}</div>
        <div>•</div>
        <div>{personalInfo.email}</div>
        {personalInfo.linkedin && (
          <>
            <div>•</div>
            <div>{personalInfo.linkedin}</div>
          </>
        )}
        {personalInfo.github && (
          <>
            <div>•</div>
            <div>{personalInfo.github}</div>
          </>
        )}
      </div>

      {/* ABOUT/Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-resume-blue border-b pb-1">ABOUT</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-resume-blue border-b pb-1">EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
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

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-resume-blue border-b pb-1">EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{exp.title} - {exp.company}</h3>
                  <p className="text-gray-700">{exp.location}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              
              {/* Added Scope */}
              {exp.scope && (
                <p className="text-gray-700 mt-1 text-sm font-medium">Scope: {exp.scope}</p>
              )}
              
              {/* Description */}
              <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
              
              {/* Projects */}
              {exp.projects && (
                <p className="text-gray-700 mt-1 text-sm">
                  <span className="font-medium">Projects:</span> {exp.projects}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TECHNICAL SKILLS */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-resume-blue border-b pb-1">TECHNICAL SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-resume-blue-light text-resume-blue text-sm rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-resume-blue border-b pb-1">LANGUAGES</h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((language) => (
              <div key={language.id} className="text-gray-700">
                <span className="font-medium">{language.name}:</span> {language.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS, CERTIFICATIONS, ACTIVITIES, BADGES */}
      {(achievements.length > 0 || certifications.length > 0 || activities.length > 0 || badges.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-resume-blue border-b pb-1">
            ACHIEVEMENTS / CERTIFICATIONS / ACTIVITIES / BADGES
          </h2>
          
          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-resume-blue text-sm mb-1">Achievements</h3>
              <ul className="list-disc pl-5 space-y-1">
                {achievements.map((achievement) => (
                  <li key={achievement.id} className="text-gray-700 text-sm">
                    <span className="font-medium">{achievement.title}</span> ({formatDate(achievement.date)}) - {achievement.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-resume-blue text-sm mb-1">Certifications</h3>
              <ul className="list-disc pl-5 space-y-1">
                {certifications.map((certification) => (
                  <li key={certification.id} className="text-gray-700 text-sm">
                    <span className="font-medium">{certification.name}</span> - {certification.issuer} ({formatDate(certification.date)}
                    {certification.expiry && ` to ${formatDate(certification.expiry)}`})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Activities */}
          {activities.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-resume-blue text-sm mb-1">Activities</h3>
              <ul className="list-disc pl-5 space-y-1">
                {activities.map((activity) => (
                  <li key={activity.id} className="text-gray-700 text-sm">
                    <span className="font-medium">{activity.name}</span> - {activity.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Badges */}
          {badges.length > 0 && (
            <div>
              <h3 className="font-medium text-resume-blue text-sm mb-1">Badges</h3>
              <ul className="list-disc pl-5 space-y-1">
                {badges.map((badge) => (
                  <li key={badge.id} className="text-gray-700 text-sm">
                    <span className="font-medium">{badge.name}</span> - {badge.issuer} ({formatDate(badge.date)})
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

export default ResumePreview;
