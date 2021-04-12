import React, {useState, useEffect, createRef} from 'react'
import Layout from '../components/layout'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

const IndexPage = () => {
  let wrapperRef = createRef()

  const [stati, setStati] = useState({
    isArticleVisible: false,
    timeout: false,
    articleTimeout: false,
    article: '',
    loading: 'is-loading'
  })
  const [players, setPlayers] = useState([
    {id:1, name:'Player 1'},
    {id:2, name:'Player 2'},
  ])
  
  useEffect(() => { 
    setTimeout(() => {
      setStati(prev => ({...prev, loading: ''}))
    }, 100)
  }, [])

  const handleClickOutside = (event) => {
    
    if (wrapperRef && !wrapperRef.current === event.target && stati.isArticleVisible) {
      console.debug('handleClickOutside', event.target, wrapperRef)
      handleCloseArticle();
    }
  }

  const handleOpenArticle = (article) => {
    console.debug('handleOpenArticle', article)

    setStati(prev => ({
      ...prev,
      article: article,
      isArticleVisible: !prev.isArticleVisible
    }))
    
    setTimeout(() => {
      setStati(prev => ({
        ...prev,
        timeout: !prev.timeout
      }))
    }, 325)
    
    setTimeout(() => {
      setStati(prev => ({
        ...prev,
        articleTimeout: !prev.articleTimeout
      }))
    }, 350)
    
  }

  const handleCloseArticle = (event) => {
    setStati(prev => ({
      ...prev,
      articleTimeout: !prev.articleTimeout
    }))

    setTimeout(() => {
      setStati(prev => ({
        ...prev,
        timeout: !prev.timeout
      }))
    }, 325)

    setTimeout(() => {
      setStati(prev => ({
        ...prev,
        isArticleVisible: !prev.isArticleVisible,
        article: ''
      }))
    }, 350)
  }

  return (
    <Layout>

      <div className={`body ${stati.loading} ${stati.isArticleVisible ? 'is-article-visible' : ''}`}>
        <div id="wrapper" ref={wrapperRef} onClick={handleClickOutside}>
          <Header onOpenArticle={handleOpenArticle} timeout={stati.timeout} />
          <Main
            isArticleVisible={stati.isArticleVisible}
            timeout={stati.timeout}
            articleTimeout={stati.articleTimeout}
            article={stati.article}
            onCloseArticle={handleCloseArticle}
            players={players}
            setPlayers={setPlayers}
          />
          <Footer timeout={stati.timeout} />
        </div>
        <div id="bg"></div>
      </div>
    </Layout>
  );
}

export default IndexPage
