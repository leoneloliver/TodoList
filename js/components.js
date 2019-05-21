var ToDoList = React.createClass({
  getToday:function(){
    var today = new Date();
    var monthy;
    if(today.getMonth() + 1 < 10){
      monthy = "0"+(today.getMonth() + 1);
    }else{
      monthy = (today.getMonth() + 1);
    }
    var date = today.getFullYear() + '-' + monthy + '-' + today.getDate();
    return date;
  },
  getInitialState:function(){
    var localtodos = this.getTodos();
    return { 
      todos: localtodos,
      hide_archived:true, 
    }
  },
  getTodos:function(){
    var todos = localStorage.getItem('todoListZX098T00');
    var setTodayDate = this.getToday();
    try{
      if(Array.isArray(JSON.parse(todos))){
         return JSON.parse(todos);   
      }else{
        return [
          ['Review all tests',false,false,setTodayDate],
          ['Enjoying life',false,false,"2019-05-15"],      
        ];
      }
    } catch(e){
      console.log('error');
    }
  },
  setTodos:function(){
    localStorage.setItem('todoListZX098T00',JSON.stringify(this.state.todos));
  },
  componentDidUpdate:function(){
    this.setTodos();
  },
  handleKeyPress:function(item){
    var dateInput = document.getElementById('dates').value;
    var newtodo = new Array(item,false,false,dateInput);
    this.state.todos.push(newtodo);
    this.forceUpdate();
  },
  toggle:function(todoid){
    this.state.todos[todoid][1] = !this.state.todos[todoid][1];
    this.state.todos[todoid][2] = !this.state.todos[todoid][2];
    this.forceUpdate();
  },
  show_hide_archived:function(){
    this.setState({
      hide_archived : !this.state.hide_archived
    });
  },
  handleOpen:function(){
    document.getElementById('add-container').style.display = "block";
  },
  render:function(){
    return (
      <div>
        <header className="clearfix">
          <h4>My To Do APP</h4>
        </header>
          <AddNew addtodo={this.handleKeyPress} />
          <TodayList todos = {this.state.todos} hide_archived={this.state.hide_archived} toggle={this.toggle} toggleVisibility={this.toggleVisibility} show_hide_archived={this.show_hide_archived} />
          <OverdueList todos = {this.state.todos} hide_archived={this.state.hide_archived} toggle={this.toggle} toggleVisibility={this.toggleVisibility} show_hide_archived={this.show_hide_archived} />
          <div onClick={this.handleOpen} className="btn-plus">+</div>
        </div>
    );
  }
});
var AddNew = React.createClass({
  handleKeyPress:function(evt){
    if(this.refs.addNew.value.trim().length > 0 && this.refs.dateNew.value.trim().length > 0){
      this.props.addtodo(this.refs.addNew.value);  
      document.getElementById('add-container').style.display = "none";
      this.refs.addNew.value = '';
    }
  },
  render:function(){
    return (
      <div className="add-news" id="add-container">
        <h5>Add Task</h5>
        <div className="task-box">
          <input type="text"  ref='addNew' placeholder="Add New Task" className="input-text-task"/>
        </div>
        <div className="task-box text-left">
           Due date: <input id="dates" type="date"  ref='dateNew' className="input-date-task"/>
        </div>
        <div className="task-box">
          <input type="button" onClick={this.handleKeyPress} value="add" className="btn-add" />
        </div>
      </div>
    );
  }
});
var OverdueList = React.createClass({
  show_hide_archived:function(){
    this.props.show_hide_archived();
  },
  toggleToDo:function(i){
    this.props.toggle(i);
  },
  render:function(){
    setTimeout(function(){
      document.getElementById("qolist").innerHTML = document.getElementsByClassName("olist").length;
    },500);
    return (
      <div className={"listbox " + (this.props.hide_archived? "hide_archived" : "")}>
        <h1>Overdue - <span id="qolist"></span> Tasks</h1>
        {
          this.props.todos.map(function(todo,index){
            var today = new Date();
            if(today.getMonth() + 1 < 10){
               var monthy = "0"+(today.getMonth() + 1);
            }else{
              var monthy = (today.getMonth() + 1);
            }
            var date = today.getFullYear() + '-' + monthy + '-' + today.getDate();
            if(todo[3] < date){
            return (            
              <div id={"todo"+index} className={"todo clearfix " + (todo[2] ? "archived " : "") + (todo[1] ? "done" : "")}>
                <input className="status olist " onChange={this.toggleToDo.bind(this,index)} ref="todoid" id={index} checked={todo[1] ? "checked" : ""} type="checkbox" />
                <label htmlFor={index}><span className={todo[1] ? "strikethrough" : ""}>{todo[0]}{todo[1]}{todo[2]}</span><div className="right">{todo[3]}</div></label>
              </div>                      
              );
            }    
          },this)
        }
        <div className="visibility_control">
          <input id="show_hide" onChange={this.show_hide_archived} checked={this.props.hide_archived ? "checked" : ""} className="togglevisibility" type="checkbox" />
          <label htmlFor="show_hide">Hide archived todos</label>
        </div>
      </div>
    );
  }
});

var TodayList = React.createClass({
  show_hide_archived:function(){
    this.props.show_hide_archived();
  },
  toggleToDo:function(i){
    this.props.toggle(i);
  },
  render:function(){
    setTimeout(function(){
      var elem = document.getElementsByClassName("tlist");
      let over = 0
      for(let i = 0; i < elem.length ; i++){
        if(elem[i].checked == false){
          over++;
        }
      }
      document.getElementById("qtlist").innerHTML = over;
    },500);
    return (
      <div className={"listbox " + (this.props.hide_archived? "hide_archived" : "")}>
        <h1>Today - <span id="qtlist"></span> Tasks</h1>
        {
          this.props.todos.map(function(todo,index){          
            var today = new Date();
            if(today.getMonth() + 1 < 10){
               var monthy = "0"+(today.getMonth() + 1);
            }else{
              var monthy = (today.getMonth() + 1);
            }
            var date = today.getFullYear() + '-' + monthy + '-' + today.getDate();
            if(todo[3] >= date){
            return (
              <div id={"todo"+index} className={"todo clearfix " + (todo[2] ? "archived " : "") + (todo[1] ? "done" : "")}>
                <input className="status tlist " onChange={this.toggleToDo.bind(this,index)} ref="todoid" id={index} checked={todo[1] ? "checked" : ""} type="checkbox" />
                <label htmlFor={index}><span className={todo[1] ? "strikethrough" : ""}>{todo[0]}{todo[1]}{todo[2]}</span><div className="right">{todo[3]}</div></label>
              </div>
              );
            }
          },this)
        }
      </div>
    );
  }
});
ReactDOM.render(
  <ToDoList/>,
  document.querySelector("component-todo")
);