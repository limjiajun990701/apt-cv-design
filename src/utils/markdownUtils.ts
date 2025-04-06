
import { ResumeData } from "@/contexts/ResumeContext";

export function resumeToMarkdown(resumeData: ResumeData): string {
  let markdown = `# ${resumeData.personalInfo.name} ${resumeData.personalInfo.middleName || ''}\n`;
  markdown += `## ${resumeData.personalInfo.title}\n\n`;
  
  // Contact Information
  markdown += "## Contact Information\n";
  if (resumeData.personalInfo.email) markdown += `- Email: ${resumeData.personalInfo.email}\n`;
  if (resumeData.personalInfo.phone) markdown += `- Phone: ${resumeData.personalInfo.phone}\n`;
  if (resumeData.personalInfo.location) markdown += `- Location: ${resumeData.personalInfo.location}\n`;
  if (resumeData.personalInfo.linkedin) markdown += `- LinkedIn: ${resumeData.personalInfo.linkedin}\n`;
  if (resumeData.personalInfo.github) markdown += `- GitHub: ${resumeData.personalInfo.github}\n`;
  markdown += "\n";
  
  // Summary
  if (resumeData.summary) {
    markdown += "## Summary\n";
    markdown += resumeData.summary + "\n\n";
  }
  
  // Experience
  if (resumeData.experience.length > 0) {
    markdown += "## Experience\n";
    resumeData.experience.forEach(exp => {
      markdown += `### ${exp.title} at ${exp.company}\n`;
      markdown += `${exp.location} | ${exp.startDate}${exp.current ? " - Present" : ` - ${exp.endDate}`}\n\n`;
      markdown += exp.description + "\n\n";
      if (exp.projects) markdown += `**Projects:** ${exp.projects}\n\n`;
      if (exp.scope) markdown += `**Scope:** ${exp.scope}\n\n`;
    });
  }
  
  // Education
  if (resumeData.education.length > 0) {
    markdown += "## Education\n";
    resumeData.education.forEach(edu => {
      markdown += `### ${edu.degree} in ${edu.field}, ${edu.institution}\n`;
      markdown += `${edu.startDate}${edu.current ? " - Present" : ` - ${edu.endDate}`}\n\n`;
      if (edu.description) markdown += edu.description + "\n\n";
    });
  }
  
  // Skills
  if (resumeData.skills.length > 0) {
    markdown += "## Skills\n";
    const skillNames = resumeData.skills.map(skill => skill.name);
    markdown += skillNames.join(", ") + "\n\n";
  }
  
  // Projects
  if (resumeData.projects.length > 0) {
    markdown += "## Projects\n";
    resumeData.projects.forEach(project => {
      markdown += `### ${project.title}\n`;
      markdown += project.description + "\n";
      if (project.url) markdown += `URL: ${project.url}\n`;
      markdown += "\n";
    });
  }
  
  // Languages
  if (resumeData.languages.length > 0) {
    markdown += "## Languages\n";
    resumeData.languages.forEach(lang => {
      markdown += `- ${lang.name}: ${lang.proficiency}\n`;
    });
    markdown += "\n";
  }
  
  // Certifications
  if (resumeData.certifications.length > 0) {
    markdown += "## Certifications\n";
    resumeData.certifications.forEach(cert => {
      markdown += `- ${cert.name} (${cert.issuer}, ${cert.date}${cert.expiry ? ` - ${cert.expiry}` : ""})\n`;
      if (cert.url) markdown += `  URL: ${cert.url}\n`;
    });
    markdown += "\n";
  }
  
  // Achievements
  if (resumeData.achievements.length > 0) {
    markdown += "## Achievements\n";
    resumeData.achievements.forEach(ach => {
      markdown += `- ${ach.title} (${ach.date})\n  ${ach.description}\n`;
    });
    markdown += "\n";
  }
  
  // Activities
  if (resumeData.activities.length > 0) {
    markdown += "## Activities\n";
    resumeData.activities.forEach(act => {
      markdown += `- ${act.name}\n  ${act.description}\n`;
    });
    markdown += "\n";
  }
  
  // Badges
  if (resumeData.badges.length > 0) {
    markdown += "## Badges\n";
    resumeData.badges.forEach(badge => {
      markdown += `- ${badge.name} (${badge.issuer}, ${badge.date})\n`;
    });
  }
  
  return markdown;
}

