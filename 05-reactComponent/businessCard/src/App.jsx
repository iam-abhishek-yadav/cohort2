import React, { useState } from "react";
import Card from "./Card";
import CardForm from "./CardForm";
import "./App.css";

function App() {
	const [cards, setCards] = useState([]);

	const handleAddCard = (formData) => {
		console.log("reached here");
		setCards([...cards, formData]);
	};

	const handleDeleteCard = (index) => {
		const updatedCards = [...cards];
		updatedCards.splice(index, 1);
		setCards(updatedCards);
	};

	return (
		<div>
			<CardForm onSubmit={handleAddCard} />
			<div className='card-container'>
				{cards.map((card, index) => (
					<div key={index}>
						<Card {...card} />
						<button onClick={() => handleDeleteCard(index)}>Delete</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
