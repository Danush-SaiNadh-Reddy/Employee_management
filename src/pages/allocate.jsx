import React, { useEffect, useState } from 'react'
const Allocate = () => {
    const ObtainData = JSON.parse(localStorage.getItem('employeename')) || {};

    const [PNAME, setPNAME] = useState('');
    const [Percent, setPercent] = useState('');
    const [employees, setNewemployees] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/data')
            .then((res) => res.json())
            .then(data => setNewemployees(data))
            .catch(error => console.error('error fetching data:', error));
    }, []);
    const handlechange = (event) => {
        setPNAME(event.target.value);
    };
    const percentchange = (e) => {
        setPercent(e.target.value);
    }; 
    
    const ENAME = ObtainData.selectedOption ? ObtainData.selectedOption.label : '';



    const assign = (ENAME, PNAME, Percent) => {
        const newPercentage = parseInt(Percent, 10);
        if (ENAME === "") {
            alert("PLEASE SELECT EMPLOYEE NAME");
            return;
        }
        if (PNAME === "") {
            alert("PLEASE ENTER PROJECT NAME");
            return;
        }
        if (Percent ==="") {
            alert("PLEASE ENTER PERCENTAGE");
            return;
        } 
        if (newPercentage<1 || newPercentage>100) {
            alert("PLEASE ENTER  VALID PERCENTAGE WHICH LIES BETWEEN 1 AND 100");
            return;
        }

        if (employees.length === 0) {
            console.error('Employees data not yet loaded');
            return;
        }

        const updatedEmployee = employees.map(item => {
            if (item.employeeName === ENAME) {

                const totalPercentage = item.percentage.reduce((acc, curr) => acc + curr, 0) + newPercentage;
                if (totalPercentage > 100) {
                    alert("Total percentage exceeds 100%");
                    return item;
                }
                return {
                    ...item,
                    project: [...item.project, PNAME],
                    percentage: [...item.percentage, newPercentage],
                };

            }

            return item;

        })
        const employeeToUpdate = updatedEmployee.find(emp => emp.employeeName === ENAME);

        fetch(`http://localhost:3030/data/${employeeToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeToUpdate),
        })
            .then(response => response.json())
            .then(data => {
                setNewemployees(updatedEmployee);
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        setPNAME('')
        setPercent('');

    }
    return (
        <div className='bg-slate-600 min-h-screen'>
            <div className='text-center text-3xl  text-bold py-6 text-white  '>ALLOCATE PAGE</div>
            <div className='text-xl font-semibold text-center text-white py-6 px-8  '>
                SELECTED EMPLOYEE NAME : &emsp;&emsp;{ENAME.toUpperCase()}
            </div>

            <div className='flex flex-row items-center justify-between  pt-8 pb-4 px-56'>
                <div className='text-l text-white'>NEW PROJECT NAME :</div>
                <div className='pr-6'><input placeholder='PROJECT NAME' value={PNAME} onChange={handlechange} className='border-2 rounded bg-slate-300 outline-none border-slate-500 placeholder: text-center'></input></div>
                <div className='text-l text-white '>PROJECT PERCENTAGE :</div>
                <div ><input type="number" min="1" max="100" placeholder='PERCENTAGE' value={Percent} onChange={percentchange} className='w-44 border-2 rounded bg-slate-300 outline-none border-slate-500 placeholder: text-center'></input></div>
            </div>

            <div className='text-center pt-8 pb-4'><button className="bg-orange-500 text-white hover:bg-orange-600 w-24 border-2 rounded-lg " onClick={() => assign(ENAME, PNAME, Percent)}>ALLOCATE</button></div>
            <div className='pt-5'>
                <div className='grid grid-cols-4 items-center justify-between gap-16 py-2 bg-slate-500'>
                    <div className='text-white text-center text-bold px-20'>FULL NAME</div>
                    <div className='text-white text-center text-bold '>EMAIL</div>
                    <div className='text-white text-center text-bold'>PROJECT</div>
                    <div className='text-white text-center text-bold'>PERCENTAGE</div>
                </div>
            </div>

            {employees.map((item) => (
                item.employeeName === ENAME && (
                    <div key={item.id} className='grid grid-cols-4 items-center justify-between gap-16 py-2 bg-slate-400'>
                        <div className='text-white text-center text-bold px-20'>{item.employeeName}</div>
                        <div className='text-white text-center text-bold '>{item.email}</div>
                        <div className='text-white text-center text-bold'>{item.project.map((project, index) => (<div key={index}>{project}</div>))}</div>
                        <div className='text-white text-center text-bold'>{item.percentage.map((percentage, index) => (<div key={index}>{percentage}</div>))}</div>
                    </div>
                )))}

        </div>





    )
}

export default Allocate 
