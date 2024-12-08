$(document).ready(function () {
	$('#run-code').click(function () {
		const code = $('#editor').val();
		$('#output').text(`Executing...\n${code}`);
	});
});