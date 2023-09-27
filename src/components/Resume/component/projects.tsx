import { useState } from 'react';
import { Project } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';
import { saveToLocal } from '../util';


const ProjectBlock = () => {
  const { projects, editProject, setMenu, contacts, educations, experiences, skills, name, location } = useResume();
  const [editText, setText] = useState('');
  const [activeId, setActiveId] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLSpanElement>, text: string) => {
    if (event.currentTarget.id === activeId) return;
    setActiveId(event.currentTarget.id);
    setText(text);
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const saveTextEdit = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (event.key !== 'Enter') return;
    const newProject: Project = { ...projects[index] };
    switch (activeId.split('-')[0]) {
      case 'name':
        newProject.name = editText;
        break;
      case 'date':
        newProject.date = editText;
        break;
      case 'technologies':
        newProject.technologies = editText.split(', ');
        break;
    }
    editProject(newProject, index);
    saveToLocal(name, location, contacts, educations, experiences, projects, skills);
    return;
  };

  const saveTextOnExit = (index: number) => {
    const newProject: Project = { ...projects[index] };
    switch (activeId.split('-')[0]) {
      case 'name':
        newProject.name = editText;
        break;
      case 'date':
        newProject.date = editText;
        break;
      case 'technologies':
        newProject.technologies = editText.split(', ');
        break;
      case 'sub':
        if (editText === '') {
          newProject.bulletPoints = [];
        } else {
          newProject.bulletPoints = editText.split('\n');
        }
        break;
    }
    editProject(newProject, index);
    saveToLocal(name, location, contacts, educations, experiences, projects, skills);
    return;
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const e = event.currentTarget.id;
    setActiveId('');
    setMenu((prevMenu) => ({
      clickedElements: [...prevMenu.clickedElements, e],
      position: [event.clientX, event.clientY],
    }));
  };
  return (
    <div className='flex w-full flex-col hover:bg-slate-200 group/add' id='project-Block' onContextMenu={handleRightClick}>
      <div className={`${projects.length ? '' : 'hidden'} w-full text-[19px] border-b-2 border-black`}>
        Projects
      </div>
      {
        projects.map((project: Project, index) => (
          <div key={index} className='ml-3 my-1' onContextMenu={handleRightClick} id={`project-${index}`}>
            <div className='flex text-[16px]'>
              <div className='group' onMouseEnter={(event) => loadEditText(event, project.name)} id={`name-${index}`}>
                <span className='group-hover:hidden font-semibold'>
                  {project.name}
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={activeId === `name-${index}` ? editText : project.name}
                  size={activeId === `name-${index}` ? Math.max(editText.length, project.name.length) : project.name ? project.name.length : 20} />
              </div>

              <span className='px-1'>
                |
              </span>

              <div className='group text-[15.5px]' onMouseEnter={(event) => loadEditText(event, project.technologies.join(', '))} id={`technologies-${index}`}>
                <span className='italic group-hover:hidden'>
                  {project.technologies.join(', ')}
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={activeId === `technologies-${index}` ? editText : project.technologies.join(', ')}
                  size={activeId === `technologies-${index}` ? Math.max(editText.length, project.technologies.join(', ').length) : project.technologies ? project.technologies.join(', ').length : 20} />
              </div>

              <div className='flex-1' />
              <div className='group' onMouseEnter={(event) => loadEditText(event, project.date)} id={`date-${index}`}>
                <span className='pr-2 group-hover:hidden'>
                  {project.date}
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={activeId === `date-${index}` ? editText : project.date}
                  size={activeId === `date-${index}` ? Math.max(editText.length, project.date.length) : project.date ? project.date.length : 20} />
              </div>
            </div>
            <div className='group text-[14px] ml-9' onMouseEnter={(event) => loadEditText(event, project.bulletPoints.join('\n'))} id={`sub-${index}`}>
              <ul className={`${project.bulletPoints.length === 0 ? 'hidden' : 'block'} list-outside list-disc group-hover:hidden`}>
                {
                  project.bulletPoints.map((b, index) => (
                    <li key={index}>
                      {b}
                    </li>
                  ))
                }
              </ul>
              <textarea
                className='hidden group-hover:flex w-full h-fit resize-y'
                onChange={handleTextEdit}
                onKeyDownCapture={(event) => saveTextEdit(event, index)}
                onMouseLeave={() => saveTextOnExit(index)}
                rows={Math.min(editText.split('\n').length + 1, 8)}
                value={activeId === `sub-${index}` ? editText : project.bulletPoints.join('\n')} />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ProjectBlock;
