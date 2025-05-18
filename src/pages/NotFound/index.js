import { Link } from "react-router-dom"

export default function NotFound(){
  return(
    <div>
      <h1>Pagina não encontrada!!!</h1>
      <Link to="/" >Volte para pagina home</Link>
    </div>
  )
}

