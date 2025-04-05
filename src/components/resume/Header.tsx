
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

const Header: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being prepared for download as PDF.",
    });
    
    // Get the resume element
    const element = document.querySelector('.resume-paper');
    
    if (!element) {
      toast({
        title: "Error",
        description: "Could not find resume content to download.",
        variant: "destructive",
      });
      return;
    }
    
    // Configure the PDF options
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'my-resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate PDF
    html2pdf().set(opt).from(element).save().then(() => {
      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully.",
      });
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    });
  };

  return (
    <header className="bg-white border-b py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-resume-blue">CV Builder</h1>
          <p className="text-sm text-muted-foreground">Create your professional resume</p>
        </div>
        <Button onClick={handleDownload} className="bg-resume-blue hover:bg-resume-blue-dark">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </header>
  );
};

export default Header;
