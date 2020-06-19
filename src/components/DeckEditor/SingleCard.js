import React from 'react';
import styled from 'styled-components';

const SingleCard = (props) => {
	const { selectedCard, addToEdit } = props;
	return (
		<>
			{selectedCard.map((card) => {
				return (
					<div key={card._id}>
						<SingleCardStyles key={card.imageUrlHiRes}>
							<img src={card.imageUrlHiRes} alt='selected card' />
							<div className='card-info'>
								<h2>{card.name}</h2>
								{card.text ? (
									<p>Description: {card.text}</p>
								) : null}
								{card.hp ? <p>Hitpoints: {card.hp}</p> : null}
								{card.types ? (
									<p>
										Type:{' '}
										{card.types ? card.types[0] : null}
									</p>
								) : null}
								{card.subtype ? (
									<p>Subtype: {card.subtype}</p>
								) : null}
								{card.evolvesFrom ? (
									<p>Evolves from: {card.evolvesFrom}</p>
								) : null}
								{card.ability ? (
									<>
										<h4>Pokemon Powers:</h4>
										<p>{card.ability.name}:</p>{' '}
										<p>{card.ability.text}</p>
									</>
								) : null}
								{card.attacks ? <h4>Attacks:</h4> : null}
								{card.attacks
									? card.attacks.map((attack) => {
											// will need to map over cost later
											return (
												<>
													<div>
														<h5 key={Math.random()}>
															{attack.name}
														</h5>
														<p>
															Cost:{' '}
															{
																attack.convertedEnergyCost
															}{' '}
															{attack.cost[0]}
														</p>
														<p>
															Damage:{' '}
															{attack.damage}
														</p>
														{attack.text ? (
															<p>
																Description:{' '}
																{attack.text}
															</p>
														) : null}
													</div>
												</>
											);
									  })
									: null}

								{card.weaknesses
									? card.weaknesses.map((weakness) => {
											// console.log(weakness);
											return (
												<p>
													<h4>Weakenesses:</h4>
													{weakness.type}{' '}
													{weakness.value}
												</p>
											);
									  })
									: null}
								{card.convertedRetreatCost ? (
									<h4>
										Retreat Cost:{' '}
										{card.convertedRetreatCost}
									</h4>
								) : null}

								{card.resistances
									? card.resistances.map((resistance) => {
											console.log(resistance);
											return (
												<h4>
													Resistance:{' '}
													{resistance.type}
												</h4>
											);
									  })
									: null}
							</div>
						</SingleCardStyles>
						<ButtonContainer>
							<button onClick={() => addToEdit(card)}>
								Add To Deck
							</button>
						</ButtonContainer>
					</div>
				);
			})}
		</>
	);
};

const SingleCardStyles = styled.div`
	min-width: 50rem;
	display: flex;
	flex-direction: row;
	position: absolute;
	top: 35rem;
	p {
		margin: 0;
	}
	img {
		margin-top: 1.1rem;
		max-height: 23rem;
		max-width: 23rem;
	}
	.card-info {
		margin: 0rem 1rem;
		max-height: 23rem;
		overflow: scroll;
		overflow-x: hidden;
		width: 40.8rem;
		/* display: flex; */
		h5 {
			margin: 0rem 0rem;
		}
		h2 {
			margin-bottom: 0;
		}
		h4 {
			margin-bottom: 0;
		}
		::-webkit-scrollbar {
			width: 10px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 10px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: #888;
			border-radius: 10px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}
	button {
		position: absolute;
		top: 9rem;
		max-width: 2rem;
		max-height: 2rem;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;

	button {
		padding: 0.5rem 1rem;
		position: absolute;
		top: 33rem;
		left: 5rem;
		max-width: 8rem;
	}
`;

export default SingleCard;
