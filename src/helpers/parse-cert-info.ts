import {TagTranslation} from "./tag-translation";
import {TranslatedInfo} from "./translated-info";
import {oids} from "../constants";


export function parseCertInfo(tags: TagTranslation[], infoString: string): TranslatedInfo[] | null {
	let result: TranslatedInfo[] | null = null;

	const regExpMatchArr: RegExpMatchArray | null = infoString.match(/([а-яА-Яa-zA-Z0-9\.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);

	if (!!regExpMatchArr) {
		result = regExpMatchArr.map((group: string) => {
			const parts: RegExpMatchArray | null = group.match(/^([а-яА-Яa-zA-Z0-9\.]+)=(.+?),?$/);
			let title: string | null = parts && parts[1];
			let description: string | null = parts && parts[2];
			let translated: boolean = false;
			let oidTitle: RegExpMatchArray | null;

			if (!!title && /^OID./.test(title)) {
				oidTitle = title.match(/^OID\.(.*)/);

				if (!!oidTitle && !!oidTitle[1]) {
					const tempTitle: string = oids[oidTitle[1]];

					if (!!tempTitle) {
						title = tempTitle;
					}
				}
			}

			description = !!description ? description.replace(/^"(.*)"/, '$1') : null;
			description = !!description ? description.replace(/"{2}/g, '"') : null;

			tags.some((tagTranslation: TagTranslation) => {
				return tagTranslation.possibleNames.some((possibleName: string) => {
					const match: boolean = possibleName === title;

					if (match) {
						title = tagTranslation.translation;
						translated = true;
					}

					return match;
				});
			});

			return new TranslatedInfo(
				title,
				description,
				translated
			);
		});
	}

	return result;
}
