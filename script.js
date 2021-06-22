// Composant : Tâche
class Task extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let class_name = 'task'
    class_name += this.props.done ? ' task-success' : ' task-info';
  
    return (
      <div className={class_name}>
        <span>{this.props.value}</span>
        <i className="close">&times;</i>
      </div>
    )
  }
}

// Application
class App extends React.Component {

  tasksArray = [
      {value: 'Create branch', done: true},
      {value: 'Version-0 of project', done: false},
      {value: 'Prototype', done: false}
    ];

  constructor(props) {
    super(props)

    
  }

  render() {
   
    let tasksArrayMap = this.tasksArray.map((task, i) => {
      return (
        <Task 
          key={i}
          value={task.value}
          done={task.done}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <h1>To-do List</h1>
            <form
              id="form-add"
              className="form-horizontal">
              <div className="input-group">
                <input type="text" id="addInput" className="form-control"  placeholder="Add task..." />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button>
                </div>
              </div>
            </form>

            {tasksArrayMap}
            
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));