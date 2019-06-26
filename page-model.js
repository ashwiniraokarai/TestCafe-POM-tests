//Import Selector
import { Selector } from "testcafe";  //NOTE import of Selector class inside of POM

export class Page {
	constructor() {
		//Add page element to this page model and read it to a member variable
		//Then use this variable in a test (fixture file test.js)
		
		//Input Name
		this.nameInput = Selector("input#developer-name");
	    
		//"Select features important to you" - set of checkboxes. Selector assignment achieved via an array of object instantiations that pass id attribute values. FeatureCheckbox is a dedicated class we've defined to generate selector for each of these checkboxes (akin to an object factory)
		this.checkboxes = [new FeatureCheckbox ("remote-testing"),
						   new FeatureCheckbox ("reusing-js-code"),
						   new FeatureCheckbox ("background-parallel-testing"),
						   new FeatureCheckbox ("continuous-integration-embedding"),
						   new FeatureCheckbox ("traffic-markup-analysis")
						  ];
		
		//Submit button
		this.submitBtn = Selector('button[id="submit-button"]');
		
		//Validate the "thank you" text on the page that appears upon submitting the form
		this.submitSuccessHeader = Selector('h1[id=article-header]');
	}//end constructor
		
	//An asynchronous function that can input the Developer Name and Submit the form (for non-POM based tests). Leverages the existing selectors formulated originally (in the class consructor) for POM based tests. Reusing them here.
	async submitName (t,name) {
		//Input developer name
		await t.typeText(this.nameInput, name);
		await t.expect(this.nameInput.value).eql(name);
		
		//Select features checkboxes
		for (const CHECKBOX of this.checkboxes){
			await t.click(CHECKBOX.checkbox);
			await t.expect(CHECKBOX.checkbox.checked).ok();
		}
		
		//Submit form
		await t.click(this.submitBtn);
		await t.expect(this.submitSuccessHeader.innerText).contains("Thank you")
		}//end submitName function
		
	
}//end Page class

/*
//No longer used because this approach is not favorable
export class FeatureCheckboxes{
	constructor() {
		this.Checkbox1 = Selector("input#remote-testing");
		this.Checkbox2 = Selector("input#reusing-js-code");
		this.Checkbox3 = Selector("input#background-parallel-testing");
		this.Checkbox4 = Selector("input#continuous-integration-embedding");
		this.Checkbox5 = Selector("input#traffic-markup-analysis");
	}
}
*/

//This constructor of this class taken in "id" attribute value as an input organizes a checkbox selector and assigns it to a constant
export class FeatureCheckbox {
	constructor(text) {
		//this.checkbox = Selector('input[id=text]'); //can't do this because traditional css selector format takes only actual values (like id="remote-testing"). It cannot take variables, in our case we would have wanted it to read the id value embedded in the "text" variable. Bummer.
		
		this.checkbox = Selector("input[type='checkbox']").withAttribute("id",text); //This works!
		
		/*ALTERNATE: Every checkbox has a parent label that holds the text of the checkbox. Ask for that text as the constructor input E.g.: "Support for testing on remote devices". 
		Using the text, nail down the specific label element 
		E.g.: this.label = Selector("label").withText("Support for testing on remote devices"). 
		Then find the associated checkbox element (which is a descendant of that label) E.g.: this.checkbox = this.label.find("input[type=checkbox]");
		*/
	}
}



