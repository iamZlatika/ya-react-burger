import { forwardRef, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorIngredient = forwardRef(
  function BurgerConstructorIngredient(
    { ingredient, onClose, isDragging, connectDragSource, connectDropTarget },
    ref
  ) {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    const opacity = isDragging ? 0 : 1;
    return (
      <div ref={elementRef} style={{ opacity }}>
        <DragIcon type="primary" />
        <ConstructorElement
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={onClose}
        />
      </div>
    );
  }
);

BurgerConstructorIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};


export default DropTarget(
  "burger-constructor-ingredient",
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }

      const node = component.getNode();

      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.onMove(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    "burger-constructor-ingredient",
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(BurgerConstructorIngredient)
);
