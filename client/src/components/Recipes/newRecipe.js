import React, { useState, useEffect } from "react";

import NavBar from '../Layout/navBar'
import './newRecipe.css'

import {createRecipe} from '../../actions/recipe'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons'
import Footer from '../Layout/footer'
import Alert from '../Layout/alert'


function NewRecipe(props) {

    const {createRecipe,history, auth} = props
    const {user} = auth
    const initialData = {
        title:"",
        imageUrl:"",
        servings:"",
        time:""
}
    const [recipeDetails, setRecipeDetails] = useState(initialData)  
    const {title, imageUrl, servings, time} = recipeDetails
    const [recipeIngredients, setRecipeIngredients] = useState([""]);
    const [recipeInstructions, setRecipeInstructions] = useState([""]);
    const [newRecipeStage, setNewRecipeStage] = useState(1)

    useEffect(()=> console.log('rerender'))
//  Detail Logic

    function handleDetailChange(e){
        setRecipeDetails({...recipeDetails, [e.target.name]: e.target.value})
    }


  function handleIngredientNameChange(e, index) {
    const values = [...recipeIngredients];
    values[index] = e.target.value;
    setRecipeIngredients(values);    
  }
  
  function handleIngredientAdd(e) {
     e.preventDefault()
    const values = [...recipeIngredients];
    values.push("");
    setRecipeIngredients(values);    
  }

  function handleIngredientRemove(index) {
    const values = [...recipeIngredients];
    values.splice(index, 1);
    setRecipeIngredients(values);
  }

//   Instruction Logic

function handleInstructionChange(e, index) {
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions[index] = e.target.value;
    setRecipeInstructions(valuesInstructions);
  }

function handleInstructionAdd(e) {
    e.preventDefault()
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions.push("");    
    setRecipeInstructions(valuesInstructions)
    
}

function handleInstructionRemove(index,e) {
    e.preventDefault()
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions.splice(index, 1);
    setRecipeInstructions(valuesInstructions);
}

function handleSubmit(e){
    e.preventDefault()
    const formData = {...recipeDetails, ingredients: recipeIngredients, instructions: recipeInstructions}
    createRecipe(formData, history)

}

function handleToNext(e){
    e.preventDefault();
    setNewRecipeStage(newRecipeStage +1)
}

function handleToBack(e){
    e.preventDefault();
    setNewRecipeStage(newRecipeStage -1)
}

return(  

    <>
        <NavBar/>
        <Alert/>
            
        <div className="contentBox">
            <div className="contentBoxContent height100">              
            
                <div className="newRecipe">                    
                    <h1 className="text-center">Create a New Recipe</h1>
                    <hr className="width80"/>               

                    {newRecipeStage === 1 && 
                    <div className="newRecipePreviewContainer">
                    
                        <div className="newRecipePreview">
                        
                    
                            {user !== null &&
                                <>
                                    <div className="newRecipePreviewItem">
                                        <h1 className="">{!title? "My Recipe Title": title}</h1>  
                                    </div>
                                                                
                                    <div className="newRecipePreviewItem">
                                        <p><span className='bold'>By: </span> {user.username} </p>
                                    </div>
                                    <div className="newRecipePreviewItem">
                                        <p>
                                            <span className="spanMargin">
                                                <span className='bold'>
                                                    <FontAwesomeIcon icon={faUtensils} /> Serves: 
                                                </span> {servings}
                                            </span>  
                                            <span className='bold'>
                                                <FontAwesomeIcon icon={faClock} />Cooking Time:
                                            </span> {time}
                                        </p> 
                                    </div>

                                    <div className="newRecipePreviewItem">
                                        {!imageUrl ? <div className="fillerImg"></div>: <img className='image' src={imageUrl} alt=""/>}                               
                                    </div>                            
                                </>
                            } 
                        </div>                       
                    </div>
                    }
            

                    <div className='newRecipeForm'>
                        <form  onSubmit={handleSubmit}>
                            {newRecipeStage === 1 &&
                            <div className="newRecipeDetailsContainer">
                                <div className="newRecipeDetails">
                                    <div className='newRecipeItem text-center'>
                                        <h3>Recipe Details</h3>                                        
                                    </div>
                                    <div className='newRecipeItem '>
                                        <div><label htmlFor="Title"><h5>Title:</h5> </label></div>
                                        <div><input type="text" placeholder="Title" name="title" value={title} onChange={handleDetailChange} /></div>
                                    </div>
                                    <div className='newRecipeItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Image Url:</h5> </label></div>
                                        <div><input type="text" placeholder="Image Url" name = "imageUrl" value={imageUrl} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='newRecipeItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Servings:</h5> </label></div>
                                        <div><input type="text" placeholder="Servings" name ="servings" value={servings} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='newRecipeItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Cooking Time:</h5> </label></div>
                                        <div><input type="text" placeholder="Cooking Time" name="time" value={time} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='newRecipeItem'>                                        
                                        <button onClick={handleToNext} className="newRecipeNavigation">Next</button>
                                    </div>                                    
                                </div>
                                
                            </div>}

                            {/* *** Instructions **** */}
                            
                           {newRecipeStage === 2 &&
                            <div className="newRecipeIngredientsContainer">
                                <div className="newRecipeIngredients">
                                    <div className="newRecipeIngredientItem">
                                        <h3>Ingredients</h3>
                                    </div>
                                
                                    
                                    {recipeIngredients.map((recipeIngredient, index) => {
                                        return (
                                        <div key={`${index} + ingredient`} className="newRecipeIngredientItem">
                                            <div className='newIngredientItemLeft'>
                                                <h3>{index+1}.</h3>
                                            </div>
                                            <div className='newIngredientItemRight'>
                                            
                                                <div className="NewRecipeName">
                                                    <input
                                                        type="text"
                                                        placeholder="Ingredient Name"
                                                        value={recipeIngredients[index] || " "}
                                                        onChange={e => handleIngredientNameChange(e, index)}                                            
                                                    /> 
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleIngredientRemove(index)}
                                                    >X                                            
                                                    </button>
                                                </div>
                                            </div>                                            
                                        </div>
                                        );
                                    })}
                                    <div className="newRecipeIngredientItem">                                    
                                        <button className="addIngredientButton" onClick={e=> handleIngredientAdd(e)}>Add Ingredient</button>                          
                                    </div>     
                                </div>
                                <div className="newRecipeIngredientItem newRecipeIngredientItemLast">
                                    <button className="newRecipeNavigation" onClick={e=> handleToBack(e)}>Back </button>
                                    <button className="newRecipeNavigation" onClick={e=> handleToNext(e)}>Next</button>
                                </div>
                            </div> }

                                            {/* instruction */}

                            {newRecipeStage ===3 &&
                            <div className="newRecipeInstructionContainer ">
                                <div className='newRecipeInstruction'>                      
                                    <div className="newRecipeInstructionItem ">
                                        <h3>Instructions</h3>
                                    </div>
                                    {recipeInstructions.map( (recipeInstruction,i) => {                                   
                                        return(
                                        <div className="newRecipeInstructionItem" key ={`${i} + instruction`}>
                                            <div className='newRecipeInstructionLeft'><h3>{i+1}.</h3> </div>
                                            <div className='newRecipeInstructionRight'><textarea rows="4" onChange={(e)=>handleInstructionChange(e,i)} value={recipeInstruction}/><button onClick={(e)=> handleInstructionRemove(i, e)}>X</button></div>
                                            
                                        </div>)                                   

                                    })}

                                
                                
                                    <button className="addInstructionButton" onClick={e=> handleInstructionAdd(e)}>Add Instruction</button>
                              
                                </div>

                                <div className="newRecipeIngredientItem newRecipeIngredientItemLast">
                                        <button className="newRecipeNavigation" onClick={e=> handleToBack(e)}>Back </button>
                                        <button className="newRecipeNavigation" onClick={e=> handleSubmit(e)}>Submit</button>
                                </div>
                            
                            </div>}                                                
                        
                        </form>
                        
                    </div>
                </div>           
            </div>
        </div>
        <Footer/>
    </>
)}





NewRecipe.propTypes = {
    auth: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    createRecipe: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
    
})
export default withRouter(connect(mapStateToProps, {createRecipe})(NewRecipe))