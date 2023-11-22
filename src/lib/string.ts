import crypto from "crypto";

const KU_PUBLIC_KEY = process.env.KU_PUBLIC_KEY?.replace(/\\n/gm, "\n");

export function encodeString(data: string): string {
	return crypto
		.publicEncrypt(
			{
				key: KU_PUBLIC_KEY as string,
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
			},
			Buffer.from(data, "utf8"),
		)
		.toString("base64");
}
