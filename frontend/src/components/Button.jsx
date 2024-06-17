export function Button({value, onClick})
{
    return(
        <div className="flex justify-center my-5">
            <button onClick={onClick} className="w-full font-medium rounded-lg p-2 text-white bg-black hover:bg-slate-800">{value}</button>
        </div>
    )
}