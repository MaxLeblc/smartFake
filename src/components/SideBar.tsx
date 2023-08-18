import '../styles/SideBar.scss'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SideBar({ inverseDataFlowAPI }) {

    // forms data
    const [input, setInput] = useState({ theme: '' })

    //// loading mode for button
    const [loadingButton, setLoadingButton] = useState(false)

    // prompt function generator
    const generatePrompt = (theme: string) => {
        const prompt = `Génère dans un tableau d'objets JSON sans déclaration de variable, six citations inventées et non numérotées sur le thème ${theme} qui se terminent par un . Pour chaque citation, invente un prénom et un nom d'auteur francophone. Les citations doivent être inventées avec une figure de style aléatoire. Créer la clé 'citation' pour la citation, la clé 'auteur' pour l'auteur et la clé 'id' pour un id de 12 chiffres générer de façon aléatoire. Le prénom et le nom de l'auteur ne doivent pas être dans la citation.`
        return prompt
    }

    // fetch OpenAI API
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoadingButton(true)
        console.log('Le thème demandé : ', input)

        const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

        fetch(`https://api.openai.com/v1/completions`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: generatePrompt(input.theme),
                max_tokens: 2000,
                model: 'text-davinci-003',
            })
        }).then(response => response.json())
            .then(data => {
                console.log("🚀 ~ file: SideBar.tsx:35 ~ handleSubmit ~ data API:", data.choices[0].text)
                inverseDataFlowAPI(JSON.parse(data.choices[0].text))
            })
            .catch(error => {
                console.error('There was a problem with the Fetch operation:', error)
                console.log('There was a problem with the Fetch operation:', error)
            })
            .finally(() => {
                setLoadingButton(false)
            })
    }

    ////// SIDE BAR
    const [isOpened, setIsOpened] = useState(true);

    const menuVariants = {
        initial: {
            opacity: 0
        },
        opened: {
            opacity: 1,
            transition: {
                duration: .9,
                ease: 'easeIn'
            }
        },
        closed: {
            opacity: 0,
            transition: {
                duration: .9,
                ease: [.1, 1, .57, 1]
            }
        }
    }

    return (
        <>
            <motion.div
                className='container'
                initial='closed'
                variants={{
                    opened: { width: '480px' },
                    closed: { width: '0' }
                }}
                animate={isOpened ? 'opened' : 'closed'}
                transition={{ duration: .8 }}
            >
                <AnimatePresence>
                    {isOpened && (
                        <motion.div variants={menuVariants}>
                            <form onSubmit={handleSubmit} >
                                <p>Besoin d'une citation pour briller en société ?</p>
                                <input type='text' name='theme' placeholder='Sur quel thème sera ta citation ?' value={input.theme} onChange={(e) => setInput({ theme: e.target.value })} />
                                <button className='button' type='submit' disabled={loadingButton}>{loadingButton ? 'loading...' : 'GO'}</button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    className='expandButton'
                    variants={{
                        opened: { transform: 'rotate(-90deg)' },
                        closed: { transform: 'rotate(90deg)' }
                    }}
                    animate={isOpened ? 'opened' : 'closed'}
                    transition={{ duration: .5 }}
                    onClick={() => setIsOpened(!isOpened)}
                >
                </motion.div>
            </motion.div>
        </>
    )
}