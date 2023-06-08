const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templatecard = document.getElementById('template-card').content
const templatefooter = document.getElementById('template-footer').content
const tetemplatecarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded',() => {
    fethData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarcarrito( )
    }
})
cards.addEventListener('click', e => {
    addcarrito(e)
})

items.addEventListener('click', e => {
    accionbu(e)
})

const fethData = async () => {
    try {
        const res = await fetch('./apis/api.json')
        const data = await res.json()
        //console.log(data)
        pintarcards(data)
    } catch(error){
        console.log(error)
    }
}

const pintarcards = data => {
    // console.log(data)
    data.forEach(producto => {
        templatecard.querySelector('h5').textContent = producto.title
        templatecard.querySelector('p').textContent = producto.precio
        templatecard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templatecard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templatecard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addcarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        setcarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setcarrito = Objeto => {
//console.log(Objeto)
    const producto = {
        id: Objeto.querySelector('.btn-dark').dataset.id,
        title: Objeto.querySelector('h5').textContent,
        precio: Objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarcarrito()
}

const pintarcarrito = () => {
    // console.log(carrito)
    items.innerHTML= ''
    Object.values(carrito).forEach(producto => {
        tetemplatecarrito.querySelector('th').textContent = producto.id
        tetemplatecarrito.querySelectorAll('td')[0].textContent = producto.title
        tetemplatecarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        tetemplatecarrito.querySelector('.btn-info').dataset.id = producto.id
        tetemplatecarrito.querySelector('.btn-danger').dataset.id = producto.id
        tetemplatecarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = tetemplatecarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length ===0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito Vacío</th>
        `
        return
    }
    const cantidadn = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const precion = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    

    templatefooter.querySelectorAll('td')[0].textContent = cantidadn
    templatefooter.querySelector('span').textContent = precion

    const clone = templatefooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const vaciarcarrito = document.getElementById('vaciar-carrito')
    vaciarcarrito.addEventListener('click', () => {
        carrito = {}
        pintarcarrito()
    })
}
const accionbu = e => {
    // console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        //console.log(carrito[e.target.dataset.id])
        // carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarcarrito()
    }

    if(e.target.classList.contains('btn-danger')){
       const producto = carrito[e.target.dataset.id]
       producto.cantidad--
       if(producto.cantidad == 0){
        delete carrito[e.target.dataset.id]
       }
       pintarcarrito()
    }
    e.stopPropagation
}