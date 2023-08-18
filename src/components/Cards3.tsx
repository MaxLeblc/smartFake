import '../styles/Card.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface cardsProps {
    card: {
        citation: string
        auteur: string
        id: number
    }
    onDragEnd: (event: MouseEvent, info: { offset: { x: number, y: number } }) => void
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
        <h2>“{card.citation}”</h2>
        <h4>{card.auteur}</h4>
        <span>{card.emoji}</span>
    </motion.div>
)

export default function Cards({ liftingStateUpAPI }) {
    console.log("🚀 ~ file: Cards3.tsx:29 ~ Cards ~ liftingStateUpAPI:", liftingStateUpAPI)

    const cards = [
        {
            citation: `Bienvenue sur Smart Fake ! Toi aussi deviens faussement intelligent ou amuse-toi seul si tu n'as pas d'amis !`,
            auteur: 'Xou',
            emoji: '',
            id: 0
        },
        {
            citation: `Joli coup de poignée !`,
            auteur: '',
            emoji: '😅',
            id: 1
        },
        {
            citation: `Bon ça suffit maintenant !!!`,
            auteur: '',
            emoji: '😠',
            id: 2
        },
        {
            citation: `STOOOOOOPPPPPP ARRRRREEETTTTEEUUH !!!!!!!!!!!!!!!!!!!!!!`,
            auteur: '',
            emoji: '😧',
            id: 3
        },
    ]

    // sort demo cards
    const sortedCards = cards.reduce((acc, card) => {
        const repeatedCards = Array(25).fill(card)
        acc.push(...repeatedCards)
        return acc
    }, []).sort((a, b) => b.id - a.id)

    // drag card event 
    const onDragEnd = (event: MouseEvent, info: { offset: { x: number, y: number } }, id: number) => {
        event.preventDefault()

        if (info.offset.y > 50) {
            console.log('CIAO EN BAS', id)
        }
        if (info.offset.y < -50) {
            console.log('CIAO EN HAUT', id)   // !! reset data usseState after all cards dragged
        }
    }

    return (
        <>
            {liftingStateUpAPI.length > 0 || cards.length === 0 ? liftingStateUpAPI.map((card, index) =>
                <Card
                    card={card}
                    key={index}
                    onDragEnd={(event, info) => onDragEnd(event, info, card.id)}
                />
            ) :
                sortedCards.map((card, index) =>
                    <Card
                        card={card}
                        key={index}
                        onDragEnd={(event, info) => onDragEnd(event, info, card.id)}
                    />
                )
            }
        </>
    )
}