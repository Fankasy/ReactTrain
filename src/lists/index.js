import React from "react";

const Lists = ({lists,handleTimeTransfer,handleListClick,select})=>{
    return (
       lists.length===0? <div className ="nothing">Nothing to show yet</div>:
       <div className="lists">
       
        {lists.map((ele,index) =>{
            
            return (
                
                <div className = "list-cell" key ={index} style = {select === index ?{color:"#3788AF"}:{}}   onClick = {()=>handleListClick(ele,index)}>
                    <div className = "list-title"  >
                        {ele.subject}{ele.read === "false"&& <span>•</span>}
                    </div>
                    <div className = "list-from" style = {select === index ?{color:"#3788AF"}:{}}>
                        {ele.from} 
                        <span >
                        {handleTimeTransfer(ele)}
                            </span>
                        </div>
                    
                </div>
            );
        })}
        
       </div>
    );
}
export default Lists;