var input = document.getElementsByClassName('Input_Todo')[0];
var countActive = 0;
var countCompleted = 0;
var idCounter = 0;
var arrayObjectTodo = [];
var count = 0;


input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
  		addNewItem("",false,false,undefined);
	}
});

function setItem(id,item){
	localStorage.setItem(id,JSON.stringify(item));
}

function getLocalStorage(){
	var cur_state = 'All_Displayer';
	while(localStorage.length>0)
	{
		var id = localStorage.key(0);
		var cur_content = localStorage.getItem(id);
		if(id==='cur_state')
		{E.b
			cur_state = cur_content;
			localStorage.removeItem(id);
		}
		else
		{
			var object_content = JSON.parse(cur_content);
			arrayObjectTodo[idCounter++] = object_content;
			localStorage.removeItem(id);
		}
	}

	for(var i=0;i<idCounter;i++)
	{
		var curTodo = arrayObjectTodo[i];
		addNewItem(curTodo.value,curTodo.isChecked,true,i);
		setItem(i,arrayObjectTodo[i]);
	}

	change_view(document.getElementsByClassName(cur_state || 'All_Displayer')[0]);

	change_color(document.getElementsByClassName('All_Selector')[0]);
	
}

getLocalStorage();

function addNewItem(content,isChecked,stored,id){
	if(!stored && input.value.trim().length==0)
		return;

	var new_todo = document.createElement("div");
	if(!isChecked)
	{
		new_todo.className += "All Active";	
		countActive++;
	}
	else
	{
		new_todo.className += "All Completed";	
		countCompleted++;
	}
	
	arrayObjectTodo[idCounter] = {};
	if(id !== undefined)
		new_todo.id = id;
	else
		new_todo.id = idCounter;
	new_todo.setAttribute("ondblclick","edit_content(this)");
	

	var new_todo_checkbox_container = document.createElement("div");
	new_todo_checkbox_container.className += "CheckBox_Container";
	new_todo.appendChild(new_todo_checkbox_container);


	var new_todo_checkbox = document.createElement("div");
	new_todo_checkbox.className += "CheckBox";
	new_todo_checkbox.setAttribute("onclick","change_state(this)");

	var new_todo_tickmark = document.createElement("div");
	new_todo_tickmark.className += "Tickmark";
	new_todo_checkbox.appendChild(new_todo_tickmark);

	new_todo_checkbox_container.appendChild(new_todo_checkbox);
	arrayObjectTodo[idCounter].isChecked = false || isChecked;


	var new_todo_content_container = document.createElement("div");
	new_todo_content_container.className += "Content_Container";
	new_todo_content_container.innerText = input.value || content;
	arrayObjectTodo[idCounter].value = input.value || content;
	new_todo.appendChild(new_todo_content_container);


	var new_todo_close_container = document.createElement("div");
	new_todo_close_container.className += "Close_Container";
	new_todo_close_container.innerHTML = "X";
	new_todo_close_container.setAttribute("onclick","remove_todo(this)");
	new_todo.appendChild(new_todo_close_container);
	

	var list_todo = document.getElementsByClassName("List_Todo")[0];
	list_todo.appendChild(new_todo);

	input.value = "";
	change_view(document.getElementsByClassName("isclick")[0]);
	if(countActive+countCompleted >0)
		set_information();

	display_Informtion();
	if(!stored)
	{		
		setItem(idCounter,arrayObjectTodo[idCounter]);
		idCounter++;
	}
}

function change_color(element)
{
	if(countActive===0)
		element.style.color = "rgba(0,0,0,0.5)";
	else
		element.style.color = "rgba(0,0,0,0.2)";
}

function change_state(element){
	var cur_todo = element.parentNode.parentNode;
	if(cur_todo.classList.contains('Active'))
	{
		cur_todo.className = "All Completed";
		countActive--;
		countCompleted++;
		arrayObjectTodo[cur_todo.id].isChecked = true;
	}
	else
	{
		cur_todo.className = "All Active";
		countCompleted--;
		countActive++;
		arrayObjectTodo[cur_todo.id].isChecked = false;
	}

	setItem(cur_todo.id,arrayObjectTodo[cur_todo.id]);
	if(countActive+countCompleted >0)
		set_information();

	change_view(document.getElementsByClassName("isclick")[0]);

	display_Informtion();

	change_color(document.getElementsByClassName("All_Selector")[0]);

}

function set_information(){
	var information = document.getElementsByClassName("Number_Of_Items")[0];
	information.innerHTML = countActive + " items left";
}

function change_view(element){
	var class_name = element.innerHTML;
	var list_elements = document.getElementsByTagName("li");

	for(var i=0;i<list_elements.length;i++)
		list_elements[i].classList.remove("isclick");

	element.classList.add("isclick");
	localStorage.setItem('cur_state',element.classList.item(0));
	var all_todo = document.getElementsByClassName("All");

	for (var i=0;i<all_todo.length;i++)
	{
		if(!all_todo[i].classList.contains(class_name))
			all_todo[i].style.display = "none";
		else
			all_todo[i].style.display = "flex";
	}

	display_Informtion();

}

