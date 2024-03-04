const quotesWithAuthorES = [
  {
    quote: 'No me importa si funciona en tu máquina! No estamos vendiendo tu máquina!',
    author: 'Vidiu Platon',
  },
  {
    quote:
      'La medida del éxito no es si tienes un problema difícil para tratar, sino si es el mismo problema que tenías el año pasado',
    author: 'John Foster Dulles',
  },
  {
    quote:
      'Es más fácil cambiar las especificaciones para que encajen con el programa que viceversa',
    author: 'Alan Perlis',
  },
  {
    quote:
      'La depuración es el doble de difícil que escribir el código en primer lugar. Por lo tanto, si escribes el código tan inteligentemente como sea posible, por definición, no eres lo suficientemente inteligente para depurarlo',
    author: 'Brian Kernighan',
  },
  {
    quote: 'Hay dos formas de escribir programas sin errores; solo la tercera funciona',
    author: 'Alan J. Perlis',
  },
  {
    quote: 'Empiezo con una idea y luego se convierte en algo más',
    author: 'Pablo Picasso',
  },
  {
    quote:
      'Si te congelas con una idea demasiado rápido, te enamoras de ella. Si la refinas demasiado rápido, te apegas a ella y se vuelve muy difícil seguir explorando, seguir buscando algo mejor. La crudeza de los primeros ideas en particular es muy deliberada',
    author: 'Jim Glymph',
  },
]

const quotesWithAuthorEN = [
  {
    quote: "I don't care if it works on your machine! We are not shipping your machine!",
    author: 'Vidiu Platon',
  },
  {
    quote:
      'The measure of success is not whether you have a tough problem to deal with, but whether it is the same problem you had last year',
    author: 'John Foster Dulles',
  },
  {
    quote: 'It is easier to change the specifications to fit the program than vice versa',
    author: 'Alan Perlis',
  },
  {
    quote:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it',
    author: 'Brian Kernighan',
  },
  {
    quote: 'There are two ways to write error-free programs; only the third one works',
    author: 'Alan J. Perlis',
  },
  {
    quote: 'I begin with an idea and then it becomes something else',
    author: 'Pablo Picasso',
  },
  {
    quote:
      'If you freeze an idea too quickly, you fall in love with it. If you refine it too quickly, you become attached to it and it becomes very hard to keep exploring, to keep looking for better. The crudeness of the early ideas in particular is very deliberate',
    author: 'Jim Glymph',
  },
]
function getQuotesES() {
  const randomIndex = Math.floor(Math.random() * quotesWithAuthorES.length)
  const randomQuote = quotesWithAuthorES[randomIndex]
  if (!randomQuote.author || !randomQuote.quote) {
    return {
      cita: 'No me importa si funciona en tu máquina! No estamos vendiendo tu máquina!',
      autor: 'Vidiu Platon',
    }
  }
  return randomQuote
}
function getQuotesEN() {
  const randomIndex = Math.floor(Math.random() * quotesWithAuthorEN.length)
  const randomQuote = quotesWithAuthorEN[randomIndex]
  if (!randomQuote.author || !randomQuote.quote) {
    return {
      quote: "I don't care if it works on your machine! We are not shipping your machine!",
      author: 'Vidiu Platon',
    }
  }
  return randomQuote
}

export function quotes({ language }) {
  return language === 'es' ? getQuotesES() : getQuotesEN()
}
