// arrow functions 

function suma(x,y){
    return x + y;
}

const sumaArrow = (x,y) => {
    return x + y
}

const SumaArrowInLin = (x,y) => x + y

//------
const data = [{name: 'John'},
              {name: 'Mark'},
              {name: 'Mike'},
              {name: 'Anthony'}]

const d = data.map(function(v){
    return v.name
})

const b = data.map((v => {
    return v.name
}))

const c = data.map(v => v.name)

//-----------------
setTimeout(function (){
    console.log('Hola')
}, 500)

setTimeout(() => {
    console.log('Hola')
}, 600)

setTimeout(() => console.log('Hola'), 700)

//-------------

//clousure

function counter(){
    let i = 0;

    return () => {
        i++
    }
}