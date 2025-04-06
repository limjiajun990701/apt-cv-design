
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

const ResumePreview: React.FC = () => {
  const { resumeData, template } = useResumeContext();

  return (
    <div className="bg-white rounded-lg resume-paper overflow-auto h-full max-w-[210mm]">
      {template === "Classic" && <ClassicTemplate resumeData={resumeData} />}
      {template === "Modern" && <ModernTemplate resumeData={resumeData} />}
      {template === "Minimal" && <MinimalTemplate resumeData={resumeData} />}
      {template === "Professional" && <ProfessionalTemplate resumeData={resumeData} />}
    </div>
  );
};

export default ResumePreview;
