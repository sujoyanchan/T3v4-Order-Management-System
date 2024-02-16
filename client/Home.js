import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home(){

    const nav = useNavigate();
    const [data, setData] = useState([]);

	useEffect( () => {
        let un = localStorage.getItem('un');
        if (un == null)
		{
			nav('/login');
		}
        else
        {
		let url = 'http://localhost:9000/show';
		axios.get(url)
		.then(res => { 
            setData(res.data);
         })
		.catch(err => alert('issue ' + err));
        }
	}, [nav]);
	
	const delStu = (name) => {
		let url = 'http://localhost:9000/remove';
		let d = { data: {name}};
		axios.delete(url, d)
		.then(res => { 
			alert('order deleted');
			window.location.reload();
		})
		.catch(err => alert('issue ' + err));
	};

    const logout=(event)=>{
        event.preventDefault();
        localStorage.clear();
        nav('/');
        window.location.reload();
    }

return(
    <>
    <center>
        <h1>Home Page</h1>
        <table border={3}>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Delivery</th>
                <th>Items</th>
                <th>Date</th>
            </tr>
            {
                data.map( (e) => (
                    <tr>
                        <td>{e.name}</td>
                        <td>{e.phone}</td>
                        <td>{e.email}</td>
                        <td>{e.delivery}</td>
                        <td>{e.items}</td>
                        <td>{e.date}</td>
                        <td>
                            <button className='dbtn'
                        onClick={()=>{
                            if (window.confirm('Delete this order?')) delStu(e.name)
                        }}>Delete</button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        <br/><br/>
        <form>
            <button onClick={logout} type='button' className='btn'>Logout</button>
        </form>
    </center>
    </>
);
}