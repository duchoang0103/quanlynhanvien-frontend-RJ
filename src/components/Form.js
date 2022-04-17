import React, {Component} from 'react';
import '../App.css';
class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            luong:'',
            namsinh:'',
            filest:'',
            status:false
        }

    }

    

    UNSAFE_componentWillMount(){//duoc goi 1 lan khi mo form
        //khi form duoc mo kiem tra xem task tuc la taskEditing co gia tri hay ko de phan biet them va sua
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                luong: this.props.task.luong,
                namsinh: this.props.task.namsinh,
                filest: this.props.task.filest,
                status: this.props.task.status
            });
            //console.log(this.state);
        }
    }
    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if(nextProps && nextProps.task){
    //         this.setState({
    //             id: nextProps.task.id,
    //             name: nextProps.task.name,
    //             luong: nextProps.task.luong,
    //             namsinh: nextProps.task.namsinh,
    //             filest: nextProps.task.filest,
    //             status: nextProps.task.status
    //         });
    //         //console.log(this.state);
    //     }
    //     else if(nextProps.task===null)
    //     {
    //         this.setState({
    //             id:'',
    //             name:'',
    //             luong:'',
    //             namsinh:'',
    //             filest:'',
    //             status:false
    //         });
    //     }
    // }
    oncloseForm=()=>{
        this.props.oncloseForms();
    }
    onChange = (event)=>{
        var target=event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status'){
            value = target.value === 'true'? true:false;// chuyen sang kieu boolean
        }
        this.setState({
            [name]:value
        });
        
    }
    onImageChange = (event) => {
        //console.log(event.target.files);
    
        this.setState({
          filest: event.target.files,
        });
      };

    onSubmit=(event)=>{
        if(this.state.name === '' )
        {
           alert('Bạn chưa nhập tên nhân viên!'); 
           event.preventDefault();
        }
        else if(this.state.luong === '' )
        {
           alert('Bạn chưa nhập lương nhân viên!'); 
           event.preventDefault();
        }
        else if(this.state.namsinh === '' )
        {
           alert('Bạn chưa nhập năm sinh nhân viên!'); 
           event.preventDefault();
        }
        
        else{
            event.preventDefault();
            //console.log(this.state);
            this.props.onSubmityy(this.state);
            this.onCancle();
            this.oncloseForm();
        }
        
    }
    onCancle=()=>{
        this.setState({
            name: '',
            luong:'',
            namsinh:'',
            filest:'',
            status: false
        });
    }

  render(){
      var {id}= this.state;
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
                  <h3 className="panel-title"> {id===''?'Thêm sản phẩm':'Chỉnh sửa sản phẩm'}
                        <span className="fa fa-times-circle text-right" onClick={this.oncloseForm}></span>
                  </h3>
            </div>
            <div className="panel-body">
                  
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <label>Tên: </label>
                          <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                      </div>
                      <div className="form-group">
                          <label>Lương: </label>
                          <input type="number" className="form-control" name="luong" value={this.state.luong} onChange={this.onChange}/>
                      </div>
                      <div className="form-group">
                          <label>Năm sinh: </label>
                          <input type="date" className="form-control" name="namsinh" value={this.state.namsinh} onChange={this.onChange}/>
                      </div>
                      <div className="form-group">
                          <label>VĂN BẰNG: </label>
                          <input type="file" className="form-control" name="filest"  onChange={this.onImageChange}/>
                      </div>
                      <label>Trạng thái: </label>
                      
                      <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                          <option value={true}>Kích Hoạt</option>
                          <option value={false}>Ẩn</option>
                      </select><br/>
                      <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5" ></span> Lưu lại
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onCancle}>
                                <span className="fa fa-close mr-5" ></span> Hủy bỏ
                            </button>&nbsp;
                      </div>
                
                  </form>
                  
            </div>
      </div>
      
    );
  }
  
}

export default Form;
