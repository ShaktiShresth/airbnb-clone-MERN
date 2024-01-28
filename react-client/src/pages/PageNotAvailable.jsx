const PageNotAvailable = () => {
  return (
    <div className="px-4 py-10 lg:px-20">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-3xl">Page Not Found</h1>
        <p className="text-slate-500">
          The page you are trying to access is not available.
        </p>
        <p className="text-red-500 text-2xl">404 Error</p>
      </div>
    </div>
  );
};

export default PageNotAvailable;
