import React from "react";

const Detail = ({detail,handleDetailTimeTransfer,deleteEmail}) => {
    return (
        detail === null?<div className = "no-detail">
        </div>:
        <div className ="detail">
            <div className = "detail-top">
                <div className = "detail-title">{detail.subject}
                    {detail.tag !=="deleted" && <span><i className="fas fa-trash-alt" onClick = {()=>deleteEmail(detail)}></i></span>}
                </div>
                <div className="detail-from">
                    {detail.from}  <span> {handleDetailTimeTransfer(detail)}</span>
                    
                </div>
            </div>
            <div className = "detail-message">
                {detail.message}
            </div>
        </div>
    );
}
export default Detail;