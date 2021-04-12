import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-modal';

const GameX01 = ({article, timeout, onClose, players, x}) => {
    const points = [25, 20, 19, 18, 17, 16, 15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
    
    const [hits, setHits] = useState({})
    const [winner, setWinner] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [playerIndex, setPlayerIndex] = useState(0)
    const [turnIndex, setTurnIndex] = useState(0)

    const initHits = useCallback(() => {
        players.forEach((ply,i) => 
            setHits(prev => ({...prev, [ply.id]: [0]})))
    }, [players])

    useEffect(initHits, [])

    const addTurn = () => {
        setTurnIndex(prevt => {
            players.forEach((ply,i) => 
                setHits(prevh => { 
                    var newHits = {...prevh}
                    newHits[ply.id][prevt+1] = 0
                    return newHits
                }))
            return prevt+1
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
        setHits({})
        initHits()
        setPlayerIndex(0)
        setTurnIndex(0)
    }

    const nextPlayer = () => {
        setPlayerIndex(prev => {
            if(prev+1 === players.length) addTurn()
            return (prev+1)%(players.length)
        })
    }

    const addHit = (plyId, pt, nb) => {
        setHits(prev => { 
            var newHits = {...prev}
            var newHit = newHits[plyId][turnIndex] + pt*nb
            if(newHit <= x) newHits[plyId][turnIndex] = newHit
            return newHits
        })
    } 

    return (
        <article id="game-x01" className={`${article === 'game-x01' ? 'active' : ''} ${
            timeout ? 'timeout' : ''
        }`}
        style={{ display: 'none' }}>
            <h2>X01</h2>
            <h3>#{turnIndex+1}</h3>
            <table>
            <thead><tr>
                    {players.map((ply, idx) => { 
                        return [
                            <th key={ply.id}>{ply.name}</th>,
                            idx === playerIndex ?
                                <th key="next">
                                    <button className='action' aria-label="Next player" onClick={nextPlayer}><span className="icon fa-angle-double-right"></span></button>
                                </th> : <></>
                        ]
                    })}
                </tr></thead>
                <tbody>
                    {[...Array(Math.max(turnIndex+1, points.length))].map((_,i) => {
                        return <tr key={i}>
                            {players.map((ply, idx) => { 
                                return [ 
                                    i <= turnIndex ? <td key={`t${ply.id},${i}`}>{hits[ply.id] ? hits[ply.id][i] : 0}</td> : <td></td>,
                                    idx === playerIndex ?
                                        i < points.length ? <td key="pt">
                                        <button className='action' onClick={() => addHit(ply.id, points[i], 1)}>{points[i] === 25 ? <span className='icon fa-bullseye'/> : points[i]}</button>
                                        <button className='action' onClick={() => addHit(ply.id, points[i], 2)}>x2</button>
                                        {points[i] === 25 ? <></> : <button className='action' onClick={() => addHit(ply.id, points[i], 3)}>x3</button>}
                                    </td> : <td></td> : <></>
                                ]
                            })}
                        </tr>
                    })}
                    <tr>
                    {players.map((ply, idx) => { 
                        return [ 
                            <th key={'score'+ply.id} className="score">{hits[ply.id] ? x - hits[ply.id].reduce((sum, hit) => sum + hit, 0) : x}</th>,
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
                <div className="icon fa-times" onClick={onClose}><span className=""></span></div>
                <div className="icon fa-redo" onClick={()=>{}}></div>
                <div className="icon fa-undo" onClick={()=>{}}></div>
                <div className="icon fa-refresh" onClick={resetGame}></div>
            </div>
        </article>
    )
}

export default GameX01
