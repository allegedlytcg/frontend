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
            <p>There are no cards in your deck</p>
            <br></br>
          </div>
        ) : (
          <>
            {_.sortBy(edit, "nationalPokedexNumber", "supertype", "name").map(
              (editing, index) => {
                return (
                  <img
                    src={editing.imageUrl}
                    alt="cards to be added"
                    key={index}
                    onClick={() => cardClick(editing)}
                  />
                );
              }
            )}
          </>
        )}
      </EditingArr>
    </EditingDeckStyles>
  );
};

const EditingDeckStyles = styled.div`
	flex-direction: column;
	cursor: pointer;

	img {
		width: 7rem;
		margin-right: -2.3rem;
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
	max-height: 19.5rem;
	overflow: auto;
	overflow-x: hidden;
	flex-direction: row;
	padding: 0 2rem 0 0;
`;

export default EditingCards;
