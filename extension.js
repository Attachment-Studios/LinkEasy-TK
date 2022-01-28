// extensions

// string extensions
String.prototype.reverse = function() {
	value = "";
	
	for (char of this) {
		value = char + value;
	}

	return value;
}

String.prototype.select = function(start=0, end=0) {
	value = "";

	for (charIndex in this) {
		if (Math.min(start, end) >= 0 && end >= 0) {
			if (end == 0) {
				if (charIndex < this.length && charIndex >= start) {
					value += this[charIndex];
				}
			} else {
				if (charIndex < end && charIndex >= start) {
					value += this[charIndex];
				}
			}
		} else {
			if (start * end < 0) {
				if (start < 0) {
					if (charIndex < end) {
						value += this[charIndex];
					} else if (charIndex >= this.length + start) {
						value = this[(this.length - (charIndex - (this.length + start))) - 1] + value;
					}
				} else {
					if (charIndex >= start && charIndex < this.length + end) {
						value += this[charIndex];
					}
				}
			} else if (start * end == 0) {
				if (start < 0) {
					if (charIndex < this.length && charIndex >= this.length + start) {
						value += this[charIndex];
					}
				} else {
					if (charIndex >= start && charIndex < this.length + end) {
						value += this[charIndex];
					}
				}
			} else {
				if (start < end) {
					if (charIndex >= this.length + start && charIndex < this.length + end) {
						value += this[charIndex];
					}
				} else {
					if (charIndex >= this.length + start) {
						value = this[(this.length - (charIndex - (this.length + start))) - 1] + value;
					} else if (charIndex < this.length + end) {
						value += this[charIndex];
					}
				}
			}
		}
	}

	return value;
}

String.prototype.encrypt = function() {
	value = this;

	dec = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+.";
	enc = "_lIriN2KVPmoD8qps+YTxGecEOu4hfUb1A7yXWB.z9RHd50&vgkwJCMFLZ36jSaQn-t";

	__res = "";

	for ( let char of value ) {
		if ( dec.includes(char) ) {
			charId = dec.indexOf(char);
			__res = __res + enc[charId];
		} else {
			__res = __res + char;
		}
	}

	__res = __res.slice(3) + __res.slice(0, 3);

	__enc = "";
	for ( let char of __res ) {
		__enc = char + __enc;
	}

	return __enc;
}

String.prototype.decrypt = function() {
	value = this;

	dec = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+.";
	enc = "_lIriN2KVPmoD8qps+YTxGecEOu4hfUb1A7yXWB.z9RHd50&vgkwJCMFLZ36jSaQn-t";

	__dec = "";
	for ( let char of value ) {
		__dec = char + __dec;
	}

	__dec = __dec.slice(__dec.length - 3) + __res.slice(0, __dec.length - 3);

	__res = "";
	for ( let char of __dec ) {
		if ( enc.includes(char) ) {
			charId = enc.indexOf(char);
			__res = __res + dec[charId];
		} else {
			__res = __res + char;
		}
	}

	return __res;
}

String.prototype.token = function() {
	value = "";

	value = this.encrypt();
	value = value.select(0, 5);
	value = value.reverse();
	value = value.decrypt();
	value = value.reverse();
	value = value.encrypt();
	value = value.encrypt();

	return value;
}

// array extensions
Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)]
}