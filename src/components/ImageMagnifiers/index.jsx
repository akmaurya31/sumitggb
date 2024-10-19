import ReactImageMagnify from 'react-image-magnify';
import './ImageMagnifiers.scss';
import ReactImageZoom from 'react-image-zoom';
import ImageZoom from "./ImageZoom"

import asmall from "../../assets/aashirvad300.jpg";
import alarge from "../../assets/aashirvad-large.jpg";


export default function ImageMagnifiers({ srcImage }) {

	// console.log("srcImage",srcImage)

	return (
		<>

			{/* 1. ===================================================== */}
			<ReactImageMagnify
				{...{
					smallImage: {
						alt: 'Small Image',
						isFluidWidth: true,
						src: srcImage,
					},
					largeImage: {
						// src: `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`,
						src: srcImage,
						// width: 836,
						// height: 1100,
						width: 1200,
						height: 1800
					},
					enlargedImageContainerStyle: { background: 'white', zIndex: 9 },
					enlargedImageClassName: "large-image-style"
				}}
			/>


			{/* Old working  */}

			{/* <ThumbnailSlider
                          images={[
                            {
                              id: 1,
                              // src: `https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/car_4.png`,
                              // src: `${asmall}`,
                              // zoomSrc: `${alarge}`,
                              // src: `https://malaman.github.io/react-image-zoom/example/1.jpg`,
                              // zoomSrc: `https://malaman.github.io/react-image-zoom/example/1.jpg`,
                              src: `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`,
                              zoomSrc: `${process.env.REACT_APP_PRODUCTS_URL}${product_result?.data[0]?.barcode}.jpg`,
                            },

                          ]}
                        /> */}

		</>
	);
}
