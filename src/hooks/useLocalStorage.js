import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-clone-' //key PREFIX is unique to app
// when you have a lot of apps on localhost, like localhost3000, for ex, all of your different local storages are going to conflict with each other, so if you have prefix for all of them it won't be issues. It also makes easier to find them by PREFIX
export default function useLocalStorage(key, initialValue) { //key is what we store in LocalStorage, initial value is what you normally pass to useState  

   // to get value from localStorage and put it in state
   const prefixedKey = PREFIX + key   
   const [value, setValue] = useState(() => {
      const jsonValue = localStorage.getItem(prefixedKey)
      if (jsonValue != null) return JSON.parse(jsonValue)
      if (typeof initialValue === 'function') {
         return initialValue()
      } else { 
         return initialValue
      }
   })  
   
   //get value and save it into the LocalStorage. Any time that value or key changes we need to re-put value into local storage, re-save it
   useEffect(() => {
      localStorage.setItem(prefixedKey, JSON.stringify(value))
   }, [prefixedKey, value])

   return [value, setValue]
}