export function parseMarkdown(markdown: string): Partial<ResumeData> {
  const resumeData: Partial<ResumeData> = {
    personalInfo: {} as any,
    experience: [],
    education: [],
    skills: [],
    languages: [],
    achievements: [],
    certifications: [],
    activities: [],
    badges: [],
    projects: [],
  };
  
  // Simple parser, can be improved for more complex markdown structures
  const lines = markdown.split('\n');
  let section = '';
  let currentItem: any = null;
  
  // Extract name from first heading
  const nameMatch = lines[0]?.match(/^# (.+)/);
  if (nameMatch) {
    const fullName = nameMatch[1].trim().split(' ');
    if (fullName.length >= 2) {
      resumeData.personalInfo!.name = fullName[0];
      // If there are more than 2 words, assume middle name exists
      if (fullName.length > 2) {
        resumeData.personalInfo!.middleName = fullName.slice(1, -1).join(' ');
        resumeData.personalInfo!.name = fullName[fullName.length - 1];
      }
    }
  }
  
  // Extract title from second heading
  const titleMatch = lines[1]?.match(/^## (.+)/);
  if (titleMatch) {
    resumeData.personalInfo!.title = titleMatch[1].trim();
  }
  
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Section headers
    if (line.startsWith('## ')) {
      section = line.substring(3).toLowerCase();
      currentItem = null;
      continue;
    }
    
    // Subsection headers (for items like experiences, education, etc.)
    if (line.startsWith('### ')) {
      const title = line.substring(4).trim();
      
      if (section === 'experience') {
        const titleCompanyMatch = title.match(/(.+) at (.+)/);
        if (titleCompanyMatch) {
          currentItem = {
            id: `exp${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            title: titleCompanyMatch[1].trim(),
            company: titleCompanyMatch[2].trim(),
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            projects: '',
            scope: ''
          };
          resumeData.experience!.push(currentItem);
        }
      } else if (section === 'education') {
        const eduMatch = title.match(/(.+) in (.+), (.+)/);
        if (eduMatch) {
          currentItem = {
            id: `edu${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            degree: eduMatch[1].trim(),
            field: eduMatch[2].trim(),
            institution: eduMatch[3].trim(),
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          };
          resumeData.education!.push(currentItem);
        }
      } else if (section === 'projects') {
        currentItem = {
          id: `proj${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          title: title,
          description: '',
          url: ''
        };
        resumeData.projects!.push(currentItem);
      }
      continue;
    }
    
    // Process content based on current section
    if (section === 'summary') {
      if (line && !line.startsWith('#')) {
        resumeData.summary = (resumeData.summary || '') + line + '\n';
      }
    } else if (section === 'skills') {
      if (line && !line.startsWith('#')) {
        const skillList = line.split(',').map(s => s.trim());
        skillList.forEach(skill => {
          if (skill) {
            resumeData.skills!.push({
              id: `skill${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              name: skill
            });
          }
        });
      }
    } else if (section === 'languages') {
      const langMatch = line.match(/- (.+): (.+)/);
      if (langMatch) {
        resumeData.languages!.push({
          id: `lang${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: langMatch[1].trim(),
          proficiency: langMatch[2].trim()
        });
      }
    } else if (section === 'contact information') {
      const contactMatch = line.match(/- (.+): (.+)/);
      if (contactMatch) {
        const field = contactMatch[1].toLowerCase();
        const value = contactMatch[2].trim();
        
        if (field.includes('email')) resumeData.personalInfo!.email = value;
        else if (field.includes('phone')) resumeData.personalInfo!.phone = value;
        else if (field.includes('location')) resumeData.personalInfo!.location = value;
        else if (field.includes('linkedin')) resumeData.personalInfo!.linkedin = value;
        else if (field.includes('github')) resumeData.personalInfo!.github = value;
      }
    }
    
    // Process current item based on the section
    if (currentItem) {
      if (section === 'experience') {
        // Extract date range
        const dateMatch = line.match(/(.+) \| (.+) - (.+)/);
        if (dateMatch) {
          currentItem.location = dateMatch[1].trim();
          currentItem.startDate = dateMatch[2].trim();
          currentItem.endDate = dateMatch[3].trim() === 'Present' ? '' : dateMatch[3].trim();
          currentItem.current = dateMatch[3].trim() === 'Present';
        } 
        // Extract description
        else if (line && !line.startsWith('#') && !line.match(/^[\*\-\d]/) && !line.includes('Projects:') && !line.includes('Scope:')) {
          currentItem.description += line + '\n';
        }
        // Extract projects
        else if (line.includes('Projects:')) {
          currentItem.projects = line.replace('**Projects:**', '').trim();
        }
        // Extract scope
        else if (line.includes('Scope:')) {
          currentItem.scope = line.replace('**Scope:**', '').trim();
        }
      } else if (section === 'education') {
        // Extract date range
        const dateMatch = line.match(/(.+) - (.+)/);
        if (dateMatch) {
          currentItem.startDate = dateMatch[1].trim();
          currentItem.endDate = dateMatch[2].trim() === 'Present' ? '' : dateMatch[2].trim();
          currentItem.current = dateMatch[2].trim() === 'Present';
        } 
        // Extract description
        else if (line && !line.startsWith('#') && !line.startsWith('-')) {
          currentItem.description += line + '\n';
        }
      } else if (section === 'projects') {
        // Extract URL
        const urlMatch = line.match(/URL: (.+)/);
        if (urlMatch) {
          currentItem.url = urlMatch[1].trim();
        } 
        // Extract description
        else if (line && !line.startsWith('#') && !line.startsWith('-')) {
          currentItem.description += line + '\n';
        }
      }
    }
  }
  
  // Clean up any trailing newlines in text fields
  if (resumeData.summary) {
    resumeData.summary = resumeData.summary.trim();
  }
  
  resumeData.experience?.forEach(exp => {
    exp.description = exp.description.trim();
  });
  
  resumeData.education?.forEach(edu => {
    edu.description = edu.description.trim();
  });
  
  resumeData.projects?.forEach(proj => {
    proj.description = proj.description.trim();
  });
  
  return resumeData;
}
