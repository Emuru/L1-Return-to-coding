/**
 * The main script file of the application.
 *
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 1.0.0
 */

const inputForm = document.querySelector('#form-container')
const greeting = document.querySelector('#greeting-container')

inputForm.addEventListener('submit', (event) => {
  event.preventDefault()
  showGreeting()
})

async function showGreeting() {
  const name = document.querySelector('#name').value

  greeting.textContent = `Hello ${name}!`

  const imageUrl = await fetchImage(name)

  document.body.style.backgroundImage = `url(${imageUrl})`

  inputForm.classList.toggle('hidden')
  greeting.classList.toggle('hidden')
}

async function fetchImage(name) {
  try {
    const url = `https://api.unsplash.com/photos/random/?orientation=landscape&auto=format&query=${name}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Client-ID `
      }
    })

    if (!response.ok) {
      throw new Error('Image not found')
    }

    const data = await response.json()

    const imageUrl = data.urls.full

    return imageUrl
  } catch (error) {
    console.log(error)
  }
}
