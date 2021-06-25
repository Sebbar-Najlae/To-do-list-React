// Composant : Tâche
class Task extends React.Component {
   

  render() {
      let class_name = 'task'
      class_name += this.props.done ? 'task-done' : 'task-info';

      return (
          <div className={class_name}>
              <span>{this.props.value}</span>
              <i className="close" onClick={this.props.onClickClose}>&times;</i>
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
  chargementDonnees(){

    var dataList = null;
    
    // affichage de données par Ajax

    $.getJSON( "http://localhost:8080/To-do-list-React/api/showtasks.php", 
    function( data ) {
      this.setState({ taskList: data});
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown) 
    {
       console.log(errorThrown);
   })
    ;
 
  }

  addTask(e) {

    $.ajax({
      url:"http://localhost:8080/To-do-list-React/api/addtask.php",
      method:"POST",
      data:{
          taskname : addInput.value ,
      },
      success:function(data) {
        this.chargementDonnees()
        console.log(data)
    }.bind(this)
    })
    
    
  //   if (addInput.value.length != 0) {
  //    this.state.tasksArray.push({
  //      value: addInput.value,
  //      done: false
  //    })
     
     
  //    this.setState(state => ({
  //      tasksArray: state.tasksArray
  //    }));

  //  }

  alert('add')

   e.preventDefault()
 }


  render() {
   
    let tasksArrayMap = this.state.taskList.map((task, i) => {
      return (
        <Task 
          key={i}
          value={task.taskname}
          done={task.done}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1> To-do List</h1>
            <form
              id="form-add"
              className="form-horizontal" onSubmit={this.addTask.bind(this)}>
              <div className="input-group">
                <input type="text" id="addInput" className="form-control"  placeholder="Add your task..." />
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