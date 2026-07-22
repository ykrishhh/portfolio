export function HeroVideo() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video"
        src="/assets/videos/hero-main.mp4"
        aria-hidden="true"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video-wash"
        src="/assets/videos/hero-wash.mp4"
        aria-hidden="true"
      />
    </>
  );
}
