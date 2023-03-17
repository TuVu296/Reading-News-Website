//  tạo một Class mới là Task
class Task {
  constructor(task, owner, isDone = false) {
  this.task = task
  this.owner = owner
  this.isDone = isDone
  }
}
// Tao arr
let todoArr = []