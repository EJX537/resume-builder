import { Dispatch } from 'react';
import { Education, Experience, Menu, Project, Skill, newEducation, newExperience, newProject } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';

interface Content_Callback {
  content: string;
  callback?: (() => void) | undefined;
}

interface RootProps {
  location: string;
  setLocation: Dispatch<React.SetStateAction<string>>;
  contacts: string[];
  setContacts: Dispatch<React.SetStateAction<string[]>>
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  addEducation: (education: Education) => void;
  addExperience: (experience: Experience) => void;
  addProject: (project: Project) => void;
  addSkills: (skill: Skill) => void;
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
      callback: () => props.setContacts(['phone', 'email', 'social' ,'website'])
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
      callback: () => props.addSkills({type: 'Languages', skills: ['Python', 'TypeScript', 'JavaScript', '...']})
    });
  }

  return buttonList;
};

const BlockScope = (instance: string, addEducation: (education: Education) => void): Content_Callback => {
  const content: string = `Add ${instance}`;
  let callBack_function: (() => void) | undefined;
  
  switch (instance) {
    case 'education':
      callBack_function = () => addEducation(newEducation());
      break;
    case 'experience':
      break;
    case 'projects':
      break;
    case 'skills':
      break;
  }
  return {
    content: content,
    callback: callBack_function
  };
};

const ElementScope = (instance: string, scope: string, educations: Education[], editEducation: (education: Education, index: number) => void, removeEducation: (index: number) => void) => {
  const buttonList: Content_Callback[] = [];
  const index = parseInt(scope, 10);

  if (instance === 'education') {
    if (!educations[index].gpa) {
      const education: Education = { ...educations[index] };
      education.gpa = '4.0';
      buttonList.push({
        content: 'Restore gpa',
        callback: () => editEducation(education, index),
      });
    }
    if (educations[index].other.length === 0) {
      const education: Education = { ...educations[index] };
      education.other.push('');
      buttonList.push({
        content: 'Restore bulletpoints',
        callback: () => editEducation(education, index)
      });
    }
      buttonList.push({
        content: 'Delete Education',
        callback: () => removeEducation(index)
      });
  }

  console.log(buttonList);

  // Return buttonList with callback functions
  return buttonList;
};


const ButtonGenerator = (sortedList: string[]): Content_Callback[] => {
  const { educations, projects, contacts, experiences, skills, location, setContacts, addEducation, addExperience, addProject, setLocation, addSkills, editEducation, removeEducation } = useResume();
  const buttonList: Content_Callback[] = [];  
  const rootProps: RootProps = { educations, projects, contacts, experiences, skills, location, setContacts, addEducation, addExperience, addProject, setLocation, addSkills };
  for (const element of sortedList) {
    const [instance, scope] = element.split('-');
    if (scope === 'root') {
      RootScope(rootProps).forEach(e => buttonList.push(e));
    } else if (scope === 'Block') {
      if (instance === 'contact') break;
      buttonList.push(BlockScope(instance, addEducation));
    } else {
      ElementScope(instance, scope, educations, editEducation, removeEducation).forEach(e => buttonList.push(e));
    }
  }
  return buttonList;
};

interface ChildProps {
  value: Menu;
}



const DisplayElement: React.FC<ChildProps> = (props) => {
  const sortedClickElements = sortByBlockOrNumberSuffix(props.value.clickedElements);
  const listElements: Content_Callback[] = ButtonGenerator(sortedClickElements);
  return (
    <ul className={`${ listElements.length === 0 ? 'hidden' : 'block' } absolute bg-slate-400 p-1 rounded-md divide-y divide-black`} style={{ left: props.value.position[0], top: props.value.position[1] }}>
      {
        listElements.map((element: Content_Callback, index) => (
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

const MenuBlock = () => {
  const { menu, setMenu } = useResume();
  return (
    <div className={`${ menu.clickedElements.length ? 'flex' : 'hidden' } absolute top-0 left-0 h-screen w-screen`} onClick={() => setMenu({clickedElements: [], position: []})}>
      <DisplayElement value={menu}/>
    </div>
  );
};

export default MenuBlock;
