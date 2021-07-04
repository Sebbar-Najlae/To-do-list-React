// Composant : Task
class Task extends React.Component {


  render() {
    let class_name = 'task'
    class_name += this.props.done == 1 ? ' task-success' : ' task-info'';

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
      taskList: []
    };
  }
  componentDidMount() {
    this.chargementDonnees();
  }
  chargementDonnees() {

    var dataList = null;

    // data display with Ajax

    $.getJSON("api/showtasks.php",
      function (data) {
        this.setState({ taskList: data });
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      })
      ;

  }

  //add task

  addTask(e) {

    $.ajax({
      url: "/api/addtask.php",
      method: "POST",
      data: {
        taskname: addInput.value,
      },
      success: function (data) {
        this.chargementDonnees()
        console.log(data)
      }.bind(this)
    })
    e.preventDefault()
  }

  //delete une task

  removetask(i) {

    $.ajax({
      url: "/api/deletetask.php",
      method: "POST",
      data: {
        sid: i
      },
      success: function (data) {
        $(this).parent().remove();
        this.chargementDonnees()
      }.bind(this)
    })

  }

  //task status

  markDone(i, status) {

    if (status != 1) {
      $.ajax({
        url: "api/donetask.php",
        method: "POST",
        data: {
          sid: i,
          done: 1,
        },
        success: function (data) {
          console.log(data)
          this.chargementDonnees()
        }.bind(this)
      })
    } else {
      $.ajax({
        url: "api/donetask.php",
        method: "POST",
        data: {
          sid: i,
          done: 0,
        },
        success: function (data) {
          console.log(data)
          this.chargementDonnees()
        }.bind(this)
      })
    }
  }







  render() {

    let tasksArrayMap = this.state.taskList.map((task) => {
      return (
        <Task
          key={task.idtasks}
          value={task.taskname}
          done={task.done}
          onClickClose={this.removetask.bind(this, task.idtasks)}
          onClickTask={this.markDone.bind(this, task.idtasks, task.done)}
        />
      )
    })

    return (

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6 col-sm-offset-3 mx-auto app">
            <h1 className="text-center"><i className="glyphicon glyphicon-list-alt text-white "></i> To do today</h1>
            <form
              id="form-add"
              className="form-horizontal" onSubmit={this.addTask.bind(this)}>


              <div className="input-group input-group-lg mb-3">
                <input type="text" id="addInput" className="form-control" placeholder="add task..." />
                <div class="input-group-append">
                <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign plus"></span>
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