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
