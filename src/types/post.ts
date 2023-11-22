import { Prisma } from "@prisma/client";

export type PostFormType = "normal_post" | "news" | "qna" | "event";

export type PostIncludeAll = Prisma.PostGetPayload<{
	include: {
		club: true;
		owner: true;
		likes: true;
		comments: true;
	};
}>;
