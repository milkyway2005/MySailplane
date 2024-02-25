const form = document.querySelector('#form');
const all_todos = document.querySelector('#all_todos');
const text_new = document.querySelector('#text_new');
const none_todo = document.querySelector('#none_todo');
var todos;
var array = new Array();

window.addEventListener('load', loadPage);
form.addEventListener('submit', addTODO);
form.addEventListener('reset', deleteALL);
all_todos.addEventListener('click', checkTODO);

function loadPage(event){
	if(localStorage.getItem('todos')) array = JSON.parse(localStorage.getItem('todos'));
	else updateArray();
	createHTML();
}
function addTODO(event){
	// Отменяем отправку формы
	event.preventDefault();
	const todo_text = text_new.value;
	if(todo_text.trim() != ''){
		if(!none_todo.classList.contains('none')) none_todo.classList.add('none');
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
	updateArray();
}
function checkTODO (event){
	event.preventDefault();
	var parent = event.target.closest('.todo');
	if (event.target.classList.contains('delete_img')){
		parent.remove();
		if(all_todos.childElementCount == 0) none_todo.classList.remove('none');
		updateArray();
	}
	else{
		parent.classList.toggle('done');
		var text = parent.querySelector('.text');
		text.children[0].classList.toggle('line');
		updateArray();
	}
}
function updateArray(){
	todos = all_todos.children;
	array.length = 0;
	if(all_todos.childElementCount != 0)
		for(var i = 0; i < todos.length; i++){
			var todo_text = todos[i].querySelector('.text').children[0].textContent;
			var date = todos[i].querySelector('.text').children[1].textContent;
			var done = todos[i].classList.contains('done');
			array.push([todo_text, date, done]);
		}
	localStorage.setItem('todos', JSON.stringify(array));
}
function createHTML(){
	all_todos.innerHTML = '';
	if(array.length == 0){
		none_todo.classList.remove('none');
		return;
	}		
	for(var i = 0; i < array.length; i++){
		var todoHTML;
		if(!array[i][2]) todoHTML = `<li class="todo">
								<div class="note">
									<input class="checkbox" type="checkbox"">
									<label class="text">
										<span>${array[i][0]}</span>
										<sub>${array[i][1]}</sub>
									</label>
								</div>
								<img class="delete_img" src="images/cross.svg">
							</li>`;
		else todoHTML = `<li class="todo done">
								<div class="note">
									<input class="checkbox" type="checkbox"">
									<label class="text">
										<span class="line">${array[i][0]}</span>
										<sub>${array[i][1]}</sub>
									</label>
								</div>
								<img class="delete_img" src="images/cross.svg">
							</li>`;
		all_todos.insertAdjacentHTML('beforeend', todoHTML);
	}
}