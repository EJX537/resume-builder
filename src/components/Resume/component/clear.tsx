const Clear = () => {
  const handleClick = () => {
    localStorage.removeItem('resumeBuilder');
    window.location.reload();
  };

  return (
    <button className='border border-black rounded-lg p-2 font-bold text-red-950 w-1/2' onClick={handleClick}>
      Clear
    </button>
  );
};

export default Clear;
