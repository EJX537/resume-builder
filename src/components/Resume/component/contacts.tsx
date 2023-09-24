import { useState } from 'react';
import { useResume } from '../../useResumeContext';

const classifyAndRenderContact = (contact: string, index: number) => {
  if (contact.match(/^\d{3}-\d{3}-\d{4}$/)) {
    return (
      <a href={`tel:${contact}`} className="px-1" key={index} id={`contact-${index}`}>
        {contact}
      </a>
    );
  } else if (contact.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    return (
      <a href={`mailto:${contact}`} className="px-1" key={index} id={`contact-${index}`}>
        {contact}
      </a>
    );
  } else if (contact.match(/^([a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S*)?)$/)) {
    return (
      <a href={'https://' + contact} className="px-1" target="_blank" key={index} id={`contact-${index}`}>
        {contact}
      </a>
    );
  } else {
    return (
      <span className='px-1' key={index} id={`contact-${index}`}>
        {contact}
      </span>
    );
  }
};

const Contacts = () => {
  const { contacts, setContacts, setMenu } = useResume();
  const [ editText, setText ] = useState('');
  const [ activeId, setActiveId ] = useState('');

  const loadEditText = (event: React.MouseEvent<HTMLDivElement>, text: string) => {
    setActiveId(event.currentTarget.id);
    setText(text);
  };

  const handleTextEdit = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const saveTextEdit = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return;
    setContacts(editText.split('|'));
    return;
  };

  const saveTextOnExit = () => {
    setContacts(editText.split('|'));
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
    <div className="text-[12.5px] font-mono" id='contact-Block' onContextMenu={handleRightClick}>
      <div className='group' onMouseEnter={(event) => loadEditText(event, contacts.join('|'))} id={'contacts'}>
        <div className='group-hover:hidden divide-x divide-black flex-row flex-wrap flex justify-center'>
          {
            contacts.map((contact: string, index: number) => (
              classifyAndRenderContact(contact, index)
            ))
          }
        </div>
        <textarea
          className='hidden group-hover:flex w-full h-fit resize-none overflow-hidden whitespace-nowrap'
          onChange={handleTextEdit}
          onKeyDownCapture={(event) => saveTextEdit(event)}
          onMouseLeave={() => saveTextOnExit()}
          rows={1}
          value={activeId === 'contacts' ? editText : contacts.join('|')} />
      </div>
    </div>
  );
};

export default Contacts;
