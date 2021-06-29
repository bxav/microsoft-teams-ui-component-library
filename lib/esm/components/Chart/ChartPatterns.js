var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import { TeamsTheme } from "../../themes";
import { EPointStyles, EShapes, } from "./ChartTypes";
var BACKGROUND_COLOR = "transparent";
var PATTERN_COLOR = "rgba(0, 0, 0, 0.8)";
var POINT_STYLE = "round";
var SIZE = 20;
export var lineChartPatterns = [
    { lineBorderDash: [], pointStyle: EPointStyles.Circle },
    { lineBorderDash: [], pointStyle: EPointStyles.Rectangle },
    { lineBorderDash: [], pointStyle: EPointStyles.Triangle },
    { lineBorderDash: [5, 5], pointStyle: EPointStyles.Circle },
    { lineBorderDash: [5, 5], pointStyle: EPointStyles.RectangleRotated },
    { lineBorderDash: [5, 5], pointStyle: EPointStyles.Triangle },
];
export var legendLabels = function (_a) {
    var canvasRef = _a.canvasRef, theme = _a.theme, colorScheme = _a.colorScheme, dataPointColor = _a.dataPointColor, index = _a.index, patterns = _a.patterns;
    if (!canvasRef)
        return;
    var ctx = canvasRef.getContext("2d");
    ctx.save();
    if (!ctx)
        return;
    if (theme === TeamsTheme.HighContrast) {
        if (patterns) {
            ctx.setTransform(1.4, 0, 0, 1, 0, 0);
            ctx.scale(12, 10);
            ctx.fillStyle = buildPattern(__assign(__assign({}, patterns(colorScheme)[index]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
            ctx.fillRect(-15, -15, canvasRef.width, canvasRef.height);
            ctx.restore();
        }
        else {
            ctx.scale(15, 15);
            ctx.fillStyle = colorScheme.brand.shadow;
            ctx.fillRect(-15, -15, canvasRef.width, canvasRef.height);
            ctx.fillStyle = colorScheme.default.foreground3;
            switch (lineChartPatterns[index].pointStyle) {
                case EPointStyles.Triangle:
                    ctx.moveTo(9.5, 2.5);
                    ctx.lineTo(5.5, 7.5);
                    ctx.lineTo(13.5, 7.5);
                    break;
                case EPointStyles.Rectangle:
                    ctx.rect(6.5, 2.5, 8, 5);
                    break;
                case EPointStyles.RectangleRotated:
                    ctx.moveTo(10, 2);
                    ctx.lineTo(14.5, 5);
                    ctx.lineTo(10, 8);
                    ctx.lineTo(5.5, 5);
                    break;
                case EPointStyles.Circle:
                default:
                    ctx.ellipse(10, 5, 3.5, 2.5, 0, 0, 2 * Math.PI);
                    break;
            }
            ctx.fill();
            // Line Style
            ctx.strokeStyle = colorScheme.default.foreground3;
            ctx.beginPath();
            ctx.setLineDash(lineChartPatterns[index].lineBorderDash.length ? [2, 2] : []);
            ctx.moveTo(-1.5, 5);
            ctx.lineTo(20, 5);
            ctx.stroke();
            ctx.restore();
        }
    }
    else {
        ctx.fillStyle = dataPointColor;
        ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
    }
};
export var chartLineStackedDataPointPatterns = function (colorScheme) {
    return [
        {
            shapeType: EShapes.Square,
            size: 10,
        },
        {
            shapeType: EShapes.DiagonalRightLeft,
            size: 5,
        },
        {
            shapeType: EShapes.Grid,
            size: 10,
        },
        {
            shapeType: EShapes.VerticalLine,
            size: 10,
        },
        {
            shapeType: EShapes.GridRightLeft,
            size: 3,
        },
        {
            shapeType: EShapes.Diagonal,
            size: 5,
        },
    ];
};
export var chartBarDataPointPatterns = function (colorScheme) {
    return [
        {
            shapeType: EShapes.DiagonalRightLeft,
            size: 5,
        },
        {
            shapeType: EShapes.Square,
            size: 10,
        },
        {
            shapeType: EShapes.Diagonal,
            size: 5,
        },
        {
            shapeType: EShapes.Grid,
            size: 10,
        },
        {
            shapeType: EShapes.GridRightLeft,
            size: 3,
        },
        {
            shapeType: EShapes.VerticalLine,
            size: 7,
        },
    ];
};
export var chartBubbleDataPointPatterns = function (colorScheme) {
    return [
        {
            shapeType: EShapes.DiagonalRightLeft,
            size: 5,
        },
        {
            shapeType: EShapes.Square,
            size: 10,
        },
        {
            shapeType: EShapes.Diagonal,
            size: 5,
        },
        {
            shapeType: EShapes.Grid,
            size: 10,
        },
        {
            shapeType: EShapes.GridRightLeft,
            size: 3,
        },
        {
            shapeType: EShapes.VerticalLine,
            size: 7,
        },
    ];
};
var Entity = /** @class */ (function () {
    function Entity(fields) {
        Object.assign(this, fields);
    }
    return Entity;
}());
export { Entity };
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape(fields) {
        var _this = _super.call(this, fields) || this;
        _this.size = SIZE;
        _this.backgroundColor = BACKGROUND_COLOR;
        _this.patternColor = PATTERN_COLOR;
        if (fields.size) {
            _this.size = fields.size;
        }
        if (fields.backgroundColor) {
            _this.backgroundColor = fields.backgroundColor;
        }
        if (fields.patternColor) {
            _this.patternColor = fields.patternColor;
        }
        _this.canvas = document.createElement("canvas");
        _this.context = _this.canvas.getContext("2d");
        _this.canvas.width = _this.size;
        _this.canvas.height = _this.size;
        if (_this.context) {
            _this.context.fillStyle = _this.backgroundColor;
            _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
        }
        return _this;
    }
    Shape.prototype.setStrokeProps = function () {
        if (this.context) {
            this.context.strokeStyle = this.patternColor;
            this.context.lineWidth = this.size / 10;
            this.context.lineJoin = POINT_STYLE;
            this.context.lineCap = POINT_STYLE;
        }
    };
    Shape.prototype.setFillProps = function () {
        if (this.context) {
            this.context.fillStyle = this.patternColor;
        }
    };
    return Shape;
}(Entity));
export { Shape };
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Square.prototype.drawTile = function () {
        var halfSize = this.size / 2;
        if (this.context) {
            this.context.beginPath();
            this.setFillProps();
            this.drawSquare();
            this.drawSquare(halfSize, halfSize);
            this.context.fill();
        }
        return this.canvas;
    };
    Square.prototype.drawSquare = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var halfSize = this.size / 2;
        var gap = this.size / 5;
        this.context.fillRect(offsetX + gap, offsetY + gap, halfSize - gap * 2, halfSize - gap * 2);
        this.context.closePath();
    };
    return Square;
}(Shape));
var Diagonal = /** @class */ (function (_super) {
    __extends(Diagonal, _super);
    function Diagonal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Diagonal.prototype.drawTile = function () {
        var halfSize = this.size / 2;
        if (this.context) {
            this.context.beginPath();
            this.setStrokeProps();
            this.drawDiagonalLine();
            this.drawDiagonalLine(halfSize, halfSize);
            this.context.stroke();
            return this.canvas;
        }
    };
    Diagonal.prototype.drawDiagonalLine = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var size = this.size;
        var halfSize = size / 2;
        var gap = 1;
        if (this.context) {
            this.context.moveTo(halfSize - gap - offsetX, gap * -1 + offsetY);
            this.context.lineTo(size + 1 - offsetX, halfSize + 1 + offsetY);
            this.context.closePath();
        }
    };
    return Diagonal;
}(Shape));
var DiagonalRightLeft = /** @class */ (function (_super) {
    __extends(DiagonalRightLeft, _super);
    function DiagonalRightLeft() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiagonalRightLeft.prototype.drawTile = function () {
        if (this.context) {
            this.context.translate(this.size, 0);
            this.context.rotate((90 * Math.PI) / 180);
            Diagonal.prototype.drawTile.call(this);
            return this.canvas;
        }
    };
    return DiagonalRightLeft;
}(Diagonal));
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.drawTile = function () {
        var halfSize = this.size / 2;
        if (this.context) {
            this.context.beginPath();
            this.setStrokeProps();
            // this.drawDiagonalLine();
            // this.drawDiagonalLine(halfSize, halfSize);
            this.drawOpositeDiagonalLine();
            this.drawOpositeDiagonalLine(halfSize, halfSize);
            this.context.stroke();
        }
        return this.canvas;
    };
    Grid.prototype.drawDiagonalLine = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var size = this.size;
        var halfSize = size / 2;
        var gap = 1;
        if (this.context) {
            this.context.moveTo(halfSize - gap - offsetX, gap * -1 + offsetY);
            this.context.lineTo(size + 1 - offsetX, halfSize + 1 + offsetY);
            this.context.closePath();
        }
    };
    Grid.prototype.drawOpositeDiagonalLine = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var size = this.size;
        var halfSize = size / 2;
        var gap = 1;
        if (this.context) {
            this.context.moveTo(halfSize - gap + offsetX, gap * -1 - offsetY);
            this.context.lineTo(size + 1 + offsetX, halfSize + 1 - offsetY);
            this.context.closePath();
        }
    };
    return Grid;
}(Shape));
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Line.prototype.drawTile = function () {
        if (this.context) {
            var halfSize = this.size / 2;
            this.context.beginPath();
            this.setStrokeProps();
            this.drawLine();
            this.drawLine(halfSize, halfSize);
            this.context.stroke();
            return this.canvas;
        }
    };
    Line.prototype.drawLine = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (this.context) {
            var size = this.size;
            var quarterSize = size / 4;
            this.context.moveTo(0, quarterSize + offsetY);
            this.context.lineTo(this.size, quarterSize + offsetY);
            this.context.closePath();
        }
    };
    return Line;
}(Shape));
var VerticalLine = /** @class */ (function (_super) {
    __extends(VerticalLine, _super);
    function VerticalLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalLine.prototype.drawTile = function () {
        if (this.context) {
            this.context.translate(this.size, 0);
            this.context.rotate((90 * Math.PI) / 180);
            Line.prototype.drawTile.call(this);
            return this.canvas;
        }
    };
    return VerticalLine;
}(Line));
var GridRightLeft = /** @class */ (function (_super) {
    __extends(GridRightLeft, _super);
    function GridRightLeft() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRightLeft.prototype.drawTile = function () {
        if (this.context) {
            this.context.translate(this.size, 0);
            this.context.rotate((90 * Math.PI) / 180);
            Grid.prototype.drawTile.call(this);
            return this.canvas;
        }
    };
    return GridRightLeft;
}(Grid));
var shapes = (_a = {},
    _a[EShapes.Square] = Square,
    _a[EShapes.DiagonalRightLeft] = DiagonalRightLeft,
    _a[EShapes.Grid] = Grid,
    _a[EShapes.Diagonal] = Diagonal,
    _a[EShapes.VerticalLine] = VerticalLine,
    _a[EShapes.GridRightLeft] = GridRightLeft,
    _a);
export function buildPattern(_a) {
    var shapeType = _a.shapeType, backgroundColor = _a.backgroundColor, patternColor = _a.patternColor, size = _a.size;
    var patternCanvas = document.createElement("canvas");
    var patternContext = patternCanvas.getContext("2d");
    var outerSize = size * 2;
    var Shape = shapes[shapeType];
    var shape = new Shape({ size: size, backgroundColor: backgroundColor, patternColor: patternColor });
    var pattern = patternContext.createPattern(shape.drawTile(), "repeat");
    patternCanvas.width = outerSize;
    patternCanvas.height = outerSize;
    if (pattern) {
        pattern.shapeType = shapeType;
    }
    return pattern;
}
//# sourceMappingURL=ChartPatterns.js.map