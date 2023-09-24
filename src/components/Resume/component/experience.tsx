import { useState } from 'react';
import { Experience } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';

const ExperienceBlock = () => {
  const { experiences, editExperience, setMenu } = useResume();
  const [editText, setText] = useState('');
  const [activeId, setActiveId] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLSpanElement>, text: string) => {
    console.log(event.currentTarget.id);
    if (event.currentTarget.id === activeId) return;
    setActiveId(event.currentTarget.id);
    setText(text);
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const saveTextEdit = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (event.key !== 'Enter') return;
    const newExperience: Experience = { ...experiences[index] };
    switch (activeId.split('-')[0]) {
      case 'title':
        newExperience.title = editText;
        break;
      case 'location':
        newExperience.location = editText;
        break;
      case 'company':
        newExperience.company = editText;
        break;
      case 'startDate':
        newExperience.startDate = editText;
        break;
      case 'endDate':
        newExperience.endDate = editText ? editText : undefined;
        break;
    }
    editExperience(newExperience, index);
    return;
  };

  const saveTextOnExit = (index: number) => {
    const newExperience: Experience = { ...experiences[index] };
    switch (activeId.split('-')[0]) {
      case 'title':
        newExperience.title = editText;
        break;
      case 'location':
        newExperience.location = editText;
        break;
      case 'company':
        newExperience.company = editText;
        break;
      case 'startDate':
        newExperience.startDate = editText;
        break;
      case 'endDate':
        newExperience.endDate = editText ? editText : undefined;
        break;
      case 'sub':
        if (editText === '') {
          newExperience.bulletPoints = [];
        } else {
          newExperience.bulletPoints = editText.split('\n');
        }
        break;
    }
    editExperience(newExperience, index);
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
    <div className='flex w-full flex-col hover:bg-slate-200 group/add' id='experience-Block' onContextMenu={handleRightClick}>
      <div className={`${experiences.length ? '' : 'hidden'} w-full text-[19px] border-b-2 border-black`}>
        Experience
      </div>
      {
        experiences.map((experience: Experience, index) => (
          <div key={index} className='ml-3 my-1' onContextMenu={handleRightClick}>
            <div className='flex justify-between text-[16.5px]'>
              <div className='group' onMouseEnter={(event) => loadEditText(event, experience.title)} id={`title-${index}`}>
                <span className='group-hover:hidden font-semibold'>
                  {experience.title}
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={activeId === `title-${index}` ? editText : experience.title}
                  size={activeId === `title-${index}` ? Math.max(editText.length, experience.title.length) : experience.title ? experience.title.length : 20} />
              </div>

              <div className='pr-2 flex flex-row'>
                <span className='group' onMouseEnter={(event) => loadEditText(event, experience.startDate)} id={`startDate-${index}`}>
                  <span className='group-hover:hidden'>
                    {experience.startDate}
                  </span>
                  <input
                    type="text"
                    className='hidden group-hover:flex'
                    onChange={handleTextEdit}
                    onKeyDownCapture={(event) => saveTextEdit(event, index)}
                    onMouseLeave={() => saveTextOnExit(index)}
                    value={activeId === `startDate-${index}` ? editText : experience.startDate}
                    size={activeId === `startDate-${index}` ? Math.max(editText.length, experience.startDate.length) : experience.startDate ? experience.startDate.length : 20} />
                </span>

                <span className='px-2 '> - </span>

                <span className='group' onMouseEnter={(event) => loadEditText(event, experience.endDate ? experience.endDate : '')} id={`endDate-${index}`}>
                  <span className='group-hover:hidden'>
                    {experience.endDate ? experience.endDate : 'Current'}
                  </span>
                  <input
                    type="text"
                    className='hidden group-hover:flex'
                    onChange={handleTextEdit}
                    onKeyDownCapture={(event) => saveTextEdit(event, index)}
                    onMouseLeave={() => saveTextOnExit(index)}
                    value={activeId === `endDate-${index}` ? editText : experience.endDate}
                    size={activeId === `endDate-${index}` ? Math.max(editText.length, experience.endDate ? experience.endDate.length : 20) : experience.endDate ? experience.endDate.length : 20} />
                </span>
              </div>
            </div>
            <div className='italic flex text-[15px]'>
              <div className='group' onMouseEnter={(event) => loadEditText(event, experience.company)} id={`company-${index}`}>
                <span className='group-hover:hidden'>
                  {experience.company}
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={activeId === `company-${index}` ? editText : experience.company}
                  size={activeId === `company-${index}` ? Math.max(editText.length, experience.company.length) : experience.company.length} />
              </div>

              <div className='flex-1' />
              <span className='pr-2'>
                <div className='group' onMouseEnter={(event) => loadEditText(event, experience.location ? experience.location : '')} id={`location-${index}`}>
                  <div className='group-hover:hidden'>
                    {experience.location ? experience.location : ''}
                  </div>
                  <input
                    type="text"
                    className='hidden group-hover:flex'
                    onChange={handleTextEdit}
                    onKeyDownCapture={(event) => saveTextEdit(event, index)}
                    onMouseLeave={() => saveTextOnExit(index)}
                    value={activeId === `location-${index}` ? editText : experience.location}
                    size={activeId === `location-${index}` ? Math.max(editText.length, experience.location ? experience.location.length : 20) : experience.location ? experience.location.length : 20} />
                </div>
              </span>
            </div>
            <div className='group text-[14px] ml-9' onMouseEnter={(event) => loadEditText(event, experience.bulletPoints.join('\n'))} id={`sub-${index}`}>
              <ul className={`${experience.bulletPoints.length === 0 ? 'hidden' : 'block'} list-outside list-disc group-hover:hidden`}>
                {
                  experience.bulletPoints.map((b, index) => (
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
                rows={Math.min(editText.split('\n').length + 3, 8)}
                value={activeId === `sub-${index}` ? editText : experience.bulletPoints.join('\n')} />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ExperienceBlock;
