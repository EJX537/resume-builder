import ResumeProvider from './components/resumeContextProvider';
import Resume from './components/Resume/resume';
import PdfGenerator from './components/Resume/component/pdfGenerator';

import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <main className="flex h-screen w-screen flex-col justify-normal">
        <ResumeProvider>
          <Resume />
          <PdfGenerator />
        </ResumeProvider>
      </main>
    </Router>
  );
}

export default App;
