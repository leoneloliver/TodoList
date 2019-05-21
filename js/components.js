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
          ['First item',false,false,setTodayDate],
          
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
    var dt = new Date();
    return (
      <div>
      <header className="clearfix">
        <div className="date">
          <div className="day">{dt.getDate()}</div>
          <span>
            <p className="month">{dt.toLocaleString('en-us',{month:"short"}).toUpperCase()}</p>
            <p className="year">{dt.getFullYear()}</p>
          </span>
        </div>
        <div className="dayinword">{dt.toLocaleString('en-us',{weekday:'long'}).toUpperCase()}</div>
      </header>
        <AddNew addtodo={this.handleKeyPress} />
          <TodayList todos = {this.state.todos} hide_archived={this.state.hide_archived} toggle={this.toggle} toggleVisibility={this.toggleVisibility} show_hide_archived={this.show_hide_archived} />
          <OverdueList todos = {this.state.todos} hide_archived={this.state.hide_archived} toggle={this.toggle} toggleVisibility={this.toggleVisibility} show_hide_archived={this.show_hide_archived} />
          <div onClick={this.handleOpen}>
            Add new +
          </div>
        </div>
    );
  }
});

var AddNew = React.createClass({
  handleKeyPress:function(evt){
    
    if(this.refs.addNew.value.trim().length > 0 && this.refs.dateNew.value.trim().length > 0){
      this.props.addtodo(this.refs.addNew.value);
      
      alert(this.refs.addNew.value);
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
        <div className="task-box">
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
  getQuantity: function(){
    alert(document.getElementsByClassName("qlist").length);
  },
  render:function(){
    
    return (
      <div className={"listbox " + (this.props.hide_archived? "hide_archived" : "")}>
        <h1>Overdue</h1><span className="qolist"></span>
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
              
              <div id={"todo"+index} className={"todo clearfix olist " + (todo[2] ? "archived " : "") + (todo[1] ? "done" : "")}>
                
               
                <input className="status" onChange={this.toggleToDo.bind(this,index)} ref="todoid" id={index} checked={todo[1] ? "checked" : ""} type="checkbox" />
                <label htmlFor={index}><span className={todo[1] ? "strikethrough" : ""}>{todo[0]}{todo[1]}{todo[2]}</span><div className="right">{todo[3]}</div></label>
              </div>
                       
              );
            }
            
           
          },this, this.getQuantity();)
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
    return (
      <div className={"listbox " + (this.props.hide_archived? "hide_archived" : "")}>
        <h1>Today</h1><span className="qtlist"></span>
        {
          this.props.todos.map(function(todo,index){          
            var today = new Date();
            if(today.getMonth() + 1 < 10){
               var monthy = "0"+(today.getMonth() + 1);
            }else{
              var monthy = (today.getMonth() + 1);
            }
            var date = today.getFullYear() + '-' + monthy + '-' + today.getDate();
            console.log(todo[3]);
            console.log(date);
            if(todo[3] >= date){
            return (
              
              <div id={"todo"+index} className={"todo clearfix tlist " + (todo[2] ? "archived " : "") + (todo[1] ? "done" : "")}>
                
                <input className="status" onChange={this.toggleToDo.bind(this,index)} ref="todoid" id={index} checked={todo[1] ? "checked" : ""} type="checkbox" />
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
  document.getElementById('todolist')
);