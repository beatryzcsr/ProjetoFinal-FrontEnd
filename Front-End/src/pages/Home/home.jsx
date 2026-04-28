import styles from './home.css'

function Home () {
    return (

     <><div className={` page ${styles.header}`}>
        <a href="./home.jsx" class="btn">Home</a>

         <img src="./public/logo.png" alt="Logo" />

        <a href="./formulario.jsx" class="btn">Formulario</a>
        
        </div>
        
        <section className={`page ${styles.homePage}`}>
                <img src="./public/sakura.png" alt="flor" />

                <h2 className={styles.title}>Lotus</h2>
                <h2 className={styles.title}>Byte</h2>
                <p> Sede empresarial de comidas japonesas </p>

                <a href="./home.jsx" class="btn">Home</a>
                <a href="./formulario.jsx" class="btn">Formulario</a>

                <img src="./public/comida.png" alt="comida" />
            </section></>
    )
}

export default Home