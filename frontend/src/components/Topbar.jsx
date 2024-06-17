
export function Topbar({firstName})
{
    return(
        <div className="sm:flex sm:justify-between sm:items-center py-2 sm:py-4 px-6 shadow-md">
            <p className=" font-semibold text-4xl">Payments App</p>
            <div className="flex items-center py-2 justify-between sm:py-0">
                <div className=" text-lg">
                    Hello, {firstName[0].toUpperCase()+firstName.slice(1)}
                </div> 
                <div className=" ml-3 w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer text-lg min-w-10 min-h-10">
                    {firstName[0].toUpperCase()}
                </div>
            </div>
        </div>
    )
}