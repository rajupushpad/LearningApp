import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from '../redux/actions'
import { connect } from "react-redux";

const Users = (props:any) => {
    
    const {loading, error, users} = props;
    useEffect(() => {
        actions.getUsers({});
      }, [])
    return (
        <>
            {loading ? "Loading..." : error ? error.message : users.map((u:any) => <h3>{u.name}</h3>)}
        </>
    )
}

const mapStateToProps = (state:any) => ({
    users: state.userRes.users,
    loading: state.userRes.loading
  });
  
  
export default connect(mapStateToProps)(Users);

