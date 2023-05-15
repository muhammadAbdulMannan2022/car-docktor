const Error = ({ error }) => {
  return (
    <div className="flex items-center justify-center flex-col-reverse">
      <h1 className="text-center text-4xl text-red-600 py-10">
        {error ? error : "some error"}
      </h1>
      <img
        src="https://i.ibb.co/YZnVGtQ/wepik-export-20230515055641fj-VV.png"
        alt=""
      />
    </div>
  );
};

export default Error;
