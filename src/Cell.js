import React from "react";



function Cell  ({ value}) {
    let color = 'white';
    if (value === 0) {
        color = 'black';
    }
    if (value === 1) {
        color = 'red';
    }
    if (value === 2) {
        color = 'yellow';
    }
    return (
        <td>
            <div className="cell">
                <div className={color}></div>
            </div>
        </td>
    )
}

export default Cell;