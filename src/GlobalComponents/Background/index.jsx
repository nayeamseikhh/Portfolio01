const Background = ({ children }) => {
  return (
    <div className="h-screen w-full bg-[url('./assets/Background/code.jpg')] bg-cover bg-center bg-no-repeat !top-0">
      {children}
    </div>
  );
};

export default Background;
