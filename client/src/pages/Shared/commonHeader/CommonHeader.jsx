const CommonHeader = ({ title }) => {
  return (
    <div
      className="hero h-auto mb-16"
      style={{
        backgroundImage: `url("https://i.ibb.co/ydCbDN3/5555.jpg")`,
      }}
    >
      <div className="w-full bg-gradient-to-r py-20 px-10 from-black to-transparent">
        <div className="">
          <h1 className="sm:text-4xl text-2xl">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
