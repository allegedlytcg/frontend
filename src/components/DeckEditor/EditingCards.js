import React from "react";
import styled from "styled-components";
import * as _ from "lodash";

const EditingCards = (props) => {
  const { edit, cardClick } = props;

  return (
    <EditingDeckStyles>

      <EditingArr id="editing-arr">
        {edit.length === 0 ? (
          <div className="no-cards">
            <p style={{ textAlign: "center", color: "red", marginTop: "100px", marginLeft: "-120px"}}>* There are no cards in your deck, you must add at least 1 card to save</p>
            <br></br>
          </div>
        ) : (
          <>
            {_.sortBy(
              edit,
              "type",
              "nationalPokedexNumber",
              "supertype",
              "name"
            ).map((editing, index) => {
              return (
                <img
                  src={editing.imageUrl}
                  alt="cards to be added"
                  key={index}
                  onClick={() => cardClick(editing)}
                />
              );
            })}
          </>
        )}
      </EditingArr>
    </EditingDeckStyles>
  );
};

const EditingDeckStyles = styled.div`
  flex-direction: column;
  cursor: pointer;
  margin-left: 0rem;
  margin-right: -0.4rem;
   

  img {
    width: 9rem;
    margin-right: -2.1rem;
    &:hover {
      transform: scale(1.2);
    }
  }
  p {
    margin: 0;
  }
  button {
    margin-top: 1rem;
    width: 8rem;
    padding: 0.5rem 1.5rem;
  }
`;

const EditingArr = styled.div`
  height: 18.5rem;
  overflow: auto;
  overflow-x: hidden;
  flex-direction: row;
  padding: 0 10px 0 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2) ;

`;

export default EditingCards;
