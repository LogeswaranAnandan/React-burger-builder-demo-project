import React from 'react';
import OrderItemDetail from '../../../models/Order';
import Button from '../../UI/Button/Button';
import ButtonClasses from '../../UI/Button/Button.module.css';
import classes from './OrderDetails.module.css';
import BurgerImage from '../../Burger/BurgerImage/BurgerImage';
import TransformIngredients from '../../../util/transform-ingredients';

interface IProps {
    order: OrderItemDetail,
    backBtnHandler(): void
}

const OrderDetails = (props: IProps) => {
    props.order.ingredients = TransformIngredients(props.order.ingredients);
    const ingredientsArray = [];
    for (let ing in props.order.ingredients) {
        ingredientsArray.push({
            ingName: ing,
            ingCount: props.order.ingredients[ing]
        });
    }

    const ingRenderContent = ingredientsArray.map((ingredient) => {
        return (
            <div className={classes.IngredientWrapper} key={ingredient.ingName}>
                <span className={classes.IngredientsName}>{ingredient.ingName} ({ingredient.ingCount})</span>
            </div>
        )
    });

    const deliveryAddress = props.order.contactInfo;
    const deliveryAddressRenderContent = [
        <div key="name"><span className={classes.AddressLabel}>Name:</span> {deliveryAddress.name}</div>,
        <div key="email"><span className={classes.AddressLabel}>Email:</span> {deliveryAddress.email}</div>,
        <div key="street"><span className={classes.AddressLabel}>street:</span> {deliveryAddress.street}</div>,
        <div key="country"><span className={classes.AddressLabel}>Country:</span> {deliveryAddress.country}</div>,
        <div key="zipcode"><span className={classes.AddressLabel}>ZipCode:</span> {deliveryAddress.zipCode}</div>,
        <div key="delivery-method"><span className={classes.AddressLabel}>Delivery Method:</span> {deliveryAddress.deliveryMethod}</div>
    ];

    return (
        <div className={classes.OrderDetailsContainer}>
            <h3 className={classes.Heading}>Order Summary</h3>
            <div className={classes.IngredientsContainer}>
                <div className={classes.IngredientsHeading}>Ingredients</div>
                {ingRenderContent}
            </div>
            <BurgerImage
                ingredients={props.order.ingredients}
            />
            <div className={classes.DeliveryAddressContainer}>
                <div className={classes.DeliveryAddressHeading}>Delivery Address</div>
                {deliveryAddressRenderContent}
            </div>
            <div className={classes.Price}>Total Price: {props.order.price} INR</div>
            <div className={classes.BackBtnContainer}>
                <Button type={ButtonClasses.Danger} handler={props.backBtnHandler}>Go Back</Button>
            </div>
        </div>
    )
}

export default OrderDetails;