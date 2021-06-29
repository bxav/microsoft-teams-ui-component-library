"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStorybookTheme = exports.StorybookThemeProvider = void 0;
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_1 = __importDefault(require("react"));
var withTheme_1 = require("./withTheme");
var themes_1 = require("../themes");
var storybookT10s = {
    // The Farsi translations here are not certified and are intended for demonstration purposes only at this time.
    fa: {
        locale: "fa",
        hello: "سلام",
        "add lane": "خط اضافه کنید",
        "add board item": "مورد را به تخته اضافه کنید",
        "edit board item": "ویرایش آیتم",
        "board lane": "خط تخته",
        "board item": "مورد هیئت مدیره",
        "name lane": "این خط را نامگذاری کنید…",
        "lane pending": "خط جدید",
        "move lane further": "به سمت چپ حرکت کنید",
        "move lane nearer": "حرکت به سمت راست",
        delete: "حذف",
        "lane options": "گزینه های خط",
        "sort-order alphabetical descending": "A-Z",
        "sort-order alphabetical ascending": "Z-A",
        cancel: "لغو",
        confirm: "تایید",
        discard: "دور انداختن",
        save: "صرفه جویی",
        title: "عنوان",
        subtitle: "عنوان فرعی",
        "board item body": "شرح",
        "board item users": "کاربران با برچسب",
        "board item options": "گزینه های مورد هیئت مدیره",
        "on drag start board item": "شما آیتمی به نام {itemTitle} را در موقعیت {itemPosition} از {laneLength} در خط {laneTitle} بلند کرده اید.",
        "on drag update board item same lane": "شما موردی را به نام {itemTitle} به موقعیت {itemPosition} {laneLength} منتقل کرده اید.",
        "on drag update board item different lane": "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength} in the {laneTitle} lane.",
        "on drag end board item": "شما موردی را به نام {itemTitle} به موقعیت {itemPosition} {laneLength} در خط {laneTitle} منتقل کرده اید.",
        "on drag cancel board item": "شما کشیدن موردی به نام {itemTitle} را لغو کرده اید.",
        "board lane instructions": "Enter را فشار دهید تا موارد خط تخته را کاوش کنید ، سپس از Escape استفاده کنید تا فوکوس را به سمت صفحه برد تغییر دهید.",
        "toolbar overflow menu": "منوی سرریز نوار ابزار",
        "could not load data": "داده بارگیری نمی شود.",
        "no data": "اطلاعاتی موجود نیست.",
        "list empty default header": "اولین لیست خود را ایجاد کنید",
        "list empty default body": "با افزودن مورد لیست شروع کنید.",
        close: "نزدیک",
        "edit dashboard coaching": "داده هایی را که می خواهید در داشبورد مشاهده کنید فعال یا غیرفعال کنید.",
        find: "پیدا کردن",
        ok: "خوب",
        more: "بیشتر",
        filter: "پالودن",
        clear: "زدودن",
        "hide widget": "مخفی کردن ویجت",
        "view more": "بیشتر ببینید",
        "edit dashboard": "داشبورد را ویرایش کنید",
    },
};
var langKnob = function () {
    return addon_knobs_1.select("Language", {
        "English (US)": "en-US",
        "Machine-translated Farsi for RTL demonstration purposes only": "fa",
    }, "en-US", "Theme");
};
var themeKnob = function () {
    return addon_knobs_1.radios("Theme", {
        "Teams Light": themes_1.TeamsTheme.Default,
        "Teams Dark": themes_1.TeamsTheme.Dark,
        "Teams High Contrast": themes_1.TeamsTheme.HighContrast,
    }, themes_1.TeamsTheme.Default, "Theme");
};
exports.StorybookThemeProvider = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(withTheme_1.HVCThemeProvider, { themeName: themeKnob(), lang: langKnob(), translations: storybookT10s }, children));
};
exports.withStorybookTheme = function (storyFn) { return (react_1.default.createElement(exports.StorybookThemeProvider, null, storyFn())); };
//# sourceMappingURL=withStorybookTheme.js.map