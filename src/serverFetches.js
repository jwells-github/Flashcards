function requestLogin(username, password){
    return fetch("/login",{
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username: username, password: password}) 
      }).then(response => response.json())
}

function requestLogout(){
    return fetch('/logout',{
        withCredentials: true,
        credentials: 'include'
    })
}
function requestSignup(username, password){
    return fetch("/signup",{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        withCredentials: true,
        credentials: 'include',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({username: username, password: password}) 
      }).then(response => response.json())
}

function requestUser(){
    return fetch('/user',{
        withCredentials: true,
        credentials: 'include'
    }).then(response => response.json())
}

function requestFlashcards(){
    return fetch('/flashcards/get',{
        withCredentials: true,
        credentials: 'include'
      }).then(response => response.json())
}

function requestCreateFlashcard(cardFront, cardBack, cardDeck){
    return fetch("/flashcards/create",{
        method: 'POST',   
        withCredentials: true,
        credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({cardFront: cardFront, cardBack: cardBack, cardDeck: cardDeck}) 
    }).then(response => response.json())
}

function requestDeleteCard(cardID){
    return fetch("/flashcards/delete",{
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({cardId: cardID})
    }).then(response => response.json())
}

function requestEditCard(cardID, cardFront, cardBack, cardDeck){
    return fetch("/flashcards/edit",{
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            cardId: cardID,
            cardFront: cardFront,
            cardBack: cardBack,
            cardDeck: cardDeck    
        })
    }).then(response => response.json())
}

function requestEditDeck(oldDeckName, newDeckName){
    return fetch("/deck/edit",{
        method: 'POST',   
        withCredentials: true,
        credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({oldDeckName: oldDeckName, newDeckName: newDeckName }) 
        }).then(response => response.json())
}
export {requestUser, requestDeleteCard, 
        requestEditCard, requestEditDeck,
        requestFlashcards, requestCreateFlashcard, 
        requestLogin, requestLogout, requestSignup}
