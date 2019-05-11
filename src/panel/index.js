import React from "react";

const Panel = ({panel, handlePanelClick}) =>{

    return (
        <div className = "panel">
            <div className = "panel-top">
                Compose <i className="fas fa-pencil-alt"></i>
            </div>
            <div className = "panel-lists">
                <div className = "panel-bars">
                    <div className = "panel-select"  onClick = {()=>handlePanelClick(0)}> 
                        <i className="fas fa-inbox"></i> Inbox
                        <span>{panel[0]}</span>
                    </div>
                    <div className="panel-select" onClick = {()=>handlePanelClick(1)}>
                        <i className="fas fa-paper-plane"></i> Sent
                        <span>{panel[1]}</span>
                    </div>
                    <div className ="panel-select" onClick = {()=>handlePanelClick(2)}>
                    <i className="fas fa-edit"></i> Drafts
                    <span>{panel[2]}</span>
                    </div>
                    <div className = "panel-select" onClick = {()=>handlePanelClick(3)}>
                    <i className="fas fa-trash-alt"></i> Deleted
                    <span>{panel[3]}</span>
                    </div>
                
                </div>
            </div>

        </div>
    );
}
export default Panel;