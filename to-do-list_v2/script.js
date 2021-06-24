// Composant : Tâche
class Task extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let class_name = 'task'
    class_name += this.props.done ? ' task-success' : ' task-info';
  
    return (
      <div className={class_name} onClick={this.props.onClickTask}>
        <span>{this.props.value}</span>
        <i className="glyphicon glyphicon-trash trash" onClick={this.props.onClickClose}></i>
      </div>
    )
  }
}

// Application
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksArray: [
        {value: 'Projet fil rouge', done: true},
        {value: 'Auto-formation React', done: false},
        {value: 'Réalisation site e-commerce', done: false}
      ],
      value: ''
    }
  }

  addTask(e) {
    
    
     if (addInput.value.length != 0) {
      this.state.tasksArray.push({
        value: addInput.value,
        done: false
      })
      
      
      this.setState(state => ({
        tasksArray: state.tasksArray
      }));

    }

    e.preventDefault()
  }

  removeTask(i) {
    this.state.tasksArray.splice(i, 1)
    this.setState({
      tasksArray: this.state.tasksArray
    })
  }

  markDone(i) {
    let tasksArray = this.state.tasksArray
    let task = this.state.tasksArray[i]
    tasksArray.splice(i, 1)
    task.done = !task.done 
    
    task.done ? tasksArray.push(task) : tasksArray.unshift(task)


    this.setState({
      tasksArray: tasksArray
    })

    
  }

  onChangeInput(e) {
    // this.setState({value: e.target.value})
  }

  render() {
    let tasksArray = this.state.tasksArray.map((task, i) => {
      return (
        <Task 
          key={i}
          value={task.value}
          done={task.done}
          onClickClose={this.removeTask.bind(this, i)}
          onClickTask={this.markDone.bind(this, i)}
        />
      )
    })

    return (
      <div className="container ">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 tab">
            <h1 className="text-center "> <i className="glyphicon glyphicon-list-alt text-white "></i> To-do List</h1>
          
            <form
              id="form-add"
              className="form-horizontal"
              onSubmit={this.addTask.bind(this)}>
              <div className="input-group">
                <input type="text" id="addInput" className="form-control" onChange={this.onChangeInput.bind(this)} placeholder="Add your task..." />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign plus"></span>
                  </button>
                </div>
              </div>
            </form>

            {tasksArray}
            
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));