
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileDown, FileUp, FileText } from "lucide-react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { resumeToMarkdown, parseMarkdown } from "@/utils/markdownUtils";

const ImportExportButtons: React.FC = () => {
  const { resumeData, updatePersonalInfo, updateSummary, addExperience, addEducation,
          addSkill, addLanguage, addAchievement, addCertification, 
          addActivity, addBadge, addProject } = useResumeContext();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportMarkdown = () => {
    const markdown = resumeToMarkdown(resumeData);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Resume Exported",
      description: "Your resume has been exported as a Markdown file.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const markdown = event.target?.result as string;
        const parsedData = parseMarkdown(markdown);
        
        // Update resume data with parsed markdown
        if (parsedData.personalInfo) {
          updatePersonalInfo(parsedData.personalInfo);
        }
        
        if (parsedData.summary) {
          updateSummary(parsedData.summary);
        }
        
        parsedData.experience?.forEach(exp => {
          const { id, ...rest } = exp;
          addExperience(rest);
        });
        
        parsedData.education?.forEach(edu => {
          const { id, ...rest } = edu;
          addEducation(rest);
        });
        
        parsedData.skills?.forEach(skill => {
          const { id, ...rest } = skill;
          addSkill(rest);
        });
        
        parsedData.languages?.forEach(lang => {
          const { id, ...rest } = lang;
          addLanguage(rest);
        });
        
        parsedData.achievements?.forEach(ach => {
          const { id, ...rest } = ach;
          addAchievement(rest);
        });
        
        parsedData.certifications?.forEach(cert => {
          const { id, ...rest } = cert;
          addCertification(rest);
        });
        
        parsedData.activities?.forEach(act => {
          const { id, ...rest } = act;
          addActivity(rest);
        });
        
        parsedData.badges?.forEach(badge => {
          const { id, ...rest } = badge;
          addBadge(rest);
        });
        
        parsedData.projects?.forEach(proj => {
          const { id, ...rest } = proj;
          addProject(rest);
        });

        toast({
          title: "Resume Imported",
          description: "Your resume has been imported from the Markdown file.",
        });
      } catch (error) {
        console.error("Error parsing markdown file:", error);
        toast({
          title: "Import Failed",
          description: "Failed to import the resume from the markdown file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const importMarkdown = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="file"
        accept=".md,.markdown,text/markdown"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button variant="outline" size="sm" onClick={exportMarkdown}>
        <FileDown className="h-4 w-4 mr-1" /> Export MD
      </Button>
      <Button variant="outline" size="sm" onClick={importMarkdown}>
        <FileUp className="h-4 w-4 mr-1" /> Import MD
      </Button>
    </div>
  );
};

export default ImportExportButtons;
