

//class for item lists
export class List {
    constructor (title) {
        this.title = title;
        //add new list element when
        //"+" button is clicked
        const newListButton = document.getElementById('new-list-button');
        const newTaskButton = document.getElementById('new-task-button');
        const listButton = document.querySelectorAll('.list-button');
        newListButton.addEventListener('click', preventSubmit);
        //newListButton.addEventListener('click', this._createNewList.bind(this));
        newTaskButton.addEventListener('click', preventSubmit);
        newTaskButton.addEventListener('click', this._addTask.bind(this));
        this._getLocalStorage(); 

    }
    index;
    task;
    tasks = [
        {
            title: 'Some task 1',
            dueDate: '2024-03-28',
            priority: 'High',
            index: 1,
            description: 'Important stuff',
        },
        {
            title: 'Some task 2',
            dueDate: '2024-03-27',
            priority: 'Low',
            index: 1,
            description: 'Very important stuff',
        },
    ];
    taskIndex;

    get tasks() {
        return this.tasks;    
    }
    
/*     _createNewList(){
        //form for title input
        const newListForm = document.querySelector('.new-list');
        //list title var
        let newListTitle; 
        const listsContainer = document.getElementById('lists');
        //value form the input form
        newListTitle = newListForm.value;
        const newListEl = document.createElement('li');
        const newListBtn = document.createElement('button');
        newListEl.setAttribute('class', 'list-item');
        newListBtn.setAttribute('class', 'list-button');
        newListBtn.innerHTML = `${newListTitle}`;
        newListEl.appendChild(newListBtn);
        listsContainer.appendChild(newListEl);
    } */

    _setTaskIndex () {
        for (let task of this.tasks) {
            this.taskIndex = this.tasks.indexOf(task);
            this._renderTasks(task);
        }
    }

    _addTask () {
        let taskTitle;
        let taskPriority;
        let taskDate;
        let taskDescription;

        //title input field
        const taskTitleInput = document.querySelector('.new-task');
        const taskPriorityInput = document.getElementsByName('priority');
        const taskDateInput = document.getElementById('due-date-input');
        const taskDescriptionInput = document.getElementById('description-input');

        taskTitle = taskTitleInput.value;
        taskDate = taskDateInput.value;
        taskDescription = taskDescriptionInput.value;

        //get value from checked 
        //radio button
        for (let i = 0; i < taskPriorityInput.length; i++) {
            if (taskPriorityInput[i].checked){
                taskPriority = taskPriorityInput[i].value;
            }
        }

        this.task = new Task (taskTitle, taskDate, taskPriority, 1, taskDescription);

        this.tasks.push(this.task);
        console.log(this.tasks);

        this._setLocalStorage();
    }

    _renderTasks (task) {
        const tasksContainer = document.getElementById('tasks-list');

        const html = `
        <div class="task">
                <input type="checkbox" id="task-1">
                <label for="task-1">
                    ${task.title}
                </label>
                <div class='task-priority'>${task.priority}</div>
                <div class="task-date">${task.dueDate}</div>
                <div class="task-description">${task.description}</div>
         </div>
        `

        tasksContainer.insertAdjacentHTML('beforeend', html);
    }


    _eraseTaskContent () {
        const taskContainer = document.getElementById('tasks-list');

        taskContainer.innerHTML = '';
    }

    //convert object into string 
    //and save it in the local storage
    _setLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    //convert string back into object
    //and get stored data
    _getLocalStorage() {
        const tasksData = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasksData);

        if (!tasksData) return;

        this.tasks = tasksData;

        this.tasks.forEach(task => {
            this._renderTasks(task);
        })
    }

    reset () {
        localStorage.removeItem('tasks');
        location.reload();
    }

    _taskQuantity() {

    }
}



