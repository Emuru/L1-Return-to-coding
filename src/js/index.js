/**
 * The main script file of the application.
 *
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 1.0.0
 */

const inputForm = document.querySelector('#form-container')
const greeting = document.querySelector('#greeting-container')
const backgroundImage = document.querySelector('#background-image')

/**
 * Event listener to handle form submissions.
 */
inputForm.addEventListener('submit', (event) => {
  event.preventDefault()
  showGreeting()
})

/**
 * Fetches the user's name and displays a greeting.
 * Fetches a background image based on the user's name and applies it to the background.
 * Toggles visibility of the form and greeting elements.
 */
async function showGreeting() {
  const name = document.querySelector('#name').value

  greeting.textContent = `Hello ${name}!`

  // Fetch image based on name
  const imageUrl = await fetchImage(name)

  // Validate response and update background image
  if (imageUrl) {
    backgroundImage.style.backgroundImage = `url(${imageUrl})`
  }

  // Toggle visibility
  inputForm.classList.toggle('hidden')
  greeting.classList.toggle('hidden')
}

/**
 * Fetches a random image based on the given name using the Unsplash API.
 *
 * @param {string} name - The name to use as query.
 * @returns {string} The URL of the image.
 */
async function fetchImage(name) {
  try {
    const url = `https://api.unsplash.com/photos/random/?orientation=landscape&auto=format&query=${name}`
    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    })

    if (!response.ok) {
      throw new Error('Image not found')
    }

    const data = await response.json()

    // Get url from response
    const imageUrl = data.urls.regular

    return imageUrl
  } catch (error) {
    console.log(error)
  }
}
