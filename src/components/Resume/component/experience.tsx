import { Experience } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';

const ExperienceBlock = () => {
  const { experiences } = useResume();
  return (
    <div className='w-full flex flex-col font-serif'>
      <div className={`${experiences.length ? '': 'hidden'} w-full text-[19.5px] border-b-2 border-black`}>
        Experience
      </div>
      {
        experiences.map((experience: Experience, index) => (
          <div key={index} className='ml-3 my-1'>
            <div className='flex justify-between text-[16.5px]'>
              <span className='font-semibold'>
                {experience.title}
              </span>
              <span className='pr-2'>
                { experience.startDate }
                 <span className='px-2'> - </span>
                { experience.endDate ? experience.endDate : 'Now' }
              </span>
            </div>
            <div className='italic flex text-[15px]'>
              <span>
                { experience.company }
              </span>
              <div className='flex-1' />
              <span className='pr-2'>
                { experience.location ? experience.location : '' }
              </span>
            </div>
            <ul className='ml-9 text-[14px] list-outside list-disc'>
              {
                experience.bulletPoints.map((b, index) => (
                  <li key={index}>
                    { b }
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default ExperienceBlock;
