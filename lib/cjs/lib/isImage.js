"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImageOrNot = void 0;
var isImage = function (url) {
    return new Promise(function (resolve, reject) {
        // check that is a valid url
        // then if valid url
        var image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
    });
};
exports.isImageOrNot = function (input) {
    return new Promise(function (resolve) {
        if (/(jpg|gif|png|jpeg|svg|webp)$/i.test(input)) {
            isImage(input).then(function (value) {
                if (value.path[0].width > 0 &&
                    value.path[0].height) {
                    resolve();
                }
                else {
                    throw new Error("Fail to process the image by the following link: " + input + " \n Image size is 0");
                }
            }, function () {
                throw new Error("Fail to process the image by the following link: " + input);
            });
        }
        else {
            throw new Error("Failed to upload image: " + input + " \n Image format not supported, supported formats: JPG, JPEG, GIF, PNG, SVG, WEBP");
        }
    });
};
//# sourceMappingURL=isImage.js.map