import { createContext, useEffect, useState } from "react";
import { auth, db } from '../service/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({children}){
  // eslint-disable-next-line 
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsert(){
      const storageUser = localStorage.getItem('@webcall')

      if(storageUser){
        setUser(JSON.parse(storageUser))
      }

      setLoading(false)

    }

    loadUsert();

  }, []);

  async function signIn(email, password){
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async(value)=>{
      let uid = value.user.uid

      const docRef = doc(db, 'user', uid);
      const docSnap = await getDoc(docRef);

      let data = {
        uid: uid,
        nome: docSnap.data().nome,
        email: value.user.email,
        avatarUrl: docSnap.data().avatarUrl
      }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success('Seja bem-vindo(a) de volta')
        navigate('/dashboard')
    })
    .catch(()=>{
      console.log('erro ao cadastrar')
      setLoadingAuth(false)
      toast.error('Ops! algo deu errado')
    })
  }



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
        toast.success('Seja bem-vindo ao sistema')
        navigate('/dashboard')
      })



    })
    .catch(()=>{
      console.log('erro ao cadastrar')
      setLoadingAuth(false)
    })
  }

  function storageUser(data){
    localStorage.setItem('@webcall', JSON.stringify(data))
  }

  async function logout() {
    await signOut(auth)
    localStorage.removeItem('@webcall')
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !! user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
        storageUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;
