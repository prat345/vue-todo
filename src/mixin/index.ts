import CryptoJS from 'crypto-js'

export const modifyUrlDisplay = (route: any) => {
  if (route.query.en) {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(route.query.en), 'kopkap')
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } else {
    const params = [...Object.values(route.query)].join('&') // Extract parameters
    // const encryptedParams = encryptParams(params) // Encrypt the parameters
    const encryptedParams = CryptoJS.AES.encrypt(JSON.stringify(route.query), 'kopkap').toString()
    const newUrl = `${window.location.origin + route.path}/?en=${encodeURIComponent(encryptedParams)}` // Create the new URL

    window.history.replaceState('', '', newUrl)

    return route.query
  }
}
