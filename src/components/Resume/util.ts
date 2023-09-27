import { Education, Experience, Project, Skill } from '../resumeTypes';

export const saveToLocal = (name: string, location: string, contacts: string[], educations: Education[], experiences: Experience[], projects: Project[], skills: Skill[]): void => {
  const jsonObject = {
    'name': name,
    'location': location,
    'contacts': contacts,
    'educations': educations,
    'experiences': experiences,
    'projects': projects,
    'skills': skills
  };
  localStorage.setItem('resumeBuilder', JSON.stringify(jsonObject));
  return;
};

export const readFromLocal = (): void => {
  return;
};

