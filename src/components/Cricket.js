import React, { useCallback, useEffect, useState } from 'react'

const Cricket = ({article, timeout, onClose, players, showModal }) => {
    const points = [25, 20, 19, 18, 17, 16, 15]

    const [scores, setScores] = useState([])
    const [playerIndex, setPlayerIndex] = useState(0);
    const [turnIndex, setTurnIndex] = useState(0)

    const initScores = useCallback(() => {
        points.forEach((pt, j) =>
            players.forEach((ply,i) => 
                setScores(prev => ({...prev, [`${ply.id},${pt}`]: 0}))))
    }, [players])

    useEffect(initScores, [players])

    const detectGameEnd = useCallback(() => {
        console.dir(scores)
        if(points.reduce((allclosed, pt) => allclosed &&
            players.reduce((closed, ply) => closed || scores[`${ply.id},${pt}`] >= 3, false), true)) {
                var winner = players.reduce((winnerScore, ply) => {
                    var plyTotal = totalScore(ply) 
                    console.debug(plyTotal, winnerScore)
                    return plyTotal > winnerScore.score ? {'player': ply, 'score': plyTotal} : winnerScore
                }, {score: 0}).player
                showModal('info', `${winner.name} wins!`)
            }
    }, [scores])

    useEffect(detectGameEnd, [scores])

    const addScore = (ply, pt, nb) => {
        var key = `${ply.id},${pt}`
        var closedPly = closedPlayer(pt)
        if(!closedPly || closedPly === ply.id) {
            setScores(prev => ({...prev, [key]: scores[key] + nb}))
        }
    }

    const nextPlayer = () => {
        setPlayerIndex(prevp => {
            if(prevp+1 === players.length) setTurnIndex(prevt => prevt + 1)
            return (prevp+1)%(players.length)
        })
    }

    const closedPlayer = (pt) => {
        return players.reduce((clo, ply) => 
            scores[`${ply.id},${pt}`] >= 3 ? ply.id : clo, null)
    }

    const resetGame = () => {
        setScores([])
        initScores()
        setPlayerIndex(0)
        setTurnIndex(0)
    }

    const totalScore = (ply) => points.reduce((sum, pt) => sum + pt*scores[`${ply.id},${pt}`], 0)

    const numberToPicto = (val) => {
        var nb3 = Math.floor(val/3)
        var r = val %3
        return [
            nb3 ? [...Array(nb3)].map((_,i)=> <span key={i} className="dv-picto dv-3" />) : null,
            r ? <span className={`${"dv-picto"} ${"dv-" + r}`} /> : null
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
                            <th key={`cri_${ply.id}`} className={idx === playerIndex ? 'selected-player': ''}>{ply.name}</th>, 
                            idx === playerIndex ?
                                <th key={`ncri_${ply.id}`}>
                                    <button className='action' aria-label="Next player" onClick={nextPlayer}><span className="icon fa-angle-double-right"></span></button>
                                </th> : null
                        ]
                    })}
                </tr></thead>
                <tbody>
                    {points.map((pt, sdx) => {
                        return <tr key={`pt_${pt}`}>
                            {players.map((ply, idx) => { 
                                return [
                                    <td key={`score_${ply.id}`} className="score">{scores ? numberToPicto(scores[`${ply.id},${pt}`]) : ''}</td>,
                                    idx === playerIndex ? 
                                        <td key={`nscore_${ply.id}`}>
                                            <button className='action' onClick={() => addScore(ply, pt, 1)}>{pt === 25 ? <span className='icon fa-bullseye'/> : pt}</button>
                                            <button className='action' onClick={() => addScore(ply, pt, 2)}>x2</button>
                                            {pt === 25 ? null : <button className='action' onClick={() => addScore(ply, pt, 3)}>x3</button>}
                                        </td> : null
                                ]
                            })}
                            </tr>
                    })}
                    <tr key="cri_total">
                        {players.map((ply, idx) => { 
                            return [ 
                                <th key={`total_${ply.id}`} className="score">{scores ? totalScore(ply) : 0}</th>,
                                idx === playerIndex ? <th key={`ntotal_${ply.id}`}>&nbsp;</th> : null
                            ]
                        })}
                    </tr>
                </tbody>
                
            </table>
            
            <div className="bar">
                <button aria-label="Close" className="icon fa-times" onClick={onClose}></button>
                <button aria-label="Redo" className="icon fa-redo" onClick={() => {}}></button>
                <button aria-label="Undo" className="icon fa-undo" onClick={() => {}}></button>
                <button aria-label="Reset game" className="icon fa-refresh" onClick={resetGame}></button>
            </div>
        </article>
    )
}
export default Cricket
