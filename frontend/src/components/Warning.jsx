import { NavLink } from "react-router-dom";

export function Warning({value, toValue, to})
{
    return(
        <div className="p-2 text-center my-2">
            {value}?  <NavLink className={`underline`} to={to}>{toValue}</NavLink>
        </div>
    )
}