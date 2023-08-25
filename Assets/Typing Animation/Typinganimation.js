  // Typing animation
  const text = "Your Dream Online Market Place";
  const delay = 280;
  const infinite = true;

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex <= text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      // ADD THIS CHECK
      setCurrentIndex(0);
      setCurrentText("");
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);


  <div className=" absolute top-[-9rem] flex flex-col justify-center w-full  mb-24 sm:mb-10">
  <h1 className=" mb-4 w-12/12 sm:w-9/12  self-center text-2xl text-center font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl ">
    {`OneDay.ae ` + currentText}
  </h1>
</div>