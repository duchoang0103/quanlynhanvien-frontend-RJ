import React, {Component} from 'react';
import '../App.css';
import Item from './Item';
class List extends Component {
  constructor(props){
    super(props);
    this.state={
      filterName:'',
      filterPrice:'',
      filterStatus: -1 //tat ca: -1, kich hoat: 1, an: 0
    }
  }
  onChange=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilteryy(name === 'filterName' ? value : this.state.filterName,
    name === 'filterPrice' ? value : this.state.filterPrice,
    name === 'filterStatus' ? value : this.state.filterStatus)
    this.setState({
      [name]: value
    });

  }
  render(){
      var {tasks} = this.props;
      var {filterName,filterPrice,filterStatus}=this.state;
      var eleTasks =  tasks.map((task, index)=>{
          return(
              <Item key={index} index={index} task={task} 
              onUpdateStatuszz={this.props.onUpdateStatusyy} 
              onDeletezz={this.props.onDeleteyy} 
              onUpdatezz={this.props.onUpdateyy}/>
          );
      })
    return (
      
      <table className="table table-bordered table-hover mt-15">
          <thead>
              <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">TÊN</th>
                  <th className="text-center">LƯƠNG</th>
                  <th className="text-center">NĂM SINH</th>
                  <th className="text-center">VĂN BẰNG</th>
                  <th className="text-center">TRẠNG THÁI</th>
                  <th className="text-center">HÀNH ĐỘNG</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td></td>
                  <td>
                    <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange}/> 
                  </td>
                  <td>
                    <input type="text" className="form-control" name="filterPrice" value={filterPrice} onChange={this.onChange}/> 
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                      <select name="filterStatus" id="inputfilterStatus" className="form-control" required="required" onChange={this.onChange}>
                          <option value={-1}>Tất cả</option>
                          <option value={0}>Ẩn</option>
                          <option value={1}>Kích hoạt</option>
                      </select>
                      
                  </td>
              </tr>
              {eleTasks}

          </tbody>
      </table>
      
    );
  }
  
}

export default List;
