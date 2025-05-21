import { Link } from "react-router-dom"

export default function NotFound(){
  return(
    <div>
      <h1>Pagina não encontrada!!!</h1><br/>
      <Link to='/dashboard' >Voltar</Link>
    </div>
  )
}

