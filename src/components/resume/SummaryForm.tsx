
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const SummaryForm: React.FC = () => {
  const { resumeData, updateSummary } = useResumeContext();
  const { summary } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Card>
        <CardContent className="pt-6">
          <div>
            <Label htmlFor="summary" className="text-resume-blue">About / Professional Summary</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Briefly describe your professional background, key skills, and career goals (5 lines recommended).
            </p>
            <Textarea
              id="summary"
              value={summary}
              onChange={handleChange}
              placeholder="Briefly describe your professional background, key skills, and career goals..."
              className="h-32 resize-none"
              rows={5}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryForm;
