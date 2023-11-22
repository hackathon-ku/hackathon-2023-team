"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { createEventSchema } from "@/app/validator";

const eventFormSchema = createEventSchema.omit({ clubId: true });
type EventForm = z.infer<typeof eventFormSchema>;

type EventFormProps = {
	clubId: number;
};

export default function EventForm({ clubId }: EventFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EventForm>({
		resolver: zodResolver(eventFormSchema),
	});
	const onSubmit: SubmitHandler<EventForm> = async (data) => {
		try {
			await axios.post("/api/events", { ...data, clubId });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Title..." {...register("title")} />
			<input type="text" placeholder="Content..." {...register("content")} />
			<input type="text" placeholder="Location..." {...register("location")} />
			<input type="date" {...register("startDate")} />
			<input type="date" {...register("endDate")} />
			<input type="time" {...register("startTime")} />
			<input type="time" {...register("endTime")} />
			<input type="file" accept="" />
			<button type="submit">Create</button>
		</form>
	);
}
