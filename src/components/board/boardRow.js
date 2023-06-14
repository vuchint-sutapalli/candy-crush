const BoardRow = ({columns, colors}) => {


    return (
        <div id="boardRow">
            {
                [...Array(columns)].map((x, i) => {
                    return  <span>x</span>
                }  
                )
            }
            
        </div>
    )
}
export default BoardRow;