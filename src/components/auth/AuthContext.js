import {createContext, useContext, useMemo} from 'react';
import {useLocalStorage} from "../hook/useLocalStorage";
import {signInAPI} from "../service/UserService";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}


const setSession = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
}

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useLocalStorage("user", null);

    const signIn = (email, password) => {
        let data = {
            'username': email,
            'password': password,
            'client_id': 'halal-food-client-id',
            'client_secret': 'halal-food-client-secret',
            'grant_type': 'password'
        };
        return new Promise(function (resolve, reject) {
            signInAPI(data).then((response) => {
                setUser(response.data.user);
                setCurrentUser(response.data.user);
                setSession(response.data.access_token);
                resolve(response);
            }).catch((err) => {
                console.log(err.response.data);
                reject(err);
            });
        });
    };

    const signOut = () => {
        setCurrentUser(null);
        setUser(null);
    }

    const value = useMemo(
        () => ({
            currentUser,
            signIn,
            signOut
        }),
        [currentUser]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}