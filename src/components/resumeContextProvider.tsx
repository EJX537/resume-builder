import { ProviderProps, ResumeState, Education, Experience, Project, Skill, Menu } from './resumeTypes';

import React, { createContext, useState } from 'react';

export const ResumeContext = createContext<ResumeState | undefined>(undefined);

const ResumeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState<string[]>(['']);
  const [location, setLocation] = useState('');
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [menu, setMenu] = useState<Menu>({ clickedElements: [], position: [0, 0] });
  const addEducation = (education: Education) => {
    setEducations((prevEducation) => [...prevEducation, education]);
  };

  const removeEducation = (index: number) => {
    console.log(educations);
    // if (!(0 < index && index < educations.length)) throw new Error('Error Education does not exist');
    const newEducations = [...educations];
    newEducations.splice(index, 1);
    setEducations(newEducations);
  };

  const editEducation = (education: Education, index: number) => {
    if (!(0 <= index && index < educations.length)) throw new Error('Error Education does not exist');
    const newEducations = [...educations];
    newEducations[index] = education;
    setEducations(newEducations);
  };

  const addExperience = (experience: Experience) => {
    setExperiences((prevExperience) => [...prevExperience, experience]);
  };

  const editExperience = (experience: Experience, index: number) => {
    if (!(0 <= index && index < educations.length)) throw new Error('Error Experience does not exist');
    const newExperiences = [...experiences];
    newExperiences[index] = experience;
    setExperiences(newExperiences);
  };

  const removeExperience = (index: number) => {
    if (!(0 <= index && index < experiences.length)) throw new Error('Error Experience does not exist');
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const addContact = (contact: string) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const removeContact = (index: number) => {
    if (!(0 <= index && index < contacts.length)) throw new Error('Error Contact does not exist');
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const editContacts = (index: number, content: string) => {
    if (!(0 <= index && index < contacts.length)) throw new Error('Error Contact does not exist');
    const newContacts = [...contacts];
    newContacts[index] = content;
    setContacts(newContacts);
  };

  const rearrangeContacts = (i0: number, i1: number) => {
    if (!(0 <= i0 && i0 < contacts.length)) throw new Error('Error Contact does not exist');
    if (!(0 <= i1 && i1 < contacts.length)) throw new Error('Error Contact does not exist');
    const newContacts = [...contacts];
    const temp = newContacts[i0];
    newContacts[i0] = newContacts[i1];
    newContacts[i1] = temp;
    setContacts(newContacts);
  };

  const addProject = (project: Project) => {
    const newProjects = [...projects, project];
    projects.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
    setProjects(newProjects);
  };

  const removeProject = (index: number) => {
    if (!(0 < index && index < projects.length)) throw new Error('Error Project does not exist');
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const editProject = (project: Project, index: number) => {
    if (!(0 <= index && index < projects.length)) throw new Error('Error Project does not exist');
    const newProjects = [...projects];
    newProjects[index] = project;
    setProjects(newProjects);
  };

  const addSkills = (skill: Skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const editSkill = (skill: Skill, index: number) => {
    if (!(0 <= index && index < skills.length)) throw new Error('Error Skill does not exist');
    const newSkills = [...skills];
    newSkills[index] = skill;
    setSkills(newSkills);
  };

  return (
    <ResumeContext.Provider
      value={{
        name, setName, educations, addExperience, editExperience, removeExperience, contacts, setContacts, addContact, setExperiences,
        removeContact, location, setLocation, experiences, editContacts, rearrangeContacts, projects, setProjects,
        addProject, removeProject, editProject, addEducation, removeEducation, editEducation, skills, addSkills, setEducations,
        menu, setMenu, editSkill
      }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;

