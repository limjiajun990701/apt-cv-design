
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useToast } from "@/components/ui/use-toast";
import { resumeToMarkdown } from "@/utils/markdownUtils";

const ResumePreview: React.FC = () => {
  const { resumeData, template } = useResumeContext();
  const { toast } = useToast();
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const exportPDF = () => {
    if (resumeRef.current) {
      const element = resumeRef.current;
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      toast({
        title: "Exporting PDF",
        description: "Your resume is being exported as a PDF file.",
      });

      html2pdf().set(opt).from(element).save().then(() => {
        toast({
          title: "PDF Exported",
          description: "Your resume has been exported as a PDF file.",
        });
      }).catch(error => {
        console.error("Error exporting PDF:", error);
        toast({
          title: "Export Failed",
          description: "Failed to export the resume as a PDF file.",
          variant: "destructive",
        });
      });
    }
  };

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-3 space-x-2">
        <Button variant="outline" size="sm" onClick={exportMarkdown}>
          <FileText className="h-4 w-4 mr-1" /> Export MD
        </Button>
        <Button variant="outline" size="sm" onClick={exportPDF}>
          <FileDown className="h-4 w-4 mr-1" /> Export PDF
        </Button>
      </div>
      <div 
        ref={resumeRef} 
        className="bg-white rounded-lg resume-paper overflow-auto flex-1 max-w-[210mm]"
      >
        {template === "Classic" && <ClassicTemplate resumeData={resumeData} />}
        {template === "Modern" && <ModernTemplate resumeData={resumeData} />}
        {template === "Minimal" && <MinimalTemplate resumeData={resumeData} />}
        {template === "Professional" && <ProfessionalTemplate resumeData={resumeData} />}
      </div>
    </div>
  );
};

export default ResumePreview;
