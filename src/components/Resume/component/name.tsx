import { useResume } from '../../useResumeContext';

const Name = () => {
  const { name } = useResume();
  return (
    <div className="justify-center flex text-[32.5px] font-medium">
      { name }
    </div>
  );
};

export default Name;
