
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SummaryForm: React.FC = () => {
  const { resumeData, updateSummary } = useResumeContext();
  const { summary } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={handleChange}
          placeholder="Briefly describe your professional background, key skills, and career goals..."
          className="h-48 resize-none"
        />
      </div>
    </div>
  );
};

export default SummaryForm;
