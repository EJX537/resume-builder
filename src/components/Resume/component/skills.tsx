import { useState } from 'react';
import { useResume } from '../../useResumeContext';
import { Skill } from '../../resumeTypes';
import { saveToLocal } from '../util';


const renderSkills = (skills: Skill[]): string[] => {
  return skills.map(skill => `${skill.skillType}: ${skill.skills.join(', ')}`);
};

const SkillBlock = () => {
  const { skills, setSkills, setMenu, name, location, contacts, educations, experiences, projects } = useResume();
  const [editText, setText] = useState('');
  const [activeId, setActiveId] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget.id === activeId) return;
    setActiveId(event.currentTarget.id);
    setText(renderSkills(skills).join('\n'));
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const saveTextOnExit = () => {
    const skillArray: Skill[] = [];
    const skillsSplit = editText.split('\n');
    const skillMap: { [key: string]: string[] } = {};
    skillsSplit.forEach(skill => {
      try {
        const [t, s] = skill.split(': ');
        skillMap[t] = s.split(' ,');
      } catch (error) { /* empty */ }
    });

    Object.entries(skillMap).map(([key, value]) => {
      skillArray.push({
        type: 'Skill',
        skillType: key,
        skills: value
      });
    });
    setActiveId('');
    setSkills(skillArray);
    saveToLocal(name, location, contacts, educations, experiences, projects, skillArray);
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
    <div className='w-full flex flex-col hover:bg-slate-200 group/add' id='skill-Block' onContextMenu={handleRightClick}>
      <div className={`${skills.length ? '' : 'hidden'} w-full text-[19.5px] border-b-2 border-black mb-2`}>
        Skills
      </div>
      <div className='group text-[15px] ml-4' onMouseEnter={(event) => loadEditText(event)} id='skill'>
        {
          skills.map((skill, index) => (
            <div key={index} className='flex group-hover:hidden'>
              <span className='font-semibold' >
                {skill.skillType}
              </span>
              <span className='pr-1'>
                {': '}
              </span>
              <span className='group-hover:hidden'>
                {skill.skills.join(', ')}
              </span>

            </div>
          ))
        }
        <textarea
          className='hidden group-hover:flex w-full h-fit resize-y'
          onChange={handleTextEdit}
          onMouseLeave={() => saveTextOnExit()}
          rows={Math.min(editText.split('\n').length + 1, 8)}
          value={activeId === 'skill' ? editText : renderSkills(skills).join('\n')} />
      </div>
    </div>
  );
};

export default SkillBlock;
