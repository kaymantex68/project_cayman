import React from 'react'
import UserNav from '../../components/nav/UserNav'
const History = () => {

    return(
        <div className='container-fluid' style={{minHeight: '1250px'}}>
            <div className="row" >
                <div className="colmd-2" style={{ minHeight: '1250px'}}>
                    <UserNav />
                </div>
                <div className='col' style={{backgroundColor:'GhostWhite'}}>
                    Личный кабинет
                </div>
            </div>
        </div>
    )
}

export default History