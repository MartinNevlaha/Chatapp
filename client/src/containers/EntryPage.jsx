import React from 'react'

import SignIn from "../components/Inputs/LoginForm/SignIn/SignIn";
import Card from '../components/UI/Card/Card';

const EntryPage = () => {
    return (
        <div>
            <Card type="small">
                <SignIn />
            </Card>
        </div>
    )
}

export default EntryPage
