import SimpleImageSlider from "react-simple-image-slider";
import { TypeAnimation } from "react-type-animation";

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
  return (
    <div className="relative flex items-center mt-20">
      <div className="ml-12 w-1/2">
        <h1 
          className="text-5xl font-bold text-gray-800 mb-6" 
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Take Control with Fintrack
        </h1>
        
        <TypeAnimation
          sequence={[
            'Stay Ahead of Your Finances with Fintrack Your Personal Money Manager!',
            1000,
            'Track, Save, and Grow Fintrack Makes Managing Money Simple!',
            1000,
            'Take Control of Your Financial Future Fintrack Puts You in the Driver\'s Seat!',
            1000,
            'Smarter Financial Tracking, Better Results Discover Fintrack Today!',
            1000,
          ]}
          speed={50}
          style={{ fontSize: '18px', fontFamily: '"Montserrat", sans-serif' }}
          repeat={Infinity}
        />
        
        <div className="flex items-center gap-10 mt-10">
          <button className="px-8 py-3 bg-green-300 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24">
              <path d="M 7.5 1 C 7.372 1 7.2439844 1.0489844 7.1464844 1.1464844 C 6.9514844 1.3414844 6.9514844 1.6585156 7.1464844 1.8535156 L 8.4570312 3.1640625 C 6.9691108 4.2559188 6 6.0127547 6 8 L 18 8 C 18 6.0127547 17.030889 4.2559188 15.542969 3.1640625 L 16.853516 1.8535156 C 17.048516 1.6575156 17.048516 1.3424844 16.853516 1.1464844 C 16.658516 0.95148437 16.341484 0.95148438 16.146484 1.1464844 L 14.664062 2.6289062 C 13.860616 2.2295595 12.95819 2 12 2 C 11.04181 2 10.139384 2.2295595 9.3359375 2.6289062 L 7.8535156 1.1464844 C 7.7560156 1.0489844 7.628 1 7.5 1 z M 9 5 L 10 5 L 10 6 L 9 6 L 9 5 z M 14 5 L 15 5 L 15 6 L 14 6 L 14 5 z M 4 9 C 3.448 9 3 9.448 3 10 L 3 16 C 3 16.552 3.448 17 4 17 C 4.552 17 5 16.552 5 16 L 5 10 C 5 9.448 4.552 9 4 9 z M 6 9 L 6 17 C 6 17.552 6.448 18 7 18 L 8 18 L 8 21.5 C 8 22.328 8.672 23 9.5 23 C 10.328 23 11 22.328 11 21.5 L 11 18 L 13 18 L 13 21.5 C 13 22.328 13.672 23 14.5 23 C 15.328 23 16 22.328 16 21.5 L 16 18 L 17 18 C 17.552 18 18 17.552 18 17 L 18 9 L 6 9 z M 20 9 C 19.448 9 19 9.448 19 10 L 19 16 C 19 16.552 19.448 17 20 17 C 20.552 17 21 16.552 21 16 L 21 10 C 21 9.448 20.552 9 20 9 z"></path>
            </svg>
            Download for Android
          </button>

          <div className="flex flex-col items-center justify-center">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-android-link.com" 
              alt="Download QR Code" 
              className="w-24 h-24" 
            />
            <div className="flex items-center gap-2">
              <p className="mt-2 text-gray-600 text-center text-sm font-semibold">
                For Apple users, access through Expo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3 flex justify-center -mt-32 overflow-hidden">
        <SimpleImageSlider
          width={400}
          height={610}
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
