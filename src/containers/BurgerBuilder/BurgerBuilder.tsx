import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import { IBurgerBuilderState } from '../../interface/StateInterface';

class BurgerBuilder extends Component<any, IBurgerBuilderState> {
    
    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 2,
            meat: 1
        }
    }

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build controls</div>
            </Auxiliary>
        );
    }

}

export default BurgerBuilder;