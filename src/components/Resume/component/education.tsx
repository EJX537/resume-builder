import React, { useState } from 'react';
import { Education } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';

const EducationBlock = () => {
  const { educations, editEducation, setMenu } = useResume();
  const [ editText, setText ] = useState('');
  const [ activeId, setActiveId ] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement>, text: string) => {
    if (event.currentTarget.id === activeId) return;
    console.log(text);
    setActiveId(event.currentTarget.id);
    setText(text);
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const saveTextEdit = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement> , index: number) => {
    if (event.key !== 'Enter') return;
    const newEducation: Education = { ...educations[index] };
    switch (activeId.split('-')[0]) {
      case 'school':
        newEducation.school = editText;
        break;
      case 'location':
        newEducation.location = editText;
        break;
      case 'degree':
        newEducation.degree = editText;
        break;
      case 'gpa':
        newEducation.gpa = editText;
        break;
      case 'startDate':
        newEducation.startDate = editText;
        break;
      case 'endDate':
        newEducation.endDate = editText ? editText : undefined;
        break;
      case 'sub':
        if (editText === '') {
          newEducation.other = [];
        } else {
          newEducation.other = editText.split('\n');
        }
        break;
      }
    editEducation(newEducation, index);
    return;
  };

  const saveTextOnExit = (index: number) => {
    const newEducation: Education = { ...educations[index]};
    switch (activeId.split('-')[0]) {
      case 'school':
        newEducation.school = editText;
        break;
      case 'location':
        newEducation.location = editText;
        break;
      case 'degree':
        newEducation.degree = editText;
        break;
      case 'gpa':
        newEducation.gpa = editText;
        break;
      case 'startDate':
        newEducation.startDate = editText;
        break;
      case 'endDate':
        newEducation.endDate = editText ? editText : undefined;
        break;
        case 'sub':
          if (editText === '') {
            newEducation.other = [];
          } else {
            newEducation.other = editText.split('\n');
          }
          break;
      }
    editEducation(newEducation, index);
    return;
  };
  
  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const e = event.currentTarget.id;

    setMenu((prevMenu) => ({
      clickedElements: [...prevMenu.clickedElements, e],
      position: [event.clientX, event.clientY],
    }));
  };

  return (
    <div className='flex w-full flex-col hover:bg-slate-200 group/add' id='education-Block' onContextMenu={handleRightClick}>
      <div className={`${educations.length ? '': 'hidden'} w-full text-[19px] border-b-2 border-black`}>
        Education
      </div>
      {
        educations.map((education: Education, index) => (
          <div key={index} className='ml-3 my-1' id={`${'education-' + index}`} onContextMenu={handleRightClick}>
            <div className='flex justify-between text-[16.5px]'>
                <div className='group' onMouseEnter={(event) => loadEditText(event, education.school)} id={`school-${index}`}>
                  <span className='group-hover:hidden font-semibold'>
                    { education.school ? education.school : 'University of ...' }
                  </span>
                  <input
                    type="text"
                    className='hidden group-hover:flex'
                    onChange={handleTextEdit}
                    onKeyDownCapture={(event) => saveTextEdit(event, index)}
                    onMouseLeave={() => saveTextOnExit(index)}
                    value={ activeId === `school-${index}` ? editText : education.school }
                    size={ activeId === `school-${index}` ? Math.max(editText.length, education.school.length) : education.school ? education.school.length : 20 }/>
                </div>

              <div className='pr-2 group' onMouseEnter={(event) => loadEditText(event, education.location)} id={`location-${index}`}>
                <span className='group-hover:hidden'>
                  { education.location }
                </span>
                <input
                  type="text"
                  className='text-right hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={ activeId === `location-${index}` ? editText : education.location }
                  size={ activeId === `location-${index}` ? editText.length : 20 }/>
              </div>
            </div>

            <div className='italic flex text-[15px]'>
              <div className='group' onMouseEnter={(event) => loadEditText(event, education.degree)} id={`degree-${index}`}>
                <span className='group-hover:hidden'>
                { education.degree ? education.degree : 'Bachelor of ...' }
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={ activeId === `degree-${index}` ? editText : education.degree }
                  size={ activeId === `degree-${index}` ? Math.max(editText.length, education.degree.length) : education.degree ? education.degree.length : 20 }/>
              </div>
              <span className={`${education.gpa ? '' : 'hidden'} px-1`}>
                - GPA:
              </span>
              <div className='group' onMouseEnter={(event) => loadEditText(event, education.gpa ? education.gpa : '')} id={`gpa-${index}`}>
                <span className='group-hover:hidden'>
                  { education.gpa }
                </span>
                <input
                  type="text"
                  className='hidden group-hover:flex'
                  onChange={handleTextEdit}
                  onKeyDownCapture={(event) => saveTextEdit(event, index)}
                  onMouseLeave={() => saveTextOnExit(index)}
                  value={ activeId === `gpa-${index}` ? editText : education.gpa}
                  size={ education.gpa ? education.gpa.length : 4 }/>
              </div>
              
              <div className='flex-1'/>

              <div className='pr-2 flex flex-row'>
                <div className='group' onMouseEnter={(event) => loadEditText(event, education.startDate)} id={`startDate-${index}`}>
                  <span className='group-hover:hidden'>
                    { education.startDate ? education.startDate : 'Start Date' }
                  </span> 
                  <input
                    type="text"
                    className='hidden group-hover:flex flex-shrink'
                    onChange={handleTextEdit}
                    onKeyDownCapture={(event) => saveTextEdit(event, index)}
                    onMouseLeave={() => saveTextOnExit(index)}
                    value={ activeId === `startDate-${index}` ? editText : education.startDate }
                    size={ activeId === `startDate-${index}` ? Math.max(editText.length, education.startDate.length) : education.startDate ? education.startDate.length : 5 }/>
                </div>

                <span className='px-2'>
                  -
                </span>

                <div className='group' onMouseEnter={(event) => loadEditText(event, education.endDate ? education.endDate : '')} id={`endDate-${index}`}>
                  <span className='group-hover:hidden'>
                    { education.endDate ? education.endDate : 'TBD' }
                  </span>
                  <input
                    type="text"
                    className='hidden group-hover:flex'
                    onChange={handleTextEdit}
                    onKeyDownCapture={(event) => saveTextEdit(event, index)}
                    onMouseLeave={() => saveTextOnExit(index)}
                    value={ activeId === `endDate-${index}` ? editText : education.endDate }
                    size={ activeId === `endDate-${index}` ? Math.max(editText.length, education.endDate ? education.endDate.length : 5) : education.endDate ? education.endDate.length : 5 }/>
                </div>
              </div>
            </div>
            <div className='group text-[14px] ml-9' onMouseEnter={(event) => loadEditText(event, education.other.join('\n'))} id={`sub-${index}`}>
              <ul className={`${education.other.length === 0 ? 'hidden' : 'block'} list-outside list-disc group-hover:hidden`}>
                {
                  education.other.map((other, index) => (
                    <li key={index}>
                      { other }
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
                value={ activeId === `sub-${index}` ? editText : education.other.join('\n') } />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default EducationBlock;