function clear_completed(){
	
	var Completed_Todos = document.getElementsByClassName('Completed');
	var all_todos = document.getElementsByClassName('List_Todo')[0];
	
	while(Completed_Todos.length>0)
	{
		localStorage.removeItem(Completed_Todos[0].id);
		all_todos.removeChild(Completed_Todos[0]);
	}
	countCompleted = 0;
	display_Informtion();

}

function display_Informtion(){
	if(countCompleted==0)
		document.getElementsByClassName('Clear_Completed')[0].style.display = "none";
	else
		document.getElementsByClassName('Clear_Completed')[0].style.display = "block";

	if(countActive + countCompleted == 0)
		document.getElementsByClassName('Information_Displayer')[0].style.display = "none";
	else
		document.getElementsByClassName('Information_Displayer')[0].style.display = "flex";
	
}

function edit_content(element){
	if(element.childNodes[1].tagName == "INPUT")
		return;
	var content = element.childNodes[1];
	var cur_input = document.createElement("input");
	cur_input.setAttribute("type","text");
	cur_input.className += "Content_Changer";
	cur_input.setAttribute("value",content.innerText);
	element.replaceChild(cur_input,content);
	cur_input.focus();

	cur_input.addEventListener("keyup", function(event) {
  		if (event.keyCode === 13) {
  			var flag = true;
  			if(cur_input.value.trim().length==0){
  				remove_todo(element.childNodes[1]);
 				flag = false;
  			}
  			if(flag === true){
  				content = document.createElement("div");
	  			content.className = "Content_Container";
	  			content.innerText = cur_input.value;
	  			element.replaceChild(content,document.getElementsByClassName('Content_Changer')[0]);
				arrayObjectTodo[element.id].value = content.innerText;
				setItem(element.id,arrayObjectTodo[element.id]);
  			}
  		}
	});

	cur_input.addEventListener("blur",function(event){
		console.log("1234");
		var flag = true;
		if(cur_input.value.trim().length==0){
  			remove_todo(element.childNodes[1]);
  			flag = false;
		}
  		if(flag===true){
  			content = document.createElement("div");
	  		content.className = "Content_Container";
	  		content.innerText = cur_input.value;
	  		element.replaceChild(content,document.getElementsByClassName('Content_Changer')[0]);
			arrayObjectTodo[element.id].value = content.innerText;
			setItem(element.id,arrayObjectTodo[element.id]);
			
  		}
	});
}

function remove_todo(element)
{
	var cur_todo = element.parentNode;
	var all_todos = cur_todo.parentNode;
	if(cur_todo.classList.contains("Active"))
		countActive--;
	else
		countCompleted--;
	all_todos.removeChild(cur_todo);
	localStorage.removeItem(cur_todo.id);
	set_information();
	display_Informtion();
}

function select_All(){
	var displayer_list = document.getElementsByTagName('li');
	for(var i=0;i<displayer_list.length;i++)
	{
		if(displayer_list[i].classList.contains("isclick"))
		{
			if(displayer_list[i].classList.contains("All_Displayer") || displayer_list[i].classList.contains("Active_Displayer"))
			{
				countAll = countCompleted + countActive;
				var all_todos = document.getElementsByClassName('All');
				if(countActive!=0)
				{
					for(var j=0;j<all_todos.length;j++)
					{
						all_todos[j].className = "All Completed";
						all_todos[j].childNodes[0].childNodes[0].checked = true;
						arrayObjectTodo[all_todos[j].id].isChecked = true;
						setItem(all_todos[j].id,arrayObjectTodo[all_todos[j].id]);
					}
					countActive = 0;
					countCompleted = countAll;
				}
				else
				{
					for(var j=0;j<all_todos.length;j++)
					{
						all_todos[j].className = "All Active";
						all_todos[j].childNodes[0].childNodes[0].checked = false;
						arrayObjectTodo[all_todos[j].id].isChecked = false;
						setItem(all_todos[j].id,arrayObjectTodo[all_todos[j].id]);
					}
					countActive = countAll;
					countCompleted = 0;
				}
				change_view(document.getElementsByClassName("isclick")[0]);
				set_information();
				break;
			}
			else
			{
				while(document.getElementsByClassName('Completed').length)
				{
					var Completed_Todos = document.getElementsByClassName('Completed')[0];
					Completed_Todos.childNodes[0].childNodes[0].checked = false;
					arrayObjectTodo[Completed_Todos.id].isChecked = true;
					setItem(Completed_Todos.id,arrayObjectTodo[Completed_Todos.id]);
					Completed_Todos.className = "All Active";
				}
				countActive += countCompleted;
				countCompleted = 0;
				change_view(document.getElementsByClassName("isclick")[0]); 
				set_information();
				break;
			}
			
		}
	}

	change_color(document.getElementsByClassName("All_Selector")[0]);
	
}
