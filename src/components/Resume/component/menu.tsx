import { Dispatch, useEffect, useState } from 'react';
import { Education, Experience, Menu, Project, Skill, newEducation, newExperience, newProject, newSkill } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';
import { MenuProps } from '../resume';

interface Content_Callback {
  content: string;
  callback?: (() => void) | undefined;
}
interface RootProps {
  educations: Education[];
  projects: Project[];
  contacts: string[];
  location: string;
  setLocation: Dispatch<React.SetStateAction<string>>;
  setContacts: Dispatch<React.SetStateAction<string[]>>
  setSkills: Dispatch<React.SetStateAction<Skill[]>>;
  experiences: Experience[];
  skills: Skill[];
  addEducation: (education: Education) => void;
  addExperience: (experience: Experience) => void;
  addProject: (project: Project) => void;
  addSkill: (skill: Skill) => void;
  editExperience: (experience: Experience, index: number) => void;
  editEducation: (education: Education, index: number) => void;
  removeEducation: (index: number) => void;
  removeExperience: (listIndex: number) => void;
  editProject: (project: Project, index: number) => void;
  removeProject: (index: number) => void;
}

const sortByBlockOrNumberSuffix = (arr: string[]): string[] => {
  const customSortOrder: Record<string, number> = { 'root': 3, 'Block': 2 };

  arr.sort((a: string, b: string) => {
    const valueA = a.split('-')[1];
    const valueB = b.split('-')[1];

    const orderA: number = customSortOrder[valueA] || 1;
    const orderB: number = customSortOrder[valueB] || 1;

    return orderA - orderB;
  });
  return arr;
};

const RootScope = (props: RootProps) => {
  const buttonList: Content_Callback[] = [];
  if (props.contacts.length === 1 && props.contacts[0] === '') {
    buttonList.push({
      content: 'Restore contacts',
      callback: () => props.setContacts(['phone', 'email', 'social', 'website'])
    });
  }

  if (props.location === '') {
    buttonList.push({
      content: 'Add location',
      callback: () => props.setLocation('Location')
    });
  }

  if (props.educations.length === 0) {
    buttonList.push({
      content: 'Restore education',
      callback: () => props.addEducation(newEducation())
    });
  }

  if (props.experiences.length === 0) {
    buttonList.push({
      content: 'Restore experience',
      callback: () => props.addExperience(newExperience())
    });
  }

  if (props.projects.length === 0) {
    buttonList.push({
      content: 'Restore projects',
      callback: () => props.addProject(newProject())
    });
  }

  if (props.skills.length === 0) {
    buttonList.push({
      content: 'Restore Skills',
      callback: () => props.setSkills(newSkill())
    });
  }

  return buttonList;
};

interface BlockProps {
  addEducation: (education: Education) => void,
  addExperience: (experience: Experience) => void,
  addProject: (project: Project) => void,
  setSkills: Dispatch<React.SetStateAction<Skill[]>>;
}

const BlockScope = (instance: string, { addEducation, addExperience, addProject, setSkills }: BlockProps): Content_Callback => {
  let content: string = '';
  let callBack_function: (() => void) | undefined;
  switch (instance) {
    case 'education':
      content = `Add ${instance}`;
      callBack_function = () => addEducation(newEducation());
      break;
    case 'experience':
      content = `Add ${instance}`;
      callBack_function = () => addExperience(newExperience());
      break;
    case 'project':
      content = `Add ${instance}`;
      callBack_function = () => addProject(newProject());
      break;
    case 'skill':
      content = `Remove ${instance}`;
      callBack_function = () => setSkills([]);
  }
  return {
    content: content,
    callback: callBack_function
  };
};

interface ElementProps {
  educations: Education[];
  editEducation: (education: Education, index: number) => void;
  removeEducation: (index: number) => void;
  experiences: Experience[];
  editExperience: (experience: Experience, index: number) => void;
  removeExperience: (index: number) => void;
  projects: Project[];
  editProject: (project: Project, index: number) => void;
  removeProject: (index: number) => void;
  setSkills: Dispatch<React.SetStateAction<Skill[]>>;
}

