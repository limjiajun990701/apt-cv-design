
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X, Edit, Save, XCircle, Calendar, Link, Briefcase } from "lucide-react";

const BadgesForm: React.FC = () => {
  const { resumeData, addBadge, updateBadge, removeBadge } = useResumeContext();
  const { badges } = resumeData;

  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [project, setProject] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !issuer.trim()) return;

    if (editId) {
      updateBadge(editId, { name, issuer, date, url, project });
      setEditId(null);
    } else {
      addBadge({ name, issuer, date, url, project });
    }

    setName("");
    setIssuer("");
    setDate("");
    setUrl("");
    setProject("");
  };

  const handleEdit = (id: string) => {
    const badge = badges.find((b) => b.id === id);
    if (badge) {
      setName(badge.name);
      setIssuer(badge.issuer);
      setDate(badge.date || "");
      setUrl(badge.url || "");
      setProject(badge.project || "");
      setEditId(id);
    }
  };

  const handleCancel = () => {
    setName("");
    setIssuer("");
    setDate("");
    setUrl("");
    setProject("");
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="badgeName">Badge Name</Label>
          <Input
            id="badgeName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Top Contributor, Rising Star, Innovation Award"
          />
        </div>
        
        <div>
          <Label htmlFor="badgeIssuer">Issuing Organization</Label>
          <Input
            id="badgeIssuer"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g., GitHub, Stack Overflow, Company Name"
          />
        </div>
        
        <div>
          <Label htmlFor="badgeDate">Date Received (YYYY-MM)</Label>
          <Input
            id="badgeDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., 2023-07"
          />
        </div>
        
        <div>
          <Label htmlFor="badgeUrl">Badge URL (Optional)</Label>
          <Input
            id="badgeUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://www.credly.com/badges/your-badge"
          />
        </div>
        
        <div>
          <Label htmlFor="badgeProject">Related Project/Portfolio (Optional)</Label>
          <Textarea
            id="badgeProject"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Describe any project or portfolio work related to this badge"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!name.trim() || !issuer.trim()}>
            {editId ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {editId ? "Update" : "Add"} Badge
          </Button>
          {editId && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-3">Your Badges</h3>
        {badges.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No badges added yet. Add digital badges, awards, or recognition from online platforms.
          </p>
        ) : (
          <div className="space-y-2">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gray-50 p-3 rounded-md"
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{badge.name}</h4>
                </div>
                <p className="text-gray-600 text-sm">Issued by: {badge.issuer}</p>
                {badge.date && (
                  <div className="text-gray-500 text-sm flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" /> 
                    {badge.date}
                  </div>
                )}
                
                {badge.url && (
                  <div className="text-gray-600 text-sm mt-1 flex items-center">
                    <Link className="h-3 w-3 mr-1" /> 
                    <a href={badge.url} target="_blank" rel="noopener noreferrer" className="text-resume-blue hover:underline">
                      View Badge
                    </a>
                  </div>
                )}
                
                {badge.project && (
                  <div className="text-gray-600 text-sm mt-1 flex items-start">
                    <Briefcase className="h-3 w-3 mr-1 mt-1" /> 
                    <span>Project: {badge.project}</span>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(badge.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeBadge(badge.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgesForm;
