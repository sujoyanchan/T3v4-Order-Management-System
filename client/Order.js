import { useState, useRef } from 'react';
import axios from 'axios';

export default function Order(){

    const date=new Date()
    const dt = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' '
    + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();

    const rName=useRef();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [delivery, setDelivery] = useState('');
    const[tea, setTea]=useState(false);
    const[coffee, setCoffee]=useState(false);
    const[juice, setJuice]=useState(false);
    const[milkshake, setMilkshake]=useState(false);
    const[soda, setSoda]=useState(false);

    const hName=(event)=>{setName(event.target.value)};
    const hPhone=(event)=>{setPhone(event.target.value)};
    const hEmail=(event)=>{setEmail(event.target.value)};
    const hDelivery=(event)=>{setDelivery(event.target.value)};
    const hTea=(event)=>{setTea(!tea)};
    const hCoffee=(event)=>{setCoffee(!coffee)};
    const hJuice=(event)=>{setJuice(!juice)};
    const hMilkshake=(event)=>{setMilkshake(!milkshake)};
    const hSoda=(event)=>{setSoda(!soda)};

    const save=(event)=>{
        event.preventDefault();
        let items='';
        if (tea)        items+='| TEA |'
        if (coffee)     items+='| COFFEE |'
        if (juice)      items+='| JUICE |'  
        if (milkshake)  items+='| MILKSHAKE |'
        if (soda)       items+='| SODA |' 

        let regex1 = /^[a-zA-Z\s]+$/;
        let regex2 = /^[0-9]+$/;
        let regex3=/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        let regex4=/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\s,]+$/;

        if (name===''){
            alert('name cannot be empty');
        }
        else if (!regex1.test(name)){
            alert('name entered should contain only letters');
            setName('');
        }
        else if (name.replace(' ','').length < 2 || name.replace(' ','').length > 15){
            alert('name entered should be between 2 to 15 letters');
            setName('');
        }
        else if (!regex2.test(phone)){
            alert('phone number should contain only digits');
            setPhone('');
        }
        else if (phone.length !== 10){
            alert('phone number entered should be 10 digits');
            setPhone('');
        }
        else if (email===''){
            alert('email cannot be empty');
        }
        else if (!regex3.test(email)){
            alert('invalid email format');
            setEmail('');
        }
        else if (email.length < 10 || email.length > 30){
            alert('email entered should be between 10 to 30 characters');
            setEmail('');
        }
        else if (delivery===''){
            alert('delivery address cannot be empty');
        }
        else if (!regex4.test(delivery)){
            alert('invalid delivery address');
            setDelivery('');
        }
        else if (delivery.length < 10 || delivery.length > 50){
            alert('delivery address entered should be between 10 and 50 characters');
            setDelivery('');
        }
        else if (items===''){
            alert('select atleast one item');
        }
        else{
            let data={name, phone, email, delivery, items, dt};
            let url = 'http://localhost:9000/save';
            axios.post(url, data)
            .then(res => {
                if (res.data.affectedRows === 1)
                {
                    alert('order saved');
                    setName('');
                    setPhone('');
                    setEmail('');
                    setDelivery('');
                    setTea(false);
                    setCoffee(false);
                    setJuice(false);
                    setMilkshake(false);
                    setSoda(false);
                    rName.current.focus();
                }
                if (res.data.errno === 1062)
                {
                    alert('order with name entered already exists');
                    setName('');
                    rName.current.focus();
                }
            })
            .catch(err => alert('issue ' + err));
        }

    }


return(
    <>
    <center>
    <h1>Order Page</h1>
    <form>
        <input type='text' placeholder='enter name'
        onChange={hName} value={name} ref={rName}/>
        <br/><br/>
        <input type='number' placeholder='enter phone number'
        onChange={hPhone} value={phone}/>
        <br/><br/>
        <input type='email' placeholder='enter email address'
        onChange={hEmail} value={email}/>
        <br/><br/>
        <input type='text' placeholder='enter delivery address'
        onChange={hDelivery} value={delivery}/>
        <h2>Select Menu Items</h2>
        <ul>
        <li>
        <input type='checkbox' checked={tea} onChange={hTea} className='largerCheckbox'/> TEA
        <img src="https://icons.iconarchive.com/icons/mira/office/128/cup-of-tea-icon.png" alt=''/>
        </li>
        <li>
        <input type='checkbox' checked={coffee} onChange={hCoffee} className='largerCheckbox'/> COFFEE
        <img src="https://icons.iconarchive.com/icons/kzzu/i-love-you/128/Coffee-brown-icon.png" alt=''/>
        </li>
        <li>
        <input type='checkbox' checked={juice} onChange={hJuice} className='largerCheckbox'/> JUICE
        <img src="https://icons.iconarchive.com/icons/sonya/swarm/128/Juice-icon.png" alt=''/>
        </li>
        <li>
        <input type='checkbox' checked={milkshake} onChange={hMilkshake} className='largerCheckbox'/> MILKSHAKE
        <img src="https://icons.iconarchive.com/icons/iconarchive/fat-sugar-food/128/Milkshake-Chocolate-icon.png" alt=''/>
        </li>
        <li>
        <input type='checkbox' checked={soda} onChange={hSoda} className='largerCheckbox'/> SODA
        <img src="https://icons.iconarchive.com/icons/ridessnow/u-r-what-u-eat/128/soda-coke-bottle-icon.png" alt=''/>
        </li>
        </ul>
        <button onClick={save} type='button' className='btn'>Order</button>
    </form>
    </center>
    </>

);
}
