"use client";

type MemberBoxProps = {
	name: string;
};

export default function MemberBox({ name }: MemberBoxProps) {
	return (
		<p className="border rounded-[20px] p-[15px]" style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.10)" }}>
			{name}
		</p>
	);
}
