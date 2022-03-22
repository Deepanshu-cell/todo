import ReactDOM from "react-dom";
import React from "react";
import "./index.css";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDesc: "",
    };
  }

  handleTaskTextChange(e) {
    this.setState({
      taskDesc: e.target.value,
    });
  }

  handleAddTaskClick() {
    this.props.handlerToCollectTasks(this.state.taskDesc);
    this.setState({
      taskDesc: "",
    });
  }
  render() {
    return (
      <>
        <form>
          <input
            type="text"
            value={this.state.taskDesc}
            onChange={(e) => this.handleTaskTextChange(e)}
          />
          <input
            type="button"
            value="Add Task"
            onClick={() => this.handleAddTaskClick()}
          />
        </form>
      </>
    );
  }
}

class TaskList extends React.Component {
  handleTaskStatus(taskDesc) {
    this.props.handlerToCollectTaskClickInfo(taskDesc);
  }
  render() {
    let lists = [];
    for (let i = 0; i < this.props.tasks.length; i++) {
      let task = this.props.tasks[i];
      let listItem = (
        <div key={i}>
          <span>{task.desc}</span>
          {this.props.purpose == "Todo" ? (
            <span
              class="material-icons"
              onClick={() => this.handleTaskStatus(task.desc)}
            >
              check_circle
            </span>
          ) : (
            <span
              class="material-icons"
              onClick={() => this.handleTaskStatus(task.desc)}
            >
              cancel
            </span>
          )}
        </div>
      );
      lists.push(listItem);
    }
    return (
      <div className={this.props.forStyling}>
        <div className="list-container">
          <div className="title">{this.props.purpose}</div>
          <div className="content">{lists}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          desc: "Turn on Fan",
          isFinished: true,
        },
        {
          desc: "Turn on Light",
          isFinished: false,
        },
        {
          desc: "Make a Coffee",
          isFinished: true,
        },
        {
          desc: "Make Lunch",
          isFinished: false,
        },
        {
          desc: "Go to Mall",
          isFinished: false,
        },
      ],
    };
  }

  hanldeNewTask(taskDesc) {
    let oldTask = this.state.tasks;
    oldTask.push({
      desc: taskDesc,
      isFinished: false,
    });

    this.setState({
      tasks: oldTask,
    });
  }

  handleTaskStatusUpdate(taskDesc, statusUpdate) {
    let oldTask = this.state.tasks.slice();
    let taskItem = oldTask.find((ot) => ot.desc == taskDesc);
    taskItem.isFinished = statusUpdate;
    this.setState({
      tasks: oldTask,
    });
  }

  render() {
    let tasks = this.state.tasks;
    let tasksTodo = tasks.filter((t) => t.isFinished == false);
    let tasksDone = tasks.filter((t) => t.isFinished == true);

    return (
      <>
        <div className="add-task">
          <AddTask
            handlerToCollectTasks={(taskDesc) => this.hanldeNewTask(taskDesc)}
          />
        </div>
        <div className="task-lists">
          <TaskList
            handlerToCollectTaskClickInfo={(taskDesc) =>
              this.handleTaskStatusUpdate(taskDesc, true)
            }
            tasks={tasksTodo}
            purpose="Todo"
            forStyling="todo"
          />
          <TaskList
            handlerToCollectTaskClickInfo={(taskDesc) =>
              this.handleTaskStatusUpdate(taskDesc, false)
            }
            tasks={tasksDone}
            purpose="Finished"
            forStyling="finished"
          />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
