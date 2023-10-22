import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    MDBInput,
    MDBNavbarNav,
    MDBBtn,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody
}  from 'mdb-react-ui-kit';
import './FormUI.css'
import 'cors';

export const FormUI = () => {

    let [servers, setServers] = useState([])
    let [serversbyid, setServersById] = useState([])
    let [serversbyname, setServersByName] = useState([])

    let [id, setId] = useState("")
    let [name, setName] = useState("")
    let [language, setLanguage] = useState("")
    let [framework, setFramework] = useState("")
    function reset(){
        setId("")
        setName("")
        setLanguage("")
        setFramework("")
    }

    function refreshPage(){ window.location.reload(true); }

    function selectServer()
    {
        fetch('http://localhost:6080/servers')
        .then(response => response.json())
        .then(data => setServers(data))
        .catch(err => console.log(err))
    }

    function addServer()
    {
        let data = {id,name,language,framework}
        fetch('http://localhost:6080/servers',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)  
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn("resp: ",resp)
            })
        })
                
        selectServer()
        reset()
        refreshPage()
        window.alert("Server object Added")
    }

    function updateServer()
    {
        let data = {id,name,language,framework}
        fetch('http://localhost:6080/servers',{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:6080',
                'Access-Control-Allow-Methods': 'PUT'
            },
            body: JSON.stringify(data)  
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn("resp: ",resp)
            })
        })
        selectServer()
        reset()
        refreshPage()
        window.alert("Server object Updated")
     }

    function deleteServer(id)
    {
        fetch(`http://localhost:6080/servers/${id}`,{
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:6080',
                'Access-Control-Allow-Methods': 'DELETE'
            },
        })
        .then(data => console.warn(data))
        .catch(err => console.log(err))
        selectServer()
        reset()
        refreshPage()
        window.alert("Server object Deleted")
    }

    function selectServerById(id)
    {
        fetch(`http://localhost:6080/servers/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:6080',
                'Access-Control-Allow-Methods': 'GET'
            },
        }).then(response => response.json())
        .then(data => setServersById(data))
        .then(data => console.warn(data))
        .catch(err => console.log(err))
        let setTableActions = ()=>{setTableAction("display by id")}
        setTableActions()
        reset()
    }

    function selectServerByName(name)
    {
        fetch(`http://localhost:6080/servers/name/${name}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:6080',
                'Access-Control-Allow-Methods': 'GET'
            },
        }).then(response => response.json())
        .then(data => setServersByName(data))
        .then(data => console.warn(data))
        .catch(err => console.log(err))
        let setTableActions = ()=>{setTableAction("display by name")}
        setTableActions()
        reset()
    }

    useEffect(()=>{
        selectServer()
    },[])

    const [action, setAction] = useState("Server");
    const [tableaction, setTableAction] = useState([])

    return (
    <div>
        <MDBNavbar  className="navbar navbar-expand-sm navbar-dark bg-dark">
            <MDBContainer fluid>
                <MDBNavbarBrand  className={action==="Server"} onClick={()=>{setAction("Server")}}>Task-4: Web UI Form</MDBNavbarBrand>
                <MDBCollapse navbar >
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink className={action==="Add Server"} onClick={()=>{setAction("Add Server")}}>
                                Add
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink className={action==="Update Server"} onClick={()=>{setAction("Update Server")}}>
                                Update
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink className={action==="Delete Server"} onClick={()=>{setAction("Delete Server")}}>
                                Delete
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                    Select
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                <MDBDropdownItem link className={action==="All Servers"} onClick={()=>{setAction("All Servers")}}>Select All Server</MDBDropdownItem>
                                <MDBDropdownItem link className={action==="Select Server By ID"} onClick={()=>{setAction("Select Server By ID")}}>Select Server By ID</MDBDropdownItem>
                                <MDBDropdownItem link className={action==="Select Server By Name"} onClick={()=>{setAction("Select Server By Name")}}>Select Server By Name</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>

        {action==="Add Server"?
            
            <div className='container col-xs-9 col-sm-8 col-md-7 col-lg-6 col-xl-5'>
                <div className='header mb-3'>
                    <div className='text'>{action}</div>
                </div>
                <form>
                    <MDBInput className='mb-4' type='text' id='id' label='Id' value={id} onChange={(e)=>{setId(e.target.value)}} />
                    <MDBInput className='mb-4' type='text' id='name' label='Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    <MDBInput className='mb-4' type='text' id='language' label='Language' value={language} onChange={(e)=>{setLanguage(e.target.value)}} />
                    <MDBInput className='mb-4' type='text' id='framework' label='Framework' value={framework} onChange={(e)=>{setFramework(e.target.value)}} />
                    <MDBBtn className='button' type='submit' onClick={addServer} block>
                        Submit
                    </MDBBtn>
                </form>
            </div>
                
        :action==="Update Server"?
            <div className='container col-xs-9 col-sm-8 col-md-7 col-lg-6 col-xl-5'>
                <div className='header mb-3'>
                    <div className='text'>{action}</div>
                </div>
                <form>
                    <MDBInput className='mb-4' type='text' id='id' label='Id' value={id} onChange={(e)=>{setId(e.target.value)}} />
                    <MDBInput className='mb-4' type='text' id='name' label='Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    <MDBInput className='mb-4' type='text' id='language' label='Language' value={language} onChange={(e)=>{setLanguage(e.target.value)}} />
                    <MDBInput className='mb-4' type='text' id='framework' label='Framework' value={framework} onChange={(e)=>{setFramework(e.target.value)}} />
                    <MDBBtn className='button' type='submit' onClick={updateServer} block>
                        Submit
                    </MDBBtn>
                </form>
            </div>
        :action==="Delete Server"?
            <div className='container col-xs-9 col-sm-8 col-md-7 col-lg-6 col-xl-5'>
                <div className='header mb-3'>
                    <div className='text'>{action}</div>
                </div>
                <form>
                    <MDBInput className='mb-4' type='text' id='id' label='Id' value={id} onChange={(e)=>{setId(e.target.value)}} />
                    <MDBBtn className='button' type='submit' onClick={()=>deleteServer(id)} block>
                        Submit
                    </MDBBtn>
                </form>
            </div>
        :action==="Select Server By ID"?
            <div className='container col-xs-9 col-sm-8 col-md-7 col-lg-6 col-xl-5'>
                <div className='header mb-3'>
                    <div className='text'>{action}</div>
                </div>

                <form>
                    <MDBInput className='mb-4' type='text' id='id' label='Id' value={id} onChange={(e)=>{setId(e.target.value)}} />
                    <MDBBtn className='button' type='submit' onClick={()=>selectServerById(id)} block>
                        Submit
                    </MDBBtn>
                </form>
                    {tableaction==="display by id"?
                    <div className='table'>
                    <MDBTable>
                    <MDBTableHead dark>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Language</th>
                            <th scope='col'>Framework</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <th scope='row'>{serversbyid.id}</th>
                            <td>{serversbyid.name}</td>
                            <td>{serversbyid.language}</td>
                            <td>{serversbyid.framework}</td>                            
                        </tr>
                    </MDBTableBody>
                </MDBTable>
                </div>
                :<div></div>
                }
            </div>
        :action==="Select Server By Name"?
            <div className='container col-xs-9 col-sm-8 col-md-7 col-lg-6 col-xl-5'>
                <div className='header mb-3'>
                    <div className='text'>{action}</div>
                </div>
                <form>
                    <MDBInput className='mb-4' type='text' id='name' label='Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    <MDBBtn className='button' type='submit'onClick={()=>selectServerByName(name)} block>
                        Submit
                    </MDBBtn>
                    </form>
                    {tableaction==="display by name"?
                    <div className='table'>
                    <MDBTable>
                    <MDBTableHead dark>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Language</th>
                            <th scope='col'>Framework</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {serversbyname.map((server)=>
                        <tr>
                            <th scope='row'>{server.id}</th>
                            <td>{server.name}</td>
                            <td>{server.language}</td>
                            <td>{server.framework}</td>                            
                        </tr>
                        )}
                    </MDBTableBody>
                </MDBTable>
                </div>
                :<div></div>
                        }
             </div>
        :action==="All Servers"?
            
            <div className='container col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-9'>
                <div className='header mb-3'>
                    <div className='text'>{action}</div>
                </div>
                <MDBTable>
                    <MDBTableHead dark>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Language</th>
                            <th scope='col'>Framework</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {servers.map((server)=>
                        <tr>
                            <th scope='row'>{server.id}</th>
                            <td>{server.name}</td>
                            <td>{server.language}</td>
                            <td>{server.framework}</td>                            
                        </tr>
                        )}
                    </MDBTableBody>
                </MDBTable>
            </div>
                :
                <div className='container col-xs-9 col-sm-8 col-md-7 col-lg-6 col-xl-5'>
                <div className='header mb-3'>
                    <div className='text'>
                        Task -4 <br/>
                        Web UI Form                    
                    </div>
                </div>
            </div>
                }
    </div>
  );
}

export default FormUI