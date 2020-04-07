const keywordButton = document.getElementById("add-keyword");
const keywordList = document.getElementById("keyword-list");
const keywordInput = document.getElementById("keyword-input");
const keywordClear = document.getElementById("clear-keywords");

function inputKeyword() {
	let keyword = keywordInput.value;
	if (keyword != "") {
		//TODO add buttons to remove keywords.
		//keywordList.insertAdjacentHTML("afterbegin", '<li>' + keyword + '</li>');
  		browser.storage.sync.get('phagocyteKeywords').then((res) => {
			console.log(res.phagocyteKeywords);
			keywords = res.phagocyteKeywords.concat([keyword]);
			browser.storage.sync.set({"phagocyteKeywords": keywords}).then(displayStoredKeywords());
		});
		browser.tabs.reload();
	}
}

function displayStoredKeywords() {
	keywordList.innerHTML = "";
	browser.storage.sync.get('phagocyteKeywords').then((res) => {
		console.log(res.phagocyteKeywords);
		res.phagocyteKeywords.forEach(function(item, index, array) {
			keywordList.insertAdjacentHTML("afterbegin", '<li>' + item + '</li>');
		});
	});
}

function clearKeywords() {
	browser.storage.sync.set({"phagocyteKeywords": []});
	displayStoredKeywords();
}

keywordButton.addEventListener("click", () => {
	inputKeyword();
});

keywordClear.addEventListener("click", function () {
	clearKeywords();
});

displayStoredKeywords();