const ElementScope = (instance: string, scope: string, { educations, editEducation, removeEducation, experiences, editExperience, removeExperience, projects, editProject, removeProject, setSkills }: ElementProps) => {
  const buttonList: Content_Callback[] = [];
  const index = parseInt(scope, 10);

  if (instance === 'education') {
    if (!educations[index].gpa) {
      const education: Education = { ...educations[index] };
      education.gpa = '4.0';
      buttonList.push({
        content: 'Restore GPA',
        callback: () => editEducation(education, index),
      });
    }
    if (educations[index].other.length === 0) {
      const education: Education = { ...educations[index] };
      education.other.push('');
      buttonList.push({
        content: 'Restore Bulletpoints',
        callback: () => editEducation(education, index)
      });
    }
    buttonList.push({
      content: 'Delete Education',
      callback: () => removeEducation(index)
    });
  }
  else if (instance === 'experience') {
    if (!(experiences[index].company)) {
      const experience: Experience = { ...experiences[index] };
      experience.company = 'Insert Company';
      buttonList.push({
        content: 'Restore company',
        callback: () => editExperience(experience, index)
      });
    }
    if (!(experiences[index].location)) {
      const experience: Experience = { ...experiences[index] };
      experience.company = 'Insert Location';
      buttonList.push({
        content: 'Restore Location',
        callback: () => editExperience(experience, index)
      });
    }
    if (experiences[index].bulletPoints.length === 0) {
      const experience: Experience = { ...experiences[index] };
      experience.bulletPoints = ['...'];
      buttonList.push({
        content: 'Restore Bulletpoints',
        callback: () => editExperience(experience, index)
      });
    }
    buttonList.push({
      content: 'Delete Experience',
      callback: () => removeExperience(index)
    });
  }
  else if (instance === 'project') {
    if (projects[index].technologies.length === 0) {
      const project: Project = { ...projects[index] };
      project.technologies = ['...'];
      buttonList.push({
        content: 'Restore Technologies',
        callback: () => editProject(project, index)
      });
    }
    if (!(projects[index].date)) {
      const project: Project = { ...projects[index] };
      project.date = 'Insert Date';
      buttonList.push({
        content: 'Restore Date',
        callback: () => editProject(project, index)
      });
    }
    if (projects[index].bulletPoints.length === 0) {
      const project: Project = { ...projects[index] };
      project.bulletPoints = ['...'];
      buttonList.push({
        content: 'Restore Bulletpoints',
        callback: () => editProject(project, index)
      });
    }
    buttonList.push({
      content: 'Delete Project',
      callback: () => removeProject(index)
    });
  }
  else if (instance === 'skill') {
    buttonList.push({
      content: 'Delete Skill',
      callback: () => setSkills([])
    });
  }

  // Return buttonList with callback functions
  return buttonList;
};

const ButtonGenerator = (sortedList: string[], props: RootProps): Content_Callback[] => {
  if (sortedList.length === 0) return [];
  const buttonList: Content_Callback[] = [];
  for (const element of sortedList) {
    const [instance, scope] = element.split('-');
    if (scope === 'root') {
      RootScope(props).forEach(e => buttonList.push(e));
    } else if (scope === 'Block') {
      if (instance === 'contact') break;
      buttonList.push(BlockScope(instance, props));
    } else {
      ElementScope(instance, scope, props).forEach(e => buttonList.push(e));
    }
  }
  return buttonList;
};

interface ChildProps {
  menu: Menu;
  setMenu: Dispatch<React.SetStateAction<Menu>>;
  clickedElements: string[];
  setClickedElements: React.Dispatch<React.SetStateAction<string[]>>;
  childProps: RootProps;
}

const DisplayElement: React.FC<ChildProps> = (props) => {
  const childProps = props.childProps;
  const menu = props.menu;
  const clickedElements = props.clickedElements;
  const setMenu = props.setMenu;
  const [list, setList] = useState<Content_Callback[]>([]);

  const handleClick = () => {
    setMenu(() => ({
      clickedElements: [''],
      position: [-99, -99],
    }));
  };

  useEffect(() => {
    if (menu.clickedElements.length === 0) return;
    setList(ButtonGenerator(sortByBlockOrNumberSuffix(menu.clickedElements), childProps));
    setMenu({ ...menu, clickedElements: [] });
  }, [childProps, menu.clickedElements, clickedElements, menu, setMenu]);

  return (
    <ul className={`${list.length === 0 ? 'hidden' : 'block'} absolute bg-slate-400 p-1 rounded-md divide-y divide-black`} style={{ left: props.menu.position[0], top: props.menu.position[1] }} onClick={handleClick}>
      {
        list.map((element: Content_Callback, index) => (
          <li key={index}>
            <button onClick={element.callback}>
              {element.content}
            </button>
          </li>
        ))
      }
    </ul>
  );
};

const MenuBlock: React.FC<MenuProps> = (props) => {
  const { menu, setMenu, educations, editEducation, removeEducation, experiences, editExperience, removeExperience, addProject, addSkill, projects, editProject, removeProject, contacts, location, setLocation, setContacts, skills, addEducation, addExperience, setSkills } = useResume();

  return (
    <DisplayElement menu={menu} setMenu={setMenu} clickedElements={props.clickedElements} setClickedElements={props.setClickedElements} childProps={{ addProject, addSkill, setContacts, skills, addEducation, addExperience, contacts, location, setLocation, educations, editEducation, removeEducation, experiences, editExperience, removeExperience, projects, editProject, removeProject, setSkills }} />
  );
};

export default MenuBlock;
