import React from 'react';
import material_feel_ortho from '../../assets/Images/matrisses_specifications/01_material_feel_ortho.svg';
import Cover_Material from '../../assets/Images/matrisses_specifications/04_cover_ortho.svg';
import zippered_external_cover from '../../assets/Images/matrisses_specifications/05_cover_type_ortho.svg';
import Mattress_Material from '../../assets/Images/matrisses_specifications/06_material_type_ortho.svg';
import Mattress_Usability from '../../assets/Images/matrisses_specifications/07_usability.svg';
const ProductSpecifications = ({ scrollDirection }) => {
  return (
    <div>
      <h1
        className="text-3xl md:text-3xl"
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
      >
        Specifications
      </h1>
      <div className="w-full  h-[1px] bg-blue-500 px-3 mt-1"></div>
      <div
        className={`${
          scrollDirection === 'up' ? 'animate-slideDown' : 'animate-slideUp'
        } flex flex-col md:flex-row mt-3`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 items-start p-10">
          {/* Mattress Feel */}
          <div className="flex items-start space-x-4">
            <img
              src={material_feel_ortho}
              alt="Mattress Feel"
              className="h-10 w-10"
            />
            <div>
              <h3 className="text-purple-700 font-semibold">Mattress Feel:</h3>
              <p className="text-black">Medium Firm</p>
            </div>
          </div>

          {/* Cover Material */}
          <div className="flex items-start space-x-4">
            <img
              src={Cover_Material}
              alt="Cover Material"
              className="h-10 w-10"
            />
            <div>
              <h3 className="text-purple-700 font-semibold">Cover Material:</h3>
              <p className="text-black">AeroTex Knit Fabric (Space Grey)</p>
            </div>
          </div>

          {/* Cover Type */}
          <div className="flex items-start space-x-4">
            <img
              src={zippered_external_cover}
              alt="Cover Type"
              className="h-10 w-10"
            />
            <div>
              <h3 className="text-purple-700 font-semibold">Cover Type:</h3>
              <p className="text-black">Removable zippered external cover</p>
            </div>
          </div>

          {/* Mattress Material */}
          <div className="flex items-start space-x-4">
            <img
              src={Mattress_Material}
              alt="Mattress Material"
              className="h-10 w-10"
            />
            <div>
              <h3 className="text-purple-700 font-semibold">
                Mattress Material:
              </h3>
              <p className="text-black">
                ShapeSense™ Ortho Memory Foam Responsive Support Foam High
                Density Foam Base Wakefit’s TruDensity™ technology ensures that
                every layer has 100% Pure Foam which won’t sag or lose its shape
                over time
              </p>
            </div>
          </div>

          {/* Mattress Usability */}
          <div className="flex items-start space-x-4">
            <img
              src={Mattress_Usability}
              alt="Mattress Usability"
              className="h-10 w-10"
            />
            <div>
              <h3 className="text-purple-700 font-semibold">
                Mattress Usability:
              </h3>
              <p className="text-black">
                Recommended to use with the memory foam side facing up, but can
                be used on either side.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
