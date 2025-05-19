import { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({children}){
  // eslint-disable-next-line 
  const [user, setUser] = useState(null)

  function signIn(email, password){
    console.log(email)
    console.log(password)
    alert('logado')
  }

  function signUp(email, password, name){
    console.log(email)
    console.log(password)
    console.log(name)
    alert('cadastrado')
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !! user,
        user,
        signIn,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;
