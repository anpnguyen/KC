import React, {Fragment, useState, useEffect} from 'react'
import ContentCard from './contentCard'
import './contentBox.css'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from './spinner'



function ContentBox(props){

    const {title, text, recipe, showAll, history, isSearch, search} = props
    const {recipes, loading} = recipe
    const [pageLimit, setPageLimit] = useState(12)
    const [navigation, setNavigation] = useState({start:0, end: pageLimit, current: 1})
    const totalItems = recipes.length
    const totalPages = Math.floor((recipes.length/pageLimit)) + 1
    
    

    // need to fix with useCallbakc
    useEffect(
        ()=>{
         
        setNavigation({...navigation, start: 0, end:pageLimit, current:1})
        },[pageLimit]
    )

    function setFirst(){
        if(navigation.current !== 1){
           setNavigation({start:0, end: pageLimit, current: 1})
        }
    }

    function setNext(){
        if(navigation.current !== totalPages){
        let newNavigation = {start: navigation.start + pageLimit, end: navigation.end + pageLimit , current: navigation.current +1 } 
        setNavigation(newNavigation)
        }
    }

    function setBack(){
        if(navigation.current !== 1){
        let newNavigation = {start: navigation.start - pageLimit,  end: navigation.end - pageLimit, current: navigation.current -1 } 
        setNavigation(newNavigation)
        }
    }
    
    function setLast(){
        if(navigation.current !== totalPages){
        let newNavigation = {start: (totalPages-1)*pageLimit ,  end: totalPages* pageLimit, current: totalPages } 
        setNavigation(newNavigation)
        }
    }

    function handleNavigationClick(e,i){   
        
        if(e.target.value !== navigation.current){
            let newNavigation = {start: (i)*pageLimit ,  end: (i+1)* pageLimit, current: i+1 } 
        
        setNavigation(newNavigation)
        
        }
    }    
    
    function handleRedirect(){
        history.push('/recipe/new')
    }

    const mappedData = recipes.map((recipe, index) =>{
           
        if(!showAll && index <4){
            return <ContentCard  recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
        } else if(showAll && index < navigation.end  && index>= navigation.start && index!== totalItems-1 ){
            return <ContentCard  recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
        }  else if(showAll && index < navigation.end  && index>= navigation.start && index=== totalItems-1 ){
            return (
            <>
            <ContentCard  recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
            <ContentCard {...props} titleText="Create New Recipe" onClick={handleRedirect} key={recipe._id+ 'create'}/>
            </>)
        } 
        
        else {
            return <Fragment key={recipe._id}></ Fragment>
        }
                    
        
    })

    function navigationNumbers(){
        let navItems = []
    
        for(let i =0; i< totalPages  ; i++){
            if(i < totalPages  && i >=0 )
            navItems.push(     
              <div className={` arrows ${navigation.current === i+1 && 'navigationActive'}`} key= {i + "navButton" }onClick={e=>handleNavigationClick(e,i)} value={i+1}> {i+1} </div>
            )
        }
        return navItems
    }

   
    return(
        
        loading? <Spinner/>:
  
        <main className="contentBox " >
            <div className="contentBoxContent" >
                <h1 className="text-center">{isSearch=== true? "Search Results" :title}</h1>  
                <hr className="width80"/>
                <div className='contentBoxHeader' >
                    <div>
                    <p className='searchNumber'> {totalItems} {totalItems===1?"recipe": "recipes"} found {isSearch === true && ` for '${search.searchData}'`}</p>
                    </div>
                    <div>
                        <select className='navigationSelect' name="itemsPerPage" onChange={(e)=>setPageLimit(parseInt(e.target.value))} value={pageLimit}>    
                            <option value={12}>12 items per page</option>
                            <option value={16}>16 items per page</option>
                            <option value={20}>20 items per page</option>
                            <option value= {48}>48 items per page</option>
                        </select> 
                    </div>
                </div>
                <hr className="width80"/>
                



                <section className="contentBoxCard">
                    {mappedData}
                    {recipes.length ===0&&<ContentCard {...props} titleText="Create New Recipe" onClick={handleRedirect}/>}
                    
                    
                    <hr className="width80"/>
                </section>

                <nav className="contentBoxNavigation">               
                
                    <div className={` arrows  ${navigation.current ===1 && 'navigationDisable'}`}   onClick={setFirst} > {"<<"}  </div>
                    <div className={` arrows mr2 ${navigation.current ===1 && 'navigationDisable'}`} onClick={setBack} > {'<'} </div>
                    {navigationNumbers()}
                    <div className={` arrows ml2 ${navigation.current === totalPages && 'navigationDisable'}`} onClick={setNext} > > </div>
                    <div className={` arrows  ${navigation.current === totalPages && 'navigationDisable'}`} onClick={setLast} > >> </div>
                
                
                </nav>
                
            </div>
            
        </main>
   
    )
}


ContentBox.propTypes = {
    recipe: PropTypes.object.isRequired
 
}


const mapStateToProps = state => ({

    recipe: state.recipe,
    search: state.search
})

export default connect(mapStateToProps, {})(ContentBox)



