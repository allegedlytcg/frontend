import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Roller } from 'react-awesome-spinners';
import { GlobalContext } from '../../context/GlobalState';
import { checkQuantity } from './utils/checkQuantity';

const SingleCard = () => {
	const {
		selectedCardState,
		selectedCardDispatch,
		cardCatalogState,
		editingDeckState,
		editingDeckDispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		selectedCardDispatch({
			type: 'SET_SELECTED_CARD',
			payload: cardCatalogState[0],
		});
		return () => {};
	}, [cardCatalogState, selectedCardDispatch]);

	if (!selectedCardState.length) return <Roller size={500} />;

	return (
		<>
			{selectedCardState.map((card) => {
				if (!card)
					return (
						<div
							style={{
								width: '100%',
							}}
						>
							<Roller></Roller>
						</div>
					);
				return (
					<div key={card._id}>
						<SingleCardStyles key={card.imageUrl}>
							<div className='center'>
								<img src={card.imageUrl} alt='selected card' />
								<ButtonBar>
									<p>
										{card.supertype === 'Energy'
											? card.name ===
											  'Double Colorless Energy'
												? `${checkQuantity(
														card,
														editingDeckState,
												  )}/4`
												: checkQuantity(
														card,
														editingDeckState,
												  )
											: `${checkQuantity(
													card,
													editingDeckState,
											  )}/4`}
									</p>
									<ButtonContainer>
										<button
											onClick={() =>
												editingDeckDispatch({
													type: 'ADD_TO_EDIT',
													currentState: editingDeckState,
													card,
												})
											}
										>
											Add
										</button>
										<button
											onClick={() =>
												editingDeckDispatch({
													type: 'REMOVE_FROM_EDIT',
													currentState: editingDeckState,
													card,
												})
											}
										>
											Remove
										</button>
									</ButtonContainer>
									<p>{editingDeckState.length}/60</p>
								</ButtonBar>
							</div>
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
					</div>
				);
			})}
		</>
	);
};

const SingleCardStyles = styled.div`
	display: flex;
	flex-direction: row;
	/* margin-left: 4rem; */
	p {
		margin: 0;
	}
	img {
		width: 20rem;
		min-height: 440px;
		/* margin-left: -4px; */
	}
	.card-info {
		margin: 0rem 1rem;
		width: 17rem;
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
				margin: 0 2rem;
			}
		}
		.attack-info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 23rem;
			margin-top: 1rem;

			p {
				max-width: 15rem;
			}
		}
		p {
			max-width: 25rem;
		}
		h5 {
			margin: 0rem 0rem;
		}
		h2 {
			margin: 0;
		}
		h4 {
			margin-bottom: 0;
		}
	}
	button {
		margin: 1rem 0;
		max-width: 2rem;
		max-height: 2rem;
		cursor: pointer;
	}
	.center {
		display: flex;
		flex-direction: column;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	button {
		padding: 0.5rem 1rem;
		min-width: 7rem;
	}
`;

const ButtonBar = styled.div`
	h4 {
		margin-top: 0.5rem;
	}
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default SingleCard;
