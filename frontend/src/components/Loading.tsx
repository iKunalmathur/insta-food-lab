import loadingGif from '@/assets/images/loading.gif';

export const Loading = () => {
  return (
    <div className="grid h-full place-content-center">
      <div className="space-y-2">
        <img
          className="mx-auto h-10 w-10"
          src={loadingGif}
          alt="loading"
        />
        <p>loading</p>
      </div>
    </div>
  );
};
