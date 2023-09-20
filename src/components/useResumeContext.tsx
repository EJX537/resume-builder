import { useContext } from 'react';
import { ResumeContext } from './resumeContextProvider';
import { ResumeState } from './resumeTypes';

export const useResume = (): ResumeState => {
  const resumeState = useContext(ResumeContext);
  if (resumeState === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return resumeState;
};
