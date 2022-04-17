import React, {Component} from 'react';
import '../App.css';
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 2
})
class Item extends Component {
  onUpdateStatus=()=>{
   // console.log(this.props.task.id);
   this.props.onUpdateStatuszz(this.props.task.id)
  }
  onDelete=()=>{
    this.props.onDeletezz(this.props.task)
  }
  onUpdate=()=>{
    this.props.onUpdatezz(this.props.task.id)
  }
  
  render(){
    
    var {task,index} = this.props;
    console.log(task.filest);
    return (
            <tr>
                  <td className="text-center cgiua">{index+1}</td>
                  <td className="text-center cgiua">{task.name}</td>
                  
                  <td className="text-center cgiua" ><div>{formatter.format(task.luong)}</div></td>
                  <td className="text-center cgiua">{task.namsinh}</td>
                  <td className="text-center cgiua"> <button type="button" className="btn btn-warning mlt-3-5" onClick={() => {(task.filest.data)? (window.open('http://localhost:1337'+task.filest.data[0].attributes.url)) : alert('khong co file')}} >
                          <i className="fa fa-pencil mr-5"></i>
                          File 
                        </button></td>
                  <td className="text-center cgiua">
                  <span className={task.status=== true ?'label label-success':'label label-danger'} onClick={this.onUpdateStatus}>{task.status === true ?'Kich hoat':'An'}</span>
                  </td>
                  <td className="text-center cgiua">     
                      <button type="button" className="btn btn-warning mlt-3-5" onClick={this.onUpdate}>
                          <i className="fa fa-pencil mr-5"></i>
                          Sửa
                        </button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                          <i className="fa fa-trash mr-5"></i>
                          Xóa
                        </button>
                  </td>
              </tr>
      
    );
  }
  
}

export default Item;
