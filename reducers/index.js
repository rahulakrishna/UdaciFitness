import {ADD_ENTRY,RECIEVE_ENTRY} from '../actions/'

function entries(state={},action){
	switch(action.type){
		case ADD_ENTRY:{
			return {
				 ...state,
				 ...action.entry
			}
		}
		case RECIEVE_ENTRY:{
			return {
				...state,
				...action.entries
			}		
		}
		default:{
			return state
		}
	}
}

export default entries