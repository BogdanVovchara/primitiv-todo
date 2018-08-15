    window.addEventListener('load', init);

    function init() {
        const button = document.getElementById('addButton');
        button.addEventListener('click', handleButtonClick);
        loadTaskList();
    }

    function innerHTMLInElement(elem, html) {
        elem.innerHTML = `<span>↑</span> <span>↓</span> ${html} <span>╳</span>`
    }

    function handleButtonClick() {
        const task = document.getElementById('addField');
        let taskText = task.value;
        const li = document.createElement('li');
        const ul = document.getElementById('taskList');
        if (taskText) { ul.appendChild(li) };
        innerHTMLInElement(li, taskText);
        task.value = '';
        save(taskText);
    }

    function save(item) {
        let taskListArray = getStoreArrey('taskList');
        taskListArray.push(item);
        try { localStorage.setItem('taskList', JSON.stringify(taskListArray)); } catch (err) { return }
    }

    function loadTaskList() {
        let taskListArray = getTaskList();
        const ul = document.getElementById('taskList');
        if (taskListArray) {
            for (let i = 0; i < taskListArray.length; i++) {
                const li = document.createElement('li');
                ul.appendChild(li);
                innerHTMLInElement(li, taskListArray[i]);
            }
        }
        handleSpanClick(ul);
    }

    function getTaskList() {
        return getStoreArrey('taskList');
    }

    function getStoreArrey(key) {
        try { let taskListArray = localStorage.getItem(key); return taskListArray; } catch (err) { return [] };
        if (!taskListArray) {
            taskListArray = [];
        } else {
            taskListArray = JSON.parse(taskListArray);
        }
        return taskListArray;
    }

    function handleSpanClick(el) {
        el.addEventListener('click', addTarget)
    }


    function addTarget(event) {
        let target = event.target,
            targetParent = target.parentElement,
            targetPrevious = targetParent.previousElementSibling,
            targetNext = targetParent.nextElementSibling;

        if (target == targetParent.querySelector('span:nth-child(1)')) {
            targetPrevious.insertAdjacentElement("beforeBegin", targetParent);
        } else if (target == targetParent.querySelector('span:nth-child(2)')) {
            targetNext.insertAdjacentElement("afterEnd", targetParent);
        } else if (target == targetParent.querySelector('span:nth-child(3)')) {
            targetParent.remove();
        }
    }