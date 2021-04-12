import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

const Cricket = ({article, timeout, onClose, players}) => {
    const points = [25, 20, 19, 18, 17, 16, 15]

    const [scores, setScores] = useState([])
    const [winner, setWinner] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [playerIndex, setPlayerIndex] = useState(0);
    const [turnIndex, setTurnIndex] = useState(0)

    useEffect(() => {
        initScores()
    }, [players])

    const initScores = () => {
        points.forEach((pt, j) =>
            players.forEach((ply,i) => 
                setScores(prev => ({...prev, [`${ply.id},${pt}`]: 0}))))
    }
    const addScore = (plyId, pt, nb) => {
        var key = `${plyId},${pt}`
        setScores(prev => ({...prev, [key]: scores[key] + nb}))
    } 

    const nextPlayer = () => {
        setPlayerIndex(prevp => {
            if(prevp+1 == players.length) setTurnIndex(prevt => prevt + 1)
            return (prevp+1)%(players.length)
        })
    }

    const showWinner = (player) => {
        setWinner(player)
        setShowModal(true)
    }

    const hideWinner = () => {
        setShowModal(false)
    }

    const resetGame = () => {
        setWinner(null)
        setScores([])
        initScores()
        setPlayerIndex(0)
        setTurnIndex(0)
    }

    const numberToPicto = (val) => {
        var nb3 = Math.floor(val/3)
        var r = val %3
        return [
            nb3 ? [...Array(nb3)].map((_,i)=> <span className="dv-picto dv-3" />) : <></>,
            r ? <span className={`${"dv-picto"} ${"dv-" + r}`} /> : <></>
        ]
    }

    return (
        <article id="game-cricket" className={`${article === 'game-cricket' ? 'active' : ''} ${
            timeout ? 'timeout' : ''
        }`}
        style={{ display: 'none' }}>
            <h2>Cricket</h2>
            <h3>#{turnIndex+1}</h3>
            <table>
                <thead><tr>
                    {players.map((ply, idx) => { 
                        return [
                            <th key={ply.id}>{ply.name}</th>,
                            idx === playerIndex ?
                                <th key="next">
                                    <button className='action' onClick={nextPlayer}><span className="icon fa-angle-double-right"></span></button>
                                </th> : <></>
                        ]
                    })}
                    </tr></thead>
                <tbody>
                    {points.map((pt, sdx) => {
                        return <tr key={pt}>
                            {players.map((ply, idx) => { 
                                return [
                                    <td className="score">{numberToPicto(scores[`${ply.id},${pt}`])}</td>,
                                    idx === playerIndex ? 
                                        <td>
                                            <button className='action' onClick={() => addScore(ply.id, pt, 1)}>{pt === 25 ? <span className='icon fa-bullseye'/> : pt}</button>
                                            <button className='action' onClick={() => addScore(ply.id, pt, 2)}>x2</button>
                                            {pt === 25 ? <></> : <button className='action' onClick={() => addScore(ply.id, pt, 3)}>x3</button>}
                                        </td> : <></>
                                ]
                            })}
                            </tr>
                    })}
                    <tr>
                    {players.map((ply, idx) => { 
                        return [ 
                            <th key={'score'+ply.id} className="score">{points.reduce((sum, pt) => sum + pt*scores[`${ply.id},${pt}`], 0)}</th>,
                            idx === playerIndex ? <th key="noscore">&nbsp;</th> : <></>
                        ]
                    })}
                    </tr>
                </tbody>
                
            </table>
            <Modal 
                isOpen={showModal}
                contentLabel="Winner">
                    <h1>{winner} wins!</h1>
                <button onClick={hideWinner}>Ok</button>
            </Modal>
            <div className="bar">
                <div className="icon fa-times" onClick={onClose}></div>
                <div className="icon fa-redo" onClick={()=>{}}></div>
                <div className="icon fa-undo" onClick={()=>{}}></div>
                <div className="icon fa-refresh" onClick={resetGame}></div>
            </div>
        </article>
    )
}
export default Cricket
