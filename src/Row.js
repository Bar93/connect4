import React from "react";
import Cell from "./Cell";


function Row  ({ row })  {
    return (
        <tr>
            {row.map((cell) => <Cell value={cell} />)}
        </tr>
    );
};

export default Row;