/*
This exercise: So far all actions were wrapped in test and objects (selectors) in page-model.js, per the true POM spirit. This works if tests are strictly following POM. Where not followed, its best to write actions in a separate file like page-model.js or a helper.js to have them called by tests
*/

//Import Selector
import { Selector } from "testcafe";
import { Page } from "./page-model";


//Write fixture with url
fixture("POM based tests").page("https://devexpress.github.io/testcafe/example/");

//Instantiate the Page class which will in turn call the constructor. You can then access the selector via <object name>.<variable name>
const PAGE = new Page();
const CHECKBOXES = PAGE.checkboxes;  

	
//NOTE: To be able to access the object, the class needs to be imported because it lives outside of the tests file (this file). Find the stmt top on this file: import { Page } from "./page-model";
	

//test based on POM (Actions are controlled via tests wherease page objects are centrally managed in their own repo.)
test("Submit form", async t => {
	//Input Name and Verify
	await t.typeText(PAGE.nameInput,"Awesome Human");
	
	//Select Features Checkboxes and Verify
	for(const CHECKBOX of CHECKBOXES) {  
		await t.click(CHECKBOX.checkbox);
		await t.expect(CHECKBOX.checkbox.checked).ok();
	}
	
	//Click sumbit and verify
	await t.click(PAGE.submitBtn);
	await t.expect(PAGE.submitSuccessHeader.innerText).contains("Thank you");
});

//Alternate for tests that don't incorporate POM yet can leverage centrally managed actions and page objects 
test("Submit form", async (t) => {
	await PAGE.submitName(t,"Wonderful Person");
});

	