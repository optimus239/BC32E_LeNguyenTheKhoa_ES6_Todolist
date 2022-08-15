export class TaskList {
  constructor() {}
  taskList = [];
  taskCompleted = [];
  addTask(task) {
    this.taskList = [...this.taskList, task];
  }

  addTaskCompleted(task) {
    this.taskCompleted = [...this.taskCompleted, task];
  }

  removeTask(taskName) {
    // this.taskList = this.taskList.filter((task) => {
    //   if (task.taskName === taskName) {
    //     return false;
    //   }
    //   return true;
    // });

    //nếu task.taskName khác taskName truyền vào => trả về true --- ngc lại => trả về false
    this.taskList = this.taskList.filter((task) => task.taskName !== taskName);
  }

  removeTaskCompleted(taskName) {
    this.taskCompleted = this.taskCompleted.filter(
      (task) => task.taskName !== taskName
    );
  }

  findTask(taskName) {
    // return this.taskList.find((task) => {
    //   if (task.taskName === taskName) {
    //     return true;
    //   }
    //   return false;
    // });
    return this.taskList.find((task) => task.taskName === taskName);
  }
}
