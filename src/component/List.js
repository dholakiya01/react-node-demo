import React, { useEffect, useState } from 'react'
import Dashbord from './Dashbord'
import axios from 'axios';
import '../css/list.css'
import 'bootstrap'

// import Pagination from './Pagination';


const List = () => {
    const [user, setuser] = useState([])

    // const [pagedata, setpagedata] = useState([])
    const [totalUser, settotalUser] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [userperpage] = useState(5)
    const [search, setsearch] = useState("")
    // console.log(pagecount)

    useEffect(() => {
        resp()
    }, [currentPage, userperpage, search]);

    const handlesearch = (e) => {
        setsearch(e.target.value)
        console.log(e.target.value)
    }

    const resp = async () => {
        try {
            const data = await axios.post("http://localhost:4500/user/list",
                {
                    page: currentPage,
                    limit: userperpage,
                    searchterm: search
                })
            // setuser(posts)
            setuser(data.data.users)
            settotalUser(data.data.totaluser, " 31")
            console.log(data.data.users)

        } catch (err) {
            console.log(err)
        }
    }
    const totalpages = Math.ceil(totalUser / userperpage);

    const pagenumber = [];
    for (let i = 1; i <= totalpages; i++) {
        pagenumber.push(i)
    }

    const handlenext = () => {
        setcurrentPage((prePage) => prePage + 1)

    };
    const handleprev = () => {
        setcurrentPage((prePage) => prePage - 1)

    };



    // useEffect(() => {
    //     const pagedatacount = Math.ceil(user.length/4);
    //     setpagecount(pagedatacount)

    //     if (page) {
    //         const LIMIT = 4
    //         const skip = LIMIT * page //4*2 =8
    //         const dataskip = user.slice(page === 1 ? 0 : skip - LIMIT, skip);
    //         // setpagedata(dataskip)

    //     }
    // }, [user,perPage]);

    // let active = 2;
    // let items = [];
    // for (let number = 1; number <= 3; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active}>
    //             {number}
    //         </Pagination.Item>
    //     );
    // }

    // const handleclick = (number)=>{
    //     setcurrentpage(number);

    // }

    return (
        <>
            <Dashbord />
            <div className="container space">
                <form className="d-flex justify-content-end mb-5" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '200px' }} onChange={handlesearch} />
                </form>
                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Hobbies</th>
                        </tr>

                    </thead>


                    <tbody>
                        {
                            user.map((user) => {
                                return (

                                    <tr key={user.id} className='bold'>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.hobbies}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={handleprev}
                            disabled={currentPage === 1}>
                            Prev
                        </button>
                    </li>
                    {pagenumber.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => setcurrentPage(number)}>
                                {number}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${currentPage === totalpages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={handlenext}
                            disabled={currentPage === totalpages}>
                            Next
                        </button>
                    </li>
                </ul>
                <br />
            </div>

        </>
    )
}

export default List
