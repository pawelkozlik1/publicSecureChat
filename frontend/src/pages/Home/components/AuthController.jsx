import React, { useState } from 'react';
import AuthRegister from './AuthRegister';
import AuthLogin from './AuthLogin';

const AuthController = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    return (
        <div>
            {isRegistering
                ? <AuthRegister setIsRegistering={setIsRegistering} />
                : <AuthLogin setIsRegistering={setIsRegistering} />
            }
        </div>
    );
};

export default AuthController;