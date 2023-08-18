import { useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
import useDimensions from '../utils/useDimensions'

export default function FavMenu() {
    const [isOpen, toggleOpen] = useCycle(false, true)
    const containerRef = useRef(null)
    const { height } = useDimensions(containerRef)

    const menu = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }),
        closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    }

    return (
        <>
            {/* <h1>COUCOU</h1> */}
            <motion.nav
            className='container'
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                custom={height}
                ref={containerRef}
            >
                <motion.div className='background' variants={menu} >
                    {/* <Navigation/> */}
                    {/* <MenuToggle toggle={()=> toggleOpen()} */}
                    <button onClick={() => toggleOpen()} >MENU</button>
                </motion.div>
            </motion.nav>
        </>
    )
}
