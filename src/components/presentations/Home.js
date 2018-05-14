import React from 'react'

const Home = () => {
  const styles = {
    muffin: {
      backgroundImage: `url("muffin.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '600px',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    muffinText: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: '600px',
      width: '100%',
      textAlign: 'center',
      color: 'white',
      paddingTop: '280px'
    },
    muffinTitle: {
      fontSize: '50px'
    },
    sectionOdd: {
      padding: '50px'
    },
    // sectionEven: {
    //   padding: '50px',
    //   backgroundColor: northwesternPurple10
    // },
    purpleHeader: {
      color: "#00838F",
      marginBottom: '50px'
    },
    centeredPurpleHeader: {
      color: "#00838F",
      marginBottom: '50px',
      textAlign: 'center'
    },
    divideTwo: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    laptopImage: {
      width: '400px'
    },
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    }
  }
  return(
    <div>
      <div style={styles.path} >Home</div>
        <div style={styles.muffin}></div>
        <div style={styles.muffinText}>
          <h1 style={styles.muffinTitle}>
            Let's start<br/>
            "J"enius management<br/>
            with "Red Muffin".
          </h1>
          <h2>"Red Muffin" is designed for monthly manpower management<br/>
              of a large number of projects.
          </h2>
        </div>

        <div style={styles.sectionOdd}>
          <h1 style={styles.purpleHeader}>さあ、Red Muffinで快適なリソース管理をはじめましょう。</h1>
          <div style={styles.divideTwo}>
            <div style={styles.blurbs}>
              <h3>エクセル山積表との同期が煩雑？</h3>
              <h3>メンバー毎の負荷状況が分からない？</h3>
              <h3>案件の収支予定が立てられない？</h3>
              <h3>そんなときは、Red Muffinですべて解決しましょう。</h3>
            </div>
            <img src="laptop.jpg" alt="Student with a laptop" style={styles.laptopImage} />
          </div>
        </div>

    </div>
  )
}

export default Home
