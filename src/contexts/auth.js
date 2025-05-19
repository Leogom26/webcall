import { createContext, useState } from "react";
import { auth, db, storage } from '../service/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({children}){
  // eslint-disable-next-line 
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const navigate = useNavigate();

  // function signIn(email, password){
  //   console.log(email)
  //   console.log(password)
  //   alert('logado')
  // }

  async function signUp(email, password, name){
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then( async(value)=>{
      let uid = value.user.uid

      await setDoc(doc(db, "user", uid), {
        nome: name,
        avatarUrl: null
      })
      .then(()=>{
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null,
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        navigate('/dashboard')
      })



    })
    .catch((error)=>{
      console.log('erro ao cadastrar' + error)
      setLoadingAuth(false)
    })
  }

  function storageUser(data){
    localStorage.setItem('@webcall', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !! user,
        user,
        // signIn,
        signUp,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;
