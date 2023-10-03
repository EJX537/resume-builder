import Name from './component/name';
import Contacts from './component/contacts';
import Location from './component/location';
import EducationBlock from './component/education';
import ExperienceBlock from './component/experience';
import ProjectBlock from './component/projects';
import SkillBlock from './component/skills';
import MenuBlock from './component/menu';

import { newEducation, newExperience, newProject, newSkill } from '../resumeTypes';
import { useResume } from '../useResumeContext';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface MenuProps {
  clickedElements: string[];
  setClickedElements: React.Dispatch<React.SetStateAction<string[]>>;
}

const Resume = () => {
  const { setName, setLocation, addEducation, addExperience, addProject, addSkill, setMenu, setContacts, setSkills, setEducations, setProjects, setExperiences } = useResume();
  const [loadOnce, setLoadOnce] = useState(false);
  const [clickedElements, setClickedElements] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const e = event.currentTarget.id;
    setMenu((prevMenu) => ({
      clickedElements: [...prevMenu.clickedElements, e],
      position: [event.clientX, event.clientY],
    }));
  };

  const handleClick = () => {
    setMenu(() => ({
      clickedElements: [''],
      position: [-99, -99],
    }));
  };

  useEffect(() => {
    if (loadOnce) return;
    const query = new URLSearchParams(location.search);
    const isPreviewEric = query.get('loadReferenceEricJXieFromRecent');
    navigate('/');

    if (isPreviewEric) {
      const fetchAndLoadData = async () => {
        try {
          const response = await fetch('https://assets.ericjxie.com/Resume.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          try {
            setName(jsonData['name']);
          } catch (error) { /* empty */ }
          try {
            setContacts(jsonData['contacts']);
          } catch (error) { /* empty */ }
          try {
            setLocation(jsonData['location']);
          } catch (error) { /* empty */ }
          try {
            setEducations(jsonData['educations']);
          } catch (error) { /* empty */ }
          try {
            setExperiences(jsonData['experiences']);
          } catch (error) { /* empty */ }
          try {
            setProjects(jsonData['projects']);
          } catch (error) { /* empty */ }
          try {
            setSkills(jsonData['skills']);
          } catch (error) { /* empty */ }
        } catch (error) {
          throw new Error('Error: ' + error);
        }
      };
      fetchAndLoadData();
      return;
    }

    const fromLocal = localStorage.getItem('resumeBuilder');
    if (fromLocal === null) {
      setName('Insert Name');
      setContacts(['phone', 'email', 'social', 'website']);
      setLocation('Location');
      addEducation(newEducation());
      addExperience(newExperience());
      addProject(newProject());
      setSkills(newSkill());
    } else {
      const parsedData = JSON.parse(fromLocal);
      try {
        setName(parsedData['name']);
      } catch (error) { /* empty */ }
      try {
        setContacts(parsedData['contacts']);
      } catch (error) { /* empty */ }
      try {
        setLocation(parsedData['location']);
      } catch (error) { /* empty */ }
      try {
        setEducations(parsedData['educations']);
      } catch (error) { /* empty */ }
      try {
        setExperiences(parsedData['experiences']);
      } catch (error) { /* empty */ }
      try {
        setProjects(parsedData['projects']);
      } catch (error) { /* empty */ }
      try {
        setSkills(parsedData['skills']);
      } catch (error) { /* empty */ }
    }

    setLoadOnce(true);
  }, [addEducation, addExperience, addProject, addSkill, loadOnce, location.search, navigate, setContacts, setEducations, setExperiences, setLocation, setName, setProjects, setSkills]);

  return (
    <div className='flex h-full w-full items-center justify-center flex-col'>
      <div className='w-[874px] h-[1131px] py-8 px-12 font-serif items-center justify-center bg-slate-50' id="resume-root" onContextMenu={handleRightClick} onClick={handleClick}>
        <Name />
        <Contacts />
        <Location />
        <EducationBlock />
        <ExperienceBlock />
        <ProjectBlock />
        <SkillBlock />
      </div>
      <MenuBlock clickedElements={clickedElements} setClickedElements={setClickedElements} />
    </div>
  );
};

export default Resume;