export class listsList {
    constructor(){
        const listButtons = document.querySelectorAll('.list-button');
        for (let i = 0; i <= listButtons.length; i++) {
            listButtons[i].addEventListener('click', console.log('click'))
        }
        const addListButton = document.getElementById('new-list-button');
        this._eraseAllListsContent();
        this._renderAllLists();
        addListButton.addEventListener('click', this._newList.bind(this));
        //addListButton.addEventListener('click', this._renderList.bind(this));
        addListButton.addEventListener('click', this._eraseAllListsContent);
        addListButton.addEventListener('click', this._setIndex.bind(this));
        addListButton.addEventListener('click', this._renderAllLists.bind(this));
        addListButton.addEventListener('click', this._emptyForm.bind(this));
    }
    lists = [
        {
            title: 'list one',
            index: 0,
            tasks: [
                {
                    title: 'Some task 1',
                    dueDate: '2024-03-28',
                    priority: 'High',
                    index: 1,
                    description: 'Important stuff',
                },
                {
                    title: 'Some task 2',
                    dueDate: '2024-03-27',
                    priority: 'Low',
                    index: 1,
                    description: 'Very important stuff',
                },
            ]
        
        },
        {
            title: 'list two',
            index: 1,
            tasks: [
                {
                    title: 'Some task 1',
                    dueDate: '2024-03-28',
                    priority: 'High',
                    index: 1,
                    description: 'Important stuff',
                },
                {
                    title: 'Some task 2',
                    dueDate: '2024-03-27',
                    priority: 'Low',
                    index: 1,
                    description: 'Very important stuff',
                },
            ]
        
        }
        
    ]

    #listIndex

    //list title input field
   #listTitleInput = document.querySelector('.new-list');

   _listsContainer = document.getElementById('lists');
   

   #title;

    _newList (e) {
        e.preventDefault();

       this.#title = this.#listTitleInput.value;

        //var for new list
        let nList = new List (this.#title);

        //add new list to lists arr
        this.lists.push(nList);

        nList.index = this.lists.length - 1;


        this.#listIndex = this.lists.length - 1;

        console.log(nList);
        console.log(this.lists);


    }

    _emptyForm () {
        this.#listTitleInput.value = '';
    }

    _renderList () {
         let html = `
         <li class="list-item" id="active-list" data-index-num='${this.#listIndex}'><button class="list-button">${this.#title}</button></li>
         `

         this._listsContainer.insertAdjacentHTML('afterbegin', html);
    }

    _renderAllLists() {
        for(let list of this.lists) {

        let html = `
         <li class="list-item" id="active-list" data-index-num='${list.index}'><button class="list-button">${list.title}</button></li>
         `;

         
         this._listsContainer.insertAdjacentHTML('beforeend', html)
        }
    }

    _eraseAllListsContent() {
        //container element for lists
        const listsContainer = document.getElementById('lists');
        console.log('list container content: ');
        console.log(listsContainer.innerHTML);
        listsContainer.innerHTML = '';
    }

    _setActiveList(e) {
        console.log('removed attribute:');

        const listItem = document.querySelectorAll('.list-item');
        for (let i = 0; i <= listButton.length; i++) {
            listItem[i].removeAttribute('id', 'active-list');
        }

        console.log('added attribute:');

        const btn = e.target;
        const element = btn.closest('li.list-item');
        element.setAttribute('id', 'active-list');
    }


    _setIndex () {
        for (let list of this.lists) {
            this.#listIndex = this.lists.indexOf(list);
            console.log('index in array: ');
            console.log(this.lists.indexOf(list));
            console.log('list index: ');
            console.log(this.#listIndex);
        }

        console.log('lists arr: ');
        console.log(this.lists);
    }

    _setLocalStorage() {
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

        //convert string back into object
    //and get stored data
    _getLocalStorage() {
        const listsData = JSON.parse(localStorage.getItem('lists'));

        if(!listsData) return;

        this.lists = listsData;

        this.lists.forEach(list => {
            this._renderList(list);
        })
    }

    reset(){
        localStorage.removeItem('lists');
        location.reload();
    }

}