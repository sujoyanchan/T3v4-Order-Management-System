import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


export default function Home() {

    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let un = localStorage.getItem('un');
        if (un == null) {
            nav('/admin');
        }
        else {
            const fetchDataWithDelay = () => {
                setTimeout(() => {
                    let url = 'http://localhost:9000/show';
                    axios.get(url)
                        .then(res => {
                            setData(res.data);
                            setLoading(false);
                        })
                        .catch(err => {
                            setLoading(false);
                            alert('issue ' + err);
                        });
                }, 3000);
            };
            fetchDataWithDelay();

        }
    }, [nav]);


    const delStu = (name) => {
        let url = 'http://localhost:9000/remove';
        let d = { data: { name } };
        axios.delete(url, d)
            .then(res => {
                alert('order deleted');
                window.location.reload();
            })
            .catch(err => alert('issue ' + err));
    };

    const logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        nav('/');
        window.location.reload();
    }

    return (
        <>
            <center>
                <h1>Home Page</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        {data.length !== 0 ?

                            <table border={3}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Delivery</th>
                                        <th>Items</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((order, index) => (
                                            <tr key={index}>
                                                <td>{order.name}</td>
                                                <td>{order.phone}</td>
                                                <td>{order.email}</td>
                                                <td>{order.delivery}</td>
                                                <td>{order.items}</td>
                                                <td>{order.date}</td>
                                                <td>
                                                    <button className='dbtn'
                                                        onClick={() => {
                                                            if (window.confirm('Delete this order?')) delStu(order.name)
                                                        }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            : <h3>Orders not found</h3>
                        }
                    </>
                )}

                <br /><br />
                <form>
                    <button onClick={logout} type='button' className='btn'>Logout</button>
                </form>
            </center>
        </>
    );
}
