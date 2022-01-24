(this.webpackJsonpflashcards=this.webpackJsonpflashcards||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(2),n=a.n(s),i=a(10),r=a.n(i),c=(a(15),a(3)),d=a(4),o=a(1),l=a(6),h=a(5),u=(a(16),a(17),a(7));var p=a(0),j=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={loginUsername:"",loginPassword:""},s.handleChange=s.handleChange.bind(Object(o.a)(s)),s.login=s.login.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(u.a)({},e.target.name,e.target.value))}},{key:"login",value:function(e){var t,a,s=this;(e.preventDefault(),""!==this.state.loginUsername&&""!==this.state.loginPassword)&&(t=this.state.loginUsername,a=this.state.loginPassword,fetch("/login",{method:"POST",withCredentials:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({username:t,password:a})}).then((function(e){return e.json()}))).then((function(e){return s.props.handleResponse(e)}))}},{key:"render",value:function(){return Object(p.jsx)("div",{className:"loginForm",children:Object(p.jsxs)("form",{onSubmit:this.login,children:[Object(p.jsxs)("div",{className:"formField",children:[Object(p.jsx)("label",{htmlFor:"loginUsername",children:"Username:"}),Object(p.jsx)("input",{name:"loginUsername",type:"text",autoFocus:!0,onChange:this.handleChange})]}),Object(p.jsxs)("div",{className:"formField",children:[Object(p.jsx)("label",{htmlFor:"loginPassword",children:"Password:"}),Object(p.jsx)("input",{name:"loginPassword",type:"password",onChange:this.handleChange})]}),Object(p.jsx)("button",{type:"submit",children:"Log in"})]})})}}]),a}(s.Component),b=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={signUpUsername:"",signUpPassword:""},s.handleChange=s.handleChange.bind(Object(o.a)(s)),s.signUp=s.signUp.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(u.a)({},e.target.name,e.target.value))}},{key:"signUp",value:function(e){var t,a,s=this;(e.preventDefault(),""!==this.state.signUpUsername&&""!==this.state.signUpPassword)&&(t=this.state.signUpUsername,a=this.state.signUpPassword,fetch("/signup",{method:"POST",mode:"cors",cache:"no-cache",withCredentials:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({username:t,password:a})}).then((function(e){return e.json()}))).then((function(e){return s.props.handleResponse(e)}))}},{key:"render",value:function(){return Object(p.jsx)("div",{className:"signUpForm",children:Object(p.jsxs)("form",{onSubmit:this.signUp,children:[Object(p.jsxs)("div",{className:"formField",children:[Object(p.jsx)("label",{htmlFor:"signUpUsername",children:"Username:"}),Object(p.jsx)("input",{name:"signUpUsername",type:"text",autoFocus:!0,onChange:this.handleChange})]}),Object(p.jsxs)("div",{className:"formField",children:[Object(p.jsx)("label",{htmlFor:"signUpPassword",children:"Password:"}),Object(p.jsx)("input",{name:"signUpPassword",type:"password",onChange:this.handleChange})]}),Object(p.jsx)("button",{type:"submit",children:"Sign up"})]})})}}]),a}(s.Component),k=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={showLoginForm:!0,formError:""},s.handleResponse=s.handleResponse.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"displayLoginForm",value:function(e){e!==this.state.showLoginForm&&this.setState({showLoginForm:e,formError:""})}},{key:"handleResponse",value:function(e){e.formError?this.setState({formError:e.formError}):this.setState({formError:""}),e.loggedIn&&this.props.setLoginStatus(e.loggedIn)}},{key:"getForm",value:function(){return this.state.showLoginForm?Object(p.jsx)(j,{handleResponse:this.handleResponse}):Object(p.jsx)(b,{handleResponse:this.handleResponse})}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{className:"entranceForm",children:[Object(p.jsxs)("div",{className:"selectionButtons",children:[Object(p.jsx)("h2",{className:this.state.showLoginForm?"":"faded",onClick:function(){return e.displayLoginForm(!0)},children:"Log in"}),Object(p.jsx)("h2",{className:this.state.showLoginForm?"faded":"",onClick:function(){return e.displayLoginForm(!1)},children:"Sign up"})]}),this.getForm(),Object(p.jsx)("p",{children:this.state.formError})]}),Object(p.jsxs)("div",{className:"guestForm",children:[Object(p.jsx)("button",{onClick:function(){return e.props.setGuestStatus(!0)},children:"Demo the App in guest mode"}),Object(p.jsx)("span",{children:"All data will be lost when session ends"})]})]})}}]),a}(s.Component),g=a(8),m=(a(19),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={filteredData:[],selectedSuggestion:-1,displaySuggestions:!0},s.updateSuggestions=s.updateSuggestions.bind(Object(o.a)(s)),s.useSuggestion=s.useSuggestion.bind(Object(o.a)(s)),s.handleSuggestionInput=s.handleSuggestionInput.bind(Object(o.a)(s)),s.hideSuggestions=s.hideSuggestions.bind(Object(o.a)(s)),s.displaySuggestions=s.displaySuggestions.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentWillUnmount",value:function(){this.hideSuggestionsTimer&&clearTimeout(this.hideSuggestionsTimer)}},{key:"handleSuggestionInput",value:function(e){if(!(this.state.filteredData.length<=0)){var t="Down"===e.key||"ArrowDown"===e.key,s="Up"===e.key||"ArrowUp"===e.key,n="Enter"===e.key;if(t){if(a.maxSuggestions<=this.state.selectedSuggestion)return;this.setState((function(e){return{selectedSuggestion:e.selectedSuggestion+1}}))}if(s){if(this.state.selectedSuggestion<=-1)return;this.setState((function(e){return{selectedSuggestion:e.selectedSuggestion-1}}))}if(n){if(-1===this.state.selectedSuggestion)return;e.preventDefault(),this.useSuggestion(this.state.filteredData[this.state.selectedSuggestion])}}}},{key:"updateSuggestions",value:function(e){this.setState({selectedSuggestion:-1,filteredData:this.props.dataArray.filter((function(t){return t.match(new RegExp("^"+e.target.value,"i"))})).sort()}),this.props.updateInputValue(e.target.value)}},{key:"useSuggestion",value:function(e){this.setState({selectedSuggestion:0,filteredData:[]}),this.props.updateInputValue(e)}},{key:"hideSuggestions",value:function(){var e=this;this.hideSuggestionsTimer=setTimeout((function(){e.setState({displaySuggestions:!1})}),300)}},{key:"displaySuggestions",value:function(){this.setState({displaySuggestions:!0})}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"formField inputSuggestionField",children:[Object(p.jsxs)("label",{htmlFor:this.props.fieldName,children:[this.props.fieldName,":"]}),Object(p.jsx)("input",{onFocus:this.displaySuggestions,onBlur:this.hideSuggestions,onKeyDown:this.handleSuggestionInput,name:this.props.fieldName,type:"text",value:this.props.InputValue,onChange:this.updateSuggestions,autoComplete:"off"}),Object(p.jsx)("div",{className:this.state.displaySuggestions?"":"hide",children:Object(p.jsx)("div",{className:this.state.filteredData.length>0?"formSuggestion":"",children:this.state.filteredData.slice(0,a.maxSuggestions).map((function(t,a){return Object(p.jsx)("span",{id:e.state.selectedSuggestion===a?"InputSuggestion-Selected":"",value:t,onClick:function(){return e.useSuggestion(t)},children:t},a)}))})})]})}}]),a}(s.Component));m.maxSuggestions=5;var f=m,O=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={cardDeck:void 0===s.props.cardDeck?"":s.props.cardDeck,displayMergeWarning:!1,displayCurrentNameWarning:!1,errorEditingDeck:!1},s.updateCardDeck=s.updateCardDeck.bind(Object(o.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(o.a)(s)),s.hideOverlay=s.hideOverlay.bind(Object(o.a)(s)),s.editDeckName=s.editDeckName.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"updateCardDeck",value:function(e){this.setState({cardDeck:e,displayMergeWarning:!1,displayCurrentNameWarning:!1})}},{key:"handleSubmit",value:function(e){e.preventDefault(),""!==this.state.cardDeck&&(this.state.cardDeck===this.props.cardDeck?this.setState({displayCurrentNameWarning:!0}):this.props.decks.includes(this.state.cardDeck)&&!this.state.displayMergeWarning?this.setState({displayMergeWarning:!0}):this.editDeckName(this.props.cardDeck,this.state.cardDeck))}},{key:"editDeckName",value:function(e,t){var a=this;this.setState({errorEditingDeck:!1},(function(){!1===a.props.inGuestMode?function(e,t){return fetch("/deck/edit",{method:"POST",withCredentials:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({oldDeckName:e,newDeckName:t})}).then((function(e){return e.json()}))}(e,t).then((function(s){s.success?(a.props.editDeckName(e,t),a.props.hideOverlay()):a.setState({errorEditingDeck:!0})})):(a.props.editDeckName(e,t),a.props.hideOverlay())}))}},{key:"hideOverlay",value:function(e){e.target===e.currentTarget&&(this.props.hideOverlay(),this.setState({cardDeck:this.props.cardDeck,displayMergeWarning:!1,displayCurrentNameWarning:!1}))}},{key:"getFormWarning",value:function(){return this.state.displayMergeWarning?Object(p.jsxs)("div",{className:"formWarning",children:[Object(p.jsx)("h1",{children:"Warning:"}),Object(p.jsx)("span",{children:"A deck with that name already exists, this deck will be merged with the existing deck"}),Object(p.jsx)("span",{children:"Submit to procceed"})]}):this.state.displayCurrentNameWarning?Object(p.jsxs)("div",{className:"formWarning",children:[Object(p.jsx)("h1",{children:"Warning:"}),Object(p.jsx)("span",{children:"This deck already has that name"})]}):void 0}},{key:"getSubmissionError",value:function(){if(this.state.errorEditingDeck)return Object(p.jsxs)("div",{children:[Object(p.jsx)("h1",{children:"Warning:"}),Object(p.jsx)("span",{children:"There was an error processing your request, please try again"})]})}},{key:"render",value:function(){return Object(p.jsxs)("div",{className:"flashcardForm",children:[Object(p.jsx)("button",{onClick:this.props.hideOverlay,children:"hide"}),Object(p.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(p.jsx)(f,{InputValue:this.state.cardDeck,fieldName:"Deck",dataArray:this.props.decks,updateInputValue:this.updateCardDeck}),Object(p.jsx)("button",{className:"flashcardSubmitButton",type:"submit",children:"Submit Card"}),this.getFormWarning(),this.getSubmissionError()]})]})}}]),a}(s.Component),y=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={cardFront:void 0===s.props.cardFront?"":s.props.cardFront,cardBack:void 0===s.props.cardBack?"":s.props.cardBack,cardDeck:void 0===s.props.cardDeck?"":s.props.cardDeck},s.handleChange=s.handleChange.bind(Object(o.a)(s)),s.updateCardDeck=s.updateCardDeck.bind(Object(o.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.cardFront!==e.cardFront&&this.setState({cardFront:void 0===this.props.cardFront?"":this.props.cardFront}),this.props.cardBack!==e.cardBack&&this.setState({cardBack:void 0===this.props.cardBack?"":this.props.cardBack}),this.props.cardDeck!==e.cardDeck&&this.setState({cardDeck:void 0===this.props.cardDeck?"":this.props.cardDeck})}},{key:"handleChange",value:function(e){this.setState(Object(u.a)({},e.target.name,e.target.value))}},{key:"updateCardDeck",value:function(e){this.setState({cardDeck:e})}},{key:"handleSubmit",value:function(e){e.preventDefault(),""!==this.state.cardFront&&""!==this.state.cardBack&&""!==this.state.cardDeck&&(this.props.returnCard(this.state.cardFront,this.state.cardBack,this.state.cardDeck),this.setState({cardFront:"",cardBack:"",cardDeck:""}),this.props.hideOverlay())}},{key:"render",value:function(){return Object(p.jsxs)("form",{className:"flashcardForm",onSubmit:this.handleSubmit,children:[Object(p.jsx)("button",{className:"hideFormButton",onClick:this.props.hideOverlay,children:"X"}),Object(p.jsxs)("div",{className:"formField",children:[Object(p.jsx)("label",{htmlFor:"cardFront",children:"Front Text:"}),Object(p.jsx)("textarea",{autoFocus:!0,name:"cardFront",type:"text",value:this.state.cardFront,onChange:this.handleChange})]}),Object(p.jsxs)("div",{className:"formField",children:[Object(p.jsx)("label",{htmlFor:"cardBack",children:"Back Text:"}),Object(p.jsx)("textarea",{name:"cardBack",type:"text",value:this.state.cardBack,onChange:this.handleChange})]}),Object(p.jsx)(f,{InputValue:this.state.cardDeck,fieldName:"Deck",dataArray:this.props.decks,updateInputValue:this.updateCardDeck}),Object(p.jsx)("button",{className:"flashcardSubmitButton",type:"submit",children:"Submit Card"})]})}}]),a}(s.Component),v=(a(20),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).hideOverlay=s.hideOverlay.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"hideOverlay",value:function(e){e.target===e.currentTarget&&this.props.hideOverlay()}},{key:"render",value:function(){return Object(p.jsx)("div",{className:this.props.displayOverlay?"screenOverlay":"hide",onMouseDown:this.hideOverlay,children:this.props.displayOverlay?this.props.children:""})}}]),a}(s.Component)),C=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={searchFilter:"",cardToEdit:{},displayEditCardForm:!1,displayEditDeckNameForm:!1,displayCreateCardForm:!1},s.deleteCard=s.deleteCard.bind(Object(o.a)(s)),s.editCard=s.editCard.bind(Object(o.a)(s)),s.displayEditCardForm=s.displayEditCardForm.bind(Object(o.a)(s)),s.displayEditDeckNameForm=s.displayEditDeckNameForm.bind(Object(o.a)(s)),s.displayCreateCardForm=s.displayCreateCardForm.bind(Object(o.a)(s)),s.hideForm=s.hideForm.bind(Object(o.a)(s)),s.handleChange=s.handleChange.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){window.history.pushState({},document.title),window.onpopstate=this.props.exitView}},{key:"handleChange",value:function(e){this.setState(Object(u.a)({},e.target.name,e.target.value))}},{key:"deleteCard",value:function(e){var t,a=this;if(window.confirm("Are you sure you want to delete this card?\r\n"+e.cardFront+"\r\n"+e.cardBack))if(!1===this.props.inGuestMode)(t=e._id,fetch("/flashcards/delete",{method:"POST",withCredentials:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({cardId:t})}).then((function(e){return e.json()}))).then((function(t){return a.handleDeleteResponse(t,e)}));else{this.handleDeleteResponse({success:!0},e)}}},{key:"handleDeleteResponse",value:function(e,t){e.success?this.props.removeFlashcard(t):alert(e.message)}},{key:"editCard",value:function(e,t,a){var s=this;if(!1===this.props.inGuestMode)(function(e,t,a,s){return fetch("/flashcards/edit",{method:"POST",withCredentials:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({cardId:e,cardFront:t,cardBack:a,cardDeck:s})}).then((function(e){return e.json()}))})(this.state.cardToEdit._id,e,t,a).then((function(e){return s.handleEditResponse(e,s.state.cardToEdit._id)}));else{var n={success:!0,card:{_id:this.state.cardToEdit._id,cardFront:e,cardBack:t,cardDeck:a}};this.handleEditResponse(n,this.state.cardToEdit._id)}}},{key:"handleEditResponse",value:function(e,t){e.success?(this.props.editFlashcard(t,e.card),this.setState({showEditForm:!1,cardToEdit:{}})):alert(e.message)}},{key:"displayEditCardForm",value:function(e){this.setState({displayEditCardForm:!0,cardToEdit:e})}},{key:"displayEditDeckNameForm",value:function(){this.setState({displayEditDeckNameForm:!0})}},{key:"displayCreateCardForm",value:function(){this.setState({displayCreateCardForm:!0})}},{key:"hideForm",value:function(){this.setState({displayEditCardForm:!1,displayEditDeckNameForm:!1,displayCreateCardForm:!1})}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"deckView",children:[Object(p.jsx)("h1",{children:this.props.isDisplayingAllDecks?"All Decks":this.props.cards[0].cardDeck}),Object(p.jsxs)("div",{className:"deckViewOptions",children:[Object(p.jsx)("button",{onClick:this.props.playDeck,children:"Play Deck"}),Object(p.jsx)("button",{onClick:this.displayCreateCardForm,children:"Add a card"}),Object(p.jsx)("input",{className:"largeSearchbar",placeholder:"Search...",onChange:this.handleChange,name:"searchFilter",type:"text"}),Object(p.jsx)("button",{onClick:this.displayEditDeckNameForm,children:"Rename Deck"}),Object(p.jsx)("button",{children:"Delete Deck"})]}),Object(p.jsxs)("table",{className:"deckViewTable",children:[Object(p.jsx)("thead",{children:Object(p.jsxs)("tr",{children:[Object(p.jsx)("th",{className:"colCardFront",children:"Card Front"}),Object(p.jsx)("th",{className:"colCardBack",children:"Card Back"}),Object(p.jsx)("th",{className:this.props.isDisplayingAllDecks?"colCardDeck":"hide",children:"Deck"}),Object(p.jsx)("th",{className:"colCardDate",children:"Created Date"}),Object(p.jsx)("th",{className:"colCardAction"}),Object(p.jsx)("th",{className:"colCardAction"})]})}),Object(p.jsx)("tbody",{children:this.props.cards.filter((function(t){return t.cardFront.match(new RegExp(e.state.searchFilter,"g"))||t.cardBack.match(new RegExp(e.state.searchFilter,"g"))})).map((function(t,a){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{className:"colCardFront",children:t.cardFront}),Object(p.jsx)("td",{className:"colCardBack",children:t.cardBack}),Object(p.jsx)("td",{className:e.props.isDisplayingAllDecks?"colCardDeck":"hide",title:t.cardDeck,children:t.cardDeck}),Object(p.jsx)("td",{className:"colCardDate",children:new Date(t.dateCreated).toLocaleDateString("en-GB")}),Object(p.jsx)("td",{className:"colCardAction tableAction",children:Object(p.jsx)("span",{onClick:function(){return e.displayEditCardForm(t)},children:"Edit"})}),Object(p.jsx)("td",{className:"colCardAction tableAction",children:Object(p.jsx)("span",{onClick:function(){return e.deleteCard(t)},children:"Delete"})})]},a)}))})]}),Object(p.jsx)(v,{hideOverlay:this.hideForm,displayOverlay:this.state.displayEditCardForm,children:Object(p.jsx)(y,{hideOverlay:this.hideForm,decks:this.props.decks.map((function(e){return e.deckName})),returnCard:this.editCard,cardFront:this.state.cardToEdit.cardFront,cardBack:this.state.cardToEdit.cardBack,cardDeck:this.state.cardToEdit.cardDeck})}),Object(p.jsx)(v,{hideOverlay:this.hideForm,displayOverlay:this.state.displayEditDeckNameForm,children:Object(p.jsx)(O,{hideOverlay:this.hideForm,decks:this.props.decks.map((function(e){return e.deckName})),editDeckName:this.props.editDeckName,cardDeck:this.props.cards[0].cardDeck,inGuestMode:this.props.inGuestMode})}),Object(p.jsx)(v,{hideOverlay:this.hideForm,displayOverlay:this.state.displayCreateCardForm,children:Object(p.jsx)(y,{hideOverlay:this.hideForm,decks:this.props.decks.map((function(e){return e.deckName})),returnCard:this.props.createFlashcard,cardDeck:this.props.cards[0].cardDeck})})]})}}]),a}(s.Component),D=(a(21),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={showCardReverse:!1,actionTaken:!1,dragStartX:0,draggingCard:!1,initialCardCentre:0,commitedToDragging:!1,cardFlipped:!1},s.flipCard=s.flipCard.bind(Object(o.a)(s)),s.handleCardResult=s.handleCardResult.bind(Object(o.a)(s)),s.dragCard=s.dragCard.bind(Object(o.a)(s)),s.stopDragging=s.stopDragging.bind(Object(o.a)(s)),s.FlashCardRef=n.a.createRef(),s}return Object(d.a)(a,[{key:"componentWillUnmount",value:function(){document.removeEventListener("mouseup",this.stopDragging)}},{key:"flipCard",value:function(){this.state.commitedToDragging?this.setState({commitedToDragging:!1}):this.setState((function(e){return{showCardReverse:!e.showCardReverse,cardFlipped:!e.cardFlipped,actionTaken:!0}}))}},{key:"handleCardResult",value:function(e){this.state.actionTaken&&(this.setState({showCardReverse:!1,actionTaken:!1,cardFlipped:!1}),this.props.handleCardResult(e))}},{key:"dragCard",value:function(e){var t=this;this.state.actionTaken&&(this.setState({dragStartX:e.screenX,draggingCard:!0,initialCardCentre:e.currentTarget.getBoundingClientRect().x+e.currentTarget.offsetWidth/2}),this.dragTimer=setTimeout((function(){t.state.draggingCard&&t.setState({commitedToDragging:!0})}),150),document.addEventListener("mouseup",this.stopDragging))}},{key:"stopDragging",value:function(){var e=this;clearTimeout(this.dragTimer);var t=this.state.initialCardCentre,a=this.FlashCardRef.current.getBoundingClientRect().x+this.FlashCardRef.current.offsetWidth/2;this.setState({dragStartX:0,draggingCard:!1}),this.state.commitedToDragging&&(a<=t-t/3&&this.handleCardResult(!1),a>=t+t/3&&this.handleCardResult(!0),document.removeEventListener("mouseup",this.stopDragging),setTimeout((function(){e.setState({commitedToDragging:!1})}),100))}},{key:"render",value:function(){var e=this,t=0;this.state.draggingCard&&(t=this.props.mouseX-this.state.dragStartX);var a="translateX("+t+"px)",s="flashcardInner ";return this.state.cardFlipped&&(s+="flashcardInnerFlip"),Object(p.jsx)("div",{className:"flashcardView",children:Object(p.jsxs)("div",{className:"maskLevel",children:[Object(p.jsx)("div",{className:"mask"}),Object(p.jsxs)("div",{className:"cardContainer",children:[Object(p.jsx)("div",{className:"flashcard",ref:this.FlashCardRef,style:{transform:a},onMouseDown:this.dragCard,onClick:this.state.commitedToDragging?null:this.flipCard,children:Object(p.jsxs)("div",{className:s,children:[Object(p.jsxs)("div",{className:"cardFront",children:[Object(p.jsx)("span",{className:"cardInfo",children:"Front"}),Object(p.jsx)("span",{className:"cardText",children:this.props.card.cardFront}),Object(p.jsx)("span",{className:"cardInfo",children:"Click to reveal back"})]}),Object(p.jsxs)("div",{className:"cardReverse",children:[Object(p.jsx)("span",{className:"cardInfo",children:"Back"}),Object(p.jsx)("span",{className:"cardText",children:this.props.card.cardBack}),Object(p.jsx)("span",{className:"cardInfo",children:"Click to show front"})]})]})}),Object(p.jsxs)("div",{className:"flashcardButtons",children:[Object(p.jsx)("div",{className:this.state.actionTaken?"":"buttonInactive",children:Object(p.jsx)("button",{className:"buttonIncorrect",onClick:function(){return e.handleCardResult(!1)},children:"Incorrect"})}),Object(p.jsx)("div",{className:this.state.actionTaken?"":" buttonInactive",children:Object(p.jsx)("button",{className:"buttonCorrect",onClick:function(){return e.handleCardResult(!0)},children:"Correct"})})]})]}),Object(p.jsx)("div",{className:"mask"})]})})}}]),a}(s.Component)),S=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={cardsInPlay:s.getShuffledCards(s.props.cards),cardsToBeReplayed:[],positionInCards:0,showCardReverse:!1,actionTaken:!1,displayEndDialogue:!1,correctGuesses:0,incorrectGuesses:0,mouseX:0,mouseY:0},s.cardResult=s.handleCardResult.bind(Object(o.a)(s)),s.handleEndOfCards=s.handleEndOfCards.bind(Object(o.a)(s)),s.resetPlayView=s.resetPlayView.bind(Object(o.a)(s)),s.handleCardResult=s.handleCardResult.bind(Object(o.a)(s)),s.updateMousePosition=s.updateMousePosition.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){window.history.pushState({},document.title),window.onpopstate=this.props.exitView}},{key:"getShuffledCards",value:function(e){for(var t=e,a=t.length;0!==a;){var s=Math.floor(Math.random()*a),n=t[a-=1];t[a]=t[s],t[s]=n}return t}},{key:"handleEndOfCards",value:function(){this.state.cardsToBeReplayed.length<1?this.setState({displayEndDialogue:!0}):this.setState({cardsInPlay:this.getShuffledCards(this.state.cardsToBeReplayed),cardsToBeReplayed:[],positionInCards:0,showCardReverse:!1,actionTaken:!1})}},{key:"handleCardResult",value:function(e){var t=this,a=this.state.positionInCards===this.state.cardsInPlay.length-1,s=e?this.state.cardsToBeReplayed:[].concat(Object(g.a)(this.state.cardsToBeReplayed),[this.state.cardsInPlay[this.state.positionInCards]]);this.setState((function(t){return{positionInCards:t.positionInCards+=a?0:1,showCardReverse:!1,actionTaken:!1,cardsToBeReplayed:s,correctGuesses:t.correctGuesses+=e?1:0,incorrectGuesses:t.incorrectGuesses+=e?0:1}}),(function(){a&&t.handleEndOfCards()}))}},{key:"resetPlayView",value:function(){this.setState({cardsInPlay:this.getShuffledCards(this.props.cards),cardsToBeReplayed:[],positionInCards:0,showCardReverse:!1,actionTaken:!1,displayEndDialogue:!1,correctGuesses:0,incorrectGuesses:0})}},{key:"updateMousePosition",value:function(e){this.setState({mouseX:e.screenX,mouseY:e.screenY})}},{key:"render",value:function(){if(this.state.displayEndDialogue){var e=this.state.correctGuesses/(this.state.correctGuesses+this.state.incorrectGuesses)*100;return e=Math.round(100*e)/100,Object(p.jsxs)("div",{className:"endDialogue",children:[Object(p.jsxs)("h1",{children:[e,"% of answers were correct "]}),Object(p.jsx)("button",{onClick:this.resetPlayView,children:"Replay"}),Object(p.jsx)("button",{onClick:this.props.exitView,children:"Exit"})]})}var t=this.state.cardsInPlay[this.state.positionInCards];return Object(p.jsxs)("div",{onMouseMove:this.updateMousePosition,className:"playView",children:[Object(p.jsxs)("h1",{children:["Playing cards from: ",Object(p.jsx)("br",{})," ",t.cardDeck]}),Object(p.jsx)(D,{card:t,handleCardResult:this.handleCardResult,mouseX:this.state.mouseX}),Object(p.jsxs)("h2",{children:[this.state.cardsInPlay.length-this.state.positionInCards+this.state.cardsToBeReplayed.length," Cards remaining"]}),Object(p.jsxs)("h2",{children:[this.state.correctGuesses+this.state.incorrectGuesses," Cards Played"]})]})}}]),a}(s.Component),x=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={sortOptions:[{name:"Alphabetical",active:!1},{name:"Reverse alphabetical",active:!1},{name:"Number of cards (ascending)",active:!1},{name:"Number of cards (descending)",active:!0}]},s.updateSortPreference=s.updateSortPreference.bind(Object(o.a)(s)),s.sortDecks=s.sortDecks.bind(Object(o.a)(s)),s.applySortPreference=s.applySortPreference.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.decks!==e.decks&&this.applySortPreference()}},{key:"updateSortPreference",value:function(e){var t=this.state.sortOptions;t.forEach((function(t){t.name===e.target.value?t.active=!0:t.active=!1})),this.setState({sortOptions:t},this.applySortPreference())}},{key:"applySortPreference",value:function(){var e=this.sortDecks(this.props.decks);this.props.returnDecks(e)}},{key:"sortDecks",value:function(e){switch(this.state.sortOptions.find((function(e){return e.active})).name){case"Alphabetical":e.sort((function(e,t){return e.deckName.localeCompare(t.deckName)}));break;case"Reverse alphabetical":e.sort((function(e,t){return t.deckName.localeCompare(e.deckName)}));break;case"Number of cards (ascending)":e.sort((function(e,t){return e.count-t.count}));break;case"Number of cards (descending)":e.sort((function(e,t){return t.count-e.count}))}return e}},{key:"render",value:function(){return Object(p.jsx)("select",{defaultValue:this.state.sortOptions.find((function(e){return e.active})).name,onChange:this.updateSortPreference,children:Object(p.jsx)("optgroup",{label:"Sort Method",children:this.state.sortOptions.map((function(e){return Object(p.jsx)("option",{value:e.name,children:e.name},e.name)}))})})}}]),a}(s.Component),F=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={displayCardForm:!1,searchFilter:""},s.hideFlashcardForm=s.hideFlashcardForm.bind(Object(o.a)(s)),s.showFlashcardForm=s.showFlashcardForm.bind(Object(o.a)(s)),s.handleChange=s.handleChange.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(u.a)({},e.target.name,e.target.value))}},{key:"hideFlashcardForm",value:function(){this.setState({displayCardForm:!1})}},{key:"showFlashcardForm",value:function(){this.setState({displayCardForm:!0})}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"deckList",children:[Object(p.jsx)(v,{hideOverlay:this.hideFlashcardForm,displayOverlay:this.state.displayCardForm,children:Object(p.jsx)(y,{hideOverlay:this.hideFlashcardForm,decks:this.props.decks.map((function(e){return e.deckName})),returnCard:this.props.createFlashcard})}),Object(p.jsx)("div",{className:"deckContainer",children:Object(p.jsxs)("div",{className:"decks",children:[Object(p.jsxs)("div",{className:"deckOptions",children:[Object(p.jsx)("button",{onClick:this.showFlashcardForm,children:"Add a flashcard"}),Object(p.jsx)("button",{disabled:this.props.decks.length<1,onClick:this.props.playAllCards,children:"Play All"}),Object(p.jsx)("button",{disabled:this.props.decks.length<1,onClick:this.props.enterDeckDetialViewAllCards,children:"View All"}),Object(p.jsx)("input",{className:"largeSearchbar","aria-label":"deckSearch",placeholder:"Search...",onChange:this.handleChange,name:"searchFilter",type:"text"}),Object(p.jsx)(x,{decks:this.props.decks,returnDecks:this.props.updateDecks})]}),this.props.decks.filter((function(t){return t.deckName.match(new RegExp(e.state.searchFilter,"g"))})).map((function(t,a){return Object(p.jsxs)("div",{className:"deck",children:[Object(p.jsx)("h1",{children:t.deckName}),Object(p.jsxs)("span",{children:[t.count," ",t.count>1?"cards":"card"]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("button",{onClick:function(){return e.props.playDeck(t.deckName)},children:"Play Deck"}),Object(p.jsx)("button",{onClick:function(){return e.props.enterDeckDetailView(t.deckName)},children:"Edit Deck"})]})]},a)}))]})})]})}}]),a}(s.Component),w=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={flashcards:[],decks:[],searchFilter:"",playMode:!1,inDeckDetailView:!1,deckSelected:!1,selectedCards:[],allCardsSelected:!1},s.createFlashcard=s.createFlashcard.bind(Object(o.a)(s)),s.handleChange=s.handleChange.bind(Object(o.a)(s)),s.updateCardDeck=s.updateCardDeck.bind(Object(o.a)(s)),s.removeFlashcard=s.removeFlashcard.bind(Object(o.a)(s)),s.editFlashcard=s.editFlashcard.bind(Object(o.a)(s)),s.exitDeckDetailView=s.exitDeckDetailView.bind(Object(o.a)(s)),s.exitPlayView=s.exitPlayView.bind(Object(o.a)(s)),s.playDeck=s.playDeck.bind(Object(o.a)(s)),s.playAllCards=s.playAllCards.bind(Object(o.a)(s)),s.enterDeckDetailView=s.enterDeckDetailView.bind(Object(o.a)(s)),s.enterDeckDetialViewAllCards=s.enterDeckDetialViewAllCards.bind(Object(o.a)(s)),s.editDeckName=s.editDeckName.bind(Object(o.a)(s)),s.updateDecks=s.updateDecks.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;!1===this.props.inGuestMode&&fetch("/flashcards/get",{withCredentials:!0,credentials:"include"}).then((function(e){return e.json()})).then((function(t){e.setState({flashcards:t.flashcards,decks:e.getDeckNames(t.flashcards)})}))}},{key:"getDeckNames",value:function(e){var t=Object(g.a)(new Set(e.map((function(e){return e.cardDeck})))),a=[];return t.forEach((function(t){var s=e.filter((function(e){return e.cardDeck===t})).length;a.push({deckName:t,count:s})})),a}},{key:"editDeckName",value:function(e,t){var a=this.state.flashcards.map((function(a){return a.cardDeck===e&&(a.cardDeck=t),a}));this.setState({flashcards:a,decks:this.getDeckNames(a)})}},{key:"removeFlashcard",value:function(e){var t=this,a=this.state.flashcards.filter((function(t){return!t._id.match(e._id)}));this.setState({flashcards:a,decks:this.getDeckNames(a)},(function(){t.state.deckSelected&&(t.state.allCardsSelected?t.setState({selectedCards:t.state.flashcards}):t.selectDeck(e.cardDeck))}))}},{key:"editFlashcard",value:function(e,t){var a=this.state.flashcards.slice(),s=a.findIndex((function(t){return t._id.match(e)}));a[s]=t;var n=this.state.selectedCards.slice(),i=n.findIndex((function(t){return t._id.match(e)}));n[i]=t,this.setState({flashcards:a,selectedCards:n,decks:this.getDeckNames(a)})}},{key:"handleChange",value:function(e){this.setState(Object(u.a)({},e.target.name,e.target.value))}},{key:"addFlashcard",value:function(e){var t=this;this.setState((function(a){return{flashcards:[].concat(Object(g.a)(a.flashcards),[e]),decks:t.getDeckNames([].concat(Object(g.a)(a.flashcards),[e]))}}),(function(){t.state.deckSelected&&(t.state.allCardsSelected?t.setState({selectedCards:t.state.flashcards}):t.selectDeck(e.cardDeck))}))}},{key:"createFlashcard",value:function(e,t,a){var s=this;!1===this.props.inGuestMode?function(e,t,a){return fetch("/flashcards/create",{method:"POST",withCredentials:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({cardFront:e,cardBack:t,cardDeck:a})}).then((function(e){return e.json()}))}(e,t,a).then((function(e){return s.addFlashcard(e)})):this.addFlashcard({_id:String(Date.now()+Math.random()),cardFront:e,cardBack:t,cardDeck:a,dateCreated:Date.now()})}},{key:"updateCardDeck",value:function(e){this.setState({cardDeck:e})}},{key:"updateSelectionInProgress",value:function(e){this.setState({selectionInProgress:e})}},{key:"playDeck",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e.length>0&&this.selectDeck(e),this.setState({playMode:!0})}},{key:"enterDeckDetailView",value:function(e){this.selectDeck(e),this.setState({inDeckDetailView:!0})}},{key:"enterDeckDetialViewAllCards",value:function(){this.state.flashcards.length.length<1||(this.setState({selectedCards:this.state.flashcards,inDeckDetailView:!0,deckSelected:!0,allCardsSelected:!0}),this.props.showBackButton())}},{key:"playAllCards",value:function(){this.state.flashcards.length.length<1||(this.setState({deckSelected:!0,selectedCards:this.state.flashcards,playMode:!0}),this.props.showBackButton())}},{key:"selectDeck",value:function(e){this.setState({deckSelected:!0,selectedCards:this.state.flashcards.filter((function(t){return t.cardDeck===e}))}),this.props.showBackButton()}},{key:"exitDeckDetailView",value:function(){this.setState({deckSelected:!1,selectedCards:[],allCardsSelected:!1,inDeckDetailView:!1}),this.props.hideBackButton()}},{key:"exitPlayView",value:function(){this.state.inDeckDetailView?this.setState({playMode:!1}):(this.setState({deckSelected:!1,selectedCards:[],playMode:!1}),this.props.hideBackButton())}},{key:"updateDecks",value:function(e){this.setState({decks:e})}},{key:"render",value:function(){return this.state.playMode?Object(p.jsx)(S,{cards:this.state.selectedCards,exitView:this.exitPlayView}):this.state.deckSelected?Object(p.jsx)(C,{cards:this.state.selectedCards,removeFlashcard:this.removeFlashcard,editFlashcard:this.editFlashcard,createFlashcard:this.createFlashcard,decks:this.state.decks,exitView:this.exitDeckDetailView,playDeck:this.playDeck,editDeckName:this.editDeckName,isDisplayingAllDecks:this.state.allCardsSelected,inGuestMode:this.props.inGuestMode}):Object(p.jsx)(F,{decks:this.state.decks,createFlashcard:this.createFlashcard,updateDecks:this.updateDecks,playAllCards:this.playAllCards,enterDeckDetialViewAllCards:this.enterDeckDetialViewAllCards,enterDeckDetailView:this.enterDeckDetailView,playDeck:this.playDeck})}}]),a}(s.Component),N=w,B=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={loading:!0,loggedIn:!1,guestMode:!1,displayBackButton:!1},s.setLoginStatus=s.setLoginStatus.bind(Object(o.a)(s)),s.setGuestStatus=s.setGuestStatus.bind(Object(o.a)(s)),s.showBackButton=s.showBackButton.bind(Object(o.a)(s)),s.hideBackButton=s.hideBackButton.bind(Object(o.a)(s)),s.getBody=s.getBody.bind(Object(o.a)(s)),s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("/user",{withCredentials:!0,credentials:"include"}).then((function(e){return e.json()})).then((function(t){e.setState(t),e.setState({loading:!1})}))}},{key:"setLoginStatus",value:function(e){this.setState({loggedIn:e})}},{key:"setGuestStatus",value:function(e){this.setState({guestMode:e})}},{key:"showBackButton",value:function(){this.setState({displayBackButton:!0})}},{key:"hideBackButton",value:function(){this.setState({displayBackButton:!1})}},{key:"historyBack",value:function(){window.history.back()}},{key:"getBody",value:function(){return this.state.loggedIn||this.state.guestMode?Object(p.jsx)(N,{hideBackButton:this.hideBackButton,showBackButton:this.showBackButton,inGuestMode:this.state.guestMode}):Object(p.jsx)(k,{setLoginStatus:this.setLoginStatus,setGuestStatus:this.setGuestStatus})}},{key:"render",value:function(){return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsxs)("div",{className:"header",children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("i",{onClick:this.historyBack,className:this.state.displayBackButton?"fas fa-arrow-left":"fas fa-arrow-left invisibile"}),Object(p.jsx)("span",{children:"Flashcard App"})]}),Object(p.jsx)("div",{children:Object(p.jsx)("span",{children:this.state.loggedIn?"You are logged in":"You are not logged in"})})]}),this.getBody()]})}}]),a}(s.Component),T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,23)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),s(e),n(e),i(e),r(e)}))};r.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(B,{})}),document.getElementById("root")),T()}],[[22,1,2]]]);
//# sourceMappingURL=main.4aa19143.chunk.js.map