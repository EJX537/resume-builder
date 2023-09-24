import Name from './component/name';
import Contacts from './component/contacts';
import Location from './component/location';
import EducationBlock from './component/education';
import ExperienceBlock from './component/experience';
import ProjectBlock from './component/projects';
import SkillBlock from './component/skills';

import { Education, Experience, Project, Skill, newEducation } from '../resumeTypes';

import { useEffect, useState } from 'react';
import { useResume } from '../useResumeContext';

import { jsPDF } from 'jspdf';

export const handleGenerate = () => {
  const element = document.getElementById('resume-root');
  if (!element) return;

  // Create a new jsPDF instance
  const pdf = new jsPDF('portrait', 'pt', 'letter');

  // Convert the HTML content to a PDF
  pdf.html(element.outerHTML, {
    html2canvas: { 
      scale: 0.7
      
    },
    callback: (pdf) => {
      pdf.save('test2.pdf');
    }
  });
};

const sampleExperience: Experience = {
  title: 'Library Assistant (Intern)',
  company: 'San Francisco Public Library',
  location: 'San Francisco, CA',
  startDate: 'November 2019',
  endDate: 'March 2020',
  bulletPoints: [
    'Organized weekly events for the local community, including arts and crafts sessions, game nights, and holiday celebrations. This experience helped me develop strong project management and organizational skills.',
    'Worked alongside staff to clear out and organize books, demonstrating my attention to detail and ability to work in a team environment.'
  ]
};

const sampleProject_0: Project = {
  name: 'Portfolio',
  date: 'August 2023',
  technologies: ['Rust', 'Yew', 'HTML', 'CSS', 'Tailwind'],
  bulletPoints: [
    'Developed a responsive single page web application',
    'Built with Tailwind CSS and Yew via Web assembly',
    'Hosted on Custom Domain on Cloudflare displaying my projects',
    'Clean adaptive user interface with consistent experience on mobile and desktop'
  ]
};

const sampleProject_1: Project = {
  name: 'Full-Stack Weekly Grocery Helper',
  date: 'March 2023',
  technologies: ['Express', 'JavaScript', 'CSS', 'React', 'MUI', 'PostgreSQL'],
  bulletPoints: [
    'Collaborated and managed through the use of the SCRUM framework',
    'Created a full-stack grocery assistance website that help plan meals',
    'Handled the Front-end portion of the application and managed the inter-connective of the front-end and back-end',
    'Features include image support, addition of user recipe, searching recipes, and storing previous week’s meal plans'
    ]
};

const sampleProject_2: Project = {
  name: 'Multi-Threaded HTTP Server',
  date: 'November 2022',
  technologies: ['C'],
  bulletPoints: [
    'Created a HTTP server that supports PUT, HEAD, and GET requests.',
    'Handling synchronization and shared data structures using the pthreads library',
    'Parses requests and returns the corresponding status codes and responses depending on their validity.'
  ]
};

const sampleProject_3: Project = {
  name: 'Full-Stack Email Manager',
  date: 'July 2022',
  technologies: ['Express', 'JavaScript', 'CSS', 'HTML', 'React', 'MUI', 'PostgreSQL'],
  bulletPoints: [
    'Developed a full-stack email client that holds data for multiple users',
    'Front-end was created using React and MUI',
    'Back-end was created using Express, OpenAPI, and PostgreSQL',
    'Features implemented include login, search bar, creating and reading emails with favorites and flags'
  ]
};

const sampleProjects = [
  sampleProject_0, sampleProject_1, sampleProject_2, sampleProject_3
];

const sampleSkillType_0: Skill = {
  type: 'Languages',
  skills: ['Python', 'C/C++', 'JavaScript', 'Rust', 'HTML/CSS']
};
const sampleSkillType_1: Skill = {
  type: 'Frameworks/ Web Dev',
  skills: ['React', 'Node.js', 'Tailwind', 'Yew', 'MUI', 'Lit']
};
const sampleSkillType_2: Skill = {
  type: 'Developer Tools',
  skills: ['Git', 'Docker', 'VS Code']

};
const sampleSkillType_3: Skill = {
  type: 'Soft Skills',
  skills: ['Adaptability', 'Creativity', 'Organizational', 'Critical thinking', 'Communication', 'Teamwork']
};

const sampleSkills = [
  sampleSkillType_0,
  sampleSkillType_1,
  sampleSkillType_2,
  sampleSkillType_3
];

const Resume = () => {
  const { setName, addContact, setLocation, addEducation, addExperience, addProject, addSkills, setMenu, setContacts } = useResume();
  const [ loadOnce, setLoadOnce ] = useState(false);
  const [ loaded, setLoaded ] = useState(0);

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const e = event.currentTarget.id;
    setMenu((prevMenu) => ({
      clickedElements: [...prevMenu.clickedElements, e],
      position: [event.clientX, event.clientY],
    }));
  };

  useEffect(() => {
    if (loadOnce) return;
    setName('Insert Name');
    setContacts(['phone', 'email', 'social', 'website']);
    setLocation('Location');
    addEducation(newEducation());
    addExperience(sampleExperience);
    addProject(sampleProject_0);
    addProject(sampleProject_3);
    // removeEducation(0);
    setLoadOnce(true);
  }, [addContact, addEducation, addExperience, addProject, loadOnce, setContacts, setLocation, setName]);

  useEffect(() => {
    if (loaded > 3) return;
    addProject(sampleProjects[loaded]);
    addSkills(sampleSkills[loaded]);
    setLoaded(loaded + 1);
  }, [addProject, addSkills, loaded]);

  return (
    <div className='flex h-full w-full items-center justify-center flex-col bg-slate-100'>
      <div className='w-[874px] h-[1131px] py-8 px-12 font-serif items-center justify-center bg-slate-50' id="resume-root" onContextMenu={handleRightClick}>
        <Name/>
        <Contacts/>
        <Location/>
        <EducationBlock/>
        <ExperienceBlock/>
        <ProjectBlock/>
        <SkillBlock/>
      </div>
    </div>
  );
};

export default Resume;
