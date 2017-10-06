export const RECIEVE_ENTRIES='RECIEVE_ENTRIES'
export const ADD_ENTRIES='ADD_ENTRIES'

export function recieveEntries(entries){
	return{
		type:RECIEVE_ENTRIES,
		entries
	}
}

export function addEntry(entry){
	return{
		type:ADD_ENTRIES,
		entry
	}
}