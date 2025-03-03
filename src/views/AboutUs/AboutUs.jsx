import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import about_us_01 from '../../assets/Images/aboutus/about_us_01.jpg';
import about_us_02 from '../../assets/Images/aboutus/about_us_02.jpg';
import about_us_03 from '../../assets/Images/aboutus/about_us_03.jpg';
import hook from '../../assets/Images/guarrenty/hookImage.png';
import sissors from '../../assets/Images/guarrenty/sissorsImages.png';
import paymentDetails from '../../assets/Images/paymentDetails/paymentDetails.png';
import upi from '../../assets/Images/paymentDetails/upi.png';
import card from '../../assets/Images/paymentDetails/card.png';
import netBanking from '../../assets/Images/paymentDetails/netBanking.png';
import { FaClipboard } from 'react-icons/fa';
import ResponsiveYouTubePlayer from './AboutUsYouTubePlayer';

const AboutUsPage = () => {
  const imagesArray = [
    {
      imgsrc: about_us_01,
      alt: 'carousel item 1',
    },
    {
      imgsrc: about_us_02,
      alt: 'carousel item 2',
    },
    {
      imgsrc: about_us_03,
      alt: 'carousel item 3',
    },
  ];
  const [activeTab, setActiveTab] = useState('description');
  const [isCopied, setIsCopied] = useState(false);
  const upiId = 'relaxpromattresses@ybl';

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(upiId)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const tabs = [
    { name: 'Guarantee Policy', value: 'description' },
    { name: 'Payment Details', value: 'additionalInfo' },
    { name: 'Youtube', value: 'reviews' },
  ];
  return (
    <div className="animate-slideUp p-5 md:p-5 min-h-4/5">
      <div className="flex flex-col-reverse md:flex-row md:space-x-10 items-center">
        {/* Left text content */}
        <div className="mt-3 p-3 md:w-1/2 w-full md:p-3">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            About Us
          </h1>
          <div className="w-full h-[2px] bg-blue-500 my-2"></div>
          <p className="text-lg">
            We Are All Type Of Mattresses Manufacturer’s. We Design Mattresses
            Based On Your Budget And Your Requirements.
          </p>
          <br />
          <p className="text-lg">
            These mattresses are available at leading showrooms all over India,
            which has been possible due to an ever-increasing and satisfied base
            of customers. Due to its excellent quality and prompt services,
            Springwel mattresses are not only used but are repeatedly ordered by
            leading hotels, prominent personalities, corporate houses, and
            several government & private institutions in India.
          </p>
        </div>

        {/* Right carousel content */}
        <div className="md:w-1/2 w-full">
          <div className="bg-gray-200 ">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
              stopOnHover
              useKeyboardArrows
              transitionTime={2000}
              axis="horizontal"
              swipeable
              emulateTouch
              dynamicHeight={false}
            >
              {imagesArray?.map((e, i) => (
                <div key={i} className="h-[400px] md:min-h-4/5">
                  <img
                    src={e.imgsrc}
                    alt={e.alt}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <br />
      <div className="w-full">
        <div className="border-b border-gray-200">
          {/* Center the tabs */}
          <nav className="-mb-px flex justify-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
              ${
                activeTab === tab.value
                  ? 'border-blue-500 text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content for each tab */}
        <div className="mt-6">
          {activeTab === 'description' && (
            <div>
              <div className="bg-cream min-h-screen flex justify-center items-center p-6">
                <div className="max-w-3xl text-center">
                  {/* Main Heading */}
                  <h1 className="text-3xl text-gray-700 font-bold mt-4">
                    No guarantees, no warranties, and no returns.
                  </h1>
                  {/* Subheading */}
                  <p className="text-md text-red-600 mt-2">
                    We do not offer a guarantee, but we do not compromise on
                    quality.
                  </p>
                  {/* Sub-Title */}
                  <div>
                    <h2 className="text-2xl text-red-700 font-semibold mt-6 mb-4">
                      Reasons for not offering a guarantee:
                    </h2>
                    {/* Content Block */}
                    <div className="border border-gray-400 bg-white p-4 text-gray-800 rounded-md">
                      <ul className="text-left">
                        <li className="mb-2">
                          1) We do not intend to increase the mattress price for
                          the sake of providing a guarantee. Even if we
                          don&apos;t provide a guarantee, delivering a
                          guaranteed product is our target.
                        </li>
                        <li className="mb-2">
                          2) Due to the absence of our brand on the mattress,
                          some people may show another mattress and request a
                          return.
                        </li>
                        <li className="mb-2">
                          3) If there is any mistake in our customization or if
                          any damage occurs, we will accept the return, but you
                          will have to bear the transport charges. This is
                          because we do not charge additional transport fees.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl text-red-600 mt-6 font-semibold">
                      Even if we don’t provide a guarantee, we offer a
                      guaranteed product.
                    </p>
                    <br />
                    <p className="text-left">
                      We not only provide the best quality but also ensure that
                      there is no need for you to return the product. We offer
                      solutions to prevent any future problems with the
                      mattress. For example:
                    </p>
                    <div className="bg-white p-4 text-gray-800 rounded-md">
                      <ul className="text-left">
                        <li className="mb-2">
                          1) The mattress can get damaged if it gets wet or if
                          latex is exposed to the sun. So, we provide toppers
                          and protectors to protect the mattress from these
                          issues.
                        </li>
                        <li className="mb-2">
                          2) We also provide an elastic bedsheet to prevent
                          bacteria from entering the mattress.
                        </li>
                        <li className="mb-2">
                          3) We offer a special zip cover for bed protection.
                        </li>
                        <li className="mb-2">
                          4) Additionally, we give guidance on how to use the
                          mattress properly. If you take these precautions, the
                          mattress will not get damaged. We provide this with
                          full confidence in our quality.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl text-red-600 mt-6 font-semibold">
                      If we also provided a guarantee because you asked:
                    </p>
                    <br />
                    <div className="bg-white p-4 text-gray-800 rounded-md">
                      <ul className="text-left">
                        <li className="mb-2">
                          1) Either the price would have to be increased, or
                          some excuse would be made when processing a return.
                        </li>
                        <li className="mb-2">
                          2) To maintain all of this, we would need a dedicated
                          team, which would increase maintenance costs,
                          resulting in a situation where we would have to raise
                          prices.
                        </li>
                        <li className="mb-2">
                          3) Our mattresses are all heavy-weight, and
                          transportation costs are very high. For returns, the
                          transportation cost would become extremely high
                          (almost triple).
                        </li>
                      </ul>
                    </div>
                    <p className="text-left">
                      If any company can offer the following without increasing
                      prices, without making excuses (like saying the mattress
                      bent, got wet, was left in the sun, sank by half an inch,
                      or the bed got worn out), while also providing the same
                      level of care, quality, accessories, fixed pricing, and
                      service as we do, then feel free to buy from them without
                      any hesitation. This is only our humble request.
                    </p>
                  </div>
                  <div>
                    <p className="text-xl text-red-600 mt-6 font-semibold">
                      Why others can&apos;t provide accessories like we do:
                    </p>
                    <br />
                    <p className="text-left border border-gray-400 bg-white p-4 text-gray-800 rounded-md">
                      We are able to provide accessories with great quality
                      because our mattresses come without the costs associated
                      with promoters, advertisements, brand ambassadors,
                      marketing advisors, promotions, showrooms, decorative
                      packaging, or display boards. We have our own website/app,
                      our own telecallers, and minimal rents with small godown
                      maintenance due to our location in Tenali, along with low
                      expenses such as salaries. By cutting down all these
                      costs, we are able to offer accessories of high quality.
                    </p>
                  </div>
                  <div>
                    <br />
                    <p className="text-xl text-red-600 mt-6 font-bold text-center">
                      HANDLE WITH CARE
                    </p>
                    <br />
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                      <img
                        className="h-32 w-auto md:h-40 rounded-[10px]"
                        src={hook}
                        alt="hook"
                      />
                      <img
                        className="h-32 w-auto md:h-40 rounded-[10px]"
                        src={sissors}
                        alt="scissors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'additionalInfo' && (
            <section className="bg-cream min-h-screen flex flex-col justify-center items-center p-6">
              <h2 className="text-lg font-bold mb-4 text-left">Option-1:</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full ">
                <div className="flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    Our Payment Options
                  </h2>
                  <img
                    className="h-80 w-auto rounded-[10px] transition-transform duration-300 hover:scale-105"
                    src={paymentDetails}
                    alt="Illustration of payment options"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-medium mb-2">Payment with UPI</h3>
                  <img
                    className="h-68 w-auto rounded-[10px] transition-transform duration-300 hover:scale-105"
                    src={upi}
                    alt="UPI"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-medium mb-2">
                    Payment with Card
                  </h3>
                  <img
                    className="h-68 w-auto rounded-[10px] transition-transform duration-300 hover:scale-105"
                    src={card}
                    alt="Card"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-medium mb-2">
                    Payment with Net Banking
                  </h3>
                  <img
                    className="h-80 w-auto rounded-[10px] transition-transform duration-300 hover:scale-105"
                    src={netBanking}
                    alt="Net Banking"
                  />
                </div>
              </div>
              <br />
              <h2 className="text-lg font-bold mb-4 text-left">Option-2:</h2>

              <div className="max-w-3xl text-center">
                <ul className="text-left">
                  <li className="mb-2">
                    PAY WITH UPI ID: Copy the UPI ID below and select &apos;Pay
                    UPI ID&apos; in your Google Pay/PhonePe/Paytm app, then
                    paste the UPI ID there. This process is similar to making a
                    payment to the same phone number. Choose one of the two
                    accounts provided below to complete your payment; if one
                    doesn&apos;t work, please try the other.
                  </li>
                  <li className="mb-2">
                    SCAN QR CODE: Open Google Pay/PhonePe/Paytm or any similar
                    app and scan one of the QR codes provided. To avoid
                    transaction limits, scan the QR code directly without taking
                    a screenshot or uploading it.
                  </li>
                  <li className="mb-2">
                    NOTE: Both accounts are from our banks, and to prevent
                    fraud, we have kept all payment information on our website.
                    If you encounter any issues with one of the QR codes, UPI
                    IDs, or bank accounts, please choose a different option.
                  </li>
                </ul>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center space-x-2 p-4 bg-gray-100 rounded-lg shadow-md">
                  <span>Click on the UPI ID to copy:</span>
                  <span className="text-lg font-semibold">{upiId}</span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    aria-label="Copy UPI ID"
                  >
                    <FaClipboard />
                  </button>
                  {isCopied && (
                    <span className="text-green-500 text-sm ml-2">Copied!</span>
                  )}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-lg font-semibold">Youtube</h2>
              {/* <p>
                <YouTubeThumbnailGrid />.
              </p> */}
              <ResponsiveYouTubePlayer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
