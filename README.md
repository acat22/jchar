# jchar
get character input event and jQuery plugin

Why to use 
----------
There is no way to get the last typed character in JavaScript (only key codes), 
while you want to perform some action when a user types a certain character.  
Example: the user types '@', you want to suggest him the list of his followers to mark in the message.

Detect character typed (and copy-pasted):

	<script>
	$().ready(function() {
		$('#area').onchar(cb);
	});

	function cb(chara) {
		console.log(chara);
		if (chara == '@') console.log('yey');
	}

	function off() {
		$('#area').onchar();
	}
	</script>

	<textarea id="area"></textarea>
	<input type="button" value="Off" onclick="off()" />
	
License: MIT.
