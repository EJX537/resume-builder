
import { jsPDF } from 'jspdf';
import { useResume } from '../../useResumeContext';

const PdfGenerator = () => {

  const { name } = useResume();

  const handleGenerate = () => {
    const element = document.getElementById('resume-root');
    if (!element) return;
  
    // Create a new jsPDF instance
    const pdf = new jsPDF('portrait', 'pt', 'letter');
  
    // Convert the HTML content to a PDF
    pdf.html(element.outerHTML, {
      html2canvas: {
        scale: 0.7
      },
      callback: (pdf) => {
        const nameSpace = name.split(' ');
        pdf.save(nameSpace.join('_') + '_Resume.pdf');
      }
    });
  };

  return (
    <button className='border border-black rounded-lg p-2 font-bold text-red-950 w-1/2' onClick={handleGenerate}>
      Generate PDF
    </button>
  );
};

export default PdfGenerator;
