import React, {Component} from 'react'

class DeckSortOptions extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortOptions: [
                {name: "Alphabetical", active: false},
                {name: "Reverse alphabetical", active: false},
                {name: "Number of cards (ascending)", active: false},
                {name: "Number of cards (descending)", active: true},
            ],
        };
        this.updateSortPreference = this.updateSortPreference.bind(this);
        this.sortDecks = this.sortDecks.bind(this);
        this.applySortPreference = this.applySortPreference.bind(this)
    }

    componentDidUpdate(prevProps){
        if(this.props.decks !== prevProps.decks){
            this.applySortPreference()
        }
    }

    updateSortPreference(event){    
        let sortPreferences = this.state.sortOptions;
        sortPreferences.forEach(option => {
            if(option.name === event.target.value){
                option.active = true;    
            }
            else{
                option.active = false;
            }
        });
        this.setState({sortOptions: sortPreferences}, 
            this.applySortPreference()
        );
    }
    applySortPreference(){
        let sortedDecks = this.sortDecks(this.props.decks);
        this.props.returnDecks(sortedDecks)
    }
    
    sortDecks(decks){
        switch(this.state.sortOptions.find(p => p.active).name){
            case "Alphabetical":
                decks.sort((a,b) => a.deckName.localeCompare(b.deckName))
                break;
            case "Reverse alphabetical":
                decks.sort((a,b) => b.deckName.localeCompare(a.deckName))
                break;
            case "Number of cards (ascending)":
                decks.sort((a,b) => a.count - b.count)
                break;
            case "Number of cards (descending)":
                decks.sort((a,b) => b.count - a.count)
                break;
            default:
                break;
        }
        return decks;
    }

    render(){
        return(
        <select defaultValue={this.state.sortOptions.find(opt => opt.active).name} onChange={this.updateSortPreference}>
            <optgroup label="Sort Method"> 
                {this.state.sortOptions.map(sortOption => 
                    <option key={sortOption.name}  value={sortOption.name}>{sortOption.name}</option>)
                }
            </optgroup>
        </select>
        )
    }
}

export default DeckSortOptions;