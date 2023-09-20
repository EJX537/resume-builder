import { useResume } from '../../useResumeContext';

const sortByBlockOrNumberSuffix = (arr: string[]): string[] => {
  arr.sort((a: string, b: string) => {
    // Extract the suffix (either "Block" or a number)
    const suffixA = a.match(/Block|\d+/)?.[0];
    const suffixB = b.match(/Block|\d+/)?.[0];

    if (suffixA === 'Block' && suffixB === 'Block') {
      // Both have "Block" as a suffix, no numeric comparison needed
      return a.localeCompare(b);
    } else if (suffixA === 'Block') {
      return -1; // 'a' comes before 'b' (Block takes precedence)
    } else if (suffixB === 'Block') {
      return 1; // 'b' comes before 'a' (Block takes precedence)
    } else {
      // Both have numeric suffixes, compare them numerically
      const numA = parseInt(suffixA || '0', 10);
      const numB = parseInt(suffixB || '0', 10);
      return numA - numB;
    }
  });
  return arr;
};

const MenuBlock = () => {
  const { menu, setMenu } = useResume();
  return (
    <div className={`${ menu.clickedElements.length ? 'flex' : 'hidden' } absolute top-0 left-0 h-screen w-screen`} onClick={() => setMenu({clickedElements: [], position: []})}>
      <ul className='absolute bg-slate-400 p-1 rounded-md divide-y divide-black' style={{ left: menu.position[0], top: menu.position[1] }}>
        {
          sortByBlockOrNumberSuffix(menu.clickedElements).map((element, index) => (
            <li key={index} className='w-full h-full'>
              <button className='w-full h-full text-left'>
                {element}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default MenuBlock;
