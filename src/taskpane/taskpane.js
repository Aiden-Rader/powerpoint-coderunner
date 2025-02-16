/*
* Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
* See LICENSE in the project root for license information.
*/

/* global $, Office */

Office.onReady((info) => {
	if (info.host === Office.HostType.PowerPoint) {
		console.log("PowerPoint add-in loaded.");
		$("#sideload-msg").hide();
		$("#app-body").show();
	}

	// Event handler for the ribbon button
	$("#insertEditorIntoSlide").click(insertEditorIntoSlide);
});

// Function to insert the editor into a slide
function insertEditorIntoSlide() {
	PowerPoint.run(async (context) => {
		const slide = context.presentation.slides.getActiveSlide();
		const webFrame = slide.shapes.addWebFrame("http://localhost:3000/editor");

		webFrame.left = 100;
		webFrame.top = 100;
		webFrame.width = 600;
		webFrame.height = 400;

		await context.sync();
		console.log("Editor inserted into slide!");
	});
}

// Associate the function with Office.js for the ribbon button
Office.actions.associate("insertEditorIntoSlide", insertEditorIntoSlide);

