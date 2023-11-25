import { Navbar } from '../components/ui/Navbar'
import { CardCreate } from '../components/ui/CardCreate'
import { CardPub } from '../components/ui/CardPub'

function Init() {
    return (
        <>
            <Navbar userName={"Joab"} />
            <div className='w-full flex justify-center flex-col items-center gap-4'>
                <CardCreate userName={"Joab"} />
                <CardPub userName={"Pedro"} title="Titulo" date="Hoy" content="Texto de prueba" />
            </div>
        </>
    )
}

export default Init