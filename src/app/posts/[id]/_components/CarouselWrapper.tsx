"use client";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import React from "react";

const CarouselWrapper = () => {
	return (
		<Carousel withIndicators height={200} styles={{ indicators: { marginTop: "-50px" } }}>
			<Carousel.Slide>
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "auto", height: "100%", objectFit: "cover"  }}
					alt={"event"}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					src={"/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "auto", height: "100%", objectFit: "cover"  }}
					alt={"event"}
				/>
			</Carousel.Slide>
		</Carousel>
	);
};

export default CarouselWrapper;
