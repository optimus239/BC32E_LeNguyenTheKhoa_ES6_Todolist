import { Task } from "../models/task.js";
import { TaskList } from "../models/task-list.js";

const getElement = (id) => document.getElementById(id);

const allTask = new TaskList();

const renderTaskList = () => {
  const task = new Task();
  const content = allTask.taskList.reduce((value, task) => {
    return (value += `
    <li class="d-flex justify-content-between">
    <div>
        ${task.taskName}
    </div>
    <div class="task-icon">
        <i class="far fa-trash-alt" onclick="removeTask('${task.taskName}')"></i>
        <i class="fas fa-check-circle" id="checked" onclick="completedTask('${task.taskName}')"></i>
    </div>
    </li>`);
  }, "");

  getElement("todo").innerHTML = content;
};

const renderTaskCompleted = () => {
  const task = new Task();
  const content = allTask.taskCompleted.reduce((value, task) => {
    return (value += `
    <li class="d-flex justify-content-between">
    <div>
        ${task.taskName}
    </div>
    <div class="task-icon">
        <i class="far fa-trash-alt" onclick="removeTaskCompleted('${task.taskName}')"></i>
        <i class="fas fa-check-circle" style="color:green" id="checked"></i>
    </div>
    </li>`);
  }, "");
  getElement("completed").innerHTML = content;
};

const setLocalStore = () => {
  localStorage.setItem("taskList", JSON.stringify(allTask.taskList));
};

const getLocalStore = () => {
  const data = localStorage.getItem("taskList");
  const dataParse = JSON.parse(data);
  allTask.taskList = dataParse;
  renderTaskList();
};

// getLocalStore();

getElement("addItem").onclick = () => {
  const input = getElement("newTask").value;
  const task = new Task();
  task.taskName = input;
  allTask.addTask(task);
  // console.log("allTask: ", allTask);
  renderTaskList();
  setLocalStore();
  getElement("newTask").value = "";
};

window.removeTask = (taskName) => {
  // console.log(taskName);
  allTask.removeTask(taskName);
  renderTaskList();
};

window.completedTask = (val) => {
  const task = new Task();
  task.taskName = val;
  allTask.addTaskCompleted(task);
  removeTask(val);
  renderTaskCompleted();
  console.log("allTask: ", allTask);
};

window.removeTaskCompleted = (taskName) => {
  allTask.removeTaskCompleted(taskName);
  renderTaskCompleted();
};

getElement("two").onclick = () => {
  // const sortList = allTask.taskList.sort((val, nextval) => {
  //   if (val.taskName > nextval.taskName) {
  //     return 1;
  //   }
  //   return -1;
  // });

  const sortList = allTask.taskList.sort((val, nextval) => {
    return val.taskName > nextval.taskName ? 1 : -1;
  });
  renderTaskList();

  const sortCompleted = allTask.taskCompleted.sort((val, nextval) => {
    return val.taskName > nextval.taskName ? 1 : -1;
  });
  renderTaskCompleted();
};

getElement("three").onclick = () => {
  const sortList2 = allTask.taskList.sort((val, nextval) => {
    return val.taskName < nextval.taskName ? 1 : -1;
  });
  renderTaskList();

  const sortCompleted2 = allTask.taskCompleted.sort((val, nextval) => {
    return val.taskName < nextval.taskName ? 1 : -1;
  });
  renderTaskCompleted();
};
