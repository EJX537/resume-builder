import { useState } from 'react';
import { useResume } from '../../useResumeContext';
import { Skill } from '../../resumeTypes';

const SkillBlock = () => {
  const { skills, editSkill, setMenu } = useResume();
  const [editText, setText] = useState('');
  const [activeId, setActiveId] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement>, text: string) => {
    if (event.currentTarget.id === activeId) return;
    setActiveId(event.currentTarget.id);
    setText(text);
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const saveTextEdit = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (event.key !== 'Enter') return;
    const newEducation: Skill = { ...skills[index] };
    switch (activeId.split('-')[0]) {
      case 'type':
        newEducation.type = editText;
        break;
      case 'skills':
        newEducation.skills = editText.split(', ');
        break;
    }
    editSkill(newEducation, index);
    return;
  };

  const saveTextOnExit = (index: number) => {
    const newEducation: Skill = { ...skills[index] };
    switch (activeId.split('-')[0]) {
      case 'type':
        newEducation.type = editText;
        break;
      case 'skills':
        newEducation.skills = editText.split(', ');
        break;
    }
    editSkill(newEducation, index);
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
      {
        skills.map((skill, index) => (
          <div key={index} className='text-[15px] ml-4 flex'>
            <div className='group' onMouseEnter={(event) => loadEditText(event, skill.type)} id={`type-${index}`}>
              <span className='font-semibold group-hover:hidden' >
                {skill.type}
              </span>
              <input
                type="text"
                className='hidden group-hover:flex'
                onChange={handleTextEdit}
                onKeyDownCapture={(event) => saveTextEdit(event, index)}
                onMouseLeave={() => saveTextOnExit(index)}
                value={activeId === `type-${index}` ? editText : skill.type}
                size={activeId === `type-${index}` ? Math.max(editText.length, skill.type.length) : skill.type ? skill.type.length : 20} />

            </div>

            <div className='group flex flex-row' onMouseEnter={(event) => loadEditText(event, skill.skills.join(', '))} id={`skills-${index}`}>
              <span className='pr-1'>
                {': '}
              </span>
              <span className='group-hover:hidden'>
                {skill.skills.join(', ')}
              </span>
              <input
                type="text"
                className='hidden group-hover:flex'
                onChange={handleTextEdit}
                onKeyDownCapture={(event) => saveTextEdit(event, index)}
                onMouseLeave={() => saveTextOnExit(index)}
                value={activeId === `skills-${index}` ? editText : skill.skills.join(', ')}
                size={activeId === `skills-${index}` ? Math.max(editText.length, skill.skills.join(', ').length) : skill.skills ? skill.skills.join(', ').length : 20} />
            </div>

          </div>
        ))
      }
    </div>
  );
};


export default SkillBlock;
