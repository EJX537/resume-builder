import { useState } from 'react';
import { useResume } from '../../useResumeContext';

const Location = () => {
  const { location, setLocation, setMenu } = useResume();
  const [editText, setText] = useState('');
  const [activeId, setActiveId] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement>, text: string) => {
    setActiveId(event.currentTarget.id);
    setText(text);
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const saveTextEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    setLocation(editText);
    return;
  };

  const saveTextOnExit = () => {
    setLocation(editText);
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
    <div className="flex justify-center text-[13.5px]" onContextMenu={handleRightClick}>
      <div className='group'>
        <div className='group-hover:hidden' onMouseEnter={(event) => loadEditText(event, location)} id='location'>
          {location}
        </div>
        <input
          type="text"
          className='hidden group-hover:flex'
          onChange={handleTextEdit}
          onKeyDownCapture={(event) => saveTextEdit(event)}
          onMouseLeave={() => saveTextOnExit()}
          value={activeId === 'location' ? editText : location}
          size={activeId === 'location' ? Math.max(editText.length, location.length) : location ? location.length : 20} />

      </div>
    </div>
  );
};

export default Location;
