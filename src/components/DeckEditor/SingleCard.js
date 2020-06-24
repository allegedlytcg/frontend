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
								<div className='card-title'>
									<h2>
										{card.name}
										{card.hp ? (
											<span> {card.hp} HP </span>
										) : null}
									</h2>
								</div>
								{card.text ? (
									<p>
										Description: <br></br>
										{card.text}
									</p>
								) : null}
								<div className='basic-info'>
									<div className='primary-info'>
										{card.types ? (
											<p>
												Type:{' '}
												{card.types
													? card.types[0]
													: null}
											</p>
										) : null}
										{card.subtype ? (
											<p>Subtype: {card.subtype}</p>
										) : null}
										{card.evolvesFrom ? (
											<p>
												Evolves from: {card.evolvesFrom}
											</p>
										) : null}
									</div>
									<div className='secondary-info'>
										{card.weaknesses
											? card.weaknesses.map(
													(weakness, index) => {
														return (
															<p key={index}>
																Weakeness:{' '}
																{weakness.type}{' '}
																{weakness.value}
															</p>
														);
													},
											  )
											: null}
										{card.convertedRetreatCost ? (
											<p>
												Retreat Cost:{' '}
												{card.convertedRetreatCost}
											</p>
										) : null}

										{card.resistances
											? card.resistances.map(
													(resistance, index) => {
														return (
															<p key={index}>
																Resistance:{' '}
																{
																	resistance.type
																}
															</p>
														);
													},
											  )
											: null}
									</div>
								</div>

								{card.ability ? (
									<>
										<br></br>
										<h5>Pokemon Power:</h5>
										<p>
											{card.ability.name}:{' '}
											{card.ability.text}
										</p>
									</>
								) : null}
								{card.attacks
									? card.attacks.map((attack, index) => {
											// will need to map over cost later
											return (
												<div key={index}>
													<div
														key={index}
														className='attack-info'
													>
														<div className='primary-attack'>
															<h5>
																{attack.name}
															</h5>
															<p>
																Cost:{' '}
																{
																	attack.convertedEnergyCost
																}{' '}
																{attack.cost[0]}
															</p>
															{attack.damage ? (
																<p>
																	Damage:{' '}
																	{
																		attack.damage
																	}
																</p>
															) : null}
														</div>
														<div className='secondary-attack'>
															{attack.text ? (
																<p>
																	Description:{' '}
																	{
																		attack.text
																	}
																</p>
															) : null}
														</div>
													</div>
												</div>
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
	position: fixed;
	top: 34rem;

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
		overflow: auto;
		overflow-x: hidden;
		.card-title {
			span {
				font-size: 1rem;
			}
		}
		.basic-info {
			display: flex;
			.secondary-info {
				margin: 0 4rem;
			}
		}
		.attack-info {
			display: flex;
			justify-content: space-between;
			width: 35rem;
			margin-top: 1rem;

			p {
				max-width: 25rem;
			}
		}
		p {
			max-width: 35rem;
		}
		h5 {
			margin: 0rem 0rem;
		}
		h2 {
			margin-bottom: 0;
		}
		h4 {
			margin-bottom: 0;
		}
	}
	button {
		margin-bottom: 1rem;
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
		top: 32rem;
		left: 5rem;
		max-width: 8rem;
	}
`;

export default SingleCard;
