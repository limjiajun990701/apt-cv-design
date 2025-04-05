
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit, Save, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LanguagesForm: React.FC = () => {
  const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResumeContext();
  const { languages } = resumeData;

  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("Basic");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editId) {
      updateLanguage(editId, { name, proficiency });
      setEditId(null);
    } else {
      addLanguage({ name, proficiency });
    }

    setName("");
    setProficiency("Basic");
  };

  const handleEdit = (id: string) => {
    const language = languages.find((l) => l.id === id);
    if (language) {
      setName(language.name);
      setProficiency(language.proficiency);
      setEditId(id);
    }
  };

  const handleCancel = () => {
    setName("");
    setProficiency("Basic");
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="languageName">Language Name</Label>
          <Input
            id="languageName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., English, Spanish, French"
          />
        </div>
        
        <div>
          <Label htmlFor="proficiency">Proficiency Level</Label>
          <Select value={proficiency} onValueChange={setProficiency}>
            <SelectTrigger>
              <SelectValue placeholder="Select proficiency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Native">Native</SelectItem>
              <SelectItem value="Fluent">Fluent</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!name.trim()}>
            {editId ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {editId ? "Update" : "Add"} Language
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
        <h3 className="text-lg font-medium mb-3">Your Languages</h3>
        {languages.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No languages added yet. Add languages to showcase your multilingual abilities.
          </p>
        ) : (
          <div className="space-y-2">
            {languages.map((language) => (
              <div
                key={language.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div>
                  <span className="font-medium">{language.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({language.proficiency})</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(language.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeLanguage(language.id)}>
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

export default LanguagesForm;
