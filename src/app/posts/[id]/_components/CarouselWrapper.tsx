"use client";
import { Carousel } from "@mantine/carousel";
import { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";

const CarouselWrapper = ({ post }: { post: Post }) => {
	return (
		<Carousel withIndicators height={400} styles={{ indicators: { marginTop: "-50px" } }}>
			<Carousel.Slide>
				<Image
					src={post.imageUrl || "/event.png"}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto", objectFit: "cover", margin: 'auto ' }}
					alt={"event"}
				/>
			</Carousel.Slide>
		</Carousel>
	);
};

export default CarouselWrapper;
