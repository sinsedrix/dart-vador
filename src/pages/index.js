import React, {useState, useEffect, useCallback} from 'react'
import Layout from '../components/layout'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import MyModal from '../components/MyModal'

const IndexPage = () => {

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
  
  const [modalProps, setModalProps] = useState({ show: false })  

  const closeModal = useCallback(() => {
    setModalProps(prev => ({...prev, type:'', text:'hidden', show: false}))
  }, [])
  const showModal = (type, text) => {
    setModalProps(prev => ({...prev, type:type, text:text, show: true}))
  }

  useEffect(() => { 
    setTimeout(() => {
      setStati(prev => ({...prev, loading: ''}))
    }, 100)
  }, [])

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
        <div id="wrapper" className={modalProps.show ? 'modal-active' : ''}>
          <Header onOpenArticle={handleOpenArticle} timeout={stati.timeout} />
          <Main
            isArticleVisible={stati.isArticleVisible}
            timeout={stati.timeout}
            articleTimeout={stati.articleTimeout}
            article={stati.article}
            onCloseArticle={handleCloseArticle}
            players={players}
            setPlayers={setPlayers}
            showModal={showModal}
          />
          <Footer timeout={stati.timeout} />
        </div>
        <MyModal {...modalProps} onClose={closeModal}></MyModal>
        <div id="modal-bg" className={modalProps.show ? 'modal-active' : ''}></div>
        <div id="bg"></div>
      </div>
    </Layout>
  );
}

export default IndexPage
