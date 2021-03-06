document.querySelector("#getRank").addEventListener("submit", getRank)
const rankALert = document.querySelector("#rankAlert")
let timeout

function showAlert(mess="", type="alert-danger", alert="#rankAlert"){
	rankAlert.querySelector("p").textContent = mess
	rankAlert.classList.add(type);
	rankAlert.style.opacity = 1
	rankAlert.style.display = "inline-block"
	timeout = setTimeout(function(){ 
		rankALert.style.display = "none";
		rankAlert.classList.remove(type) 
	}, 3000);
}

document.querySelector(".close").addEventListener("click", function(e){
	e.preventDefault()
	rankALert.style.display = "none";
	clearTimeout(timeout)

})

function getRank(e){
	function validate(){
		if (!document.forms["getRank"]["key1"].value && !document.forms["getRank"]["key2"].value && !document.forms["getRank"]["key3"].value){
			showAlert("At least one keyword is required")
			return false
		} else if(!document.forms["getRank"]["site"].value){
			showAlert("Your site URL is required")
			return false
		}
		return true
	}
  e.preventDefault()
	if (!validate()){return}
	for(let b of document.querySelectorAll(".badge")){
		b.style.display = "none"
	}
	const site = document.querySelector("#site").value
	let keys = document.querySelectorAll("input.key")
	for(const key of keys){
		if(!key.value){continue}
		let parentId = key.parentElement.parentElement.id
		document.querySelector(`#${parentId} .spinner-grow`).style.display = "inline-block"
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "/getRank");
		let formData = new FormData();
		formData.append("site", site)
		formData.append("key", key.value)
		xhr.send(formData);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
						let response = JSON.parse(xhr.response)
						document.querySelector(`#${parentId} .spinner-grow`).style.display = "none"
						let badge = document.querySelector(`#${parentId} .badge`)
						badge.style.display = "inline-block"
						badge.textContent = response.pos
						badge.setAttribute("data-content", response.link)
        }
    }
	}
}
