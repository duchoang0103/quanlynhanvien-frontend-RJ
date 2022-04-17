import React, {Component} from 'react';
import '../App.css';
class Search_sort extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword: '',
            sort:{
                by:'',
                //pri:'',
                value:1
            }
            
        }
    }
    onChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });

    }
    onSearch=()=>{
        this.props.onSearchyy(this.state.keyword)
    }
    onClick = async (sortBy,sortValue)=>{
        await this.setState({ //setState nay chay ngam . async , await de chac chan chay setState xong moi chay tiep cac tien trinh khac
            sort :{
                by: sortBy,
                value: sortValue
            }
        })

        this.props.onSortyy(this.state.sort);
    }
  render(){
      var {keyword,sort} = this.state;
    return (
        
        <div className="row mt-15">
            {/*seach*/}
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
               
               <div className="input-group">
                    <input type="text" className="form-control" name="keyword" placeholder="Nhap tu khoa..." value={keyword} onChange={this.onChange}/>    
                    <span className="input-group-btn">
                       <button type="button" className="btn btn-primary" onClick={this.onSearch}>
                           <i className="fa fa-search mr-5" ></i>Tìm NV
                       </button>
                    </span>
               </div>
           </div>
           {/*sort*/}
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
             <div className="dropdown">
                 
                 <button type="button" 
                 className="btn btn-primary dropdown-toggle" 
                 id="dropdowMenu1" 
                 data-toggle="dropdown" 
                 aria-haspopup="true" 
                 aria-expanded="true"> Sắp xếp
                    <i className="fa fa-caret-square-o-down ml-5" ></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={()=> this.onClick('name',1)}>
                        <a role="button" className={(sort.by==='name' && sort.value===1) ? 'sort_selected' :''}>
                            <i className="fa fa-sort-alpha-asc pr-5"> Tên: A-Z</i>

                        </a>
                    </li>
                    <li onClick={()=> this.onClick('name',-1)}>
                        <a role="button" className={(sort.by==='name' && sort.value===-1) ? 'sort_selected' :''}>
                            <i className="fa fa-sort-alpha-desc pr-5"> Tên: Z-A</i>

                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li onClick={()=> this.onClick('luong',1)}>
                        <a role="button" className={(sort.pri==='luong' && sort.value===1) ? 'sort_selected' :''}>
                            <b>Lương</b>: Cao-Thấp

                        </a>
                    </li>
                    <li onClick={()=> this.onClick('luong',-1)}>
                        <a role="button" className={(sort.pri==='luong' && sort.value===-1) ? 'sort_selected' :''}>
                            <b>Lương</b>: Thấp-Cao

                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li onClick={()=> this.onClick('status',1)}>
                        <a role="button" className={(sort.by==='status' && sort.value===1) ? 'sort_selected' :''}>
                            Trạng Thái Kích Hoạt
                        </a>
                    </li>
                    <li onClick={()=> this.onClick('status',-1)}>
                        <a role="button" className={(sort.by==='status' && sort.value===-1) ? 'sort_selected' :''}>
                            Trạng Thái Ẩn
                        </a>
                    </li>

                </ul>
                 
             </div>
           </div>
        </div>

    );
  }
  
}

export default Search_sort;
