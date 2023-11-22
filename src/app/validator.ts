import { z } from "zod";

export const createEventSchema = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1),
	// bannerUrl: z.string().url(),
	location: z.string().min(1).max(255),
	startDate: z.string().transform((str) => new Date(str)),
	endDate: z.string().transform((str) => new Date(str)),
	startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
	endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
	clubId: z.number(),
});
