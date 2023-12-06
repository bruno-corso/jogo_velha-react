const Square = ({value, clica}) => {
    return ( 
        <button className="square" onClick={clica}>{value}</button>
     );
}
 
export default Square;