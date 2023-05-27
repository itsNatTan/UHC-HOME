import Card from "./Card";
import classes from "./DisplayItem.css";

function DisplayItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}></div>
      </Card>
    </li>
  );
}

export default DisplayItem;
