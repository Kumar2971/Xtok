import I18n from "./i18n";

export function translate(key: any) {
  return key ? I18n.t(key) : undefined || "";
}
