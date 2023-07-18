import {useCallback, useEffect, useRef, useState} from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './imageSlider.css'
interface IImageSlider {
  slides: {url: string; title: string}[]
  // parentWidth :number
}

// const slideStyles:any = {
//   width: "100%",
//   height: "100%",
//   borderRadius: "10px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// };

// const rightArrowStyles:any = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   right: "32px",
//   fontSize: "18px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const leftArrowStyles:any = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   left: "32px",
//   fontSize: "18px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const sliderStyles:any = {
//   position: "relative",
//   height: "100%",
// };

// const dotsContainerStyles:any = {
//   display: "flex",
//   justifyContent: "center",
// };

// const dotStyle:any = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "14px",
// };

// const slidesContainerStyles:any = {
//   display: "flex",
//   height: "100%",
//   transition: "transform ease-out 0.3s",
// };

// const slidesContainerOverflowStyles:any = {
//   overflow: "hidden",
//   height: "100%",
// };

const ImageSlider = ({slides}: IImageSlider) => {
  // const timerRef :any= useRef(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const goToPrevious = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };
  // const goToNext = useCallback(() => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // }, [currentIndex, slides]);
  // const goToSlide = (slideIndex:number) => {
  //   setCurrentIndex(slideIndex);
  // };
  // const getSlideStylesWithBackground = (slideIndex:number) => ({
  //   ...slideStyles,
  //   backgroundImage: `url(${slides[slideIndex].url})`,
  //   width: `${parentWidth}px`,
  // });
  // const getSlidesContainerStylesWithWidth = () => ({
  //   ...slidesContainerStyles,
  //   width: parentWidth * slides.length,
  //   transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  // });

  // useEffect(() => {
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //   }
  //   timerRef.current= setTimeout(() => {
  //     goToNext();
  //   }, 2000);

  //   return () => clearTimeout(timerRef.current);
  // }, [goToNext]);

  return (
    <ImageGallery
      items={slides}
      showThumbnails={false}
      showPlayButton={false}
      showBullets={true}
      showFullscreenButton={false}
      renderItem={(item: any) => (
        <div
          style={{
            backgroundImage: `url(${item.original})`,
            width: '100%',
            height: '400px',
            borderRadius: '10px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* <img src={item.original} style={{height: '400px', width: '100%', borderRadius: '10px'}} /> */}
        </div>
      )}
    />
  )
}

export default ImageSlider
