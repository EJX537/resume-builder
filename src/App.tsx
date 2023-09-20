import ResumeProvider from './components/resumeContextProvider';
import Resume from './components/Resume/resume';
import { handleGenerate } from './components/Resume/resume';
import MenuBlock from './components/Resume/component/menu';
function App() {
  return (
    <main className="flex h-screen w-screen flex-col justify-normal xl:mx-10">
      <ResumeProvider>
        <Resume/>
        <button className='border border-black rounded-lg p-2 mt-4 font-bold text-red-950' onClick={handleGenerate}>
          Generate PDF
        </button>
        <MenuBlock />
      </ResumeProvider>
    </main>
  );
}

export default App;
