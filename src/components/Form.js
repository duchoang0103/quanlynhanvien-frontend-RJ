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
           alert('B???n ch??a nh???p t??n nh??n vi??n!'); 
           event.preventDefault();
        }
        else if(this.state.luong === '' )
        {
           alert('B???n ch??a nh???p l????ng nh??n vi??n!'); 
           event.preventDefault();
        }
        else if(this.state.namsinh === '' )
        {
           alert('B???n ch??a nh???p n??m sinh nh??n vi??n!'); 
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
                  <h3 className="panel-title"> {id===''?'Th??m s???n ph???m':'Ch???nh s???a s???n ph???m'}
                        <span className="fa fa-times-circle text-right" onClick={this.oncloseForm}></span>
                  </h3>
            </div>
            <div className="panel-body">
                  
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <label>T??n: </label>
                          <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                      </div>
                      <div className="form-group">
                          <label>L????ng: </label>
                          <input type="number" className="form-control" name="luong" value={this.state.luong} onChange={this.onChange}/>
                      </div>
                      <div className="form-group">
                          <label>N??m sinh: </label>
                          <input type="date" className="form-control" name="namsinh" value={this.state.namsinh} onChange={this.onChange}/>
                      </div>
                      <div className="form-group">
                          <label>V??N B???NG: </label>
                          <input type="file" className="form-control" name="filest"  onChange={this.onImageChange}/>
                      </div>
                      <label>Tr???ng th??i: </label>
                      
                      <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                          <option value={true}>K??ch Ho???t</option>
                          <option value={false}>???n</option>
                      </select><br/>
                      <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5" ></span> L??u l???i
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onCancle}>
                                <span className="fa fa-close mr-5" ></span> H???y b???
                            </button>&nbsp;
                      </div>
                
                  </form>
                  
            </div>
      </div>
      
    );
  }
  
}

export default Form;
