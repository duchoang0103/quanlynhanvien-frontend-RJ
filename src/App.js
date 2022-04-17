
import React, {Component} from 'react';
import Form from './components/Form';
import Search_sort from './components/Search_sort';
import List from './components/List';
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks: [],//id: unique, name, luong, status
      displayform: false,
      taskEditing: null,
      filter: {
        name:'',
        luong:'',
        status: -1
      },
      keyword: '',
      sort :{
        by:'',
        //pri:'',
        value: 1
      }
    }
    this.onDisForm=this.onDisForm.bind(this);
  }
  // async UNSAFE_componentWillMount(){
  //   if(localStorage && localStorage.getItem('tasks')){
  //     var tasks = JSON.parse(localStorage.getItem('tasks'));
  //     this.setState({
  //       tasks: tasks
  //     });
  //   }
  // }
  reload =async()=>{
    //let res = await fetch('http://localhost:1337/api/nhanviens')
    //let data = await res.json();
    const res = await axios.get('http://localhost:1337/api/nhanviens?populate=filest');
    let data=res.data;
    //console.log(data);
    var array=[];
    data.data.forEach(nhanvien => {
      var arr={
        id: nhanvien.id,
        name:nhanvien.attributes.name,
        filest: nhanvien.attributes.filest,
        luong:nhanvien.attributes.luong,
        namsinh: nhanvien.attributes.namsinh,
        status: nhanvien.attributes.status//an 
      }
      //console.log(arr)
      array.push(arr);
    });
    this.setState({
      tasks: array,
    });
  }
  async componentDidMount(){
    //let res = await fetch('http://localhost:1337/api/nhanviens')
    //let data = await res.json();
    const res = await axios.get('http://localhost:1337/api/nhanviens?populate=filest');
    let data=res.data;
    //console.log(data);
    var array=[];
    data.data.forEach(nhanvien => {
      var arr={
        id: nhanvien.id,
        name:nhanvien.attributes.name,
        filest: nhanvien.attributes.filest,
        luong:nhanvien.attributes.luong,
        namsinh: nhanvien.attributes.namsinh,
        status: nhanvien.attributes.status//an 
      }
      //console.log(arr)
      array.push(arr);
    });
    this.setState({
      tasks: array,
      taskEditing: null
    });
    
  }

  onDisForm=()=>{//them task
    if(this.state.displayform && this.state.taskEditing !== null)
    {
      this.setState({
      
        // displayform: true,
        taskEditing:null
        
      });
    }
    else{
      this.setState({
      
        displayform: !this.state.displayform,
        taskEditing:null
        
      });
    }
    
  }
  oncloseForm=()=>{
    this.setState({
      displayform: false
    });
  }
  onshowForm=()=>{
    this.setState({
      displayform: true
    });
  }
  onSubmit=async (data)=>{
    //console.log(data);
    var idpdf;
    var filenv=data.filest;
    var {tasks} = this.state; //tasks=this.state.tasks
    if(data.id === ''){//Them nhan vien
      var modifiedData = {
        name:data.name,
        namsinh:data.namsinh,
        luong:data.luong,
        status:data.status
      }
      try {
        const response = await axios.post(
          'http://localhost:1337/api/nhanviens',
           {data:modifiedData}
        )
        .then(res=>idpdf=res.data.data.id);
        //console.log(response);
        //this.reload();
      } catch (error) {
        this.setState({ error });
      }
      const formData = new FormData();

      Array.from(filenv).forEach(file => {
      formData.append('files', file);
      formData.append('refId',idpdf)
      formData.append('ref','api::nhanvien.nhanvien')
      formData.append('field','filest')
      });
      //console.log(formData)
      
      await axios
      .post(`http://localhost:1337/api/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
          //console.log(res);
      })
      .catch(err => {
          //console.log(err);
      });
      //data.id=this.generateID();
      tasks.push(data);
      this.setState({
        tasks:tasks
      })
      this.reload();
    }
    else{//Chinh sua thong tin nhan vien
      var index = this.findIndex(data.id);
      tasks[index]=data;

      var modifiedData ={
      name:data.name,
      namsinh:data.namsinh,
      luong:data.luong,
      status: tasks[index].status
      
      }
      try {
        const response = await axios.put(
          'http://localhost:1337/api/nhanviens/'+data.id,
          {data:modifiedData}
        );
        this.reload();
      } catch (error) {
        this.setState({ error });
      }

      
      
    }
    //console.log(data);
    
    // const res=await axios.post("http://localhost:1337/api/abcs",{abcd:'ggggg'},{
    //     headers: {
    //         'content-type': 'application/json',
    //     }
    // }
    // );

    

    //console.log(res)

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    //console.log(tasks)
    //localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  onUpdateStatus=async (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    //console.log(id);
    if(index!==-1){
      tasks[index].status = !tasks[index].status
      var modifiedData ={
        status: tasks[index].status,
      }
      try {
        const response = await axios.put(
          'http://localhost:1337/api/nhanviens/'+id,
           {data:modifiedData}
        );
        this.reload();
        //console.log(response);
      } catch (error) {
        this.setState({ error });
      }
      this.setState({
        tasks: tasks
      });
    }
    
  }
  findIndex=(id)=>{
    var result =-1;
    var {tasks} = this.state;
    tasks.forEach((task,index)=>{
      if(task.id===id){
        //console.log(index);
        result = index;
      }
    });
    return result;
  }
  onDelete=async (task)=>{
    //console.log(task.filest);
    //console.log(task.id)
    var {tasks} = this.state;
    var index = this.findIndex(task.id);
    //console.log(index);
    if(index!==-1){
      try {
        const response = await axios.delete(
          'http://localhost:1337/api/nhanviens/'+task.id
        );
        this.reload();
        //console.log(response);
      } catch (error) {
        this.setState({ error });
      }
      // tasks.splice(index,1);
      // this.setState({
      //   tasks: tasks
      // });
      //localStorage.setItem('tasks',JSON.stringify(tasks));

      
      if(task.filest.data!=null)
      {
        axios
      .delete('http://localhost:1337/api/upload/files/'+task.filest.data[0].id, {
          headers: { 'Content-Type': 'multipart/form-data' },
      })
      .catch(err => {
          console.log(err);
      });
      }
      

      this.oncloseForm();
    }
  }
  onUpdate=(id)=>{
    //console.log(id);
    var {tasks} = this.state;//{tasks} phai lay trung ten tasks trong json state #1
    var index = this.findIndex(id);
    // var modifiedData ={
    //   name:data.name,
    //   namsinh:data.namsinh,
    //   luong:data.luong,
    //   status: tasks[index].status
      
    // }
    // try {
    //   const response = await axios.put(
    //     'http://localhost:1337/api/nhanviens/'+id,
    //      {data:modifiedData}
    //   );
    //   console.log(response);
    // } catch (error) {
    //   this.setState({ error });
    // }

    var taskEditing = tasks[index];//or tasks.tasks[index] neu o #1 gan kieu var tasks= this.state
    this.setState({
      taskEditing: taskEditing
    });
    this.onshowForm();
  }
  onFilter=(filterName,filterPrice,filterStatus)=>{
    filterStatus = parseInt(filterStatus,10);
    this.setState({
      filter:{
        name: filterName.toLowerCase(),
        luong: filterPrice,
        status: filterStatus
      }
    });
  }
  onSearch = (keyword)=>{
    this.setState({
      keyword:keyword
    });
  }
  onSort=async (sort)=>{
    await this.setState({
      sort:{
        by: sort.by,
        value: sort.value
      }
    })
  }
  render(){
    var {tasks,filter} = this.state;
    //console.log(tasks);
    if(filter){
        if(filter.name){
          tasks = tasks.filter(task=>{
            return task.name.toLowerCase().indexOf(filter.name) !== -1;//khi kiem tra task.name.toLowerCase().indexOf(filter.name) ko co trong mang thi se tra ve gia tri -1 - cai task nao co return true thi tra ra 
          })
        }
        if(filter.luong){
          console.log(typeof(filter.luong));
          tasks = tasks.filter(task=>{
            var a=task.luong;
            return String(a).toLowerCase().indexOf(filter.luong) !== -1;//khi kiem tra ko co trong mang thi se tra ve gia tri -1
          })
        }
        if(filter.status || filter.status===0){//bo if o day cung dc
          tasks = tasks.filter(task=>{
            if(filter.status === -1){
              return tasks
            }
            else{
              return task.status === (filter.status === 1 ? true:false)
            }
          })
        }
      }
    if(this.state.keyword){
      
      tasks = tasks.filter(task=>{
        return task.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;//khi kiem tra task.name.toLowerCase().indexOf(filter.name) ko co trong mang thi se tra ve gia tri -1 - cai task nao co return true thi tra ra 
      })
      console.log(tasks)
    }
    if(this.state.sort.by === 'name')
    {
      tasks.sort((a,b)=>{
        if(a.name>b.name){
          return this.state.sort.value
        }
        else if(a.name<b.name){
          return -this.state.sort.value
        }
        else{
          return 0;
        }
      })
    }
    else if(this.state.sort.by === 'luong'){
      tasks.sort((a,b)=>{
        var az=parseInt(a.luong,10);
        var bz=parseInt(b.luong,10);
        if(az>bz){
          return -this.state.sort.value
        }
        else if(az<bz){
          return this.state.sort.value
        }
        else{
          return 0;
        }
      })
    }
    else if(this.state.sort.by === 'status'){
      tasks.sort((a,b)=>{
        if(a.status>b.status){
          return -this.state.sort.value
        }
        else if(a.status<b.status){
          return this.state.sort.value
        }
        else{
          return 0;
        }
      })
    }
    
    var disform = this.state.displayform ? <Form onSubmityy={this.onSubmit} oncloseForms = {this.oncloseForm} task={this.state.taskEditing}/> : '';
    return (
      
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Nhân Viên</h1><hr/>
        </div>    
        <div className="row">
          <div className={this.state.displayform ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
            {disform}
          </div>
          
          <div className={this.state.displayform ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            
            <button type="button" className="btn btn-primary" onClick={this.onDisForm} >
              <i className="fa fa-plus mr-5" ></i>
              Thêm nhân viên</button>
            
              <Search_sort onSearchyy={this.onSearch} onSortyy={this.onSort}/>
              <List tasks={tasks} onUpdateStatusyy={this.onUpdateStatus} onDeleteyy={this.onDelete} onUpdateyy={this.onUpdate} onFilteryy={this.onFilter}/>
            
          </div>
           
        </div>
      </div>
    );
  }
  
}

export default App;
