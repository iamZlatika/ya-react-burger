import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { DragSource, DropTarget } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

export interface Ingredient {
  name: string,
  price: number,
  image: any,
  __id: number,
}

export interface IBCIngredient {
  ingredient: Ingredient,
  onClose: () => void,
  isDragging: boolean,
  connectDragSource: (arg0: any) => void,
  connectDropTarget: (arg0: any) => void,
  onMove: (arg0: any, arg1: any) => void,
  index: number,
}

type TProps = {
  index: number,
  onMove: (arg0: any, arg1: any) => void,
  id: number
}

const BurgerConstructorIngredient: React.FC<IBCIngredient> = forwardRef(
  function BurgerConstructorIngredient(
    { ingredient, onClose, isDragging, connectDragSource, connectDropTarget },
    ref
  ) {
    const elementRef = useRef<HTMLInputElement>(null);
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



export default DropTarget(
  "burger-constructor-ingredient",
  {
    hover(props: TProps, monitor, component) {
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
      const hoverClientY = clientOffset!!.y - hoverBoundingRect.top;

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
      beginDrag: (props: TProps) => ({
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
