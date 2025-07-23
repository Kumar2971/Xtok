//@ts-ignore
import I18n from "i18n-js";

// @ts-ignore
import ar from "./locales/ar";
import en from "./locales/en";

I18n.fallbacks = true;
I18n.isRTL = true;
I18n.translations = {
  ar,
  en,
};

export default I18n;
