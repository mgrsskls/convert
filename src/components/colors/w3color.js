/* w3color.js ver.1.18 by w3schools.com (Do not remove this line)*/

import htmlNames from "./html-names";

function w3color(color, elmnt) {
	if (!(this instanceof w3color)) {
		return new w3color(color, elmnt);
	}
	if (typeof color == "object") {
		return color;
	}
	this.attachValues(toColorObject(color));
	if (elmnt) {
		elmnt.style.backgroundColor = this.toRgbString();
	}
}
w3color.prototype = {
	toRgbString: function () {
		return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
	},
	toRgbaString: function () {
		return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.opacity + ")";
	},
	toHwbString: function () {
		const opacityString = this.opacity < 1 ? ` / ${this.opacity}` : "";

		return `hwb(${this.hue} ${Math.round(this.whiteness * 100)}% ${Math.round(
			this.blackness * 100
		)}%${opacityString})`;
	},
	toHslString: function () {
		const sat = this.sat * 100;
		return (
			"hsl(" +
			this.hue +
			", " +
			(sat.toString().includes(".") ? sat.toFixed(1) : sat) +
			"%, " +
			Math.round(this.lightness * 100) +
			"%)"
		);
	},
	toHslaString: function () {
		const sat = this.sat * 100;
		return (
			"hsla(" +
			this.hue +
			", " +
			(sat.toString().includes(".") ? sat.toFixed(1) : sat) +
			"%, " +
			Math.round(this.lightness * 100) +
			"%, " +
			this.opacity +
			")"
		);
	},
	toCmykString: function () {
		return (
			"cmyk(" +
			Math.round(this.cyan * 100) +
			"%, " +
			Math.round(this.magenta * 100) +
			"%, " +
			Math.round(this.yellow * 100) +
			"%, " +
			Math.round(this.black * 100) +
			"%)"
		);
	},
	toName: function () {
		var r,
			g,
			b,
			colorhexs = getColorArr("hexs");
		for (let i = 0; i < colorhexs.length; i++) {
			r = parseInt(colorhexs[i].substr(0, 2), 16);
			g = parseInt(colorhexs[i].substr(2, 2), 16);
			b = parseInt(colorhexs[i].substr(4, 2), 16);
			if (this.red == r && this.green == g && this.blue == b) {
				return getColorArr("names")[i];
			}
		}
		return "";
	},
	toHexString: function () {
		var r = toHex(this.red);
		var g = toHex(this.green);
		var b = toHex(this.blue);
		return "#" + r + g + b;
	},
	toRgb: function () {
		return { r: this.red, g: this.green, b: this.blue, a: this.opacity };
	},
	toHsl: function () {
		return { h: this.hue, s: this.sat, l: this.lightness, a: this.opacity };
	},
	toHwb: function () {
		return { h: this.hue, w: this.whiteness, b: this.blackness, a: this.opacity };
	},
	toCmyk: function () {
		return { c: this.cyan, m: this.magenta, y: this.yellow, k: this.black, a: this.opacity };
	},
	isDark: function (n) {
		var m = n || 128;
		return (this.red * 299 + this.green * 587 + this.blue * 114) / 1000 < m;
	},
	attachValues: function (color) {
		this.red = color.red;
		this.green = color.green;
		this.blue = color.blue;
		this.hue = color.hue;
		this.sat = color.sat;
		this.lightness = color.lightness;
		this.whiteness = color.whiteness;
		this.blackness = color.blackness;
		this.cyan = color.cyan;
		this.magenta = color.magenta;
		this.yellow = color.yellow;
		this.black = color.black;
		this.opacity = color.opacity;
		this.valid = color.valid;
	},
};
function toColorObject(c) {
	var typ,
		arr = [],
		arrlength,
		i,
		opacity,
		match,
		a,
		hue,
		sat,
		rgb,
		colornames = [],
		colorhexs = [];
	c = w3trim(c.toLowerCase());
	a = 1;

	if (
		c.substr(0, 3) == "rgb" ||
		c.substr(0, 3) == "hsl" ||
		c.substr(0, 3) == "hwb" ||
		c.substr(0, 4) == "cmyk"
	) {
		if (c.substr(0, 4) == "cmyk") {
			typ = "cmyk";
			c = c.substr(4);
		} else {
			typ = c.substr(0, 3);
			c = c.substr(3);
		}
		arrlength = 3;
		opacity = false;
		if (c.substr(0, 1).toLowerCase() == "a") {
			arrlength = 4;
			opacity = true;
			c = c.substr(1);
		} else if (typ == "cmyk") {
			arrlength = 4;
			if (c.split(",").length == 5) {
				arrlength = 5;
				opacity = true;
			}
		}
		c = c.replace("(", "");
		c = c.replace(")", "");
		arr = c.includes(",") ? c.split(",") : c.split(" ");
		if (typ == "rgb") {
			if (arr.length != arrlength) {
				return emptyObject();
			}
			for (i = 0; i < arrlength; i++) {
				if (arr[i] == "" || arr[i] == " ") {
					arr[i] = "0";
				}
				if (arr[i].indexOf("%") > -1) {
					arr[i] = arr[i].replace("%", "");
					arr[i] = Number(arr[i] / 100);
					if (i < 3) {
						arr[i] = Math.round(arr[i] * 255);
					}
				}
				if (Number.isNaN(arr[i])) {
					return emptyObject();
				}
				if (parseInt(arr[i]) > 255) {
					arr[i] = 255;
				}
				if (i < 3) {
					arr[i] = parseInt(arr[i]);
				}
				if (i == 3 && Number(arr[i]) > 1) {
					arr[i] = 1;
				}
			}
			rgb = { r: arr[0], g: arr[1], b: arr[2] };
			if (opacity == true) {
				a = Number(arr[3]);
			}
		}
		if (typ == "hsl" || typ == "hwb") {
			while (arr.length < arrlength) {
				arr.push("0");
			}
			if (typ == "hsl" || typ == "hwb") {
				if (parseInt(arr[0]) >= 360) {
					arr[0] = 0;
				}
			}
			for (i = 1; i < arrlength; i++) {
				if (arr[i].indexOf("%") > -1) {
					arr[i] = arr[i].replace("%", "");
					arr[i] = Number(arr[i]);
					if (Number.isNaN(arr[i])) {
						return emptyObject();
					}
					arr[i] = arr[i] / 100;
				} else {
					arr[i] = Number(arr[i]);
				}
				if (Number(arr[i]) > 1) {
					arr[i] = 1;
				}
				if (Number(arr[i]) < 0) {
					arr[i] = 0;
				}
			}
			if (typ == "hsl") {
				rgb = hslToRgb(arr[0], arr[1], arr[2]);
				hue = Number(arr[0]);
				sat = Number(arr[1]);
			}
			if (typ == "hwb") {
				rgb = hwbToRgb(arr[0], arr[1], arr[2]);
			}
			if (opacity == true) {
				a = Number(arr[3]);
			}
		}
		if (typ == "cmyk") {
			while (arr.length < arrlength) {
				arr.push("0");
			}
			for (i = 0; i < arrlength; i++) {
				if (arr[i].indexOf("%") > -1) {
					arr[i] = arr[i].replace("%", "");
					arr[i] = Number(arr[i]);
					if (Number.isNaN(arr[i])) {
						return emptyObject();
					}
					arr[i] = arr[i] / 100;
				} else {
					arr[i] = Number(arr[i]);
				}
				if (Number(arr[i]) > 1) {
					arr[i] = 1;
				}
				if (Number(arr[i]) < 0) {
					arr[i] = 0;
				}
			}
			rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
			if (opacity == true) {
				a = Number(arr[4]);
			}
		}
	} else {
		match = false;
		colornames = getColorArr("names");
		for (i = 0; i < colornames.length; i++) {
			if (c.toLowerCase() == colornames[i].toLowerCase()) {
				colorhexs = getColorArr("hexs");
				match = true;
				rgb = {
					r: parseInt(colorhexs[i].substr(0, 2), 16),
					g: parseInt(colorhexs[i].substr(2, 2), 16),
					b: parseInt(colorhexs[i].substr(4, 2), 16),
				};
				break;
			}
		}
		if (match == false) {
			c = c.replace("#", "");
			if (c.length == 3) {
				c =
					c.substr(0, 1) +
					c.substr(0, 1) +
					c.substr(1, 1) +
					c.substr(1, 1) +
					c.substr(2, 1) +
					c.substr(2, 1);
			}
			for (i = 0; i < c.length; i++) {
				if (!isHex(c.substr(i, 1))) {
					return emptyObject();
				}
			}

			arr[0] = parseInt(c.substr(0, 2), 16);
			arr[1] = parseInt(c.substr(2, 2), 16);
			arr[2] = parseInt(c.substr(4, 2), 16);
			for (i = 0; i < 3; i++) {
				if (Number.isNaN(arr[i])) {
					return emptyObject();
				}
			}
			rgb = {
				r: arr[0],
				g: arr[1],
				b: arr[2],
			};
		}
	}

	return colorObject(rgb, a, hue, sat);
}
function colorObject(rgb, a, h, s) {
	var hsl, hwb, cmyk, color, hue, sat;
	if (!rgb) {
		return emptyObject();
	}
	if (a === null) {
		a = 1;
	}
	hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
	cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
	hue = h || hsl.h;
	sat = s || hsl.s;
	color = {
		red: rgb.r,
		green: rgb.g,
		blue: rgb.b,
		hue: hue,
		sat: sat,
		lightness: hsl.l,
		whiteness: hwb.w,
		blackness: hwb.b,
		cyan: cmyk.c,
		magenta: cmyk.m,
		yellow: cmyk.y,
		black: cmyk.k,
		opacity: a,
		valid: true,
	};
	color = roundDecimals(color);
	return color;
}
function emptyObject() {
	return {
		red: null,
		green: null,
		blue: null,
		hue: null,
		sat: null,
		lightness: null,
		whiteness: null,
		blackness: null,
		cyan: null,
		magenta: null,
		yellow: null,
		black: null,
		opacity: null,
		valid: false,
	};
}
function getColorArr(x) {
	if (x == "names") {
		return htmlNames;
	}
	if (x == "hexs") {
		return [
			"f0f8ff",
			"faebd7",
			"00ffff",
			"7fffd4",
			"f0ffff",
			"f5f5dc",
			"ffe4c4",
			"000000",
			"ffebcd",
			"0000ff",
			"8a2be2",
			"a52a2a",
			"deb887",
			"5f9ea0",
			"7fff00",
			"d2691e",
			"ff7f50",
			"6495ed",
			"fff8dc",
			"dc143c",
			"00ffff",
			"00008b",
			"008b8b",
			"b8860b",
			"a9a9a9",
			"a9a9a9",
			"006400",
			"bdb76b",
			"8b008b",
			"556b2f",
			"ff8c00",
			"9932cc",
			"8b0000",
			"e9967a",
			"8fbc8f",
			"483d8b",
			"2f4f4f",
			"2f4f4f",
			"00ced1",
			"9400d3",
			"ff1493",
			"00bfff",
			"696969",
			"696969",
			"1e90ff",
			"b22222",
			"fffaf0",
			"228b22",
			"ff00ff",
			"dcdcdc",
			"f8f8ff",
			"ffd700",
			"daa520",
			"808080",
			"808080",
			"008000",
			"adff2f",
			"f0fff0",
			"ff69b4",
			"cd5c5c",
			"4b0082",
			"fffff0",
			"f0e68c",
			"e6e6fa",
			"fff0f5",
			"7cfc00",
			"fffacd",
			"add8e6",
			"f08080",
			"e0ffff",
			"fafad2",
			"d3d3d3",
			"d3d3d3",
			"90ee90",
			"ffb6c1",
			"ffa07a",
			"20b2aa",
			"87cefa",
			"778899",
			"778899",
			"b0c4de",
			"ffffe0",
			"00ff00",
			"32cd32",
			"faf0e6",
			"ff00ff",
			"800000",
			"66cdaa",
			"0000cd",
			"ba55d3",
			"9370db",
			"3cb371",
			"7b68ee",
			"00fa9a",
			"48d1cc",
			"c71585",
			"191970",
			"f5fffa",
			"ffe4e1",
			"ffe4b5",
			"ffdead",
			"000080",
			"fdf5e6",
			"808000",
			"6b8e23",
			"ffa500",
			"ff4500",
			"da70d6",
			"eee8aa",
			"98fb98",
			"afeeee",
			"db7093",
			"ffefd5",
			"ffdab9",
			"cd853f",
			"ffc0cb",
			"dda0dd",
			"b0e0e6",
			"800080",
			"663399",
			"ff0000",
			"bc8f8f",
			"4169e1",
			"8b4513",
			"fa8072",
			"f4a460",
			"2e8b57",
			"fff5ee",
			"a0522d",
			"c0c0c0",
			"87ceeb",
			"6a5acd",
			"708090",
			"708090",
			"fffafa",
			"00ff7f",
			"4682b4",
			"d2b48c",
			"008080",
			"d8bfd8",
			"ff6347",
			"40e0d0",
			"ee82ee",
			"f5deb3",
			"ffffff",
			"f5f5f5",
			"ffff00",
			"9acd32",
		];
	}
}
function roundDecimals(c) {
	c.red = Number(c.red.toFixed(0));
	c.green = Number(c.green.toFixed(0));
	c.blue = Number(c.blue.toFixed(0));
	c.hue = Number(c.hue.toFixed(0));
	// c.sat = Number(c.sat.toFixed(2));
	c.lightness = Number(c.lightness.toFixed(2));
	c.whiteness = Number(c.whiteness.toFixed(2));
	c.blackness = Number(c.blackness.toFixed(2));
	c.cyan = Number(c.cyan.toFixed(2));
	c.magenta = Number(c.magenta.toFixed(2));
	c.yellow = Number(c.yellow.toFixed(2));
	c.black = Number(c.black.toFixed(2));
	c.opacity = Number(c.opacity.toFixed(2));
	return c;
}
function hslToRgb(hue, sat, light) {
	var t1, t2, r, g, b;
	hue = hue / 60;
	if (light <= 0.5) {
		t2 = light * (sat + 1);
	} else {
		t2 = light + sat - light * sat;
	}
	t1 = light * 2 - t2;
	r = hueToRgb(t1, t2, hue + 2) * 255;
	g = hueToRgb(t1, t2, hue) * 255;
	b = hueToRgb(t1, t2, hue - 2) * 255;
	return { r: r, g: g, b: b };
}
function hueToRgb(t1, t2, hue) {
	if (hue < 0) hue += 6;
	if (hue >= 6) hue -= 6;
	if (hue < 1) return (t2 - t1) * hue + t1;
	else if (hue < 3) return t2;
	else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
	else return t1;
}
function hwbToRgb(hue, white, black) {
	var i,
		rgb,
		rgbArr = [],
		tot;
	rgb = hslToRgb(hue, 1, 0.5);
	rgbArr[0] = rgb.r / 255;
	rgbArr[1] = rgb.g / 255;
	rgbArr[2] = rgb.b / 255;
	tot = white + black;
	if (tot > 1) {
		white = Number((white / tot).toFixed(2));
		black = Number((black / tot).toFixed(2));
	}
	for (i = 0; i < 3; i++) {
		rgbArr[i] *= 1 - white - black;
		rgbArr[i] += white;
		rgbArr[i] = Number(rgbArr[i] * 255);
	}
	return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2] };
}
function cmykToRgb(c, m, y, k) {
	var r, g, b;
	r = 255 - Math.min(1, c * (1 - k) + k) * 255;
	g = 255 - Math.min(1, m * (1 - k) + k) * 255;
	b = 255 - Math.min(1, y * (1 - k) + k) * 255;
	return { r: r, g: g, b: b };
}
function rgbToHsl(r, g, b) {
	var min,
		max,
		i,
		l,
		s,
		maxcolor,
		h,
		rgb = [];
	rgb[0] = r / 255;
	rgb[1] = g / 255;
	rgb[2] = b / 255;
	min = rgb[0];
	max = rgb[0];
	maxcolor = 0;
	for (i = 0; i < rgb.length - 1; i++) {
		if (rgb[i + 1] <= min) {
			min = rgb[i + 1];
		}
		if (rgb[i + 1] >= max) {
			max = rgb[i + 1];
			maxcolor = i + 1;
		}
	}
	if (maxcolor == 0) {
		h = (rgb[1] - rgb[2]) / (max - min);
	}
	if (maxcolor == 1) {
		h = 2 + (rgb[2] - rgb[0]) / (max - min);
	}
	if (maxcolor == 2) {
		h = 4 + (rgb[0] - rgb[1]) / (max - min);
	}
	if (Number.isNaN(h)) {
		h = 0;
	}
	h = h * 60;
	if (h < 0) {
		h = h + 360;
	}
	l = (min + max) / 2;
	if (min == max) {
		s = 0;
	} else {
		if (l < 0.5) {
			s = (max - min) / (max + min);
		} else {
			s = (max - min) / (2 - max - min);
		}
	}
	return { h: h, s: s, l: l };
}
function rgbToHwb(r, g, b) {
	var h, w, bl, max, min, chroma;
	r = r / 255;
	g = g / 255;
	b = b / 255;
	max = Math.max(r, g, b);
	min = Math.min(r, g, b);
	chroma = max - min;
	if (chroma == 0) {
		h = 0;
	} else if (r == max) {
		h = (((g - b) / chroma) % 6) * 360;
	} else if (g == max) {
		h = (((b - r) / chroma + 2) % 6) * 360;
	} else {
		h = (((r - g) / chroma + 4) % 6) * 360;
	}
	w = min;
	bl = 1 - max;
	return { h: h, w: w, b: bl };
}
function rgbToCmyk(r, g, b) {
	var c, m, y, k, max;
	r = r / 255;
	g = g / 255;
	b = b / 255;
	max = Math.max(r, g, b);
	k = 1 - max;
	if (k == 1) {
		c = 0;
		m = 0;
		y = 0;
	} else {
		c = (1 - r - k) / (1 - k);
		m = (1 - g - k) / (1 - k);
		y = (1 - b - k) / (1 - k);
	}
	return { c: c, m: m, y: y, k: k };
}
function toHex(n) {
	var hex = n.toString(16);
	while (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex;
}
function w3trim(x) {
	return x.replace(/^\s+|\s+$/g, "");
}
function isHex(x) {
	return "0123456789ABCDEFabcdef".indexOf(x) > -1;
}

export default w3color;
