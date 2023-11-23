import { PostType } from "@prisma/client";

export const postTypeToColorMap = (type: PostType) => {
	switch (type) {
		case PostType.NORMAL_POST:
			return "bg-[#28C3D7]";
		case PostType.NEWS:
			return "bg-[#03A96B]";
		case PostType.QA:
			return "bg-[#F2914B]";
	}
};

export const postTypeToLabelPost = (type: PostType) => {
	switch (type) {
		case PostType.NORMAL_POST:
			return "โพสต์ทั่วไป";
		case PostType.NEWS:
			return "news";
		case PostType.QA:
			return "Q&A";
	}
};
