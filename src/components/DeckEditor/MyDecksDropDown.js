import React, { useEffect } from "react";
import styled from "styled-components";

const MyDeckDropDown = (props) => {
  const {
    setEdit,
    setExisting,
    setDeckId,
    getDecks,
    userDecks,
    setDeckName,
  } = props;

  // when rendered grab all user decks

  useEffect(() => {
    getDecks();
  }, [getDecks]);

  // if deck selected from dropdown update the edit state array
  const addAllToEdit = (deckObj) => {
    // next two lines clear those states when the click the create new option
    setExisting(false);
    setEdit([]);
    setDeckName("");
    let newDeckObj = JSON.parse(deckObj);
    setDeckName(newDeckObj.name);
    setExisting(true);
    setDeckId(newDeckObj._id);
    setEdit(newDeckObj.cards);
  };

  return (
    <StyledDropdown className="select">
      <select onChange={(e) => addAllToEdit(e.target.value)}>
        <option>Create New Deck</option>
        {userDecks.map((deckObj) => {
          return (
            <option value={JSON.stringify(deckObj)} key={deckObj._id}>
              {deckObj.name}
            </option>
          );
        })}
      </select>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`


select {
    width:140px; 
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;
	option {
		color: red;
		max-width:30px; 
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;	}
}




}
`;

export default MyDeckDropDown;
