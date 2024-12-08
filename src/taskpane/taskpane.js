$(document).ready(function () {
	$('#open-editor').click(function () {
		Office.context.ui.displayDialogAsync('https://localhost:3000/editor.html');
	});
});