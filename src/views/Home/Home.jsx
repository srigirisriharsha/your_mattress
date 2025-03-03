import React, { useCallback, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import matricesimage1 from '../../assets/Images/matrices/Carousel1.jpg';
import matricesimage2 from '../../assets/Images/matrices/carousel2.jpeg';
import matricesimage3 from '../../assets/Images/matrices/carousel3.jpeg';
import Sections1 from './Sections/Sections1';
import TestimonialCarousel from './Sections/TestimonialCarousel';
import { useAuth } from '../../context/MainContext';
import OrdersHome from './Sections/OrdersHome';
import Bestsellers from './Sections/Bestsellers';
import { getProductInOrderById } from '../../services/shop/shopservice';
import { demoProducts } from '../../components/CustomComponents/utils';
// import ResponsiveYouTubePlayer from './Sections/YouTubePlayer';
import matricesimage7 from '../../assets/Images/matrices/matresswake.avif';
import Section2 from './Sections/Section2';
import ShopByCategories from './Sections/ShopByCategories';
// import Section3 from './Sections/Section3';

const HomePage = () => {
  const imagesArray = [
    {
      imgsrc: matricesimage1,
      alt: 'carousel item 1',
    },
    {
      imgsrc: matricesimage3,
      alt: 'carousel item 2',
    },
    {
      imgsrc: matricesimage2,
      alt: 'carousel item 3',
    },
    {
      imgsrc: matricesimage7,
      alt: 'carousel item 1',
    },
    {
      imgsrc: matricesimage1,
      alt: 'carousel item 2',
    },
    {
      imgsrc: matricesimage1,
      alt: 'carousel item 3',
    },
  ];
  const { user } = useAuth();
  const [productsByUser, setProductsByUser] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const resp = await getProductInOrderById(user);
      if (resp && resp?.data) {
        if (resp?.data?.success) {
          let cartData = resp?.data?.data || [];
          cartData = cartData.map((f) => {
            const obj = demoProducts?.find((e) => e?.id === f?.product_id);
            return {
              demoProductObj: obj ? { ...obj } : {},
              cartDataObj: { ...f },
            };
          });
          setProductsByUser(cartData);
        } else {
          setProductsByUser([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Carousel Component */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={8000}
        stopOnHover
        useKeyboardArrows
        transitionTime={2000}
        axis="horizontal"
        swipeable
        emulateTouch
        dynamicHeight={false}
      >
        {imagesArray?.map((e, i) => {
          return (
            <div style={{ height: '250px' }} key={i}>
              <img
                src={e.imgsrc}
                alt={e.alt}
                style={{ height: '100%' }} // Ensures the image fills the height
                className="object-fill md:object-cover "
              />
            </div>
          );
        })}
      </Carousel>
      {/* <Section3 /> */}
      <Sections1 />
      <Bestsellers />
      <div>
        <ShopByCategories />
      </div>
      <Section2 />
      {/* <div>
        <ResponsiveYouTubePlayer />
      </div> */}
      {/* {window?.innerWidth > 767 && <Section3 />} */}

      {productsByUser?.length > 0 ? (
        <>
          <OrdersHome productsByUser={productsByUser} />
        </>
      ) : (
        <></>
      )}
      <TestimonialCarousel />
      {/* <FooterSection /> */}
      {/* <WeAreInLogos /> */}
    </div>
  );
};

export default HomePage;
