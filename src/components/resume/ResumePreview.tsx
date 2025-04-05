
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { formatDate } from "@/lib/utils";

const ResumePreview: React.FC = () => {
  const { resumeData } = useResumeContext();
  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="bg-white p-8 rounded-lg resume-paper overflow-auto h-full">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-resume-blue">{personalInfo.name}</h1>
        <h2 className="text-xl text-gray-600 mt-1">{personalInfo.title}</h2>
        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
          <div>{personalInfo.email}</div>
          <div>•</div>
          <div>{personalInfo.phone}</div>
          <div>•</div>
          <div>{personalInfo.location}</div>
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-resume-blue">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-resume-blue">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{exp.title}</h3>
                  <p className="text-gray-700">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-resume-blue">Education</h2>
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

      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-resume-blue">Skills</h2>
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
    </div>
  );
};

export default ResumePreview;
