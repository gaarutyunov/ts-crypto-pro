import { TranslatedInfo } from "./translated-info";
import { oids } from "../constants";
export function parseCertInfo(tags, infoString) {
    var result = null;
    var regExpMatchArr = infoString.match(/([а-яА-Яa-zA-Z0-9\.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);
    if (!!regExpMatchArr) {
        result = regExpMatchArr.map(function (group) {
            var parts = group.match(/^([а-яА-Яa-zA-Z0-9\.]+)=(.+?),?$/);
            var title = parts && parts[1];
            var description = parts && parts[2];
            var translated = false;
            var oidTitle;
            if (!!title && /^OID./.test(title)) {
                oidTitle = title.match(/^OID\.(.*)/);
                if (!!oidTitle && !!oidTitle[1]) {
                    var tempTitle = oids[oidTitle[1]];
                    if (!!tempTitle) {
                        title = tempTitle;
                    }
                }
            }
            description = !!description ? description.replace(/^"(.*)"/, "$1") : null;
            description = !!description ? description.replace(/"{2}/g, '') : null;
            tags.some(function (tagTranslation) {
                return tagTranslation.possibleNames.some(function (possibleName) {
                    var match = possibleName === title;
                    if (match) {
                        title = tagTranslation.translation;
                        translated = true;
                    }
                    return match;
                });
            });
            return new TranslatedInfo(title, description, translated);
        });
    }
    return result;
}
//# sourceMappingURL=parse-cert-info.js.map