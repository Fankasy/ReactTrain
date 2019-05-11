import React from 'react';
import './App.css';
import axios from "axios"
import Panel from "./panel";
import Lists from "./lists";
import Detail from "./detail";
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      panel:[],
      emails:[],
      lists:[],
      detail:null,
      err: null,
      select: -1
      
  };
  }

  componentDidMount() {
    axios.get("http://api.haochuan.io/emails")
    .then(res =>{
      this.setState({emails: res.data.emailData});
      this.prepareData();
    })
    .catch(err =>{
      this.setState({err: err});
      console.log("err");

    });
  }

  handlePanelClick = (e)=>{
    switch (e) {
      case 0:
        let tmp = this.state.emails.filter(ele=>{
          return ele.tag === "inbox";
        });
        tmp.sort((a,b) => {
          let readA = a.read;
          let readB = b.read;
          if(readA < readB) {
            return -1;
          }
          if(readA > readB) {
            return 1;
          }
          return 0;
        });
        this.setState({lists: tmp});
        this.setState({detail:null});
        this.setState({select:-1});
        break;
      case 1:
        let sent = this.state.emails.filter((ele=>{
          return ele.tag === "sent";
        }));
        this.setState({lists:sent});
        this.setState({detail:null});
        this.setState({select:-1});

        break;
      case 2:
        let drafts = this.state.emails.filter((ele)=>{
          return ele.tag === "drafts";

        });
        this.setState({lists: drafts});
        this.setState({detail:null});
        this.setState({select:-1});

        break;
        
      case 3:
        let deleted = this.state.emails.filter((ele)=>{
          return ele.tag === "deleted";

        }); 
        this.setState({lists:deleted});
        this.setState({detail:null});
        this.setState({select:-1});

        break;

    }

  }
  handleTimeTransfer = (ele)=>{
    let monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let ti = new Date(ele.time);
    let timeString = monthNames[ti.getMonth()]+" " + (ti.getDate()+1) +", "+ti.getFullYear();
    return timeString;
  }
handleDetailTimeTransfer = (ele)=>{
  let monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  let ti = new Date(ele.time);
  let timeString = monthNames[ti.getMonth()]+" " + (ti.getDate()+1) +", "+ti.getFullYear() +" "+ ti.getHours()+":"+ti.getMinutes();
  return timeString;
}


  handleListClick = (ele,index)=>{
    this.setState({select:index});
    if (ele.read === "false"){
      ele.read= "true";
      let tmp = this.state.emails.filter(ele => {
        return ele.tag ==="inbox" && ele.read === "false";
      }).length;
      this.state.panel[0] = tmp;
    }

    this.setState({detail:ele});
  }  
  deleteEmail = (email)=>{
    email.tag = "deleted";
    let tmpList = this.prepareData();
    this.setState({lists:tmpList});
    this.setState({detail:null});
  }
  prepareData = ()=>{
    let panel = [];

      panel.push(this.state.emails.filter(ele => {
        return ele.tag ==="inbox" && ele.read === "false";
      }).length);
      panel.push(this.state.emails.filter(ele => {
        return ele.tag === "sent";
      }).length);
      panel.push(this.state.emails.filter(ele =>{
        return ele.tag === "draft";
      }).length);
      panel.push(this.state.emails.filter(ele => {
        return ele.tag ==="deleted";
      }).length);
      this.setState({panel:panel});
      return this.state.emails.filter((ele) =>{
        return ele.tag ==="inbox";
      });
  }

  render() {
    const {panel,emails,lists,detail,err}  = this.state;
    return (
      <div className =  "container">
        <Panel panel = {panel} handlePanelClick = {this.handlePanelClick}/>
        <Lists lists ={lists} handleTimeTransfer ={this.handleTimeTransfer} handleListClick = {this.handleListClick} select= {this.state.select}/>
        <Detail detail={detail} handleDetailTimeTransfer={this.handleDetailTimeTransfer} deleteEmail={this.deleteEmail}/>

      </div>
    );
  }
}
export default App;
