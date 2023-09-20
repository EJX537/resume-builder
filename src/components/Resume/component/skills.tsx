import { useResume } from '../../useResumeContext';

const SkillBlock = () => {
  const { skills } = useResume();

  return (
    <div className='w-full flex flex-col'>
      <div className={`${skills.length ? '': 'hidden'} w-full text-[19.5px] border-b-2 border-black mb-2`}>
        Skills
      </div>
      {
        skills.map((skill, index) => (
          <div key={index} className='text-[15px] ml-4'>
            <span className='font-semibold'>
              { skill.type }
            </span>
            <span>
              { ': ' + skill.skills.join(', ') }
            </span>
          </div>
        ))
      }
    </div>
  );
};


export default SkillBlock;
