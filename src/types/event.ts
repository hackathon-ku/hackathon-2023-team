import { Prisma } from "@prisma/client";

export type EventIncludeAll = Prisma.EventGetPayload<{
	include: {
		club: true;
		owner: { select: { user: true } };
		likes: true;
		comments: { select: { id: true; message: true; createdAt: true; user: true } };
		followers: true;
	};
}>;
