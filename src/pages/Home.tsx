import AudioPlayer from "@/components/AudioPlayer";
const Home = () => {
  const isHome = true;
  return (
    <div className="h-screen flex items-center justify-center">
      <AudioPlayer isHome={isHome} />
    </div>
  );
};

export default Home;
