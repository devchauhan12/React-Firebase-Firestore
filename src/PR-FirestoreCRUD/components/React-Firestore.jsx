import React, { useEffect, useState } from 'react'
import '../server/firebase.js'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../server/firebase.js'

const ReactFirestore = () => {
    const initial = {
        name: '',
        email: ''
    }
    const [input, setInput] = useState(initial)
    const [errors, setErrors] = useState({})
    const [data, setData] = useState([]);
    const [state, setState] = useState(true)
    const [updateID, setId] = useState(true)

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'Users'))

        var list = []
        querySnapshot.forEach((doc) => {
            var data = doc.data()
            list.push({ id: doc.id, ...data, })
        });
        setData(list);
    };

    function validate() {
        let error = {}
        if (input.name.length < 1) {
            error.name = 'Enter Your Name'
        }
        if (input.email.length < 1) {
            error.email = 'Enter Your Email'
        }
        return error;
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        const checkErrors = validate()

        if (Object.keys(checkErrors).length > 0) {
            setErrors(checkErrors)
        } else {
            await addDoc(collection(db, "Users"), input)
            fetchData()
            setErrors({})
            setInput(initial)
        }
    }

    const handleDeleteItem = async (id) => {
        const userRef = doc(db, `Users/${id}`)
        await deleteDoc(userRef)
        fetchData()
    };
    const handleEdit = async (id) => {
        if (state) {
            setState(false)
            setId(id)
            const user = data.filter((e) => {
                return e.id === id ? e : false
            })
            setInput(user[0])

        } else {
            const userRef = doc(db, `Users/${updateID}`)
            await updateDoc(userRef, input)
            setId('')
            setState(true)
            fetchData()
            setInput(initial)
        }
    };
    return (
        <div>
            <h1 className='text-center'>Firestore CRUD</h1>
            <form className="form m-auto my-5" onSubmit={(e) => e.preventDefault()}>


                <div className="flex-column">
                    <label>User Name </label></div>
                <div className="inputForm">
                    <svg height="25" width="25" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 2" id="Layer_2"><path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" /><path d="M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z" /><path d="M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.39,13.39,0,0,1,9.82,4.32A1,1,0,0,1,25.55,24Z" /></g><g id="frame"><rect className="cls-1" fill="none" height="32" width="32" /></g></svg>
                    <input type="text" className="input" name='name' placeholder="Enter your Name" value={input.name} onChange={handleChange} />
                </div>
                {errors.name ? <p>{errors.name}</p> : null}
                <div className="flex-column">
                    <label>Email </label></div>
                <div className="inputForm">
                    <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                    <input type="email" className="input" name='email' placeholder="Enter your Email" value={input.email} onChange={handleChange} />
                </div>
                {errors.email ? <p>{errors.email}</p> : null}

                <button className="button-submit" onClick={(e) => handleAdd(e)} style={{ display: !state ? 'none' : 'block' }}>Add User</button>
                <button className="button-submit" onClick={(e) => handleEdit(e)} style={{ display: state ? 'none' : 'block' }}>Update</button>
            </form>

            <table className="table table-dark w-75 m-auto">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => (
                        <tr key={e.id}>
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td className='d-flex'>
                                <button className='btn btn-info me-2' onClick={() => handleEdit(e.id)} disabled={!state}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDeleteItem(e.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReactFirestore