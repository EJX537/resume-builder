import { useState } from 'react';
import { useResume } from '../../useResumeContext';

const Name = () => {
  const { name, setName } = useResume();
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
    setName(editText);
    return;
  };

  const saveTextOnExit = () => {
    setName(editText);
    return;
  };


  return (
    <div className="justify-center flex text-[32.5px] font-medium">
      <div className='group' onMouseEnter={(event) => loadEditText(event, name)} id={'name'}>
        <span className='group-hover:hidden font-semibold'>
          {name ? name : 'Insert Name'}
        </span>
        <input
          type="text"
          className='hidden group-hover:flex'
          autoComplete="off"
          onChange={handleTextEdit}
          onKeyDownCapture={(event) => saveTextEdit(event)}
          onMouseLeave={() => saveTextOnExit()}
          value={activeId === 'name' ? editText : name}
          size={activeId === 'name' ? Math.max(editText.length, name.length) - 1 : name ? name.length : 20} />
      </div>
    </div>
  );
};

export default Name;
