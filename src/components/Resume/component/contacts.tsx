import { useResume } from '../../useResumeContext';

const classifyAndRenderContact = (contact: string, index: number) => {
  if (contact.match(/^\d{3}-\d{3}-\d{4}$/)) {
    return (
      <a href={`tel:${contact}`} className="px-1" key={index}>
        {contact}
      </a>
    );
  } else if (contact.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    return (
      <a href={`mailto:${contact}`} className="px-1" key={index}>
        {contact}
      </a>
    );
  } else if (contact.match(/^([a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S*)?)$/)) {
    return (
      <a href={'https://' + contact} className="px-1" target="_blank" key={index}>
        {contact}
      </a>
    );
  } else {
    return (
      <span className='px-1' key={index} >
        {contact}
      </span>
    );
  }
};

const Contacts = () => {
  const { contacts } = useResume();

  return (
    <div className="divide-x divide-black text-[12.5px] justify-center flex font-mono flex-row flex-wrap">
      {
        contacts.map((contact: string, index: number) => (
          classifyAndRenderContact(contact, index)
        ))
      }
    </div>
  );
};

export default Contacts;
