const task = document.querySelector(".task");
const paused = document.querySelector(".paused");
const finished = document.querySelector(".finished");
const inp = document.querySelector("input");
const btn = document.querySelectorAll("button");
const wrapper = document.querySelectorAll(".wrapper");

// button

btn[0].addEventListener("click", () => {
	if (inp.value) {

		task.innerHTML += `<div class="item">
			<span contenteditable="true">${inp.value}</span>
			<button class="deleted"></button>
		</div>`;

		inp.value = '';
		inp.placeholder = 'write your book';

		saveInfoUi();
	} else {
		inp.placeholder = 'Your must write something!!!';
	}
});

btn[1].addEventListener("click", () => {
	localStorage.removeItem("dataBook");
	location.reload();
})

// localStorage

function saveInfoUi() {
	let dataBook = {
		task: task.innerHTML,
		paused: paused.innerHTML,
		finished: finished.innerHTML
	}
	localStorage.setItem("dataBook", JSON.stringify(dataBook));
}

function getInfoUi() {
	let dataBook = JSON.parse(localStorage.getItem("dataBook"));

	task.innerHTML = dataBook.task;
	paused.innerHTML = dataBook.paused;
	finished.innerHTML = dataBook.finished;
}

wrapper.forEach(area => {
	area.addEventListener("mousemove", () => {
		saveInfoUi();
	})

	area.addEventListener("click", (event) => {
		if (event.target.tagName === 'BUTTON') {
			event.target.parentNode.remove();
			saveInfoUi();
		}

		if (event.target.tagName === 'SPAN') {
			event.target.addEventListener("onchange", () => {
				saveInfoUi();
			})
		}
	})
})

getInfoUi();

// Sortable

new Sortable(task, {
	group: 'shared',
	animation: 350,
	ghostClass: 'blue-background-class'
})

new Sortable(paused, {
	group: 'shared',
	animation: 350,
	ghostClass: 'blue-background-class'
})

new Sortable(finished, {
	group: 'shared',
	animation: 350,
	ghostClass: 'blue-background-class'
})





