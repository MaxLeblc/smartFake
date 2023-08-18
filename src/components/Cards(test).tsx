import '../styles/Card.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface cardsProps {
    card: {
        citation: string
        auteur: string
        id: number
    }
    onDirectionLock: (axis: string) => void
    onDragEnd: (event: MouseEvent, info: { offset: { x: number, y: number } }) => void
    animate: any
}

// create own card using motion from framer-motion
const Card = ({ card, onDirectionLock, onDragEnd, animate }: cardsProps) => (
    <motion.div
        className="card"
        drag
        dragDirectionLock
        onDirectionLock={onDirectionLock}
        onDragEnd={onDragEnd}
    // animate={animate}
    >
        <h2>{card.citation}</h2>
        <h4>{card.auteur}</h4>
    </motion.div>
)

export default function Cards() {

    // cards DB
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

    // Using to get infos from dragging a card
    const [dragInfo, setDragInfo] = useState({
        axis: '',
        animation: { x: 0, y: 0 },
    })
    console.log("🚀 ~ file: Cards.tsx:64 ~ Cards ~ dragInfo:", dragInfo)

    // const [save, setSave] = useState([])

    // set axis props to card 
    const onDirectionLock = (axis: string) => setDragInfo({ ...dragInfo, axis: axis })

    // 
    const animateCardSwipe = (animation: { x: number, y: number }) => {
        setDragInfo({ ...dragInfo, animation })
        setTimeout(() => {
            setCards([...cards.slice(0, cards.length - 1)]) // WORKS
        }, 500)
    }

    function onDragEnd(info: { offset: { x: number, y: number } }) {
        if (dragInfo.axis === 'x') {
            if (info.offset.x >= 200) animateCardSwipe({ x: 2000, y: 0 })
            else if (info.offset.x <= -200) animateCardSwipe({ x: -2000, y: 0 })
        } else {
            if (info.offset.y >= 50) animateCardSwipe({ x: 0, y: 1000 })
            else if (info.offset.y <= -50) animateCardSwipe({ x: 0, y: -1000 })
        }
    }

    return (
        <>
            {cards.map((card, index) =>
                <Card
                    card={card}
                    key={index}
                    onDirectionLock={axis => onDirectionLock(axis)}
                    onDragEnd={(e, info) => onDragEnd(info)}
                // animate={dragInfo.animation} // !!!!! THE ISSUE
                />
            )}
        </>
    )
}