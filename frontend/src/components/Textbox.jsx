export function Textbox({title, placeholder,type, onChange})
{
    return(
        <div className="my-4">
            <div className=" font-bold">{title}</div>
            <input onChange={onChange} className="p-2 mt-2 rounded-md border border-slate-300 w-full" type={type} placeholder={placeholder}/>
        </div>
    )
}