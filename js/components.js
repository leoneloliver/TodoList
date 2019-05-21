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
    var todos = localStorage.getItem('todosJKqGKb');
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
      // return [
      //   ['Buy New Monitor',true,false],
      //   ['Start Design Phase',false,true],
      //   ['Book Domain Name',true,false],
      //   ['Start Development',false,false]
      // ];
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
  toggleVisibility:function(todoid){
    this.state.todos[todoid][2] = !this.state.todos[todoid][2];
    this.forceUpdate();
  },
  show_hide_archived:function(){
    this.setState({
      hide_archived : !this.state.hide_archived
    });
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
        <List todos = {this.state.todos} hide_archived={this.state.hide_archived} toggle={this.toggle} toggleVisibility={this.toggleVisibility} show_hide_archived={this.show_hide_archived} />
        
        <List2 todos = {this.state.todos} hide_archived={this.state.hide_archived} toggle={this.toggle} toggleVisibility={this.toggleVisibility} show_hide_archived={this.show_hide_archived} />
        </div>
    );
  }
});

var AddNew = React.createClass({
  handleKeyPress:function(evt){
    
    if(this.refs.addNew.value.trim().length > 0 && this.refs.dateNew.value.trim().length > 0){
      this.props.addtodo(this.refs.addNew.value);
      
      alert(this.refs.addNew.value);
      this.refs.addNew.value = '';
    }
  },
  render:function(){
    return (
      <div className="add-news">
        <input type="text"  ref='addNew' placeholder="Add New Task" />
        <input id="dates" type="date"  ref='dateNew'/>
        
        <input type="button" onClick={this.handleKeyPress} value="add" />
      </div>
    );
  }
});

var List = React.createClass({
  show_hide_archived:function(){
    this.props.show_hide_archived();
  },
  toggleToDo:function(i){
    this.props.toggle(i);
  },
  toggleVisibility:function(i){
    this.props.toggleVisibility(i);
  },
  render:function(){
    return (
      <div className={"listbox " + (this.props.hide_archived? "hide_archived" : "")}>
        <h1>Overduo</h1>
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
                
                <input className="visibility" onChange={this.toggleVisibility.bind(this,index)} ref="visibility" checked={todo[2] ? "checked" : ""} type="checkbox" />
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



var List2 = React.createClass({
  show_hide_archived:function(){
    this.props.show_hide_archived();
  },
  toggleToDo:function(i){
    this.props.toggle(i);
  },
  toggleVisibility:function(i){
    this.props.toggleVisibility(i);
  },
  render:function(){
    return (
      <div className={"listbox " + (this.props.hide_archived? "hide_archived" : "")}>
        <h1>Today</h1>
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
              
              <div id={"todo"+index} className={"todo clearfix " + (todo[2] ? "archived " : "") + (todo[1] ? "done" : "")}>
                <h1>True</h1>
                <input className="visibility" onChange={this.toggleVisibility.bind(this,index)} ref="visibility" checked={todo[2] ? "checked" : ""} type="checkbox" />
                 <input className="status" onChange={this.toggleToDo.bind(this,index)} ref="todoid" id={index} checked={todo[1] ? "checked" : ""} type="checkbox" />
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

ReactDOM.render(
  <ToDoList/>,
  document.getElementById('todolist')
);