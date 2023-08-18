import '../styles/Card.scss'
import { SyntheticEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface cardsProps {
    card: {
        citation: string
        auteur: string
        id: number
    }
    onDragEnd: (event: MouseEvent, info: { offset: { x: number, y: number } }, id: number) => void
}

// create own card using motion from framer-motion
const Card = ({ card, onDragEnd }: cardsProps) => (
    <motion.div
        className="card"
        drag
        dragTransition={{ power: 8 }}
        onDragEnd={onDragEnd}
        dragConstraints={{ left: -100, right: 100 }}
    >
        <h2>"{card.citation}"</h2>
        <h4>{card.auteur}</h4>
    </motion.div>
)

export default function Cards() {

    // DB
    const [cards, setCards] = useState([
        {
            citation: `L'herbe est toujours plus verte chez le voisin.`,
            auteur: "Jean du Ruisseau",
            id: 0
        },
        {
            citation: `Quand quelque chose tombe, elle ne tombera pas plus bas.`,
            auteur: "Harry Bird",
            id: 1
        },
        {
            citation: `A Dunkerque, fais comme les Dunkerquois.`,
            auteur: "Emile d'Amboise",
            id: 2
        },
        {
            citation: `Cinq fruits & légumes par jour éloignent le médecin.`,
            auteur: "Amin-Esther de Lasanté",
            id: 3
        }
    ])


    // forms data
    const [inputs, setInputs] = useState({ theme: '' })

    // API data
    const [dataAPI, setDataAPI] = useState([])

    // prompt function generator
    const generatePrompt = (theme: string) => {
        const prompt = `Génère dans un tableau d'objets JSON sans déclaration de variable, six citations inventées et non numérotées sur le thème ${theme} qui se terminent par un . Pour chaque citation, invente un prénom et un nom d'auteur francophone. Les citations doivent être inventées avec une figure de style aléatoire. Créer la clé 'citation' pour la citation, la clé 'auteur' pour l'auteur et la clé 'id' pour un id de 12 chiffres générer de façon aléatoire.`
        return prompt
    }

    // fetch OpenAI API
    const handleSubmit = (event: SyntheticEvent) => { // !! add a loading button
        event.preventDefault()
        console.log('Le thème demandé : ', inputs)

        const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

        fetch(`https://api.openai.com/v1/completions`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY} `
            },
            body: JSON.stringify({
                prompt: generatePrompt(inputs.theme),
                max_tokens: 2000,
                model: 'text-davinci-003',
            })
        }).then(response => response.json())
            .then(data => {
                setDataAPI(JSON.parse(data.choices[0].text)) // !! rest dataApi after all cards from api are dragged
            })
    }

    // drag card event 
    const onDragEnd = (event: MouseEvent, info: { offset: { x: number, y: number } }, id: number) => {
        event.preventDefault()

        if (info.offset.y > 50) {
            setTimeout(() => {
                setCards([...cards.filter((card => card.id !== id))])
            }, 500)
            console.log('CIAO EN BAS', id)
        }
        if (info.offset.y < -50) {
            setTimeout(() => {
                setCards([...cards.filter((card => card.id !== id))])
            }, 500)
            console.log('CIAO EN HAUT', id)   // !! reset dataAPI usseState after all cards dragged
        }
    }

    return (
        <>
            {dataAPI.length > 0 || cards.length === 0 ? dataAPI.map((card, index) =>
                <Card
                    card={card}
                    key={index}
                    onDragEnd={(event, info) => onDragEnd(event, info, card)}
                />
            ) :
                cards.map((card, index) =>
                    <Card
                        card={card}
                        key={index}
                        onDragEnd={(event, info) => onDragEnd(event, info, card.id)} // !! create a bottom of empty deck to suggest new theme request
                    />
                )
            }
            <form onSubmit={handleSubmit} >
                <p>Besoin d'une citation pour briller en société ?</p>
                <input type='text' name='theme' placeholder='Sur quel thème sera ta citation ?' value={inputs.theme} onChange={(e) => setInputs({ theme: e.target.value })} />
                <button className='button' type='submit'>GO</button>
            </form>
        </>
    )
}