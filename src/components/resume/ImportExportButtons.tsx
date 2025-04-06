
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useResumeContext } from "@/contexts/ResumeContext";

const ImportExportButtons: React.FC = () => {
  const { setTemplate, template } = useResumeContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
        Template: {template} <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTemplate("Classic")}>Classic</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTemplate("Modern")}>Modern</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTemplate("Minimal")}>Minimal</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTemplate("Professional")}>Professional</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImportExportButtons;
