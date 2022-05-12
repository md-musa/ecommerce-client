import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div className="relative -z-10">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
      >
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/51BNzDmnUqL._SX1500_.jpg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
