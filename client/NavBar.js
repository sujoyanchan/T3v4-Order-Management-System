import {Link} from 'react-router-dom';

export default function NavBar(){

    const un = localStorage.getItem("un");

return(
    <>
    <center>
    <div className='nav'>
        {(un==null) && (<Link to='/'>Order</Link>)}
        {(un==null) && (<Link to='/admin'>Cafe Admin Login</Link>)}
        {(un != null) && ( <Link to="/home"> Home </Link>) }
    </div>
    </center>
    </>

);
}