// React.createElement( 
//   'ul', 
//   {'class': 'list'}, 
//   React.createElement( 
//     'li', 
//     null, 
//     'Homemade granola with yogurt' 
//   ), 
//   React.createElement( 
//     'li', 
//     null, 
//     'Fantastic French toast with fruit' 
//   ), 
//   React.createElement( 
//     'li', 
//     null, 
//     'Tortilla Española with salad' 
//   ) 
// ); 

import React from 'react'  

type Props = {  
  isDisabled?: boolean 
  size: 'Big' | 'Small' 
  text: string 
  onClick(event: React.MouseEvent<HTMLButtonElement>): void  
} 

type button = {

}

export function FancyButton(props: Props) {  
  const [toggled, setToggled] = React.useState(false)  
  return <button 
          className={'Size-' + props.size} 
          disabled={props.isDisabled || false}
          onClick={event => { 
              setToggled(!toggled) 
              props.onClick(event) 
              }}  
           >{props.text}</button>
}
