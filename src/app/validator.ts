import { z } from "zod";

export const createEventSchema = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1),
	imageUrl: z.string().url(),
	location: z.string().min(1).max(255),
	startDate: z
		.string()
		.or(z.date())
		.transform((str) => new Date(str)),
	endDate: z
		.string()
		.or(z.date())
		.transform((str) => new Date(str)),
	startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
	endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
	clubId: z.number(),
});

export const createPostSchema = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1),
	imageUrl: z.string().url(),
	clubId: z.number(),
});
