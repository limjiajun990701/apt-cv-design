
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // This is a placeholder - in a real implementation, we'd use a library like html2pdf or react-pdf
    toast({
      title: "Download Started",
      description: "Your resume is being prepared for download as PDF.",
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully.",
      });
    }, 1500);
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
