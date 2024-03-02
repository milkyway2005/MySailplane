const form = document.querySelector('#form');
const all_todos = document.querySelector('#all_todos');
const text_new = document.querySelector('#text_new');
const none_todo = document.querySelector('#none_todo');
const sort = document.querySelector('#sort');
const done_sort = document.querySelector('#done_sort');
const undone_sort = document.querySelector('#undone_sort');
const all_sort = document.querySelector('#all_sort');
const sorting_items = document.querySelector('#sorting_items');
var todos;
var array = new Array();

window.addEventListener('load', loadPage);
form.addEventListener('submit', addTODO);
form.addEventListener('reset', deleteALL);
all_todos.addEventListener('click', checkTODO);
sort.addEventListener('click', sortTODO);

function loadPage(event){
	if(localStorage.getItem('todos')) array = JSON.parse(localStorage.getItem('todos'));
	else updateArray();
	createHTML(array);
	updateArray();
}
function addTODO(event){
	// Отменяем отправку формы
	event.preventDefault();
	const todo_text = text_new.value;
	if(todo_text.trim() != ''){
		if(!none_todo.classList.contains('none'))
		{
			none_todo.classList.add('none');
			sort.classList.remove('none');
		}
		let currentDate = new Date();
		const todoHTML = `<li class="todo">
								<div class="note">
									<input class="checkbox" type="checkbox"">
									<label class="text">
										<span>${todo_text}</span>
										<sub>от ${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}</sub>
									</label>
								</div>
								<img class="delete_img" src="images/cross.svg">
							</li>`;
		all_todos.insertAdjacentHTML('beforeend', todoHTML);
		updateArray();		
	}
	else alert("Вы не ввели текст");
	text_new.value = "";
	text_new.focus();
}
function deleteALL (event){
	event.preventDefault();
	all_todos.innerHTML = '';
	todo_amount = 0;
	none_todo.classList.remove('none');
	sort.classList.add('none');
	updateArray();
}
function checkTODO (event){
	event.preventDefault();
	var parent = event.target.closest('.todo');
	if (event.target.classList.contains('delete_img')){
		parent.remove();
		if(all_todos.childElementCount == 0)
		{
			none_todo.classList.remove('none');
			sort.classList.add('none');
		}
		updateArray();
	}
	else{
		parent.classList.toggle('done');
		var text = parent.querySelector('.text');
		text.children[0].classList.toggle('line');
		updateArray();
	}
}
function sortTODO (event){
	event.preventDefault();
	var id_sort = event.target.id;
	var sort_array = new Array();
	if(id_sort == done_sort.id){
		for(var i = 0; i < array.length; i++){
			if(array[i][2]) 
				sort_array.push(array[i]);
		}
		sorting_items.classList.add("none");
		done_sort.classList.add('selected_sort');
		undone_sort.classList.remove('selected_sort');
		all_sort.classList.remove('selected_sort');
		createHTML(sort_array);
		return;
	}
	if(id_sort == undone_sort.id){
		for(var i = 0; i < array.length; i++){
			if(!array[i][2]) 
				sort_array.push(array[i]);
		}
		sorting_items.classList.add("none");
		done_sort.classList.remove('selected_sort');
		undone_sort.classList.add('selected_sort');
		all_sort.classList.remove('selected_sort');
		createHTML(sort_array);
		return;
	}
	if(id_sort == all_sort.id){
		done_sort.classList.remove('selected_sort');
		undone_sort.classList.remove('selected_sort');
		all_sort.classList.add('selected_sort');
		createHTML(array);
		return;
	}
	if(id_sort == "img_sort"){
		sorting_items.classList.toggle("none");
		return;
	}
	if(id_sort == "alphabet_sort"){
		sorting_items.classList.toggle("none");
		sort_array = array;
		sort_array.sort();
		createHTML(sort_array);
		return;
	}
	if(id_sort == "alphabet_sort"){
		sorting_items.classList.toggle("none");
		sort_array = array;
		sort_array.sort();
		createHTML(sort_array);
		return;
	}
	if(id_sort == "reverse_sort"){
		sorting_items.classList.toggle("none");
		sort_array = array;
		sort_array.sort();
		sort_array.reverse();
		createHTML(sort_array);
		return;
	}
}
function updateArray(){
	todos = all_todos.children;
	array.length = 0;
	var done_count = 0;
	var undone_count = 0;
	if(all_todos.childElementCount != 0)
		for(var i = 0; i < todos.length; i++){
			var todo_text = todos[i].querySelector('.text').children[0].textContent;
			var date = todos[i].querySelector('.text').children[1].textContent;
			date = date.slice(3);
			var done = todos[i].classList.contains('done');
			if(done) done_count++;
			else undone_count++;
			array.push([todo_text, date, done]);
		}
	localStorage.setItem('todos', JSON.stringify(array));
	done_sort.textContent = "Сделано(" + done_count + ")";
	undone_sort.textContent = "Не сделано(" + undone_count + ")";
	all_sort.textContent = "Все(" + array.length + ")";
}
function createHTML(array){
	all_todos.innerHTML = '';
	if(array.length == 0 && all_sort.classList.contains('selected_sort')){
		none_todo.classList.remove('none');
		sort.classList.add('none');
		return;
	}		
	for(var i = 0; i < array.length; i++){
		var todoHTML;
		if(!array[i][2]) todoHTML = `<li class="todo">
								<div class="note">
									<input class="checkbox" type="checkbox"">
									<label class="text">
										<span>${array[i][0]}</span>
										<sub>от ${array[i][1]}</sub>
									</label>
								</div>
								<img class="delete_img" src="images/cross.svg">
							</li>`;
		else todoHTML = `<li class="todo done">
								<div class="note">
									<input class="checkbox" type="checkbox"">
									<label class="text">
										<span class="line">${array[i][0]}</span>
										<sub>от ${array[i][1]}</sub>
									</label>
								</div>
								<img class="delete_img" src="images/cross.svg">
							</li>`;
		all_todos.insertAdjacentHTML('beforeend', todoHTML);
	}
}