"use client";
import { Autocomplete, ComboboxItem } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface AutocompleteWrapperProps {
	data: ComboboxItem[];
}

const AutocompleteWrapper: React.FC<AutocompleteWrapperProps> = ({ data }) => {
  const router = useRouter()

	return (
		<div className="w-full rounded-full">
			<Autocomplete
				leftSection={<Image src={"/search.svg"} width={16} height={16} alt={""} />}
				placeholder="ค้นหาชมรมและคอมมิวนิตี้ของคุณ"
				data={data}
        onOptionSubmit={(value) => router.push(`/clubs/${value}`)}
        styles={{
          input: { borderRadius: '9999px'}
        }}
			/>
		</div>
	);
};

export default AutocompleteWrapper;
