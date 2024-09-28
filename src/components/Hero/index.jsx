import { TypeAnimation } from "react-type-animation";
import SimpleImageSlider from "react-simple-image-slider";

const slideImages = [
  {
    url: '/images/mokes/moke2.png',
  },
  {
    url: '/images/mokes/moke8.png',
  },
  {
    url: '/images/mokes/moke5.png',
  },
];

const LandingPage = () => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/fintrack_v1.0.0.apk';
    link.download = 'fintrack_v1.0.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center mt-10 md:mt-20 px-4 md:px-8">
      <div className="w-full md:w-1/2 max-w-lg mx-auto md:mx-0 md:ml-12 mb-8 md:mb-0">
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 text-center md:text-left leading-tight"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Take Control with Fintrack
        </h1>
        
        <TypeAnimation
          sequence={[
            'Stay ahead of your finances with your money manager!',
            1000,
            'Track, Save, and Grow Fintrack Makes Managing Money Simple!',
            1000,
            'Fintrack puts you in charge of your financial future!',
            1000,
            'Smarter tracking, better results, discover Fintrack today!',
            1000,
          ]}
          speed={50}
          style={{ fontSize: '16px', fontFamily: '"Montserrat", sans-serif' }}
          repeat={Infinity}
          className="text-center md:text-left"
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 sm:gap-10 mt-6 md:mt-10">
          <button onClick={handleDownload} className="w-auto max-w-[200px] px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-green-300 text-gray-900 text-sm sm:text-base font-semibold rounded-full shadow-lg hover:bg-green-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" className="mr-2 sm:mr-3 flex-shrink-0">
              <path d="M 7.5 1 C 7.372 1 7.2439844 1.0489844 7.1464844 1.1464844 C 6.9514844 1.3414844 6.9514844 1.6585156 7.1464844 1.8535156 L 8.4570312 3.1640625 C 6.9691108 4.2559188 6 6.0127547 6 8 L 18 8 C 18 6.0127547 17.030889 4.2559188 15.542969 3.1640625 L 16.853516 1.8535156 C 17.048516 1.6575156 17.048516 1.3424844 16.853516 1.1464844 C 16.658516 0.95148437 16.341484 0.95148438 16.146484 1.1464844 L 14.664062 2.6289062 C 13.860616 2.2295595 12.95819 2 12 2 C 11.04181 2 10.139384 2.2295595 9.3359375 2.6289062 L 7.8535156 1.1464844 C 7.7560156 1.0489844 7.628 1 7.5 1 z M 9 5 L 10 5 L 10 6 L 9 6 L 9 5 z M 14 5 L 15 5 L 15 6 L 14 6 L 14 5 z M 4 9 C 3.448 9 3 9.448 3 10 L 3 16 C 3 16.552 3.448 17 4 17 C 4.552 17 5 16.552 5 16 L 5 10 C 5 9.448 4.552 9 4 9 z M 6 9 L 6 17 C 6 17.552 6.448 18 7 18 L 8 18 L 8 21.5 C 8 22.328 8.672 23 9.5 23 C 10.328 23 11 22.328 11 21.5 L 11 18 L 13 18 L 13 21.5 C 13 22.328 13.672 23 14.5 23 C 15.328 23 16 22.328 16 21.5 L 16 18 L 17 18 C 17.552 18 18 17.552 18 17 L 18 9 L 6 9 z M 20 9 C 19.448 9 19 9.448 19 10 L 19 16 C 19 16.552 19.448 17 20 17 C 20.552 17 21 16.552 21 16 L 21 10 C 21 9.448 20.552 9 20 9 z"></path>
            </svg>
            <span className="whitespace-nowrap">Download</span>
          </button>

          <div className="flex flex-col items-center justify-center">
            <img 
              src="/eas-update.svg" 
              alt="Download QR Code" 
              className="w-20 h-20 md:w-24 md:h-24" 
            />
            <div className="flex items-center gap-2">
              <p className="mt-2 text-gray-600 text-center text-xs sm:text-sm font-semibold">
                If you don't want to download Fintrack, access through Expo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end md:-mt-32">
        <SimpleImageSlider
          width={380}
          height={600}
          images={slideImages}
          showNavs={true}
          bgColor="transparent"
          autoPlay={true}
        />
      </div>
    </div>
  );
};

export default LandingPage;
