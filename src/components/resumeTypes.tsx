import React, { Dispatch, ReactNode } from 'react';

export interface Education {
  school: string;
  location: string;
  startDate: string;
  endDate?: string;
  degree: string;
  gpa?: string;
  other: string[];
}

export const newEducation = (): Education => {
  return {
    school: 'University of ...',
    location: 'City, State',
    startDate: 'Start Date',
    endDate: 'End Date',
    degree: 'Bachelor of ...',
    gpa: '4.0',
    other: ['Coursework: ...', 'Others: ...']
  };
};

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  bulletPoints: string[];
}

export const newExperience = (): Experience => {
  return {
    title: 'Title',
    company: 'Company',
    location: 'location (optional)',
    startDate: 'Start Date',
    endDate: 'End Date',
    bulletPoints: ['Worked on ...']
  };
};

export interface Project {
  name: string;
  date: string;
  description?: string;
  technologies: string[];
  bulletPoints: string[];
}

export const newProject = (): Project => {
  return {
    name: 'Resumer builder',
    date: 'September 2023',
    technologies: ['Javascript'],
    bulletPoints: ['Builds resumes']
  };
};

export interface Skill {
  type: string;
  skills: string[];
}

export interface Menu {
  clickedElements: string[];
  position: number[];
}

export interface ResumeState {
  name: string;
  setName: Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<React.SetStateAction<string>>;
  contacts: string[];
  setContacts: Dispatch<React.SetStateAction<string[]>>;
  educations: Education[];
  setEducations: Dispatch<React.SetStateAction<Education[]>>;
  experiences: Experience[];
  setExperiences: Dispatch<React.SetStateAction<Experience[]>>;
  projects: Project[];
  setProjects: Dispatch<React.SetStateAction<Project[]>>;
  skills: Skill[];
  menu: Menu;
  setMenu: Dispatch<React.SetStateAction<Menu>>;
  addEducation: (education: Education) => void;
  removeEducation: (index: number) => void;
  editEducation: (education: Education, index: number) => void;
  addExperience: (experience: Experience) => void;
  editExperience: (experience: Experience, index: number) => void;
  removeExperience: (listIndex: number) => void;
  addContact: (contact: string) => void;
  removeContact: (contactIndex: number) => void;
  editContacts: (contactIndex: number, content: string) => void;
  rearrangeContacts: (i0: number, i1: number) => void;
  addProject: (project: Project) => void;
  removeProject: (index: number) => void;
  editProject: (project: Project, index: number) => void;
  addSkills: (skill: Skill) => void;
  editSkill: (skill: Skill, index: number) => void;
}

export interface ProviderProps {
  children: ReactNode;
}
