import { Project } from '../../resumeTypes';
import { useResume } from '../../useResumeContext';


const ProjectBlock = () => {
  const { projects } = useResume();

  return (
    <div className='w-full flex flex-col' id='Project'>
      <div className={`${projects.length ? '': 'hidden'} w-full text-[19px] border-b-2 border-black`}>
        Projects
      </div>
      {
        projects.map((project: Project, index) => (
          <div key={index} className='ml-3 my-1'>
            <div className='flex text-[15px]'>
              <span className='font-semibold'>
                { project.name }
              </span>
              <span className='px-2'>
                |
              </span>
              <span className='italic'>
                { project.technologies.join(', ') }
              </span>
              <div className='flex-1'/>
              <span className='pr-2'>
                { project.date }
              </span>
            </div>
            <ul className='ml-9 text-[14px] list-outside list-disc'>
              {
                project.bulletPoints.map((b, index) => (
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

export default ProjectBlock;
