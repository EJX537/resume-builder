import ResumeProvider from './components/resumeContextProvider';
import Resume from './components/Resume/resume';
import PdfGenerator from './components/Resume/component/pdfGenerator';



function App() {
  return (
    <main className="flex h-screen w-screen flex-col justify-normal xl:mx-10">
      <ResumeProvider>
        <Resume />
        <PdfGenerator />
      </ResumeProvider>
    </main>
  );
}

export default App;
