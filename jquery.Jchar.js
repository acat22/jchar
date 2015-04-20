(function( $ ) {
	
	function CharTyped(obj, callback) {
		var o = {
			txtSnapshot : {
				prtxt : '',
				sel : {}
			},
			obj : null,
			onKeyPressed : function(event) {
				var yes = 1;
				if (event.keyCode == 13) yes = 0;
				var pos = this.obj.selectionStart;
				var posEnd = this.obj.selectionEnd;
				var str = this.obj.value;
				if (this.txtSnapshot.sel.s !== undefined) {
					if ((this.txtSnapshot.sel.s + 1 + (this.txtSnapshot.prtxt.length - this.txtSnapshot.sel.e)) != str.length) yes = 0;
				} else {
					if (str == this.txtSnapshot.prtxt) yes = 0;
					if (str.length < this.txtSnapshot.prtxt.length) yes = 0;
				}
				var ch = str.charAt(pos - 1);
				this.txtSnapshot.prtxt = str;
				this.txtSnapshot.sel = {};
				if (yes) this.callback(ch);
			},
			off : function() {
				this.on(this.obj, this.callback, true);
			},
			on : function(obj, callback, rem) {
				var o = this;
				if (!this.cb) this.cb = function (event) {
					event = event || window.event;
					o.onKeyPressed(event);
				}
				if (rem) {
					if (window.removeEventListener){
						this.obj.removeEventListener("keyup", this.cb, false);
					} else {
						this.obj.detachEvent("onkeyup", this.cb);
					}
					this.obj = null;
					this.callback = null;
					return;
				}
				this.obj = obj;
				this.callback = callback;
				if (window.addEventListener){
					this.obj.addEventListener("keyup", this.cb, false);
				} else {
					this.obj.attachEvent("onkeyup", this.cb);
				}
			}
		};
		if (obj && callback) o.on(obj, callback);
		return o;
	}
	
	var chartypedname = '_chartyped_for_jquery.Jchar.js';
    $.fn.onchar = function(callback) {
		
		var o = this.data(chartypedname);
		if (!callback) {
			if (o) o.off();
			this.data(chartypedname, null);
			o = null;
		} else
		if (!o) {
			o = new CharTyped(this.get(0), callback);
			this.data(chartypedname, o);
		}
        return this;
 
    };
 
}( jQuery ));