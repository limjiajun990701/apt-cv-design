
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit, Save, XCircle, Calendar } from "lucide-react";

const AchievementsForm: React.FC = () => {
  const { resumeData, addAchievement, updateAchievement, removeAchievement } = useResumeContext();
  const { achievements } = resumeData;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editId) {
      updateAchievement(editId, { title, description, date });
      setEditId(null);
    } else {
      addAchievement({ title, description, date });
    }

    setTitle("");
    setDescription("");
    setDate("");
  };

  const handleEdit = (id: string) => {
    const achievement = achievements.find((a) => a.id === id);
    if (achievement) {
      setTitle(achievement.title);
      setDescription(achievement.description);
      setDate(achievement.date);
      setEditId(id);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="achievementTitle">Achievement Title</Label>
          <Input
            id="achievementTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Employee of the Year, Outstanding Contribution Award"
          />
        </div>
        
        <div>
          <Label htmlFor="achievementDate">Date (YYYY-MM)</Label>
          <Input
            id="achievementDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., 2023-05"
          />
        </div>
        
        <div>
          <Label htmlFor="achievementDescription">Description</Label>
          <Textarea
            id="achievementDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your achievement and why it was significant..."
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!title.trim() || !description.trim()}>
            {editId ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {editId ? "Update" : "Add"} Achievement
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
        <h3 className="text-lg font-medium mb-3">Your Achievements</h3>
        {achievements.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No achievements added yet. Add your notable accomplishments and recognition.
          </p>
        ) : (
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-50 p-3 rounded-md"
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <div className="text-gray-500 text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> 
                    {achievement.date}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(achievement.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeAchievement(achievement.id)}>
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

export default AchievementsForm;
