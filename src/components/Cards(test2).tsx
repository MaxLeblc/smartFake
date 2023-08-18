import '../styles/Card.scss'
import { useState } from 'react'
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
        <h2>{card.citation}</h2>
        <h4>{card.auteur}</h4>
    </motion.div>
)

export default function Cards() {

    // DB
    const [cards, setCards] = useState([
        {
            citation: `"L'herbe est toujours plus verte chez le voisin."`,
            auteur: "Jean du Ruisseau",
            id: 0
        },
        {
            citation: `"Quand quelque chose tombe, elle ne tombera pas plus bas."`,
            auteur: "Harry Bird",
            id: 1
        },
        {
            citation: `"A Dunkerque, fais comme les Dunkerquois."`,
            auteur: "Emile d'Amboise",
            id: 2
        },
        {
            citation: `"Cinq fruits & légumes par jour éloignent le médecin."`,
            auteur: "Amin-Esther de Lasanté",
            id: 3
        }
    ])

    // forms data
    const [inputs, setInputs] = useState<{ theme: string; style: string }>({ theme: '', style: '' })

    // API data
    const [dataAPI, setDataAPI] = useState({})
    console.log("🚀 ~ file: Cards.tsx:59 ~ Cards ~ dataAPI:", dataAPI)

    // prompt function generator
    const generatePrompt = (theme: string, style: string) => {
        let prompt = `Génère six citations complètements inventées sur le thème de ${theme} avec un nom et un prénom d'auteur fictif francophone.`

        if (style) prompt += ` Les citations doivent être ${style}.`

        return prompt += ` La réponse doit être un tableau d'objets au format JSON avec la clé citation pour la citation et la clé auteur pour l'auteur. `
    }

    // fetch OpenAI API
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(inputs)
        // console.log(generatePrompt(inputs.theme, inputs.style))

        // const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

        // fetch(`https://api.openai.com/v1/completions`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //         Authorization: `Bearer ${OPENAI_API_KEY} `
        //     },
        //     body: JSON.stringify({
        //         prompt: generatePrompt(inputs.theme, inputs.style), // !!
        //         max_tokens: 2000,
        //         model: 'text-davinci-003',
        //     })
        // }).then(response => response.json())
        //     .then(data => {
        //         setDataAPI(data.choices[0].text)
        //     })
    }

    // drag card event 
    const onDragEnd = (event: MouseEvent, info: { offset: { x: number, y: number } }, id: number) => {
        console.log("🚀 ~ file: Cards.tsx:78 ~ onDragEnd ~ info AAAAAAAAAAA:", event, info.offset, id)
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
            console.log('CIAO EN HAUT', id)
        }
    }

    return (
        <>
            <h1>Smart Fake</h1>
            <h5>Makes you shine in high society!</h5>
            {cards.map((card, index) =>
                <Card
                    card={card}
                    key={index}
                    onDragEnd={(event, info) => onDragEnd(event, info, card.id)}
                />
            )}
            <form onSubmit={handleSubmit} >
                <p>Créer ton propre thème !</p>
                <input type='text' name='theme' placeholder='Sur quel thème sera ta citation ?' value={inputs.theme} onChange={(e) => setInputs({ ...inputs, theme: e.target.value })} />
                <input type='text' name='style' placeholder='Drôle, sérieuse, famillière ?' value={inputs.style} onChange={(e) => setInputs({ ...inputs, style: e.target.value })} />
                <button className='button' type='submit'>GO</button>
            </form>
        </>
    )
}