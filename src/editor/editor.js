var editor;
var current_language = "python";

// Load Monaco Editor into JS
require.config({
	paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs' }
});

require(["vs/editor/editor.main"], function () {
	editor = monaco.editor.create($("#editor")[0], {
		value: "# Write your Python code here",
		language: "python",
		theme: "vs-dark"
	});
});

// Tab Event Handlers
$(".tab").on("click", function () {
	$(".tab").removeClass("active");
	$(this).addClass("active");
	current_language = $(this).data("lang");

	// Set default code structure for switching languages
	const default_code = {
		python: "print (\"Hello, World!\")",
		java: "public class Main { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }",
		cpp: "#include <iostream>\nusing namespace std;\nint main() { cout << \"Hello, World!\"; return 0; }"
	};

	editor.setValue(default_code[current_language]);
	monaco.editor.setModelLanguage(editor.getModel(), current_language);
});

// Run Button Event Handler, using post insetad of ajax for clarity
$("#run-button").on("click", function () {
	$.post("http://localhost:5000/run",
		JSON.stringify({
			code: editor.getValue(),
			language: current_language
		}),
		function (response) {
			$("#output").text(response.output);
		},
		"json"
	).fail(function (jqXHR, textStatus, errorThrown) {
		$("#output").text("Error: Unable to run code: " + jqXHR.responseText);
	});
});