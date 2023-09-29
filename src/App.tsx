import ResumeProvider from './components/resumeContextProvider';
import Resume from './components/Resume/resume';
import Clear from './components/Resume/component/clear';
import PdfGenerator from './components/Resume/component/pdfGenerator';

import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <main className="flex h-screen w-screen flex-col justify-normal bg-slate-100">
        <ResumeProvider>
          <Resume />
          <div className='flex w-full flex-row'>
            <Clear />
            <PdfGenerator />
          </div>
        </ResumeProvider>
      </main>
    </Router>
  );
}

export default App;
